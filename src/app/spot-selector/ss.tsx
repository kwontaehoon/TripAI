"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Users,
  ArrowRight,
  Plus,
  Check,
  X,
  Filter,
  Navigation,
} from "lucide-react"
import { useGooglePlaceTextMutation } from "@/hooks/springboot/dev"
import { google_place_selector_textSearch } from "@/common/google/textSearch"
import Image from "next/image"
import { location_types } from "@/util/google_nearby_api/location_types"

interface TouristSpot {
  id: number
  name: string
  category: string
  rating: number
  reviewCount: number
  estimatedTime: string
  description: string
  tags: string[]
  distance?: string
  isSelected: boolean
  price?: string
}

export default function SpotSelectorPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpots, setSelectedSpots] = useState<TouristSpot[]>([])
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState("전체")

  const {
    mutateAsync: textSearchMutation,
    data: textSearchData,
    isSuccess,
  } = useGooglePlaceTextMutation()
  console.log("textSearchData: ", textSearchData, isSuccess)

  // 샘플 관광지 데이터 (더 많은 데이터로 확장)
  const sampleSpots: TouristSpot[] = [
    {
      id: 1,
      name: "성산일출봉",
      category: "자연명소",
      rating: 4.8,
      reviewCount: 2847,
      estimatedTime: "2-3시간",
      description: "제주도의 대표적인 일출 명소로 유네스코 세계자연유산",
      tags: ["일출", "등반", "자연"],
      distance: "12km",
      price: "무료",
      isSelected: false,
    },
    {
      id: 2,
      name: "한라산 국립공원",
      category: "자연명소",
      rating: 4.7,
      reviewCount: 1923,
      estimatedTime: "4-6시간",
      description: "제주도 최고봉으로 다양한 등반 코스 제공",
      tags: ["등반", "자연", "국립공원"],
      distance: "25km",
      price: "무료",
      isSelected: false,
    },
    {
      id: 3,
      name: "제주 동문시장",
      category: "쇼핑/시장",
      rating: 4.5,
      reviewCount: 1456,
      estimatedTime: "1-2시간",
      description: "제주 전통시장에서 맛보는 다양한 로컬 음식",
      tags: ["맛집", "쇼핑", "전통시장"],
      distance: "5km",
      price: "개별결제",
      isSelected: false,
    },
    {
      id: 4,
      name: "우도",
      category: "자연명소",
      rating: 4.9,
      reviewCount: 3241,
      estimatedTime: "반나절",
      description: "에메랄드빛 바다와 아름다운 해안선을 자랑하는 섬",
      tags: ["바다", "섬", "자전거"],
      distance: "15km",
      price: "5,500원",
      isSelected: false,
    },
    {
      id: 5,
      name: "제주 신화월드",
      category: "테마파크",
      rating: 4.6,
      reviewCount: 892,
      estimatedTime: "하루종일",
      description: "가족과 함께 즐길 수 있는 대형 테마파크",
      tags: ["가족", "놀이기구", "테마파크"],
      distance: "18km",
      price: "59,000원",
      isSelected: false,
    },
    {
      id: 6,
      name: "천지연폭포",
      category: "자연명소",
      rating: 4.4,
      reviewCount: 1678,
      estimatedTime: "1시간",
      description: "제주도 3대 폭포 중 하나로 야간 조명이 아름다운 곳",
      tags: ["폭포", "자연", "야경"],
      distance: "8km",
      price: "무료",
      isSelected: false,
    },
    {
      id: 7,
      name: "제주 아쿠아플라넷",
      category: "테마파크",
      rating: 4.3,
      reviewCount: 2156,
      estimatedTime: "3-4시간",
      description: "아시아 최대 규모의 수족관",
      tags: ["수족관", "가족", "실내"],
      distance: "10km",
      price: "38,000원",
      isSelected: false,
    },
    {
      id: 8,
      name: "섭지코지",
      category: "자연명소",
      rating: 4.6,
      reviewCount: 1834,
      estimatedTime: "1-2시간",
      description: "드라마 촬영지로 유명한 아름다운 해안절벽",
      tags: ["해안", "드라마촬영지", "산책"],
      distance: "14km",
      price: "무료",
      isSelected: false,
    },
    {
      id: 9,
      name: "제주 민속촌",
      category: "문화/역사",
      rating: 4.2,
      reviewCount: 967,
      estimatedTime: "2-3시간",
      description: "제주 전통 문화를 체험할 수 있는 민속촌",
      tags: ["전통문화", "체험", "교육"],
      distance: "20km",
      price: "15,000원",
      isSelected: false,
    },
    {
      id: 10,
      name: "제주 올레시장",
      category: "쇼핑/시장",
      rating: 4.4,
      reviewCount: 1245,
      estimatedTime: "1-2시간",
      description: "제주 대표 전통시장으로 다양한 특산품 판매",
      tags: ["시장", "특산품", "쇼핑"],
      distance: "3km",
      price: "개별결제",
      isSelected: false,
    },
  ]

  const categories = ["전체", "자연명소", "쇼핑/시장", "테마파크", "문화/역사"]

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false)
    }
  }, [textSearchData])

  useEffect(() => {
    setTimeout(() => {
      textSearchMutation(google_place_selector_textSearch("김포 관광지"))
      setTouristSpots(sampleSpots)
    }, 800)
  }, [])

  // 검색 실행
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      textSearchMutation(google_place_selector_textSearch("김포 관광지"))
      setTouristSpots(sampleSpots)
    }, 800)
  }

  // 관광지 선택/해제
  const toggleSpotSelection = (spotId: number) => {
    setTouristSpots((prev) =>
      prev.map((spot) =>
        spot.id === spotId ? { ...spot, isSelected: !spot.isSelected } : spot,
      ),
    )

    const spot = touristSpots.find((s) => s.id === spotId)
    if (spot) {
      if (spot.isSelected) {
        setSelectedSpots((prev) => prev.filter((s) => s.id !== spotId))
      } else {
        setSelectedSpots((prev) => [...prev, { ...spot, isSelected: true }])
      }
    }
  }

  // 필터링된 관광지 목록
  const filteredSpots = touristSpots.filter((spot) => {
    const categoryMatch =
      filterCategory === "전체" || spot.category === filterCategory
    return categoryMatch
  })

  // 코스 만들기
  const handleCreateCourse = () => {
    if (selectedSpots.length === 0) {
      alert("최소 1개 이상의 관광지를 선택해주세요.")
      return
    }

    const spotIds = selectedSpots.map((spot) => spot.id).join(",")
    router.push(
      `/courses/create?spots=${spotIds}&destination=${encodeURIComponent(searchQuery)}`,
    )
  }

  // 전체 선택/해제
  const handleSelectAll = () => {
    const allSelected = filteredSpots.every((spot) => spot.isSelected)

    if (allSelected) {
      // 전체 해제
      setTouristSpots((prev) =>
        prev.map((spot) => ({ ...spot, isSelected: false })),
      )
      setSelectedSpots([])
    } else {
      // 전체 선택
      setTouristSpots((prev) =>
        prev.map((spot) => ({ ...spot, isSelected: true })),
      )
      setSelectedSpots(
        filteredSpots.map((spot) => ({ ...spot, isSelected: true })),
      )
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 my-28"
      data-oid=":vnnvdd"
    >
      <div className="container mx-auto px-4 py-8" data-oid="fk7h9bz">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8" data-oid="ijqasr:">
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-oid="0mknxv8"
          >
            관광지 선택하기
          </h1>
          <p className="text-gray-600 text-lg" data-oid="-65wy:0">
            원하는 관광지를 선택하여 나만의 여행 코스를 만들어보세요
          </p>
        </div>

        {/* 검색 섹션 */}
        <div className="max-w-2xl mx-auto mb-8" data-oid="76y--wd">
          <div
            className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
            data-oid="-l5xv6n"
          >
            <div
              className="flex-1 flex items-center space-x-3 px-4"
              data-oid="jk0i0q-"
            >
              <Search className="w-5 h-5 text-gray-400" data-oid="yobw:ur" />
              <input
                type="text"
                placeholder="여행지를 입력하세요 (예: 제주도, 서울, 부산)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                data-oid="3l:ei6g"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-oid="sl.e.aj"
            >
              {isLoading ? "검색중..." : "검색"}
            </button>
          </div>
        </div>

        {/* 컨트롤 바 */}
        {textSearchData !== undefined && (
          <div className="max-w-6xl mx-auto mb-6" data-oid="ybfxx-r">
            <div
              className="bg-white rounded-2xl shadow-lg border !border-gray-200 p-4"
              data-oid="j3.xb:b"
            >
              <div
                className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
                data-oid="u-j:-0:"
              >
                {/* 왼쪽: 카테고리 필터 */}
                <div className="flex items-center space-x-2" data-oid="x:xjv3r">
                  <Filter
                    className="w-4 h-4 text-gray-500"
                    data-oid="pzanoa1"
                  />
                  <div className="flex flex-wrap gap-2" data-oid="o3ikq3-">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          filterCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        data-oid="x2uovod"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 오른쪽: 선택 정보 및 버튼 */}
                <div className="flex items-center space-x-4" data-oid="ha.hcwb">
                  <span className="text-sm text-gray-600" data-oid="sba.3of">
                    {selectedSpots.length}개 선택됨
                  </span>
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    data-oid="z3xygu1"
                  >
                    {filteredSpots.every((spot) => spot.isSelected)
                      ? "전체 해제"
                      : "전체 선택"}
                  </button>
                  {selectedSpots.length > 0 && (
                    <button
                      onClick={handleCreateCourse}
                      className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                      data-oid="7cz96ar"
                    >
                      <Plus className="w-4 h-4" data-oid="lqsbx0y" />
                      <span data-oid="at9trrj">코스 만들기</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 관광지 목록 */}
        <div className="max-w-6xl mx-auto" data-oid="4gcg5ib">
          {isLoading ? (
            <div className="text-center py-12" data-oid="99q6wdr">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 !border-blue-600 mx-auto mb-4"
                data-oid="3jnpjhd"
              ></div>
              <p className="text-gray-600" data-oid="j7lc89a">
                관광지 정보를 불러오는 중...
              </p>
            </div>
          ) : textSearchData === undefined ? (
            <div className="text-center py-12" data-oid="pq2n_wh">
              <MapPin
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                data-oid="ld.t2-1"
              />

              <h3
                className="text-xl font-semibold text-gray-600 mb-2"
                data-oid="uspe53d"
              >
                관광지를 검색해보세요
              </h3>
              <p className="text-gray-500" data-oid="ec0p:o:">
                여행하고 싶은 지역을 검색하면 추천 관광지를 보여드립니다
              </p>
            </div>
          ) : (
            <div
              className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
              data-oid="ubry..o"
            >
              {/* 테이블 헤더 */}
              <div
                className="bg-gray-50 px-6 py-4 border-b !border-gray-200"
                data-oid="fmkba9l"
              >
                <div
                  className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700"
                  data-oid="fmckxke"
                >
                  <div className="col-span-1 text-center" data-oid="d8ormi_">
                    선택
                  </div>
                  <div className="col-span-4" data-oid="qfavqhl">
                    관광지 정보
                  </div>
                  <div className="col-span-2 text-center" data-oid="nk7m70j">
                    평점/리뷰
                  </div>
                  <div className="col-span-2 text-center" data-oid="ny0a_yv">
                    영업시간
                  </div>
                  <div className="col-span-2 text-center" data-oid="i9qphlv">
                    주소
                  </div>
                  <div className="col-span-1 text-center" data-oid="n3n4r5-">
                    상세
                  </div>
                </div>
              </div>

              {/* 테이블 바디 */}
              <div className="divide-y divide-gray-200" data-oid="6mdnkwo">
                {textSearchData.places.map((spot, index) => (
                  <div
                    key={spot.id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                      spot.isSelected
                        ? "bg-blue-50 border-l-4 !border-l-blue-500"
                        : ""
                    }`}
                    data-oid="ocr0pn2"
                  >
                    <div
                      className="grid grid-cols-12 gap-4 items-center"
                      data-oid="u4kovq."
                    >
                      {/* 선택 체크박스 */}
                      <div
                        className="col-span-1 text-center justify-center flex"
                        data-oid="qza2z8u"
                      >
                        <button
                          onClick={() => toggleSpotSelection(spot.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            spot.isSelected
                              ? "bg-blue-600 !border-blue-600"
                              : "!border-gray-300 hover:!border-blue-400"
                          }`}
                          data-oid="noz9_t_"
                        >
                          {spot.isSelected && (
                            <Check
                              className="w-4 h-4 text-white"
                              data-oid="kt3nuhg"
                            />
                          )}
                        </button>
                      </div>

                      {/* 관광지 정보 */}
                      <div className="col-span-4" data-oid="7dadj6g">
                        <div
                          className="flex items-start space-x-3"
                          data-oid="m2erfl9"
                        >
                          <div
                            className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"
                            data-oid="k3dq1tq"
                          >
                            <Image
                              src={`https://places.googleapis.com/v1/${spot.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyA3AZyCseHRzXSmKLz3ALwEN-NAyohUJo8`}
                              alt={spot.displayName}
                              width={64}
                              height={64}
                              style={{
                                width: "auto",
                                height: "100%",
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0" data-oid="o.hcre1">
                            <h3
                              className="font-semibold text-gray-900 mb-1"
                              data-oid="dmyq:sp"
                            >
                              {spot.displayName.text}
                            </h3>
                            <p
                              className="text-sm text-gray-600 line-clamp-2 mb-2"
                              data-oid="zxlh-v-"
                            >
                              {spot.description}
                            </p>
                            <div
                              className="flex flex-wrap gap-1"
                              data-oid="55hy46."
                            >
                              <span
                                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                                data-oid="b9:a9bb"
                              >
                                {location_types(spot.types[0])}
                              </span>
                              {spot.types.slice(1, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                                  data-oid="ga1j:t."
                                >
                                  #{location_types(tag)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 평점/리뷰 */}
                      <div
                        className="col-span-2 text-center"
                        data-oid="99lbdnr"
                      >
                        <div
                          className="flex items-center justify-center space-x-1 mb-1"
                          data-oid="gg57fmu"
                        >
                          <Star
                            className="w-4 h-4 text-yellow-400 fill-current"
                            data-oid="v35t67k"
                          />

                          <span
                            className="text-sm text-gray-900"
                            data-oid="nqhz5gt"
                          >
                            {spot.rating} ({spot.userRatingCount})
                          </span>
                        </div>
                      </div>

                      {/* 영업시간 */}
                      <div
                        className="col-span-2 text-center"
                        data-oid="og4v3i0"
                      >
                        <div
                          className="flex items-center justify-center space-x-1 text-gray-700"
                          data-oid="myerpr:"
                        >
                          <span className="text-xs" data-oid="01gfrr_">
                            {!spot?.currentOpeningHours ? (
                              <div>-</div>
                            ) : (
                              spot?.currentOpeningHours?.weekdayDescriptions.map(
                                (weekday) => <div key={weekday}>{weekday}</div>,
                              )
                            )}
                          </span>
                        </div>
                      </div>

                      {/* 거리/요금 */}
                      <div
                        className="col-span-2 text-center"
                        data-oid="nyhr2pr"
                      >
                        <div className="space-y-1" data-oid="5s:lwsq">
                          <div
                            className="text-xs font-medium text-gray-900"
                            data-oid="u7fe:.s"
                          >
                            {spot.shortFormattedAddress}
                          </div>
                        </div>
                      </div>

                      {/* 상세 버튼 */}
                      <div
                        className="col-span-1 text-center"
                        data-oid="v4:m.z8"
                      >
                        <button
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          data-oid="_6xf-si"
                        >
                          <ArrowRight className="w-4 h-4" data-oid="yydd0.q" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 하단 고정 버튼 (모바일) */}
        {selectedSpots.length > 0 && (
          <div
            className="fixed bottom-0 left-0 right-0 bg-white border-t !border-gray-200 p-4 md:hidden z-50"
            data-oid="o6gz22e"
          >
            <button
              onClick={handleCreateCourse}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
              data-oid="d.azaz."
            >
              <Plus className="w-5 h-5" data-oid="vmpj4__" />
              <span data-oid="8aglj93">
                선택한 {selectedSpots.length}개 관광지로 코스 만들기
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
