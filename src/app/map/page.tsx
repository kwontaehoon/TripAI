'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader } from '@googlemaps/js-api-loader';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Star,
    Users,
    Calendar,
    Bot,
    Route,
    Navigation,
    Car,
    Sparkles,
    Zap,
    ChevronRight,
} from 'lucide-react';
import { useCourseDetailsQuery } from '@/hooks/supabase/dev';
import { comma } from '@/util/comma';
import { useAtom } from 'jotai';
import { loadingModalAtom } from '@/store/ai';

interface Place {
    id: number;
    name: string;
    type: string;
    address: string;
    duration: string;
    description: string;
    lat: number;
    lng: number;
    rating: number;
    reviews: number;
    openTime?: string;
    entryFee?: string;
    aiReason: string;
    tips: string[];
}

interface DaySchedule {
    day: number;
    title: string;
    places: Place[];
}

interface Course {
    id: number;
    title: string;
    subtitle: string;
    duration: string;
    rating: number;
    reviews: number;
    participants: string;
    tags: string[];
    difficulty: string;
    totalDistance: string;
    highlights: string[];
    description: string;
    estimatedCost: string;
    schedule: DaySchedule[];
}

export default function MapPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('courseId');
    const router = useRouter();
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer | null>(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [loadingAtom, setLoadingAtom] = useAtom(loadingModalAtom)

    const { data: mapData, isLoading } = useCourseDetailsQuery(id)
    console.log("mapData: ", mapData)

    // 커스텀 마커 생성 함수
    const createCustomMarker = (number: number, color: string) => {
        const markerDiv = document.createElement('div');
        markerDiv.className = 'custom-marker';
        markerDiv.innerHTML = `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        position: relative;
      ">
        ${number}
      </div>
    `;
        return markerDiv;
    };

    // 경로 표시 함수
    const displayRoute = async (mapInstance: google.maps.Map, places: Place[]) => {
        if (places.length < 2) return;

        try {
            const directionsService = new google.maps.DirectionsService();
            const renderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#3b82f6',
                    strokeWeight: 5,
                    strokeOpacity: 0.8,
                },
            });

            renderer.setMap(mapInstance);
            setDirectionsRenderer(renderer);

            const origin = { lat: places[0].latitude, lng: places[0].longitude };
            const destination = {
                lat: places[places.length - 1].latitude,
                lng: places[places.length - 1].longitude,
            };
            const waypoints = places
                .slice(1, -1)
                .slice(0, 8)
                .map((place) => ({
                    location: { lat: place.latitude, lng: place.longitude },
                    stopover: true,
                }));

            const request: google.maps.DirectionsRequest = {
                origin,
                destination,
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                optimizeWaypoints: true,
            };

            directionsService.route(request, (result, status) => {
                displaySimplePolyline(mapInstance, places);
                if (status === 'OK' && result) {
                    renderer.setDirections(result);
                } else {
                    console.error('경로를 찾을 수 없습니다:', status);
                    
                }
            });
        } catch (error) {
            console.error('경로 표시 중 오류:', error);
            displaySimplePolyline(mapInstance, places);
        }
    };

    // 단순 직선 경로 표시 (백업용)
    const displaySimplePolyline = (mapInstance: google.maps.Map, places: Place[]) => {
        const path = places.map((place) => ({ lat: place.latitude, lng: place.longitude }));

        const polyline = new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            icons: [
                {
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 4,
                        strokeColor: '#3b82f6',
                    },
                    offset: '100%',
                    repeat: '150px',
                },
            ],
        });

        polyline.setMap(mapInstance);
    };

    useEffect(() => {
        setLoadingAtom({isOpen: true, message: "코스를 불러오고 있습니다..."})
        const courseId = searchParams.get('courseId');
        if (courseId) {
            const selectedCourse = mapData;
            if (selectedCourse) {
                setCourse(selectedCourse);
                setLoadingAtom({isOpen: false, message: ""})
            }
            if(courseId === "ai-course"){
                setCourse(JSON.parse(localStorage.getItem("aiList")))
            }
        }
    }, [mapData]);

    useEffect(() => {
        const initMap = async () => {
            try {
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
                    version: 'weekly',
                    libraries: ['places', 'marker'],
                });

                const { Map } = await loader.importLibrary('maps');
                const { AdvancedMarkerElement } = await loader.importLibrary('marker');

                if (mapRef.current) {
                    const mapInstance = new Map(mapRef.current, {
                        center: { lat: 33.4996, lng: 126.5312 },
                        zoom: 10,
                        mapId: 'DEMO_MAP_ID',
                        styles: [
                            {
                                featureType: 'poi',
                                elementType: 'labels',
                                stylers: [{ visibility: 'off' }],
                            },
                        ],
                    });

                    setMap(mapInstance);

                    if (course) {
                        const currentDaySchedule = course[0].course_days.find(
                            (schedule) => schedule.day === selectedDay,
                        );
                        if (currentDaySchedule) {
                            displayDayMarkers(
                                mapInstance,
                                currentDaySchedule.course_places,
                                AdvancedMarkerElement,
                            );
                        }
                    }
                }
            } catch (err) {
                console.error('Error loading Google Maps:', err);
                setError('지도를 로드하는 중 오류가 발생했습니다.');
            } finally {
                setMapLoading(false);
            }
        };

        initMap();
    }, [course, selectedDay]);

    const displayDayMarkers = (
        mapInstance: google.maps.Map,
        places: Place[],
        AdvancedMarkerElement: any,
    ) => {
        // 기존 마커들 제거
        markers.forEach((marker) => {
            marker.map = null;
        });

        // 기존 경로 제거
        if (directionsRenderer) {
            directionsRenderer.setMap(null);
        }

        const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
        const infoWindow = new google.maps.InfoWindow();

        places.forEach((place, index) => {
            const markerColor =
                index === 0 ? '#22c55e' : index === places.length - 1 ? '#ef4444' : '#3b82f6';

            const marker = new AdvancedMarkerElement({
                map: mapInstance,
                position: { lat: place.latitude, lng: place.longitude },
                title: place.name,
                content: createCustomMarker(index + 1, markerColor),
            });

            marker.addListener('click', () => {
                setSelectedPlace(place);
                infoWindow.setContent(`
          <div class="p-4 max-w-sm">
            <div class="flex items-center mb-3">
              <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium mr-2">
                ${index + 1}번째
              </span>
              <span class="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                ${place.location_type}
              </span>
            </div>
            <h3 class="font-bold text-lg mb-2">${place.name}</h3>
            <p class="text-sm text-gray-600 mb-3">${place.description}</p>
            <div class="flex items-center mb-2">
              <span class="text-yellow-500 mr-1">★</span>
              <span class="text-sm">${place.rating_count} (${place.review_count})</span>
            </div>
            <div class="text-xs text-gray-500 mb-3">⏱️ 체류시간: ${place.stay}</div>
            <div class="bg-blue-50 p-2 rounded text-xs text-blue-600">
              <strong>AI 추천:</strong> ${place.recommend_reason}
            </div>
          </div>
        `);
                infoWindow.open(mapInstance, marker);

                mapInstance.setCenter({ lat: place?.latitude, lng: place?.longitude });
                mapInstance.setZoom(15);
            });

            newMarkers.push(marker);
        });

        setMarkers(newMarkers);

        // 경로 표시
        if (places.length > 1) {
            displayRoute(mapInstance, places);
        }

        // 모든 마커가 보이도록 지도 범위 조정
        if (places.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                bounds.extend({ lat: place?.latitude, lng: place?.longitude });
            });
            mapInstance.fitBounds(bounds);
        }
    };

    const handlePlaceClick = (place: Place) => {
        if (map) {
            map.setCenter({ lat: place?.latitude, lng: place?.longitude });
            map.setZoom(15);
            setSelectedPlace(place);
        }
    };

    const handleDayChange = (day: number) => {
        setSelectedDay(day);
        setSelectedPlace(null);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">지도 로드 실패</h2>
                    <p className="text-gray-600">{error}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Google Maps API 키가 설정되어 있는지 확인해주세요.
                    </p>
                </div>
            </div>
        );
    }

    if (!course || loadingAtom.isOpen) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                {/* <div className="text-center">
                    <div className="text-gray-400 text-xl mb-4">📍</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        코스를 찾을 수 없습니다
                    </h2>
                    <p className="text-gray-600 mb-4">올바른 코스 ID를 확인해주세요.</p>
                    <button
                        onClick={() => router.push('/courses')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        코스 목록으로 돌아가기
                    </button>
                </div> */}
            </div>
        );
    }

    const currentDaySchedule = course[0].course_days.find((day) => day.day === selectedDay);

    return isLoading ? <></> : (
        <div className="min-h-screen bg-gray-50 py-28">
            <div className="block lg:flex h-full lg:h-[calc(100vh-81px)]">
                {/* Map Section */}
                <div className="flex-1 w-full h-[500px] lg:h-full relative">
                    {mapLoading && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                            <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 !border-blue-600 border-t-transparent mx-auto mb-4"></div>
                                <p className="text-gray-600 font-medium">지도를 로드하는 중...</p>
                            </div>
                        </div>
                    )}

                    <div ref={mapRef} className="w-full h-full" />

                    {/* Map Controls */}
                    {/* <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 z-20">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                            <Navigation className="w-4 h-4 mr-2 text-blue-600" />
                            지도 컨트롤
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    if (map && currentDaySchedule) {
                                        const bounds = new google.maps.LatLngBounds();
                                        currentDaySchedule.places.forEach((place) => {
                                            bounds.extend({ lat: place.lat, lng: place.lng });
                                        });
                                        map.fitBounds(bounds);
                                    }
                                }}
                                className="w-full px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                전체 일정 보기
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.geolocation && map) {
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                const pos = {
                                                    lat: position.coords.latitude,
                                                    lng: position.coords.longitude,
                                                };
                                                map.setCenter(pos);
                                                map.setZoom(15);
                                            },
                                            () => {
                                                alert('현재 위치를 가져올 수 없습니다.');
                                            },
                                        );
                                    }
                                }}
                                className="w-full px-3 py-2 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                현재 위치로
                            </button>
                        </div>
                    </div> */}

                    {/* Legend */}
                    <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 z-20">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                            범례
                        </h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                                    1
                                </div>
                                <span className="font-medium">출발지</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                                    2
                                </div>
                                <span className="font-medium">중간 경유지</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-red-500 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                                    N
                                </div>
                                <span className="font-medium">도착지</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-1 bg-blue-500 rounded-full mr-3"></div>
                                <span className="font-medium">이동 경로</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="w-full lg:w-96 bg-white border-l !border-gray-200 overflow-y-auto">
                    <div className="p-6">
                        {/* Course Info */}
                        <div className="mb-6">
                            <div className="flex items-center mb-3">
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                    AI 추천
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{course[0].title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{course[0].subtitle}</p>

                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {course[0].duration}
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    {course[0].participants}
                                </div>
                                <div className="flex items-center">
                                    <Route className="w-4 h-4 mr-2" />
                                    {course[0].total_distance}
                                </div>
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    {course[0].rating} ({course[0].likes})
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-blue-600">
                                    {comma(course[0].total_cost, true)}
                                </span>
                                <button
                                    onClick={() => router.push(`/courses/details/${course[0].id}`)}
                                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                                >
                                    상세보기
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* Day Selector */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">일정 선택</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {course[0].course_days.map((schedule) => (
                                    <button
                                        key={schedule.day}
                                        onClick={() => handleDayChange(schedule.day)}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                                            selectedDay === schedule.day
                                                ? '!border-blue-500 bg-blue-50 text-blue-700'
                                                : '!border-gray-200 hover:!border-gray-300 text-gray-700'
                                        }`}
                                    >
                                        Day {schedule.day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Day Schedule */}
                        {currentDaySchedule && (
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        Day {currentDaySchedule.day}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {currentDaySchedule.title}
                                    </p>
                                </div>

                                {/* Places List */}
                                <div className="space-y-4">
                                    {currentDaySchedule.course_places.map((place, index) => (
                                        <div
                                            key={place.id}
                                            onClick={() => handlePlaceClick(place)}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                                selectedPlace?.id === place.id
                                                    ? '!border-blue-500 bg-blue-50'
                                                    : '!border-gray-200 hover:!border-gray-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-center mb-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold ${
                                                        index === 0
                                                            ? 'bg-green-500'
                                                            : index ===
                                                                currentDaySchedule.course_places.length - 1
                                                              ? 'bg-red-500'
                                                              : 'bg-blue-500'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900">
                                                        {place.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        {place.location_type}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                                        {place.rating_count}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {place.stay}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3 ml-11">
                                                {place.description}
                                            </p>

                                            {/* AI 추천 이유 */}
                                            <div className="ml-11 bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Sparkles className="w-3 h-3 text-blue-600" />
                                                    <span className="text-xs font-bold text-blue-700">
                                                        AI 추천 이유
                                                    </span>
                                                </div>
                                                <p className="text-xs text-blue-600 leading-relaxed">
                                                    {place.recommend_reason}
                                                </p>
                                            </div>

                                            {/* 여행 팁 */}
                                            {place.place_tips && place.place_tips.length > 0 && (
                                                <div className="ml-11 bg-yellow-50 border !border-yellow-200 rounded-lg p-3">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Zap className="w-3 h-3 text-yellow-600" />
                                                        <span className="text-xs font-bold text-yellow-700">
                                                            여행 팁
                                                        </span>
                                                    </div>
                                                    <ul className="text-xs text-yellow-600 space-y-1">
                                                        {place.place_tips.map((tip, tipIndex) => (
                                                            <li
                                                                key={tipIndex}
                                                                className="flex items-start"
                                                            >
                                                                <span className="mr-2 mt-1 w-1 h-1 bg-yellow-500 rounded-full flex-shrink-0"></span>
                                                                <span className="leading-relaxed">
                                                                    {tip.tip}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
