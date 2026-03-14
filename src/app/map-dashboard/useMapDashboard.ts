"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { MarkerClusterer } from "@googlemaps/markerclusterer"
import { Loader } from "@googlemaps/js-api-loader"
import {
  useGooglePlaceNearbyMutation,
  useGooglePlaceTextMutation,
} from "@/hooks/springboot/queries"
import {
  google_place_nearby,
} from "@/common/google/nearby"
import { location_types } from "@/util/google_nearby_api/location_types"
import { aiResponseAtom, loadingModalAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { useAiRecommendMutation } from "@/hooks/supabase/queries"
import { cleanJson } from "@/util/cleanJson"
import { useRouter } from "next/navigation"
import { ai_mapDashboardResponse_func } from "@/common/ai/ai_response"
import { google_place_textSearch } from "@/common/google/textSearch"

export interface TouristSpot {
  id: string
  displayName: { text: string }
  formattedAddress: string
  location: { latitude: number; longitude: number }
  types: string[]
  rating?: number
}

export interface TravelFilters {
  period: string
  numberOfPeople: string
  theme: string
  budget: string
}

export interface PlaylistItem {
  id: string
  spot: TouristSpot
  order: number
  placeType: boolean // false: 관광지, true: 맛집
}

export const CLUSTER_ZOOM_THRESHOLD = 12

export function useMapDashboard() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const skipIdleRef = useRef(false)
  const zoomRef = useRef<number | undefined>(null)
  const fixedMarkersRef = useRef<google.maps.Marker[]>([])
  const isClusterZoomRef = useRef(false)
  const placeTypeRef = useRef<boolean>(false)
  const prevNearbyDataRef = useRef<TouristSpot[] | null>(null)
  const currentMarkersRef = useRef<google.maps.Marker[]>([])

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [placeType, setPlaceType] = useState<boolean>(false)
  const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer | null>(null)
  const [currentZoom, setCurrentZoom] = useState(8)
  const [isLoading, setIsLoading] = useState(true)
  const [nearBydata, setNearbyData] = useState<{ places: TouristSpot[] } | undefined>()
  const [showTouristSpots, setShowTouristSpots] = useState(true)
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [myPlaylists, setMyPlaylists] = useState<PlaylistItem[]>([])

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

  const [travelFilters, setTravelFilters] = useState<TravelFilters>({
    period: "",
    numberOfPeople: "",
    theme: "",
    budget: "",
  })

  const [loadingAtom, setLoadingAtom] = useAtom(loadingModalAtom)
  const [_, setAiResponse] = useAtom(aiResponseAtom)

  const {
    mutateAsync: nearbyMutation,
    data: nearBydataaa,
    isSuccess: nearbyDataIsSuccess,
  } = useGooglePlaceNearbyMutation()

  const {
    mutateAsync: textSearchMutation,
    data: textSearchData,
    isSuccess: textSearchDataIsSuccess,
  } = useGooglePlaceTextMutation()

  const { mutateAsync: aiRecommend, data, isSuccess } = useAiRecommendMutation()

  const isAllFilled = Object.values(travelFilters).every(
    (value) => value !== "",
  )

  // nearbyMutation 데이터 동기화
  useEffect(() => {
    if (!placeTypeRef.current) {
      if (
        nearBydataaa === undefined ||
        Object.keys(nearBydataaa).length === 0
      ) {
        setNearbyData({ places: [] })
      } else {
        setNearbyData(nearBydataaa)
      }
    }
  }, [nearBydataaa])

  // textSearchMutation 데이터 동기화
  useEffect(() => {
    if (placeTypeRef.current) {
      setNearbyData(textSearchData)
    }
  }, [textSearchData])

  // AI 응답 처리
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
        mapDashboard: "true",
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
    let skipNextIdle = false

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

        mapInstance.addListener("zoom_changed", () => {
          const zoom = mapInstance.getZoom()
          zoomRef.current = zoom
          if (zoom !== undefined) {
            setCurrentZoom(zoom)
            skipNextIdle = true
          }
        })

        mapInstance.addListener("idle", () => {
          if (skipNextIdle && zoomRef.current !== 15) {
            skipNextIdle = false
            return
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
            fillColor: item.placeType ? "#3B82F6" : "#9333ea",
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

          setTimeout(() => {
            const button = contentDiv.querySelector(`#add-to-plan-${spot.id}`)
            if (button) {
              button.addEventListener("click", () => {
                addToPlaylist(spot, item.placeType)
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

        fixedMarkersRef.current = newFixedMarkers

        if (currentZoom >= CLUSTER_ZOOM_THRESHOLD) {
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
              icon: customIcon,
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

            setTimeout(() => {
              const button = contentDiv.querySelector(`#add-to-plan-${spot.id}`)
              if (button) {
                button.addEventListener("click", () => {
                  addToPlaylist(spot, placeTypeRef.current)
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
          }) ?? []
        } else {
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
          }) ?? []

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
        }
      }
    }
  }, [map, currentZoom, nearBydata])

  // placeType 변경 시 데이터 재조회
  useEffect(() => {
    if (!map) return
    placeTypeRef.current = placeType
    const center = map.getCenter()
    if (center) {
      const lat = center.lat()
      const lng = center.lng()
      if (placeTypeRef.current) {
        textSearchMutation(google_place_textSearch(lat, lng))
      } else {
        nearbyMutation(google_place_nearby(lat, lng))
      }
    }
  }, [placeType, map])

  // 고정 마커 업데이트 (플레이리스트 변경 시)
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
          fillColor: item.placeType ? "#3B82F6" : "#9333ea",
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
  const addToPlaylist = useCallback((spot: TouristSpot, isRestaurant: boolean = false) => {
    const newPlaylistItem: PlaylistItem = {
      id: `playlist-${Date.now()}`,
      spot: spot,
      order: myPlaylists.length,
      placeType: isRestaurant,
    }
    setMyPlaylists((prev) => [...prev, newPlaylistItem])
  }, [myPlaylists.length])

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
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await aiRecommend(ai_mapDashboardResponse_func(myPlaylists, travelFilters))
  }

  return {
    // refs
    mapRef,
    skipIdleRef,
    // state values
    map,
    placeType,
    setPlaceType,
    markerClusterer,
    currentZoom,
    isLoading,
    nearBydata,
    showTouristSpots,
    setShowTouristSpots,
    showRestaurants,
    setShowRestaurants,
    formData,
    setFormData,
    travelFilters,
    setTravelFilters,
    myPlaylists,
    setMyPlaylists,
    // computed
    isAllFilled,
    // functions
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    generateCourse,
  }
}
