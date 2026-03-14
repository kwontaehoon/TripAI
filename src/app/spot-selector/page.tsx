"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Users,
  Camera,
  ArrowRight,
  Plus,
  Check,
  X,
  Filter,
  Heart,
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useGooglePlaceTextMutation } from "@/hooks/springboot/queries"
import { google_place_selector_textSearch } from "@/common/google/textSearch"
import { location_types } from "@/util/google_nearby_api/location_types"
import Image from "next/image"

interface TouristSpot {
  id: number
  name: string
  category: string
  rating: number
  reviewCount: number
  estimatedTime: string
  description: string
  image: string
  tags: string[]
  distance?: string
  isSelected: boolean
}

export default function SpotSelectorPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpots, setSelectedSpots] = useState<TouristSpot[]>([])
  console.log("selectedSpots: ", selectedSpots)
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState("전체")
  const [sortBy, setSortBy] = useState("인기순")
  const [isExpanded, setIsExpanded] = useState<boolean[]>([])
  console.log("isExpanded: ", isExpanded)

  const {
    mutateAsync: textSearchMutation,
    data: textSearchData,
    isSuccess,
  } = useGooglePlaceTextMutation()
  console.log("textSearchData: ", textSearchData)

  const categories = [
    "전체",
    "자연명소",
    "쇼핑/시장",
    "테마파크",
    "문화/역사",
    "맛집",
  ]
  const sortOptions = ["인기순", "평점순", "거리순", "소요시간순"]

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsLoading(false)
  //   }
  // }, [textSearchData])

  // useEffect(() => {
  //   setTimeout(() => {
  //     textSearchMutation(google_place_selector_textSearch("김포 관광지"))
  //     setIsExpanded(new Array(textSearchData.places.length).fill(false))
  //   }, 800)
  // }, [])

  // 검색 실행
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // 실제로는 API 호출
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // 관광지 선택/해제
  const toggleSpotSelection = (spot: object) => {
    const flag = selectedSpots.find((selectSpot) => selectSpot.id === spot.id)
    if (flag) {
      const deletedSpot = selectedSpots.filter(
        (selectSpot) => selectSpot.id !== spot.id,
      )
      setSelectedSpots(deletedSpot)
    } else setSelectedSpots((prev) => [...prev, spot])
  }

  // 필터링된 관광지 목록
  // const filteredSpots = touristSpots.filter((spot) => {
  //   const categoryMatch =
  //     filterCategory === "전체" || spot.category === filterCategory
  //   return categoryMatch
  // })

  // 정렬된 관광지 목록
  // const sortedSpots = [...filteredSpots].sort((a, b) => {
  //   switch (sortBy) {
  //     case "평점순":
  //       return b.rating - a.rating
  //     case "거리순":
  //       return parseInt(a.distance || "0") - parseInt(b.distance || "0")
  //     case "소요시간순":
  //       return a.estimatedTime.localeCompare(b.estimatedTime)
  //     default: // 인기순
  //       return b.reviewCount - a.reviewCount
  //   }
  // })

  // 코스 만들기
  const handleCreateCourse = () => {
    if (selectedSpots.length === 0) {
      alert("최소 1개 이상의 관광지를 선택해주세요.")
      return
    }

    // 선택된 관광지 정보를 쿼리 파라미터로 전달하여 코스 생성 페이지로 이동
    const spotIds = selectedSpots.map((spot) => spot.id).join(",")
    router.push(
      `/courses/create?spots=${spotIds}&destination=${encodeURIComponent(searchQuery)}`,
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
           
          >
            관광지 선택하기
          </h1>
          <p className="text-gray-600 text-lg">
            원하는 관광지를 선택하여 나만의 여행 코스를 만들어보세요
          </p>
        </div>

        {/* 검색 섹션 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div
            className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
           
          >
            <div
              className="flex-1 flex items-center space-x-3 px-4"
             
            >
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="여행지를 입력하세요 (예: 제주도, 서울, 부산)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
               
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
             
            >
              {isLoading ? "검색중..." : "검색"}
            </button>
          </div>
        </div>

        {/* 선택된 관광지 요약 */}
        {selectedSpots.length > 0 && (
          <div className="max-w-6xl mx-auto mb-6">
            <div
              className="bg-white rounded-2xl shadow-lg border !border-gray-200 p-6"
             
            >
              <div
                className="flex items-center justify-between mb-4"
               
              >
                <h3
                  className="text-lg font-semibold text-gray-900"
                 
                >
                  선택된 관광지 ({selectedSpots.length}개)
                </h3>
                <button
                  onClick={handleCreateCourse}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                 
                >
                  <Plus className="w-4 h-4" />
                  <span>코스 만들기</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                   
                  >
                    <span>{spot.displayName.text}</span>
                    <button
                      onClick={() => toggleSpotSelection(spot)}
                      className="text-blue-500 hover:text-blue-700"
                     
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 필터 및 정렬 */}
        {touristSpots.length > 0 && (
          <div className="max-w-6xl mx-auto mb-6">
            <div
              className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
             
            >
              {/* 카테고리 필터 */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  카테고리:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filterCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                     
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 정렬 옵션 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  정렬:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border !border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 관광지 목록 */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 !border-blue-600 mx-auto mb-4"
               
              ></div>
              <p className="text-gray-600">
                관광지 정보를 불러오는 중...
              </p>
            </div>
          ) : textSearchData === undefined ? (
            <div className="text-center py-12">
              <MapPin
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
               
              />

              <h3
                className="text-xl font-semibold text-gray-600 mb-2"
               
              >
                관광지를 검색해보세요
              </h3>
              <p className="text-gray-500">
                여행하고 싶은 지역을 검색하면 추천 관광지를 보여드립니다
              </p>
            </div>
          ) : (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
             
            >
              {textSearchData.places.map((spot, idx) => (
                <div
                  key={spot.id}
                  className={`bg-white rounded-2xl shadow-lg !border-2 transition-all cursor-pointer hover:shadow-xl ${
                    selectedSpots.find(
                      (selectSpot) => selectSpot.id === spot.id,
                    )
                      ? "!border-blue-500 ring-2 ring-blue-200"
                      : "!border-gray-200 hover:!border-blue-300"
                  }`}
                  onClick={() => toggleSpotSelection(spot)}
                 
                >
                  {/* 이미지 섹션 */}
                  <div className="relative">
                    <div
                      className="w-full h-56 bg-gray-200 relative overflow-hidden rounded-t-2xl flex items-center justify-center"
                     
                    >
                      <Image
                        src={`https://places.googleapis.com/v1/${spot.photos[0].name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
                        alt={spot.displayName}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                      />
                    </div>

                    {/* 선택 체크박스 */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedSpots.find(
                            (selectSpot) => selectSpot.id === spot.id,
                          )
                            ? "!bg-blue-600 !border-blue-600"
                            : "!bg-white !border-gray-300"
                        }`}
                       
                      >
                        {selectedSpots.find(
                          (selectSpot) => selectSpot.id === spot.id,
                        ) && (
                          <Check
                            className="w-4 h-4 text-white"
                           
                          />
                        )}
                      </div>
                    </div>

                    {/* 카테고리 태그 */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="bg-black/50 text-white px-2 py-1 rounded-full text-xs"
                       
                      >
                        {location_types(spot.types[0])}
                      </span>
                    </div>
                  </div>

                  {/* 정보 섹션 */}
                  <div className="p-5">
                    <div
                      className="flex items-start justify-between mb-2"
                     
                    >
                      <h3
                        className="text-lg font-semibold text-gray-900 line-clamp-1"
                       
                      >
                        {spot.displayName.text}
                      </h3>
                    </div>

                    <p
                      className="text-gray-600 text-sm mb-1 line-clamp-2"
                     
                    >
                      {spot.description}
                    </p>

                    {/* 평점 및 리뷰 */}
                    <div
                      className="flex items-center space-x-4 mb-3"
                     
                    >
                      <div
                        className="flex items-center space-x-1"
                       
                      >
                        <Star
                          className="w-4 h-4 text-yellow-400 fill-current"
                         
                        />

                        <span
                          className="text-sm font-medium text-gray-900"
                         
                        >
                          {spot.rating} ({spot.userRatingCount})
                        </span>
                      </div>
                    </div>

                    {/* 부가 정보 */}
                    {!spot?.currentOpeningHours ? (
                      ""
                    ) : (
                      <>
                        <div
                          className="flex items-center justify-between text-sm text-gray-500"
                         
                        >
                          <div
                            className="flex items-center space-x-1"
                           
                          >
                            <Clock className="w-4 h-4" />
                            <div>영업시간</div>
                          </div>
                        </div>
                        <div
                          className="text-xs mt-1 h-10 ml-4 overflow-hidden"
                         
                          style={{
                            maskImage:
                              "linear-gradient(to bottom, black 70%, transparent 100%)",
                            WebkitMaskImage:
                              "linear-gradient(to bottom, black 70%, transparent 100%)",
                          }}
                        >
                          {!spot?.currentOpeningHours ? (
                            <div>-</div>
                          ) : (
                            spot?.currentOpeningHours?.weekdayDescriptions.map(
                              (weekday) => <div key={weekday}>{weekday}</div>,
                            )
                          )}
                        </div>

                        {!spot?.currentOpeningHours ? (
                          ""
                        ) : (
                          <div className="relative flex mt-2 mb-3 text-sm items-center text-blue-600 hover:text-blue-800">
                            <div
                              className="flex items-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsExpanded((prevIsExpanded) =>
                                  prevIsExpanded.map((isExpandedItem, index) =>
                                    index === idx
                                      ? !isExpandedItem
                                      : isExpandedItem,
                                  ),
                                )
                              }}
                            >
                              <div>{isExpanded[idx] ? "접기" : "더보기"}</div>
                              {isExpanded[idx] ? (
                                <ChevronUp
                                  className="w-4 h-4"
                                 
                                />
                              ) : (
                                <ChevronDown
                                  className="w-4 h-4"
                                 
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1">
                      {spot.types.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                         
                        >
                          #{location_types(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 고정 버튼 (모바일) */}
        {selectedSpots.length > 0 && (
          <div
            className="fixed bottom-0 left-0 right-0 bg-white border-t !border-gray-200 p-4 md:hidden"
           
          >
            <button
              onClick={handleCreateCourse}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
             
            >
              <Plus className="w-5 h-5" />
              <span>
                선택한 {selectedSpots.length}개 관광지로 코스 만들기
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
