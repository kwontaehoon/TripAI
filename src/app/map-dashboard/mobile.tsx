"use client"

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
  DollarSign,
} from "lucide-react"
import { location_types } from "@/util/google_nearby_api/location_types"
import { useState } from "react"
import { useMapDashboard, PlaylistItem, TouristSpot } from "./useMapDashboard"

const Mobile = () => {
  // 탭 상태
  const [activeTab, setActiveTab] = useState<"filters" | "places" | "course">(
    "filters",
  )

  const {
    mapRef,
    setPlaceType,
    nearBydata,
    showTouristSpots,
    setShowTouristSpots,
    showRestaurants,
    setShowRestaurants,
    travelFilters,
    setTravelFilters,
    myPlaylists,
    isAllFilled,
    addToPlaylist,
    removeFromPlaylist,
    generateCourse,
  } = useMapDashboard()

  const MAP_HEIGHT = "calc(50vh)"

  const MobilePlaylistItem = ({
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
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {item.spot.displayName.text}
              </h4>
              <p className="text-xs">{item.spot.formattedAddress}</p>
              <div className="flex items-center mt-1 space-x-2">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-sm text-gray-600">5 (853개)</span>
                <div className="flex gap-1">
                  {item.spot.types.slice(0, 1).map((category, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
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
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const MobileDraggableSpotCard = ({ spot }: { spot: TouristSpot }) => {
    return (
      <div className={`bg-white rounded-lg border !border-gray-200`}>
        <div className="px-4 py-3 h-full flex flex-col justify-between">
          <div className="flex-1 min-h-0">
            <h4 className="font-medium transition-colors text-sm truncate">
              {spot.displayName.text}
            </h4>
            <p className="text-xs mb-3">{spot.formattedAddress}</p>
          </div>

          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              <span className="text-xs font-medium text-gray-700">
                5 (853개)
              </span>
            </div>
            <div className="flex gap-1 ml-2 flex-1">
              {spot.types.slice(0, 2).map((category, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
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

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <Navigation className="w-3 h-3 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      <div className="fixed left-0 top-0 w-full" style={{ height: MAP_HEIGHT }}>
        <div ref={mapRef} className="w-full h-full" />
      </div>
      <div className="absolute left-0 top-1/2 w-full h-[50vh] flex flex-col">
        <div className="flex flex-col bg-white h-full">
          {/* Tab Navigation */}
          <div className="flex border-b !border-gray-200 flex-1">
            <button
              onClick={() => setActiveTab("filters")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 text-xs font-medium transition-colors ${
                activeTab === "filters"
                  ? "text-blue-600 border-b-2 !border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>여행 필터</span>
            </button>
            <button
              onClick={() => setActiveTab("places")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 text-xs font-medium transition-colors ${
                activeTab === "places"
                  ? "text-blue-600 border-b-2 !border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <List className="w-4 h-4" />
              <span>장소 목록</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
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
            >
              <Route className="w-4 h-4" />
              <span>나의 코스</span>
              {myPlaylists.length > 0 && (
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                  {myPlaylists.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col h-full">
            {/* 여행 필터 탭 */}
            {activeTab === "filters" && (
              <div className="p-4 space-y-4">
                {/* 여행 기간 */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <CalendarDays className="w-4 h-4 text-blue-500" />

                    <span>여행 기간</span>
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
                  >
                    <option value="">전체</option>
                    <option value="1day">당일치기</option>
                    <option value="2-3days">1박 2일 ~ 2박 3일</option>
                    <option value="4-7days">3박 4일 ~ 1주일</option>
                    <option value="1week+">1주일 이상</option>
                  </select>
                </div>

                {/* 인원수 */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 text-green-500" />

                    <span>인원수</span>
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
                  >
                    <option value="">전체</option>
                    <option value="solo">혼자 (1명)</option>
                    <option value="couple">커플 (2명)</option>
                    <option value="small-group">소그룹 (3-5명)</option>
                    <option value="large-group">대그룹 (6명 이상)</option>
                  </select>
                </div>

                {/* 테마 */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 text-purple-500" />

                    <span>테마</span>
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
                  >
                    <option value="">전체</option>
                    <option value="역사">역사</option>
                    <option value="문화">문화</option>
                    <option value="자연">자연</option>
                    <option value="쇼핑">쇼핑</option>
                    <option value="한식">한식</option>
                    <option value="해산물">해산물</option>
                  </select>
                </div>
                {/* 예산 */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />

                    <span>예산</span>
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
                  >
                    <option value="">선택해주세요</option>
                    <option value="10만원 이하">10만원 이하</option>
                    <option value="10~30만원">10-30만원</option>
                    <option value="30~50만원">30-50만원</option>
                    <option value="50만원 이상">50만원 이상</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "places" && (
              <div className="overflow-y-scroll flex-1">
                {nearBydata?.places?.map((spot, index) => (
                  <MobileDraggableSpotCard key={index} spot={spot} />
                ))}
              </div>
            )}

            {/* 나의 여행 코스 탭 */}
            {activeTab === "course" && (
              <div className="flex flex-col h-full">
                <div className="">
                  {myPlaylists.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Route className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        여행 코스를 만들어보세요
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        장소 목록에서 카드를 드래그하거나
                      </p>
                      <p className="text-xs text-gray-500">
                        지도에서 선택해서 추가하세요
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 overflow-y-scroll h-52 space-y-2">
                      {myPlaylists.map((item, index) => (
                        <MobilePlaylistItem
                          key={index}
                          item={item}
                          index={index}
                          onRemove={removeFromPlaylist}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {myPlaylists.length > 0 && (
                  <div className="p-4 border-t !border-gray-200 space-y-3 flex-1 flex flex-col justify-end">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{myPlaylists.length}개 장소 선택됨</span>
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
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>AI 코스 생성하기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed top-16 left-0 z-50">
        <div className="p-2">
          <div className="flex w-h-center space-x-1 text-xs">
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
            >
              <div className="flex items-center mr-1 whitespace-nowrap">
                <span>관광지</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  showTouristSpots
                    ? "!border-blue-500 bg-blue-500"
                    : "!border-gray-400"
                }`}
              >
                {showTouristSpots && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
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
            >
              <div className="flex items-center mr-1 whitespace-nowrap">
                <span>맛집</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  showRestaurants
                    ? "!border-orange-500 bg-orange-500"
                    : "!border-gray-400"
                }`}
              >
                {showRestaurants && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mobile
