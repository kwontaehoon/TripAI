"use client"

import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
  Star,
  Users,
  Tag,
  DollarSign,
  X,
  Navigation,
  List,
  Map,
  LayoutDashboard,
  Route,
  Sparkles,
  ArrowRight,
  Filter,
  CalendarDays,
  UtensilsCrossed,
  Building2,
} from "lucide-react"
import { location_types } from "@/util/google_nearby_api/location_types"
import {
  useMapDashboard,
  TouristSpot,
  TravelFilters,
  PlaylistItem,
  CLUSTER_ZOOM_THRESHOLD,
} from "./useMapDashboard"

// 작은 드래그 가능한 관광지 카드
const DraggableSpotCard = ({ spot }: { spot: TouristSpot }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "spot",
    item: () => ({ spot }),
    collect: (monitor) => ({
      isDragging: monitor.canDrag(),
    }),
  }), [spot])

  return (
    <div
      ref={drag}
      className={`group bg-white rounded-lg border !border-gray-200 cursor-move transition-all hover:shadow-md hover:!border-blue-300 flex-shrink-0 ${
        isDragging ? "opacity-50 shadow-lg scale-105" : ""
      }`}
    >
      <div className="p-3 h-full flex flex-col justify-between">
        <div className="flex-1 min-h-0">
          <h4 className="font-medium group-hover:text-blue-600 transition-colors text-sm truncate">
            {spot.displayName.text}
          </h4>
          <p className="text-xs mb-3">{spot.formattedAddress}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="text-xs font-medium text-gray-700">5 (853개)</span>
          </div>
          <div className="flex gap-1">
            <div></div>
            {spot.types.slice(0, 1).map((category, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
              >
                {location_types(category)}
              </span>
            ))}
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

// 플레이리스트 아이템
const PlaylistItemCard = ({
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
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
        >
          <X className="w-4 h-4" />
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
    >
      {children}
    </div>
  )
}

// 여행 필터 컴포넌트
const TravelFilterBar = ({
  filters,
  setFilters,
  isFixed,
}: {
  filters: TravelFilters
  setFilters: (filters: TravelFilters) => void
  isFixed: boolean
}) => {
  const getBudgetLabel = (value: string) => {
    switch (value) {
      case "low":
        return "10만원 이하"
      case "medium":
        return "10-30만원"
      case "high":
        return "30-50만원"
      case "luxury":
        return "50만원 이상"
      default:
        return value
    }
  }

  const getPeriodLabel = (value: string) => {
    switch (value) {
      case "1day":
        return "당일치기"
      case "2-3days":
        return "1박 2일 ~ 2박 3일"
      case "4-7days":
        return "3박 4일 ~ 1주일"
      case "1week+":
        return "1주일 이상"
      default:
        return value
    }
  }

  const getPeopleLabel = (value: string) => {
    switch (value) {
      case "solo":
        return "혼자 (1명)"
      case "couple":
        return "커플 (2명)"
      case "small-group":
        return "소그룹 (3-5명)"
      case "large-group":
        return "대그룹 (6명 이상)"
      default:
        return value
    }
  }

  return (
    <div
      className={`${isFixed ? "fixed top-0 left-0 right-0 z-50 opacity-100" : "relative"} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-white rounded-2xl shadow border !border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 여행 기간 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <CalendarDays className="w-4 h-4 text-blue-500" />

                <span>여행 기간</span>
              </label>
              <select
                required
                value={filters.period}
                onChange={(e) =>
                  setFilters({ ...filters, period: e.target.value })
                }
                className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">선택해주세요</option>
                <option value="당일치기">당일치기</option>
                <option value="1박 2일">1박 2일</option>
                <option value="2박 3일">2박 3일</option>
                <option value="3박 4일">3박 4일</option>
                <option value="일주일 이상">일주일 이상</option>
              </select>
            </div>

            {/* 인원수 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>인원수</span>
              </label>
              <select
                value={filters.numberOfPeople}
                onChange={(e) =>
                  setFilters({ ...filters, numberOfPeople: e.target.value })
                }
                className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">선택해주세요</option>
                <option value="혼자">혼자 (1명)</option>
                <option value="커플">커플 (2명)</option>
                <option value="3~5명">소그룹 (3-5명)</option>
                <option value="6명 이상">대그룹 (6명 이상)</option>
              </select>
            </div>

            {/* 테마 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 text-purple-500" />
                <span>테마</span>
              </label>
              <select
                value={filters.theme}
                onChange={(e) =>
                  setFilters({ ...filters, theme: e.target.value })
                }
                className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">선택해주세요</option>
                <option value="역사">역사</option>
                <option value="문화">문화</option>
                <option value="자연">자연</option>
                <option value="쇼핑">쇼핑</option>
                <option value="해변">해변</option>
                <option value="랜드마크">랜드마크</option>
                <option value="야경">야경</option>
                <option value="클럽">클럽</option>
                <option value="예술">예술</option>
              </select>
            </div>

            {/* 예산 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-orange-500" />

                <span>예산</span>
              </label>
              <select
                value={filters.budget}
                onChange={(e) =>
                  setFilters({ ...filters, budget: e.target.value })
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

          {/* 활성 필터 칩들 */}
          {(filters.period ||
            filters.numberOfPeople ||
            filters.theme ||
            filters.budget) && (
            <div className="mt-4 pt-4 border-t !border-gray-200">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700">
                  활성 필터:
                </span>
                {filters.period && (
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <span>기간: {getPeriodLabel(filters.period)}</span>
                    <button
                      onClick={() => setFilters({ ...filters, period: "" })}
                      className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.numberOfPeople && (
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <span>인원: {getPeopleLabel(filters.numberOfPeople)}</span>
                    <button
                      onClick={() =>
                        setFilters({ ...filters, numberOfPeople: "" })
                      }
                      className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.theme && (
                  <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    <span>테마: {filters.theme}</span>
                    <button
                      onClick={() => setFilters({ ...filters, theme: "" })}
                      className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.budget && (
                  <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    <span>예산: {getBudgetLabel(filters.budget)}</span>
                    <button
                      onClick={() => setFilters({ ...filters, budget: "" })}
                      className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 필터 초기화 */}
          {(filters.period ||
            filters.numberOfPeople ||
            filters.theme ||
            filters.budget) && (
            <div className="flex justify-end mt-4 pt-4 border-t !border-gray-200">
              <button
                onClick={() =>
                  setFilters({
                    period: "",
                    numberOfPeople: "",
                    theme: "",
                    budget: "",
                  })
                }
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>모든 필터 초기화</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PageContent() {
  const {
    mapRef,
    placeType,
    setPlaceType,
    currentZoom,
    isLoading,
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
    clearPlaylist,
    generateCourse,
  } = useMapDashboard()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28">
        {/* Filter Bar - 스크롤 시 고정 */}
        <div>
          <TravelFilterBar
            filters={travelFilters}
            setFilters={setTravelFilters}
            isFixed={false}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Main Layout */}
          <div className="md:grid grid-cols-12 gap-8 min-h-[600px]">
            {/* Left Side - Map */}
            <div className="col-span-7">
              <div className="bg-white rounded-3xl shadow-2xl border !border-gray-200 md:h-full h-[400px] overflow-hidden">
                <div className="p-6 border-b !border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Map className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          인터랙티브 지도
                        </h2>
                        <p className="text-sm text-gray-600">
                          관광지를 클릭해서 상세 정보를 확인하세요
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        줌 레벨: {currentZoom}
                      </div>
                      <div className="text-xs text-gray-600">
                        {currentZoom >= CLUSTER_ZOOM_THRESHOLD
                          ? "개별 마커"
                          : "클러스터 모드"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-full">
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 !border-blue-600 border-t-transparent mx-auto"></div>
                        <p className="mt-4 text-gray-600 font-medium">
                          지도를 불러오는 중...
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={mapRef} className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Right Side - List & Dashboard */}
            <div className="col-span-5 block md:flex md:flex-col md:space-y-6 md:mt-0 mt-8 md:space-x-0">
              {/* Tourist Spots List - 작은 카드들 */}
              <div className="bg-white rounded-2xl shadow-lg border !border-gray-200 md:h-[40vh] h-[500px] flex flex-col w-full">
                <div className="p-4 border-b !border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <List className="w-4 h-4 text-blue-600" />

                      <h3 className="text-base font-semibold text-gray-900">
                        {placeType ? "맛집 목록" : "관광지 목록"}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-600">
                      {nearBydata?.places?.length || 0}개
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {nearBydata?.places?.map((spot, index) => (
                      <DraggableSpotCard key={index} spot={spot} />
                    ))}
                  </div>
                  {!nearBydata && (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="h-[100px] bg-gray-100 rounded-lg border !border-gray-200 animate-pulse"
                        >
                          <div className="p-3 h-full flex flex-col justify-between">
                            <div className="flex-1 min-h-0">
                              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-8"></div>
                              </div>
                              <div className="h-5 bg-gray-200 rounded w-12"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Playlist Dashboard - 더 긴 높이 */}
              <div className="bg-white rounded-2xl shadow-lg border mt-8 md:mt-0 !border-gray-200 h-[500px] md:h-[40vh] flex-col md:w-full md:flex">
                <div className="p-4 border-b !border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <LayoutDashboard className="w-4 h-4 text-purple-600" />

                      <h3 className="text-base font-semibold text-gray-900">
                        나의 여행 코스
                      </h3>
                    </div>
                    {myPlaylists.length > 0 && (
                      <button
                        onClick={clearPlaylist}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        전체 삭제
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {myPlaylists.length}개 관광지 선택됨
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <PlaylistDropZone onDrop={addToPlaylist}>
                    {myPlaylists.length === 0 ? (
                      <div className="p-5 text-center text-gray-500">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Route className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          여행 코스를 만들어보세요
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          관광지 카드를 드래그해서 여기에 놓거나
                        </p>
                        <p className="text-xs text-gray-500">
                          지도에서 선택해서 추가하세요
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 space-y-3">
                        {myPlaylists.map((item, index) => (
                          <PlaylistItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            onRemove={removeFromPlaylist}
                          />
                        ))}
                      </div>
                    )}
                  </PlaylistDropZone>
                </div>

                {/* Action Buttons */}
                {myPlaylists.length > 0 && (
                  <div className="p-4 border-t !border-gray-200 space-y-2">
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
            </div>
          </div>
        </div>
        {/* Fixed Toggle Buttons - Bottom Right */}
        <div className="fixed bottom-6 right-6 z-50 w-40">
          <div className="bg-white rounded-2xl shadow-2xl border !border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Filter className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                표시 설정
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowTouristSpots(!showTouristSpots)
                  setShowRestaurants(false)
                  setPlaceType(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  showTouristSpots
                    ? "bg-blue-100 text-blue-700 border !border-blue-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2 mr-2">
                  <Building2 className="w-4 h-4" />
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  showRestaurants
                    ? "bg-orange-100 text-orange-700 border !border-orange-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2 mr-2">
                  <UtensilsCrossed className="w-4 h-4" />
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

            <div className="mt-3 pt-3 border-t !border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                {showTouristSpots
                  ? "관광지만 표시"
                  : showRestaurants
                    ? "맛집만 표시"
                    : "숨김"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageContent />
    </DndProvider>
  )
}
