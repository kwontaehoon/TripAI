"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Loader } from "@googlemaps/js-api-loader"
import {
  Search,
  Star,
  X,
  Navigation,
  List,
  Map,
  LayoutDashboard,
  Route,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { useGooglePlaceNearbyMutation } from "@/hooks/springboot/dev"
import { google_place_nearby } from "@/common/google/nearby"
import { location_types } from "@/util/google_nearby_api/location_types"
import { comma } from "@/util/comma"
import { aiResponseAtom, loadingModalAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { useAiRecommendMutation } from "@/hooks/supabase/dev"
import { cleanJson } from "@/util/cleanJson"
import { useRouter } from "next/navigation"
import { ai_mapDashboardResponse_func } from "@/common/ai/ai_response"

interface TouristSpot {
  id: string
  name: string
  lat: number
  lng: number
  categories: string[]
  rating: number
  reviewCount: number
  description: string
}

interface PlaylistItem {
  id: string
  spot: TouristSpot
  order: number
}

const CLUSTER_ZOOM_THRESHOLD = 12

// 작은 드래그 가능한 관광지 카드
const DraggableSpotCard = ({ spot }: { spot: TouristSpot }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "spot",
    item: () => ({ spot }), // <-- 함수로 변경하여 최신 spot을 참조
    collect: (monitor) => ({
      isDragging: monitor.canDrag(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`group bg-white rounded-lg border !border-gray-200 cursor-move transition-all hover:shadow-md hover:!border-blue-300 flex-shrink-0 ${
        isDragging ? "opacity-50 shadow-lg scale-105" : ""
      }`}
      data-oid="4:8ei:q"
    >
      <div
        className="p-3 h-full flex flex-col justify-between"
        data-oid="-xi-8yw"
      >
        <div className="flex-1 min-h-0" data-oid="soxxfq7">
          <h4
            className="font-medium group-hover:text-blue-600 transition-colors text-sm truncate"
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

        <div
          className="flex items-center justify-between mt-2"
          data-oid="kjgp-yp"
        >
          <div className="flex items-center" data-oid="x:qk50e">
            <Star className="w-3 h-3 text-yellow-400 mr-1" data-oid="4r52dx4" />
            <span
              className="text-xs font-medium text-gray-700"
              data-oid="x4r1z9a"
            >
              {spot.rating} ({comma(spot.userRatingCount, false)}개)
            </span>
          </div>
          <div className="flex gap-1" data-oid="8y7.oht">
            <div></div>
            {spot.types.slice(0, 1).map((category, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
                data-oid="pb-zs_3"
              >
                {location_types(category)}
              </span>
            ))}
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
            <Navigation className="w-3 h-3 text-blue-600" data-oid="yn7lq.m" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 플레이리스트 아이템
const PlaylistItem = ({
  item,
  index,
  onRemove,
}: {
  item: PlaylistItem
  index: number
  onRemove: (id: string) => void
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "playlist-item",
      item: { id: item.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item, index],
  )

  const [, drop] = useDrop(() => ({
    accept: "playlist-item",
    hover: () => {},
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`group p-4 bg-gradient-to-r from-white to-blue-50 rounded-xl border-2 border-dashed !border-blue-200 transition-all ${
        isDragging
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
                {item.spot.rating} ({comma(item.spot.userRatingCount, false)}개)
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
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
          data-oid="6tabvbi"
        >
          <X className="w-4 h-4" data-oid=":81o3y2" />
        </button>
      </div>
    </div>
  )
}

// 드롭 존
const PlaylistDropZone = ({
  children,
  onDrop,
}: {
  children: React.ReactNode
  onDrop: (spot: TouristSpot) => void
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "spot",
    drop: (item: { spot: TouristSpot }) => {
      onDrop(item.spot)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`transition-all duration-300 ${
        isOver
          ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 !border-blue-300 border-dashed rounded-lg p-2"
          : ""
      }`}
      data-oid="6ya-mr7"
    >
      {children}
    </div>
  )
}

function WWPageContent() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const skipIdleRef = useRef(false)
  const zoomRef = useRef<number | undefined>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markerClusterer, setMarkerClusterer] = useState<any>(null)
  const [currentZoom, setCurrentZoom] = useState(8)
  const [isLoading, setIsLoading] = useState(true)
  const { mutateAsync: nearbyMutation, data: nearBydata } =
    useGooglePlaceNearbyMutation()
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
  const [_, setAiResponse] = useAtom(aiResponseAtom)
  const { mutateAsync: aiRecommend, data, isSuccess } = useAiRecommendMutation()
  const prevNearbyDataRef = useRef<any>(null)
  const currentMarkersRef = useRef([])

  // 플레이리스트
  const [myPlaylists, setMyPlaylists] = useState<PlaylistItem[]>([])

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
            return
          }

          const center = mapInstance.getCenter()
          if (center) {
            const lat = center.lat()
            const lng = center.lng()
            nearbyMutation(google_place_nearby(lat, lng))
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
    let currentMarkers: google.maps.Marker[] = []

    const updateMarkers = async () => {
      try {
        // ------------------------------------------
        // 1. 기존 마커 정리 (통일된 단일 로직)
        // ------------------------------------------
        if (markerClusterer) {
          markerClusterer.clearMarkers()
          setMarkerClusterer(null)
        }

        // ⭐ (핵심) useRef에 담긴 이전 마커들을 모두 지도에서 제거합니다.
        currentMarkersRef.current.forEach((marker) => {
          marker.setMap(null)
        })
        // ⭐ useRef 배열을 비워서 새 마커를 받을 준비를 합니다.
        currentMarkersRef.current = []

        if (currentZoom >= CLUSTER_ZOOM_THRESHOLD) {
          // 높은 줌 레벨: 개별 마커 표시
          let isMounted = true

          currentMarkersRef.current = nearBydata?.places?.map((spot) => {
            const marker = new google.maps.Marker({
              position: {
                lat: spot.location.latitude,
                lng: spot.location.longitude,
              },
              map: map,
              title: spot.displayName.text,
              //   icon: {
              //     path: google.maps.SymbolPath.CIRCLE,
              //     scale: 10,
              //     // fillColor: getCategoryColor(spot.category),
              //     fillOpacity: 0.8,
              //     strokeColor: "#ffffff",
              //     strokeWeight: 2,
              //   },
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
    <span class="font-semibold text-gray-900">${spot.rating}</span>
  </div>
  <div class="text-sm text-gray-600">
    리뷰 ${comma(spot.userRatingCount, false)}개
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
                setTimeout(() => {
                  skipIdleRef.current = false
                }, 3000)
              }
            })

            return marker
          })
        } else {
          // 낮은 줌 레벨: 클러스터 표시
          const { MarkerClusterer } = await import(
            "@googlemaps/markerclusterer"
          )

          // 클러스터용 마커들 생성 (map에 직접 추가하지 않음)
          currentMarkersRef.current = nearBydata?.places?.map((spot) => {
            const marker = new google.maps.Marker({
              position: {
                lat: spot.location.latitude,
                lng: spot.location.longitude,
              },
              title: spot.displayName.text,
              // map 속성을 제거하여 직접 지도에 추가되지 않도록 함
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

            setMarkerClusterer(clusterer)
          }
        }
      } catch (error) {
        console.error("마커 업데이트 실패:", error)
      }
    }
    if (nearBydata) {
      // 이전 데이터와 현재 데이터의 places id를 비교해서 변경되었으면 마커 다시 표시
      // 변경되지 않았으면 현재 마커 유지
      const nearByDataId = nearBydata.places.map((x) => x.id)
      let prevNearByDataId
      if (prevNearbyDataRef.current) {
        prevNearByDataId = prevNearbyDataRef.current.map((x) => x.id)
      }
      const isEqual =
        JSON.stringify(nearByDataId) === JSON.stringify(prevNearByDataId)
      prevNearbyDataRef.current = nearBydata.places
      if (!isEqual) {
        updateMarkers()
      } else {
        return () => {
          isMounted = false
          // 컴포넌트 언마운트 시 마커들 정리
          currentMarkers.forEach((marker) => {
            marker.setMap(null)
          })
        }
      }
    }
  }, [map, currentZoom, nearBydata])

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
    await aiRecommend(ai_mapDashboardResponse_func(myPlaylists))
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="._m99n4"
    >
      {/* Main Content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
        data-oid="kwxi8x2"
      >
        {/* Main Layout */}
        <div
          className="md:grid grid-cols-12 gap-8 min-h-[600px]"
          data-oid="hdm0s7o"
        >
          {/* Left Side - Map */}
          <div className="col-span-7" data-oid="wx8jpvy">
            <div
              className="bg-white rounded-3xl shadow-2xl border !border-gray-200 md:h-full h-[400px] overflow-hidden"
              data-oid="jzabbp."
            >
              <div
                className="p-6 border-b !border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50"
                data-oid="ag.4m5l"
              >
                <div
                  className="flex items-center justify-between"
                  data-oid="vf2d3:t"
                >
                  <div
                    className="flex items-center space-x-3"
                    data-oid="w3d7p2y"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      data-oid="pproyvn"
                    >
                      <Map className="w-5 h-5 text-white" data-oid="grtf..m" />
                    </div>
                    <div data-oid="byl7gu6">
                      <h2
                        className="text-xl font-bold text-gray-900"
                        data-oid="-5ae8dw"
                      >
                        인터랙티브 지도
                      </h2>
                      <p className="text-sm text-gray-600" data-oid="c0r2_:l">
                        관광지를 클릭해서 상세 정보를 확인하세요
                      </p>
                    </div>
                  </div>
                  <div className="text-right" data-oid="n6yl.n:">
                    <div
                      className="text-sm font-medium text-gray-900"
                      data-oid="c40mon1"
                    >
                      줌 레벨: {currentZoom}
                    </div>
                    <div className="text-xs text-gray-600" data-oid="6:t4h7r">
                      {currentZoom >= CLUSTER_ZOOM_THRESHOLD
                        ? "개별 마커"
                        : "클러스터 모드"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-full" data-oid="m801ch-">
                {isLoading && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-10"
                    data-oid="422-791"
                  >
                    <div className="text-center" data-oid="y-77qh6">
                      <div
                        className="animate-spin rounded-full h-12 w-12 border-4 !border-blue-600 border-t-transparent mx-auto"
                        data-oid="mtl2jtc"
                      ></div>
                      <p
                        className="mt-4 text-gray-600 font-medium"
                        data-oid="nf14nkj"
                      >
                        지도를 불러오는 중...
                      </p>
                    </div>
                  </div>
                )}
                <div
                  ref={mapRef}
                  className="w-full h-full"
                  data-oid="e9f-mi7"
                />
              </div>
            </div>
          </div>

          {/* Right Side - List & Dashboard */}
          <div
            className="col-span-5 flex md:flex-col flex-row md:space-y-6 md:mt-0 mt-8 md:space-x-0 space-x-5"
            data-oid="vgcpg5j"
          >
            {/* Tourist Spots List - 작은 카드들 */}
            <div
              className="bg-white rounded-2xl shadow-lg border !border-gray-200 md:h-[40vh] h-[500px] flex flex-col w-1/2 md:w-full"
              data-oid="69-muth"
            >
              <div className="p-4 border-b !border-gray-200" data-oid="v0-vkxw">
                <div
                  className="flex items-center justify-between"
                  data-oid="6-0ag5z"
                >
                  <div
                    className="flex items-center space-x-2"
                    data-oid="sa782or"
                  >
                    <List
                      className="w-4 h-4 text-blue-600"
                      data-oid=".v.pxus"
                    />

                    <h3
                      className="text-base font-semibold text-gray-900"
                      data-oid="1r6etm_"
                    >
                      관광지 목록
                    </h3>
                  </div>
                  <span className="text-xs text-gray-600" data-oid="m_94de4">
                    {nearBydata?.places?.length}개
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4" data-oid="dzv8er1">
                <div
                  className="grid md:grid-cols-2 grid-cols-1 gap-3"
                  data-oid="_aq0fa:"
                >
                  {nearBydata?.places?.map((spot, index) => (
                    <DraggableSpotCard
                      key={index}
                      spot={spot}
                      data-oid="u5mj0ip"
                    />
                  ))}
                </div>
                {!nearBydata && (
                  <div
                    className="grid md:grid-cols-2 grid-cols-1 gap-3"
                    data-oid="3itlqek"
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-[100px] bg-gray-100 rounded-lg border !border-gray-200 animate-pulse"
                        data-oid="genajtk"
                      >
                        <div
                          className="p-3 h-full flex flex-col justify-between"
                          data-oid="5ohyaj2"
                        >
                          <div className="flex-1 min-h-0" data-oid="dfa8twz">
                            <div
                              className="h-4 bg-gray-200 rounded w-3/4 mb-2"
                              data-oid="sjj8y24"
                            ></div>
                            <div
                              className="h-3 bg-gray-200 rounded w-full mb-1"
                              data-oid="3bqgsi6"
                            ></div>
                            <div
                              className="h-3 bg-gray-200 rounded w-2/3"
                              data-oid="dbi0y4i"
                            ></div>
                          </div>
                          <div
                            className="flex items-center justify-between mt-2"
                            data-oid="-80-os_"
                          >
                            <div
                              className="flex items-center"
                              data-oid="cc19-pn"
                            >
                              <div
                                className="w-3 h-3 bg-gray-200 rounded mr-1"
                                data-oid="waxc_1u"
                              ></div>
                              <div
                                className="h-3 bg-gray-200 rounded w-8"
                                data-oid="au7um7r"
                              ></div>
                            </div>
                            <div
                              className="h-5 bg-gray-200 rounded w-12"
                              data-oid="yjg-dx3"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Playlist Dashboard - 더 긴 높이 */}
            <div
              className="bg-white rounded-2xl shadow-lg border !border-gray-200 h-[500px] md:h-[40vh] flex flex-col w-1/2 md:w-full"
              data-oid="hb11rk0"
            >
              <div className="p-4 border-b !border-gray-200" data-oid=".--x9i:">
                <div
                  className="flex items-center justify-between mb-3"
                  data-oid=".0s7kuw"
                >
                  <div
                    className="flex items-center space-x-2"
                    data-oid="8ukvod6"
                  >
                    <LayoutDashboard
                      className="w-4 h-4 text-purple-600"
                      data-oid="sr7kn13"
                    />

                    <h3
                      className="text-base font-semibold text-gray-900"
                      data-oid="p2pmahu"
                    >
                      나의 여행 코스
                    </h3>
                  </div>
                  {myPlaylists.length > 0 && (
                    <button
                      onClick={clearPlaylist}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                      data-oid="3qgxwrl"
                    >
                      전체 삭제
                    </button>
                  )}
                </div>

                <div
                  className="flex items-center justify-between text-xs"
                  data-oid="1246ify"
                >
                  <span className="text-gray-600" data-oid="x5r.k6j">
                    {myPlaylists.length}개 관광지 선택됨
                  </span>
                  <span
                    className="text-purple-600 font-medium"
                    data-oid="9i9n3vo"
                  >
                    예상 {myPlaylists.length * 2}시간
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto" data-oid="707.8yv">
                <PlaylistDropZone onDrop={addToPlaylist} data-oid="2228b74">
                  {myPlaylists.length === 0 ? (
                    <div
                      className="p-5 text-center text-gray-500"
                      data-oid="kxldt6j"
                    >
                      <div
                        className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        data-oid="dcm5uvp"
                      >
                        <Route
                          className="w-8 h-8 text-blue-500"
                          data-oid="2rg8vh2"
                        />
                      </div>
                      <p
                        className="text-sm font-semibold text-gray-700 mb-2"
                        data-oid="-4xhrgn"
                      >
                        여행 코스를 만들어보세요
                      </p>
                      <p
                        className="text-xs text-gray-500 mb-1"
                        data-oid="fxo_mz:"
                      >
                        관광지 카드를 드래그해서 여기에 놓거나
                      </p>
                      <p className="text-xs text-gray-500" data-oid="7c8m-bp">
                        지도에서 선택해서 추가하세요
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3" data-oid="kx66c5x">
                      {myPlaylists.map((item, index) => (
                        <PlaylistItem
                          key={item.id}
                          item={item}
                          index={index}
                          onRemove={removeFromPlaylist}
                          data-oid="_lu90qu"
                        />
                      ))}
                    </div>
                  )}
                </PlaylistDropZone>
              </div>

              {/* Action Buttons */}
              {myPlaylists.length > 0 && (
                <div
                  className="p-4 border-t !border-gray-200 space-y-2"
                  data-oid="ghke3qh"
                >
                  <button
                    onClick={generateCourse}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold text-sm flex items-center justify-center space-x-2"
                    data-oid="biq.uqr"
                  >
                    <Sparkles className="w-4 h-4" data-oid="syqudbb" />
                    <span data-oid="hiwj:g1">AI 코스 생성하기</span>
                    <ArrowRight className="w-4 h-4" data-oid="de0xjrc" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WWPage() {
  return (
    <DndProvider backend={HTML5Backend} data-oid="6rhq16u">
      <WWPageContent data-oid="1et0ddb" />
    </DndProvider>
  )
}
