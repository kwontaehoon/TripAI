"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Loader } from "@googlemaps/js-api-loader"
import {
  Users,
  Tag,
  X,
  Navigation,
  List,
  Route,
  Sparkles,
  ArrowRight,
  Filter,
  Star,
  CalendarDays,
  Building2,
  UtensilsCrossed,
  DollarSign,
} from "lucide-react"
import {
  useGooglePlaceNearbyMutation,
  useGooglePlaceTextMutation,
} from "@/hooks/springboot/dev"
import { google_place_nearby } from "@/common/google/nearby"
import { location_types } from "@/util/google_nearby_api/location_types"
import { comma } from "@/util/comma"
import { aiResponseAtom, loadingModalAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { useAiRecommendMutation } from "@/hooks/supabase/dev"
import { cleanJson } from "@/util/cleanJson"
import { useRouter } from "next/navigation"
import { ai_mapDashboardResponse_func } from "@/common/ai/ai_response"
import { google_place_textSearch } from "@/common/google/textSearch"

const mobile = () => {
  const CLUSTER_ZOOM_THRESHOLD = 12

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"filters" | "places" | "course">(
    "filters",
  )
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const skipIdleRef = useRef(false)
  const zoomRef = useRef<number | undefined>(null)
  const fixedMarkersRef = useRef<google.maps.Marker[]>([])
  const isClusterZoomRef = useRef(false)
  const placeTypeRef = useRef<boolean>(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [placeType, setPlaceType] = useState<boolean>(false)
  const [markerClusterer, setMarkerClusterer] = useState<any>(null)
  const [currentZoom, setCurrentZoom] = useState(8)
  const [isLoading, setIsLoading] = useState(true)
  const [nearBydata, setNearbyData] = useState()
  const [showTouristSpots, setShowTouristSpots] = useState(true)
  const [showRestaurants, setShowRestaurants] = useState(false)
  const { mutateAsync: nearbyMutation, data: nearBydataaa, isSuccess: nearbyDataIsSuccess } =
    useGooglePlaceNearbyMutation()
  const { mutateAsync: textSearchMutation, data: textSearchData, isSuccess: textSearchDataIsSuccess } =
    useGooglePlaceTextMutation()
  const [loadingAtom, setLoadingAtom] = useAtom(loadingModalAtom)
  const [formData, setFormData] = useState({
    destination: "",
    customDestination: "",
    customDestinationDescription: "",
    destinationType: "",
    duration: "",
    transportation: "",
    travelers: "",
    purpose: "",
    budget: "",
  })
  // 여행 필터 상태
  const [travelFilters, setTravelFilters] = useState({
    period: "",
    numberOfPeople: "",
    theme: "",
    budget: "",
  })
  const [_, setAiResponse] = useAtom(aiResponseAtom)
  const { mutateAsync: aiRecommend, data, isSuccess } = useAiRecommendMutation()
  const prevNearbyDataRef = useRef<any>(null)
  const currentMarkersRef = useRef([])
  const isAllFilled = Object.values(travelFilters).every(
    (value) => value !== "",
  )

  // 플레이리스트
  const [myPlaylists, setMyPlaylists] = useState([])

  useEffect(() => {
    if (!placeTypeRef.current && nearbyDataIsSuccess) {
      setNearbyData(nearBydataaa)
    }
  }, [nearBydataaa])

  useEffect(() => {
    if (placeTypeRef.current && textSearchDataIsSuccess) {
      setNearbyData(textSearchData)
    }
  }, [textSearchData])

  useEffect(() => {
    if (isSuccess) {
      const cleanedJsonString = cleanJson(
        data.candidates[0].content.parts[0].text,
      )

      try {
        const jsonData = JSON.parse(cleanedJsonString)
        setAiResponse(jsonData)
        localStorage.setItem("aiList", JSON.stringify(jsonData))
      } catch (error) {
        console.log(error)
        alert("오류가 발생했습니다. 다시 시도해주세요.")
        setLoadingAtom({ isOpen: false, message: "" })
        return
      }

      const params = new URLSearchParams({
        destination: myPlaylists.map((x) => x.spot.displayName.text).join(","),
        generated: "true",
        mapDashboard: "true", // ai-input에서 생성한 ai 코스를 구분하기 위한 값
        durationType: travelFilters.period,
        travelers: travelFilters.numberOfPeople,
        purpose: travelFilters.theme,
        budget: travelFilters.budget,
      })

      setFormData({
        destination: "",
        customDestination: "",
        customDestinationDescription: "",
        destinationType: "",
        duration: "",
        transportation: "",
        travelers: "",
        purpose: "",
        budget: "",
      })

      setLoadingAtom({ isOpen: false, message: "" })
      router.push(`/ai-course?${params.toString()}`)
    }
  }, [data])

  // 지도 초기화
  useEffect(() => {
    let isMounted = true
    let skipNextIdle = false // 줌 변경 후 idle 이벤트는 무시할 플래그

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
        version: "weekly",
      })

      try {
        await loader.load()

        if (!isMounted || !mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 37.5665, lng: 126.978 },
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        setMap(mapInstance)
        setCurrentZoom(8)

        // 줌 변경 시 다음 idle 이벤트를 건너뜀
        mapInstance.addListener("zoom_changed", () => {
          const zoom = mapInstance.getZoom()
          zoomRef.current = zoom
          if (zoom !== undefined) {
            setCurrentZoom(zoom)
            skipNextIdle = true
          }
        })

        // 지도 움직임 종료(idle) 시 API 호출
        mapInstance.addListener("idle", () => {
          // 단일 클러스터 마커를 누를시 map.setZoom(15)로 이동되기때문에 15에서는 새로운 데이터로 변경
          if (skipNextIdle && zoomRef.current !== 15) {
            skipNextIdle = false
            return // 줌 변경 후 발생한 idle은 무시
          }
          if (skipIdleRef.current) {
            skipIdleRef.current = false
            return
          }

          const center = mapInstance.getCenter()
          if (center) {
            const lat = center.lat()
            const lng = center.lng()
            if (placeTypeRef.current) {
              textSearchMutation(google_place_textSearch(lat, lng))
            } else {
              nearbyMutation(google_place_nearby(lat, lng))
            }
          }
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Google Maps 로드 실패:", error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [])

  // 마커 및 클러스터 업데이트
  useEffect(() => {
    if (!map) return

    let isMounted = true

    const updateMarkers = async () => {
      try {
        if (markerClusterer) {
          markerClusterer.clearMarkers()
          setMarkerClusterer(null)
        }

        currentMarkersRef.current.forEach((marker) => {
          marker.setMap(null)
        })
        currentMarkersRef.current = []

        fixedMarkersRef.current.forEach((marker) => {
          marker.setMap(null)
        })
        fixedMarkersRef.current = []

        const newFixedMarkers = myPlaylists.map((item) => {
          const spot = item.spot

          const fixedMarkerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#9333ea",
            fillOpacity: 0.9,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
            scale: 10,
          }

          const marker = new google.maps.Marker({
            position: {
              lat: spot.location.latitude,
              lng: spot.location.longitude,
            },
            map: map,
            title: `[나의 코스] ${spot.displayName.text}`,
            icon: fixedMarkerIcon,
            zIndex: 999,
          })

          const contentDiv = document.createElement("div")
          contentDiv.innerHTML = `
<div class="p-4 max-w-[250px]">
<h3 class="font-bold text-lg text-gray-900 mb-3">${spot.displayName.text}</h3>
<p class="text-sm text-gray-600 mb-3">${spot.formattedAddress}</p>
<div class="flex flex-wrap gap-1 mb-3">
${spot.types
  ?.slice(0, 3)
  .map(
    (category) =>
      `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${location_types(
        category,
      )}</span>`,
  )
  .join("")}
</div>

<div class="flex items-center justify-between">
<div class="flex items-center">
  <div class="flex items-center mr-3">
    <span class="text-yellow-500 mr-1">★</span>
    <span class="font-semibold text-gray-900">5</span>
  </div>
  <div class="text-sm text-gray-600">
    리뷰 853개
  </div>
</div>
</div>
<button id="add-to-plan-${spot.id}"
class="w-full mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-1 text-sm font-medium"
>
<span>여행 코스에 추가</span>
</button>
</div>
`

          const infoWindow = new google.maps.InfoWindow({
            content: contentDiv,
          })

          // 이벤트 리스너 수동으로 추가
          setTimeout(() => {
            const button = contentDiv.querySelector(`#add-to-plan-${spot.id}`)
            if (button) {
              button.addEventListener("click", () => {
                addToPlaylist(spot)
              })
            }
          }, 0)

          marker.addListener("click", () => {
            skipIdleRef.current = true
            if (isMounted) {
              infoWindow.open(map, marker)
            }
          })

          return marker
        })

        fixedMarkersRef.current = newFixedMarkers // 고정 마커 배열 업데이트

        if (currentZoom >= CLUSTER_ZOOM_THRESHOLD) {
          // 높은 줌 레벨: 개별 마커 표시

          currentMarkersRef.current = nearBydata?.places?.map((spot) => {
            const customIcon = {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: placeType ? "#10B981" : "#3B82F6",
              fillOpacity: 0.8,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }

            const marker = new google.maps.Marker({
              position: {
                lat: spot.location.latitude,
                lng: spot.location.longitude,
              },
              map: map,
              title: spot.displayName.text,
              icon: customIcon, // ⭐ 정의한 customIcon 적용
            })

            // 정보창 생성
            const contentDiv = document.createElement("div")
            contentDiv.innerHTML = `
<div class="p-4 max-w-[250px]">
<h3 class="font-bold text-lg text-gray-900 mb-3">${spot.displayName.text}</h3>
<p class="text-sm text-gray-600 mb-3">${spot.formattedAddress}</p>
<div class="flex flex-wrap gap-1 mb-3">
${spot.types
  ?.slice(0, 3)
  .map(
    (category) =>
      `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${location_types(
        category,
      )}</span>`,
  )
  .join("")}
</div>

<div class="flex items-center justify-between">
<div class="flex items-center">
  <div class="flex items-center mr-3">
    <span class="text-yellow-500 mr-1">★</span>
    <span class="font-semibold text-gray-900">5</span>
  </div>
  <div class="text-sm text-gray-600">
    리뷰 853개
  </div>
</div>
</div>
<button id="add-to-plan-${spot.id}"
class="w-full mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-1 text-sm font-medium"
>
<span>여행 코스에 추가</span>
</button>
</div>
`

            const infoWindow = new google.maps.InfoWindow({
              content: contentDiv,
            })

            setTimeout(() => {
              const button = contentDiv.querySelector(`#add-to-plan-${spot.id}`)
              if (button) {
                button.addEventListener("click", () => {
                  addToPlaylist(spot)
                })
              }
            }, 0)

            marker.addListener("click", () => {
              skipIdleRef.current = true
              if (isMounted) {
                infoWindow.open(map, marker)
              }
            })

            return marker
          })
        } else {
          // 낮은 줌 레벨: 클러스터 표시
          const { MarkerClusterer } = await import(
            "@googlemaps/markerclusterer"
          )

          currentMarkersRef.current = nearBydata?.places?.map((spot) => {
            const marker = new google.maps.Marker({
              position: {
                lat: spot.location.latitude,
                lng: spot.location.longitude,
              },
              title: spot.displayName.text,
            })

            // 클러스터에서도 개별 마커 클릭 이벤트
            marker.addListener("click", () => {
              if (isMounted) {
                map.setCenter({
                  lat: spot.location.latitude,
                  lng: spot.location.longitude,
                })
                map.setZoom(15)
              }
            })

            return marker
          })

          if (isMounted && map) {
            const clusterer = new MarkerClusterer({
              map,
              markers: currentMarkersRef.current,
              gridSize: 60,
              maxZoom: CLUSTER_ZOOM_THRESHOLD - 1,
              renderer: {
                render({ count, position }) {
                  return new google.maps.Marker({
                    position,
                    // icon: {
                    //   url: "/svg/close.svg", // ✅ 커스텀 클러스터 아이콘
                    //   scaledSize: new google.maps.Size(40, 40), // 아이콘 크기 조절
                    //   labelOrigin: new google.maps.Point(20, 20), // 숫자 위치
                    // },
                    label: {
                      text: String(count),
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  })
                },
              },
            })

            // 클러스터 모임을 클릭할 경우
            clusterer.addListener("click", (cluster) => {
              isClusterZoomRef.current = true
            })

            setMarkerClusterer(clusterer)
          }
        }
        isClusterZoomRef.current = false
      } catch (error) {
        console.error("마커 업데이트 실패:", error)
      }
    }

    if (nearBydata) {
      // 이전 데이터와 현재 데이터의 places id를 비교해서 변경되었으면 마커 다시 표시
      // 변경되지 않았으면 현재 마커 유지
      const nearByDataId = nearBydata?.places?.map((x) => x.id)
      let prevNearByDataId
      if (prevNearbyDataRef.current) {
        prevNearByDataId = prevNearbyDataRef.current.map((x) => x.id)
      }
      const isEqual =
        JSON.stringify(nearByDataId) === JSON.stringify(prevNearByDataId)
      prevNearbyDataRef.current = nearBydata.places
      if (!isEqual || isClusterZoomRef.current) {
        updateMarkers()
      } else {
        return () => {
          isMounted = false
          // 컴포넌트 언마운트 시 마커들 정리
          // currentMarkersRef.current.forEach((marker) => {
          //   marker.setMap(null)
          // })
        }
      }
    }
  }, [map, currentZoom, nearBydata])

  useEffect(() => {
    if (!map) return
    placeTypeRef.current = placeType
    const center = map.getCenter()
    if (center) {
      const lat = center.lat()
      const lng = center.lng()
      // nearbyMutation을 즉시 호출
      // 이 경우, 불필요한 idle 이벤트를 유발하지 않도록 skipIdleRef를 설정할 필요 없음
      if (placeTypeRef.current) {
        textSearchMutation(google_place_textSearch(lat, lng))
      } else {
        nearbyMutation(google_place_nearby(lat, lng))
      }
    }
  }, [placeType, map]) // placeType이 변경될 때 실행

  useEffect(() => {
    if (!map) return

    const updateFixedMarkers = () => {
      fixedMarkersRef.current.forEach((marker) => {
        marker.setMap(null)
      })
      fixedMarkersRef.current = []

      const newFixedMarkers = myPlaylists.map((item) => {
        const spot = item.spot

        const fixedMarkerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#9333ea", // 붉은 계열 (고정된 마커임을 강조)
          fillOpacity: 0.9,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
          scale: 10,
        }

        const marker = new google.maps.Marker({
          position: {
            lat: spot.location.latitude,
            lng: spot.location.longitude,
          },
          map: map,
          icon: fixedMarkerIcon,
          zIndex: 999,
        })
        return marker
      })

      fixedMarkersRef.current = newFixedMarkers
    }
    updateFixedMarkers()
  }, [map, myPlaylists])

  // 플레이리스트 관리
  const addToPlaylist = useCallback((spot: TouristSpot) => {
    const newPlaylistItem: PlaylistItem = {
      id: `playlist-${Date.now()}`,
      spot: spot,
      order: myPlaylists.length,
    }

    setMyPlaylists((prev) => [...prev, newPlaylistItem])
  }, [])

  const removeFromPlaylist = useCallback((itemId: string) => {
    setMyPlaylists((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  const clearPlaylist = () => {
    setMyPlaylists([])
  }

  const generateCourse = async () => {
    setLoadingAtom({
      isOpen: true,
      message: "AI가 여행 코스를 생성하고 있어요",
    })
    // AI 생성 시뮬레이션 (3초 대기)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await aiRecommend(ai_mapDashboardResponse_func(myPlaylists, travelFilters))
  }

  const MAP_HEIGHT = "calc(50vh)"

  const PlaylistItem = ({
    item,
    index,
    onRemove,
  }: {
    item: PlaylistItem
    index: number
    onRemove: (id: string) => void
  }) => {
    return (
      <div
        className={`group p-4 bg-gradient-to-r from-white to-blue-50 rounded-xl border-2 border-dashed !border-blue-200 transition-all ${
          false
            ? "opacity-50 scale-105"
            : "hover:shadow-md hover:!border-blue-400"
        }`}
        data-oid="5c9j63x"
      >
        <div className="flex items-center justify-between" data-oid="s2u-ojh">
          <div
            className="flex items-center space-x-4 flex-1 min-w-0"
            data-oid="moa1w.h"
          >
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
              data-oid="r3y81f."
            >
              {index + 1}
            </div>
            <div className="flex-1 min-w-0" data-oid="-kdw4jn">
              <h4
                className="font-semibold text-gray-900 truncate"
                data-oid="8ubi.lq"
              >
                {item.spot.displayName.text}
              </h4>
              <p className="text-xs">{item.spot.formattedAddress}</p>
              <div
                className="flex items-center mt-1 space-x-2"
                data-oid="lwpxw2r"
              >
                <Star className="w-3 h-3 text-yellow-400" data-oid=":g04.zh" />
                <span className="text-sm text-gray-600" data-oid="l40jbnv">
                  5 (853개)
                </span>
                <div className="flex gap-1" data-oid="bibunmk">
                  {item.spot.types.slice(0, 1).map((category, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                      data-oid="blwir_f"
                    >
                      {location_types(category)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="transition-opacity text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
            data-oid="6tabvbi"
          >
            <X className="w-4 h-4" data-oid=":81o3y2" />
          </button>
        </div>
      </div>
    )
  }

  const DraggableSpotCard = ({ spot }) => {
    return (
      <div
        className={`bg-white rounded-lg border !border-gray-200`}
        data-oid="4:8ei:q"
      >
        <div
          className="px-4 py-3 h-full flex flex-col justify-between"
          data-oid="-xi-8yw"
        >
          <div className="flex-1 min-h-0" data-oid="soxxfq7">
            <h4
              className="font-medium transition-colors text-sm truncate"
              data-oid="wmy2.9r"
            >
              {spot.displayName.text}
            </h4>
            <p className="text-xs mb-3">{spot.formattedAddress}</p>
            {/* <p
                          className="text-xs text-gray-600 mt-1 line-clamp-2 leading-tight"
                          data-oid="ahvli31"
                      >
                          {spot.description}
                      </p> */}
          </div>

          <div className="flex items-center mt-2" data-oid="kjgp-yp">
            <div className="flex items-center" data-oid="x:qk50e">
              <Star
                className="w-3 h-3 text-yellow-400 mr-1"
                data-oid="4r52dx4"
              />
              <span
                className="text-xs font-medium text-gray-700"
                data-oid="x4r1z9a"
              >
                5 (853개)
              </span>
            </div>
            <div className="flex gap-1 ml-2 flex-1" data-oid="8y7.oht">
              {spot.types.slice(0, 2).map((category, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
                  data-oid="pb-zs_3"
                >
                  {location_types(category)}
                </span>
              ))}
            </div>
            <div
              className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg"
              onClick={() => addToPlaylist(spot)}
            >
              여행 코스에 추가
            </div>
          </div>

          <div
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            data-oid="-rlm7n2"
          >
            <div
              className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center"
              data-oid="ewegd76"
            >
              <Navigation
                className="w-3 h-3 text-blue-600"
                data-oid="yn7lq.m"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      <div className="fixed left-0 top-0 w-full" style={{ height: MAP_HEIGHT }}>
        <div ref={mapRef} className="w-full h-full" data-oid="e9f-mi7" />
      </div>
      <div className="absolute left-0 top-1/2 w-full h-[50vh] flex flex-col">
        <div className="flex flex-col bg-white h-full" data-oid="w-2ifkf">
          {/* Tab Navigation */}
          <div
            className="flex border-b !border-gray-200 flex-1"
            data-oid="2f29v5i"
          >
            <button
              onClick={() => setActiveTab("filters")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 text-xs font-medium transition-colors ${
                activeTab === "filters"
                  ? "text-blue-600 border-b-2 !border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              data-oid="9v682m0"
            >
              <Filter className="w-4 h-4" data-oid="5cbm4y9" />
              <span data-oid="zyrnall">여행 필터</span>
            </button>
            <button
              onClick={() => setActiveTab("places")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 text-xs font-medium transition-colors ${
                activeTab === "places"
                  ? "text-blue-600 border-b-2 !border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              data-oid="od.3qqb"
            >
              <List className="w-4 h-4" data-oid="_c1p0qh" />
              <span data-oid="d83qfuq">장소 목록</span>
              <span
                className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                data-oid=".w._zwj"
              >
                {/* {filteredSpots.length} */}
                {nearBydata?.places?.length || 0}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("course")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 text-xs font-medium transition-colors ${
                activeTab === "course"
                  ? "text-blue-600 border-b-2 !border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              data-oid="5jeibi_"
            >
              <Route className="w-4 h-4" data-oid="i96t0b." />
              <span data-oid="rhr0j4t">나의 코스</span>
              {myPlaylists.length > 0 && (
                <span
                  className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full"
                  data-oid="6vmr4hf"
                >
                  {myPlaylists.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col h-full" data-oid="t9il7gl">
            {/* 여행 필터 탭 */}
            {activeTab === "filters" && (
              <div className="p-4 space-y-4" data-oid="b.51anx">
                {/* 여행 기간 */}
                <div data-oid="milxz7x">
                  <label
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
                    data-oid=":0y._0v"
                  >
                    <CalendarDays
                      className="w-4 h-4 text-blue-500"
                      data-oid="jimivm0"
                    />

                    <span data-oid="::a:od7">여행 기간</span>
                  </label>
                  <select
                    value={travelFilters.period}
                    onChange={(e) =>
                      setTravelFilters((prev) => ({
                        ...prev,
                        period: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-oid="i-h62a0"
                  >
                    <option value="" data-oid="6h2.c-y">
                      전체
                    </option>
                    <option value="1day" data-oid="cnd4obo">
                      당일치기
                    </option>
                    <option value="2-3days" data-oid="0hxnuig">
                      1박 2일 ~ 2박 3일
                    </option>
                    <option value="4-7days" data-oid="jubqbkj">
                      3박 4일 ~ 1주일
                    </option>
                    <option value="1week+" data-oid="-xel6ci">
                      1주일 이상
                    </option>
                  </select>
                </div>

                {/* 인원수 */}
                <div data-oid="mtjbxfi">
                  <label
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
                    data-oid="cd80gp1"
                  >
                    <Users
                      className="w-4 h-4 text-green-500"
                      data-oid="g187c6y"
                    />

                    <span data-oid="9kfvv:t">인원수</span>
                  </label>
                  <select
                    value={travelFilters.numberOfPeople}
                    onChange={(e) =>
                      setTravelFilters((prev) => ({
                        ...prev,
                        numberOfPeople: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-oid="009v5:2"
                  >
                    <option value="" data-oid="qu2k__-">
                      전체
                    </option>
                    <option value="solo" data-oid="jryzyc3">
                      혼자 (1명)
                    </option>
                    <option value="couple" data-oid="he4eq3t">
                      커플 (2명)
                    </option>
                    <option value="small-group" data-oid="c012k6x">
                      소그룹 (3-5명)
                    </option>
                    <option value="large-group" data-oid="21ghd3j">
                      대그룹 (6명 이상)
                    </option>
                  </select>
                </div>

                {/* 테마 */}
                <div data-oid="w7nb5.j">
                  <label
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
                    data-oid="7j8y4k7"
                  >
                    <Tag
                      className="w-4 h-4 text-purple-500"
                      data-oid="xp:vd7:"
                    />

                    <span data-oid="jqhv7mb">테마</span>
                  </label>
                  <select
                    value={travelFilters.theme}
                    onChange={(e) =>
                      setTravelFilters((prev) => ({
                        ...prev,
                        theme: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-oid="d1y8pmh"
                  >
                    <option value="" data-oid="xywan-o">
                      전체
                    </option>
                    <option value="역사" data-oid="4qx-1ea">
                      역사
                    </option>
                    <option value="문화" data-oid="173p-99">
                      문화
                    </option>
                    <option value="자연" data-oid="10uzmmn">
                      자연
                    </option>
                    <option value="쇼핑" data-oid="_b6y.eu">
                      쇼핑
                    </option>
                    <option value="한식" data-oid="dbmk4cm">
                      한식
                    </option>
                    <option value="해산물" data-oid="a.xy:7c">
                      해산물
                    </option>
                  </select>
                </div>
                {/* 예산 */}
                <div data-oid="x20p77q">
                  <label
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
                    data-oid="2auhna0"
                  >
                    <DollarSign
                      className="w-4 h-4 text-orange-500"
                      data-oid="fl1pqav"
                    />

                    <span data-oid=":ww757m">예산</span>
                  </label>
                  <select
                    value={travelFilters.budget}
                    onChange={(e) =>
                      setTravelFilters((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    data-oid="e-ef6oy"
                  >
                    <option value="" data-oid="ne.1y27">
                      선택해주세요
                    </option>
                    <option value="10만원 이하" data-oid="nylgll7">
                      10만원 이하
                    </option>
                    <option value="10~30만원" data-oid=".acedll">
                      10-30만원
                    </option>
                    <option value="30~50만원" data-oid="86_xd1c">
                      30-50만원
                    </option>
                    <option value="50만원 이상" data-oid="a1_v1.6">
                      50만원 이상
                    </option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "places" && (
              <div className="overflow-y-scroll flex-1">
                {nearBydata?.places?.map((spot, index) => (
                  <DraggableSpotCard
                    key={index}
                    spot={spot}
                    data-oid="u5mj0ip"
                  />
                ))}
              </div>
            )}

            {/* 나의 여행 코스 탭 */}
            {activeTab === "course" && (
              <div className="flex flex-col h-full" data-oid="-078gnj">
                <div className="" data-oid="qps6dnr">
                  {myPlaylists.length === 0 ? (
                    <div
                      className="p-8 text-center text-gray-500"
                      data-oid="-jj-wgn"
                    >
                      <div
                        className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        data-oid="cqg:8na"
                      >
                        <Route
                          className="w-8 h-8 text-blue-500"
                          data-oid="qt8keft"
                        />
                      </div>
                      <p
                        className="text-sm font-semibold text-gray-700 mb-2"
                        data-oid="saizu-2"
                      >
                        여행 코스를 만들어보세요
                      </p>
                      <p
                        className="text-xs text-gray-500 mb-1"
                        data-oid="t71c.kj"
                      >
                        장소 목록에서 카드를 드래그하거나
                      </p>
                      <p className="text-xs text-gray-500" data-oid="2.k1m11">
                        지도에서 선택해서 추가하세요
                      </p>
                    </div>
                  ) : (
                    <div
                      className="p-4 overflow-y-scroll h-52 space-y-2"
                      data-oid="jt:448r"
                    >
                      {myPlaylists.map((item, index) => (
                        <PlaylistItem
                          key={index}
                          item={item}
                          index={index}
                          onRemove={removeFromPlaylist}
                          data-oid="_lu90qu"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {myPlaylists.length > 0 && (
                  <div
                    className="p-4 border-t !border-gray-200 space-y-3 flex-1 flex flex-col justify-end"
                    data-oid="y9c4f8i"
                  >
                    <div
                      className="flex items-center justify-between text-sm text-gray-600 mb-2"
                      data-oid="r3e8g-."
                    >
                      <span data-oid="5ergn4_">
                        {myPlaylists.length}개 장소 선택됨
                      </span>
                    </div>
                    <button
                      disabled={!isAllFilled}
                      onClick={generateCourse}
                      className={`w-full px-4 py-3 rounded-lg hover:shadow-xl transition-all font-semibold text-sm flex items-center justify-center space-x-2
                     ${
                       isAllFilled
                         ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
                     }`}
                      data-oid="biq.uqr"
                    >
                      <Sparkles className="w-4 h-4" data-oid="syqudbb" />
                      <span data-oid="hiwj:g1">AI 코스 생성하기</span>
                      <ArrowRight className="w-4 h-4" data-oid="de0xjrc" />
                    </button>
                    {/* <div className="grid grid-cols-2 gap-2" data-oid="gs0776x">
                      <button
                        className="px-3 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center space-x-1"
                        data-oid="8ra7jb-"
                      >
                        <Navigation className="w-3 h-3" data-oid=":-ie.bm" />

                        <span data-oid="0no7_an">경로 최적화</span>
                      </button>
                      <button
                        onClick={clearPlaylist}
                        className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center space-x-1"
                        data-oid="0ktf79b"
                      >
                        <X className="w-3 h-3" data-oid="ngkzwlk" />
                        <span data-oid="4wxa-ax">전체 삭제</span>
                      </button>
                    </div> */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed top-16 left-0 z-50" data-oid="zo8p4lz">
        <div className="p-2" data-oid="bukvnze">
          <div className="flex w-h-center space-x-1 text-xs" data-oid="g.klffk">
            <button
              onClick={() => {
                setShowTouristSpots(!showTouristSpots)
                setShowRestaurants(false)
                setPlaceType(false)
              }}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-lg transition-all ${
                showTouristSpots
                  ? "bg-blue-100 text-blue-700 border !border-blue-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-oid="hcdazgq"
            >
              <div
                className="flex items-center mr-1 whitespace-nowrap"
                data-oid="_2az044"
              >
                <span data-oid="yg_6pog">관광지</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  showTouristSpots
                    ? "!border-blue-500 bg-blue-500"
                    : "!border-gray-400"
                }`}
                data-oid="9.uxz.t"
              >
                {showTouristSpots && (
                  <div
                    className="w-2 h-2 bg-white rounded-full"
                    data-oid="iwe41wd"
                  ></div>
                )}
              </div>
            </button>

            <button
              onClick={() => {
                setShowRestaurants(!showRestaurants)
                setShowTouristSpots(false)
                setPlaceType(true)
              }}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-lg transition-all ${
                showRestaurants
                  ? "bg-orange-100 text-orange-700 border !border-orange-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-oid="wffu5tr"
            >
              <div
                className="flex items-center mr-1 whitespace-nowrap"
                data-oid="2dycass"
              >
                <span data-oid="mb3kgtq">맛집</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  showRestaurants
                    ? "!border-orange-500 bg-orange-500"
                    : "!border-gray-400"
                }`}
                data-oid="he_rkin"
              >
                {showRestaurants && (
                  <div
                    className="w-2 h-2 bg-white rounded-full"
                    data-oid="2bno.ye"
                  ></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default mobile
