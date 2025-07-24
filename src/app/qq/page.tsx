"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { google_place_nearby } from "@/common/google/nearby"
import { useGooglePlaceNearbyMutation } from "@/hooks/springboot/dev"

interface TouristSpot {
  id: string
  name: string
  lat: number
  lng: number
  category: string
  rating: number
  description: string
}

// 더미 데이터 - 전국 관광지
const touristSpot1s: TouristSpot[] = [
  // 서울 지역
  {
    id: "1",
    category: "역사",
    rating: 4.5,
    description: "조선왕조의 정궁",
    displayName: {
      text: "경복궁",
    },
    location: {
      latitude: 37.5796,
      longitude: 126.977,
    },
  },
]

const CLUSTER_ZOOM_THRESHOLD = 12 // 이 줌 레벨 이상에서 개별 마커 표시

export default function QQPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const skipIdleRef =useRef(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [currentZoom, setCurrentZoom] = useState(8)
  const [markerClusterer, setMarkerClusterer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null)
  const [skipIdleUntil, setSkipIdleUntil] = useState<number | null>(null)
  const { mutateAsync: nearbyMutation, data: nearBydata } =
    useGooglePlaceNearbyMutation()
  const [touristSpots, setTouristSpots] = useState([])

  // 카테고리별 색상
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      역사: "#8B4513",
      자연: "#228B22",
      해변: "#4169E1",
      문화: "#9932CC",
      쇼핑: "#FF6347",
      랜드마크: "#FF4500",
      시장: "#32CD32",
      리조트: "#FF69B4",
      드라이브: "#1E90FF",
      야경: "#4B0082",
      종교: "#DAA520",
      과학: "#00CED1",
    }
    return colors[category] || "#666666"
  }

  useEffect(() => {
    if (nearBydata) {
      setTouristSpots(nearBydata.places)
    }
  }, [nearBydata])

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
        nearbyMutation(google_place_nearby(37.5665, 126.978))

        setMap(mapInstance)
        setCurrentZoom(8)

        // 줌 변경 시 다음 idle 이벤트를 건너뜀
        mapInstance.addListener("zoom_changed", () => {
          const zoom = mapInstance.getZoom()
          if (zoom !== undefined) {
            setCurrentZoom(zoom)
            skipNextIdle = true
          }
        })

        // 지도 움직임 종료(idle) 시 API 호출
        mapInstance.addListener("idle", () => {
          if (skipNextIdle) {
            skipNextIdle = false
            return // 줌 변경 후 발생한 idle은 무시
          }
          if(skipIdleRef.current){
            return
          }

          const center = mapInstance.getCenter()
          if (center) {
            const lat = center.lat()
            const lng = center.lng()
            console.log("지도 중심 좌표:", lat, lng)
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
        // 기존 클러스터러 제거
        if (markerClusterer) {
          markerClusterer.clearMarkers()
          setMarkerClusterer(null)
        }

        // 기존 개별 마커들 제거
        currentMarkers.forEach((marker) => {
          marker.setMap(null)
        })
        currentMarkers = []

        if (currentZoom >= CLUSTER_ZOOM_THRESHOLD) {
          // 높은 줌 레벨: 개별 마커 표시
          currentMarkers = touristSpots.map((spot) => {
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
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-4 max-w-[250px]">
                  <h3 class="font-bold text-lg text-gray-900 mb-3">${spot.displayName.text}</h3>
                  
                  <div class="flex flex-wrap gap-1 mb-3">
                    ${spot.types
                      .slice(0, 3)
                      .map(
                        (category) =>
                          `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${category}</span>`,
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
                        리뷰 ${spot.userRatingCount}개
                      </div>
                    </div>
                  </div>
                </div>
              `,
            })

            marker.addListener("click", () => {
              skipIdleRef.current = true
              if (isMounted) {
                setSelectedSpot(spot)
                infoWindow.open(map, marker)
                setTimeout(() => {
                    skipIdleRef.current = false
                }, 3000);
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
          currentMarkers = touristSpots.map((spot) => {
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
                setSelectedSpot(spot)
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
              markers: currentMarkers,
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
    if (touristSpots) {
      updateMarkers()
    }
    return () => {
      isMounted = false
      // 컴포넌트 언마운트 시 마커들 정리
      currentMarkers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [map, currentZoom, touristSpots])

  return (
    <div className="min-h-screen bg-gray-50" data-oid="40:159g">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-oid="z:6:hb5">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="3bgu825"
        >
          <div
            className="flex justify-between items-center py-4"
            data-oid="r__89_v"
          >
            <div data-oid="olosgs1">
              <h1
                className="text-2xl font-bold text-gray-900"
                data-oid="nu33e.e"
              >
                관광지 지도
              </h1>
              <p className="text-sm text-gray-600 mt-1" data-oid="jm0221v">
                줌 레벨에 따라 클러스터 또는 개별 마커로 표시됩니다
              </p>
            </div>
            <div className="text-right" data-oid="xl5tjco">
              <div className="text-sm text-gray-600" data-oid="8fu_o2n">
                줌 레벨: {currentZoom}
              </div>
              <div className="text-sm text-gray-600" data-oid="kakz.sc">
                표시 모드:{" "}
                {currentZoom >= CLUSTER_ZOOM_THRESHOLD
                  ? "개별 마커"
                  : "클러스터"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        data-oid="3cqknut"
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          data-oid="efbzwn_"
        >
          {/* 지도 */}
          <div className="lg:col-span-3" data-oid="t1qpqs:">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              data-oid="xlhc73_"
            >
              <div className="p-4 border-b" data-oid="x53nu.4">
                <div
                  className="flex justify-between items-center"
                  data-oid="48ywl-."
                >
                  <h2
                    className="text-lg font-semibold text-gray-900"
                    data-oid="s.u1vd:"
                  >
                    전국 관광지 지도
                  </h2>
                  <div className="text-sm text-gray-600" data-oid="9kj5d5l">
                    총 {touristSpot1s?.length}개 관광지
                  </div>
                </div>
              </div>
              <div className="relative" data-oid=".9jgy-7">
                {isLoading && (
                  <div
                    className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10"
                    data-oid="ldhqhkd"
                  >
                    <div className="text-center" data-oid="8j2ur26">
                      <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                        data-oid="n1-2-ro"
                      ></div>
                      <p className="mt-4 text-gray-600" data-oid="wwf0m.7">
                        지도를 로드하는 중...
                      </p>
                    </div>
                  </div>
                )}
                <div
                  ref={mapRef}
                  className="w-full h-96 lg:h-[700px]"
                  data-oid="4ar3au4"
                />
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6" data-oid="3l177.5">
            {/* 줌 컨트롤 안내 */}
            <div
              className="bg-white rounded-lg shadow-lg p-6"
              data-oid="-it_6ll"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                data-oid="hyefs-i"
              >
                표시 모드
              </h3>
              <div className="space-y-3" data-oid="o:c7vfx">
                <div
                  className={`p-3 rounded-lg border ${currentZoom < CLUSTER_ZOOM_THRESHOLD ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  data-oid="ev8ic_v"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="evbhy6n"
                  >
                    <span className="font-medium" data-oid="ap802jy">
                      클러스터 모드
                    </span>
                    <span className="text-sm text-gray-600" data-oid="yvgwmeb">
                      줌 &lt; {CLUSTER_ZOOM_THRESHOLD}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1" data-oid="qriws_n">
                    관광지들을 그룹으로 묶어서 표시
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${currentZoom >= CLUSTER_ZOOM_THRESHOLD ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  data-oid="4a:axot"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="6k8ldvz"
                  >
                    <span className="font-medium" data-oid="vbd-3es">
                      개별 마커
                    </span>
                    <span className="text-sm text-gray-600" data-oid="9wl0i17">
                      줌 ≥ {CLUSTER_ZOOM_THRESHOLD}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1" data-oid="pabknz9">
                    각 관광지를 개별 마커로 표시
                  </p>
                </div>
              </div>
            </div>

            {/* 카테고리 범례 */}
            {/* <div
              className="bg-white rounded-lg shadow-lg p-6"
              data-oid="998.-79"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                data-oid="1pw_4l:"
              >
                카테고리 범례
              </h3>
              <div className="grid grid-cols-1 gap-2" data-oid="qqnotmt">
                {Array.from(
                  new Set(touristSpots.map((spot) => spot.category)),
                ).map((category) => (
                  <div
                    key={category}
                    className="flex items-center"
                    data-oid="0b5_trf"
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{
                        backgroundColor: getCategoryColor(category),
                      }}
                      data-oid="yhtn6fq"
                    ></div>
                    <span className="text-sm text-gray-700" data-oid="oc:ip:q">
                      {category}
                    </span>
                    <span
                      className="ml-auto text-xs text-gray-500"
                      data-oid="0l5npi_"
                    >
                      {
                        touristSpots.filter(
                          (spot) => spot.category === category,
                        ).length
                      }
                      개
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* 선택된 관광지 정보 */}
            {selectedSpot && (
              <div
                className="bg-white rounded-lg shadow-lg p-6"
                data-oid="6l.cj9z"
              >
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                  data-oid="n-ry92-"
                >
                  선택된 관광지
                </h3>
                <div className="space-y-3" data-oid="q4eb94o">
                  <div data-oid="-ewd10-">
                    <h4
                      className="font-medium text-gray-900"
                      data-oid="8ydqo:9"
                    >
                      {selectedSpot.name}
                    </h4>
                    <p
                      className="text-sm text-gray-600 mt-1"
                      data-oid="e2ln4iw"
                    >
                      {selectedSpot.description}
                    </p>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="vb2cppa"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getCategoryColor(
                          selectedSpot.category,
                        ),
                      }}
                      data-oid="zdw2chi"
                    ></span>
                    <span className="text-sm text-gray-700" data-oid="-bjw_l0">
                      {selectedSpot.category}
                    </span>
                    <span
                      className="text-sm text-yellow-600"
                      data-oid="7j.-i8z"
                    >
                      ★ {selectedSpot.rating}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (map) {
                        map.setCenter({
                          lat: selectedSpot.lat,
                          lng: selectedSpot.lng,
                        })
                        map.setZoom(15)
                      }
                    }}
                    className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    data-oid="y94-p5l"
                  >
                    위치로 이동
                  </button>
                </div>
              </div>
            )}

            {/* 사용 안내 */}
            <div
              className="bg-blue-50 border border-blue-200 rounded-lg p-6"
              data-oid="w66ezja"
            >
              <h3
                className="text-sm font-medium text-blue-800 mb-2"
                data-oid="c1lpa1k"
              >
                사용 방법
              </h3>
              <div
                className="text-sm text-blue-700 space-y-1"
                data-oid="itwlzsb"
              >
                <p data-oid="omdl.d6">• 지도를 확대/축소하여 표시 모드 변경</p>
                <p data-oid="e5_9v7.">• 클러스터 클릭시 해당 지역으로 확대</p>
                <p data-oid="jm33piu">• 개별 마커 클릭시 상세 정보 확인</p>
                <p data-oid="5lpcx:x">
                  • 줌 레벨 {CLUSTER_ZOOM_THRESHOLD} 이상에서 개별 마커 표시
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
