"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Clock,
  Star,
  Users,
  ArrowRight,
  Bot,
  Sparkles,
  Send,
  Mic,
  Calendar,
  Car,
  Filter,
  SlidersHorizontal,
  Heart,
  Share2,
} from "lucide-react"

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [sortBy, setSortBy] = useState("인기순")
  const [destination, setDestination] = useState("")

  useEffect(() => {
    const dest = searchParams.get("destination")
    if (dest) {
      setDestination(dest)
      setSearchQuery(dest)
    }
  }, [searchParams])

  const filters = [
    "전체",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
  ]
  const sortOptions = ["인기순", "평점순", "최신순", "가격순"]

  // 제주도 여행 코스 리스트
  const travelCourses = [
    {
      id: 1,
      title: "제주도 3박 4일 완벽 가족여행 코스",
      subtitle: "아이들과 함께하는 제주 대표 명소 투어",
      duration: "3박 4일",
      rating: 4.9,
      reviews: 234,
      participants: "2-6명",
      tags: ["가족여행", "자연", "맛집", "체험"],
      difficulty: "쉬움",
      totalDistance: "245km",
      highlights: ["성산일출봉", "한라산", "협재해수욕장", "동문시장"],
      description:
        "AI가 추천하는 제주도 가족여행 최적 코스입니다. 아이들과 함께 즐길 수 있는 명소들과 체험 활동을 포함했습니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 11,
      estimatedCost: "₩320,000",
    },
    {
      id: 2,
      title: "제주도 로맨틱 커플 2박 3일",
      subtitle: "연인과 함께하는 감성 제주 여행",
      duration: "2박 3일",
      rating: 4.8,
      reviews: 189,
      participants: "2명",
      tags: ["커플여행", "로맨틱", "카페", "야경"],
      difficulty: "쉬움",
      totalDistance: "180km",
      highlights: ["섭지코지", "우도", "카페거리", "한라산 야경"],
      description:
        "연인과 함께하는 제주의 낭만적인 명소들을 담은 특별한 코스입니다. 감성 카페와 아름다운 일몰 명소를 포함했습니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 8,
      estimatedCost: "₩250,000",
    },
    {
      id: 3,
      title: "제주도 힐링 혼자 여행 1박 2일",
      subtitle: "나만의 시간을 위한 제주 힐링 코스",
      duration: "1박 2일",
      rating: 4.7,
      reviews: 156,
      participants: "1명",
      tags: ["혼자여행", "힐링", "자연", "명상"],
      difficulty: "쉬움",
      totalDistance: "120km",
      highlights: ["곽지해수욕장", "카멜리아힐", "오설록", "한라산"],
      description:
        "혼자만의 시간을 온전히 즐길 수 있는 제주 힐링 코스입니다. 자연 속에서 마음의 평화를 찾아보세요.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 6,
      estimatedCost: "₩180,000",
    },
    {
      id: 4,
      title: "제주도 친구들과 액티비티 3박 4일",
      subtitle: "스릴 넘치는 제주 모험 여행",
      duration: "3박 4일",
      rating: 4.6,
      reviews: 98,
      participants: "3-8명",
      tags: ["친구여행", "액티비티", "모험", "체험"],
      difficulty: "보통",
      totalDistance: "280km",
      highlights: ["패러글라이딩", "스쿠버다이빙", "ATV", "승마체험"],
      description:
        "친구들과 함께 즐기는 스릴 넘치는 제주 액티비티 코스입니다. 다양한 모험과 체험이 가득합니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 12,
      estimatedCost: "₩450,000",
    },
    {
      id: 5,
      title: "제주도 맛집 투어 당일치기",
      subtitle: "제주 대표 맛집만 골라 담은 미식 여행",
      duration: "당일치기",
      rating: 4.8,
      reviews: 167,
      participants: "2-4명",
      tags: ["당일치기", "맛집", "미식", "전통"],
      difficulty: "쉬움",
      totalDistance: "80km",
      highlights: ["흑돼지 맛집", "해산물 시장", "감귤 농장", "전통차 체험"],
      description:
        "제주의 대표 맛집들만 엄선한 미식 투어 코스입니다. 현지인이 추천하는 숨은 맛집까지 포함했습니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 5,
      estimatedCost: "₩120,000",
    },
    {
      id: 6,
      title: "제주도 문화유산 탐방 2박 3일",
      subtitle: "제주의 역사와 문화를 만나는 여행",
      duration: "2박 3일",
      rating: 4.5,
      reviews: 134,
      participants: "2-6명",
      tags: ["문화", "역사", "전통", "교육"],
      difficulty: "쉬움",
      totalDistance: "200km",
      highlights: ["성산일출봉", "만장굴", "돌하르방", "해녀박물관"],
      description:
        "제주의 독특한 문화유산과 역사를 체험할 수 있는 교육적인 여행 코스입니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 9,
      estimatedCost: "₩280,000",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?destination=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/details/${courseId}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-100 text-green-700"
      case "보통":
        return "bg-yellow-100 text-yellow-700"
      case "어려움":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredCourses = travelCourses.filter((course) => {
    if (selectedFilter === "전체") return true
    return course.tags.includes(selectedFilter)
  })

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="bp56e8:"
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4" data-oid="p6td_a4">
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="zaif.8u"
        >
          {/* Left Column - Course List */}
          <div className="lg:col-span-2" data-oid="3f361k.">
            {/* Search Section */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
              data-oid="9ac6nh0"
            >
              <div className="relative z-10" data-oid="9yquav6">
                <div
                  className="flex items-center space-x-2 mb-4"
                  data-oid="i4a-d.u"
                >
                  <Sparkles
                    className="w-6 h-6 text-blue-600"
                    data-oid="iqcx_lx"
                  />

                  <span
                    className="text-sm font-medium text-gray-600"
                    data-oid="b8-ytx8"
                  >
                    AI 여행 코스 검색
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="txe4m1p"
                >
                  {destination || "여행지"} 추천 코스
                </h2>
                <p className="text-gray-600 mb-6" data-oid="jjj90y3">
                  AI가 엄선한 {destination || "여행지"} 최고의 여행 코스들을
                  만나보세요
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} data-oid="uxt:hh3">
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
                    data-oid="1u.jo5e"
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-4"
                      data-oid="jjxdduf"
                    >
                      <Search
                        className="w-5 h-5 text-gray-400"
                        data-oid="7y16e0c"
                      />

                      <input
                        type="text"
                        placeholder="다른 여행지를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                        data-oid="hrodp9f"
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      data-oid="9ddg2:b"
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                        data-oid="o8k:x48"
                      >
                        <Mic className="w-5 h-5" data-oid="lk_z-fg" />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        data-oid="hphh66o"
                      >
                        <Send className="w-5 h-5" data-oid="3ietwc7" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
                data-oid="gq22gy0"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
                data-oid="htei2t2"
              ></div>
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
              data-oid="595qrls"
            >
              <div className="flex items-center space-x-2" data-oid="p6v1kmm">
                <Filter className="w-5 h-5 text-gray-500" data-oid="c:v_977" />
                <div className="flex flex-wrap gap-2" data-oid="0geb6ny">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200"
                      }`}
                      data-oid="bnghslu"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="195gc-o">
                <SlidersHorizontal
                  className="w-5 h-5 text-gray-500"
                  data-oid="ls5ig7r"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border !border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid="35km4ec"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option} data-oid="c66iu:8">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-6" data-oid="r0qbuqm">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                  data-oid="mc17bzh"
                >
                  <div className="md:flex" data-oid="n0okxto">
                    {/* Image */}
                    <div className="md:w-1/3" data-oid="j0d:6-e">
                      <div
                        className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                        data-oid="-8470dr"
                      >
                        <div
                          className="absolute top-4 left-4"
                          data-oid="h6-0_oq"
                        >
                          <span
                            className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                            data-oid="gj80mk_"
                          >
                            AI 추천
                          </span>
                        </div>
                        <div
                          className="absolute top-4 right-4 flex space-x-2"
                          data-oid="mlx8-ft"
                        >
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                            data-oid="9ppg2aj"
                          >
                            <Heart
                              className="w-4 h-4 text-gray-600"
                              data-oid="jyne4yd"
                            />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                            data-oid="2rhy7:7"
                          >
                            <Share2
                              className="w-4 h-4 text-gray-600"
                              data-oid="yr7p9hu"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6" data-oid="0gwpsnf">
                      <div
                        className="flex items-start justify-between mb-3"
                        data-oid="30gzrb6"
                      >
                        <div className="flex-1" data-oid="j0w7dqw">
                          <h3
                            className="text-xl font-bold text-gray-900 mb-1"
                            data-oid="s6:c3xb"
                          >
                            {course.title}
                          </h3>
                          <p
                            className="text-gray-600 text-sm"
                            data-oid="0sb8r3j"
                          >
                            {course.subtitle}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}
                          data-oid="-pd028x"
                        >
                          {course.difficulty}
                        </span>
                      </div>

                      <p
                        className="text-gray-600 mb-4 line-clamp-2"
                        data-oid="f-nhw22"
                      >
                        {course.description}
                      </p>

                      {/* Course Info */}
                      <div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm"
                        data-oid="5g_y:84"
                      >
                        <div
                          className="flex items-center text-gray-600"
                          data-oid=":u24l_s"
                        >
                          <Calendar
                            className="w-4 h-4 mr-1"
                            data-oid="hprmlo4"
                          />

                          <span data-oid="07:7_rf">{course.duration}</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="dlb7_td"
                        >
                          <Users className="w-4 h-4 mr-1" data-oid="ks5_bme" />

                          <span data-oid="ep:-xxe">{course.participants}</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="8aytff3"
                        >
                          <MapPin className="w-4 h-4 mr-1" data-oid="5:c3ao:" />

                          <span data-oid="0yxumys">{course.places}개 장소</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="mow0u52"
                        >
                          <Car className="w-4 h-4 mr-1" data-oid="ogfr54e" />

                          <span data-oid="hreqngf">{course.totalDistance}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div
                        className="flex flex-wrap gap-2 mb-4"
                        data-oid="64wm59a"
                      >
                        {course.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs"
                            data-oid="v-8y:al"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="mb-4" data-oid="21b2n9s">
                        <h4
                          className="text-sm font-semibold text-gray-900 mb-2"
                          data-oid="z-:rum."
                        >
                          주요 명소
                        </h4>
                        <div
                          className="flex flex-wrap gap-1"
                          data-oid="idilg5w"
                        >
                          {course.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="text-xs text-gray-600"
                              data-oid="6ib44xu"
                            >
                              {highlight}
                              {index < course.highlights.length - 1 && " • "}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div
                        className="flex items-center justify-between"
                        data-oid="s.o:409"
                      >
                        <div
                          className="flex items-center space-x-4"
                          data-oid="ssicyv5"
                        >
                          <div className="flex items-center" data-oid="vhxyxtw">
                            <Star
                              className="w-4 h-4 text-yellow-400 mr-1"
                              data-oid="i:wskb6"
                            />

                            <span
                              className="text-sm font-semibold"
                              data-oid="5krlute"
                            >
                              {course.rating}
                            </span>
                            <span
                              className="text-sm text-gray-500 ml-1"
                              data-oid="f::lxx3"
                            >
                              ({course.reviews})
                            </span>
                          </div>
                          <span
                            className="text-lg font-bold text-blue-600"
                            data-oid="k_2:9hi"
                          >
                            {course.estimatedCost}
                          </span>
                        </div>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                          data-oid="m1f2xs."
                        >
                          상세보기
                          <ArrowRight
                            className="w-4 h-4 ml-1"
                            data-oid="dseklef"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6" data-oid="yv.39vi">
            {/* Popular Destinations */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="2g.p29p"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid=":4wyf:c"
              >
                인기 여행지
              </h3>
              <div className="space-y-3" data-oid="aiira4w">
                {["제주도", "서울", "부산", "강릉", "경주"].map(
                  (dest, index) => (
                    <button
                      key={dest}
                      onClick={() =>
                        router.push(
                          `/courses?destination=${encodeURIComponent(dest)}`,
                        )
                      }
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        destination === dest
                          ? "bg-blue-50 border !border-blue-200 text-blue-700"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                      data-oid="cu7r335"
                    >
                      <div className="font-medium" data-oid="evmnw78">
                        {dest}
                      </div>
                      <div className="text-sm opacity-75" data-oid="wlo-e42">
                        {/* {Math.floor(Math.random() * 50) + 20}개 코스 */}
                      </div>
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Course Stats */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="3e5:0._"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="u_.fyr_"
              >
                코스 통계
              </h3>
              <div className="space-y-4" data-oid="1.9v897">
                <div
                  className="flex justify-between items-center"
                  data-oid="x10azxp"
                >
                  <span className="text-sm text-gray-600" data-oid="fjimw3q">
                    총 코스 수
                  </span>
                  <span className="font-bold text-blue-600" data-oid="1hrabd3">
                    {filteredCourses.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="1a80pps"
                >
                  <span className="text-sm text-gray-600" data-oid="5m1pafu">
                    평균 평점
                  </span>
                  <span
                    className="font-bold text-yellow-600"
                    data-oid="r35hra."
                  >
                    4.7
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="dustxjv"
                >
                  <span className="text-sm text-gray-600" data-oid="0tuh49w">
                    평균 기간
                  </span>
                  <span className="font-bold text-green-600" data-oid="cxthnox">
                    2.5일
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="jwhf8b0"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="6u8rxle"
              >
                빠른 필터
              </h3>
              <div className="space-y-2" data-oid="jhzur2g">
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="agx7odp"
                >
                  ⭐ 평점 4.5 이상
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="s84h5ae"
                >
                  💰 20만원 이하
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="c.p8nb9"
                >
                  📅 당일치기
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="84inbe1"
                >
                  👨‍👩‍👧‍👦 가족 추천
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
