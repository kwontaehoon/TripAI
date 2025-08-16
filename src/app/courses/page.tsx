"use client"

import Card from "@/common/card/courses_card"
import { useCoursesQuery } from "@/hooks/supabase/dev"
import {
  Filter,
  Mic,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Skeleton from "./skeleton"

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [quickedFilter, setQuickedFilter] = useState("")
  const [sortBy, setSortBy] = useState("인기순")
  const [destination, setDestination] = useState("")
  const [avg, setAvg] = useState({
    rating: 1,
    period: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filteredCourses, setFilteredCourses] = useState([])

  const { data: coursesData } = useCoursesQuery()

  useEffect(() => {
    const dest = searchParams.get("destination")

    if (dest) {
      setDestination(dest)
      setSearchQuery(dest)
    }
  }, [searchParams])

  useEffect(() => {
    if (!coursesData?.length) return

    setAvg({
      rating:
        coursesData.reduce((sum, course) => sum + course.rating, 0) /
        coursesData.length,
      period:
        coursesData.reduce(
          (sum, course) => sum + course.course_days.length,
          0,
        ) / coursesData.length,
    })

    const filtered = coursesData.filter((course) => {
      const matchTag =
        selectedFilter === "전체" ||
        course.course_tags.some((tag) => tag.tag === selectedFilter)
      const matchesSearch =
        !searchQuery ||
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchQuick =
        quickedFilter.trim() === quickFilter[0]
          ? course.rating >= 4.5
          : quickedFilter.trim() === quickFilter[1]
            ? course.total_cost <= 200000
            : quickedFilter.trim() === quickedFilter[2]
              ? course.title?.toLowerCase().includes("김포".toLowerCase()) ||
                course.subtitle?.toLowerCase().includes("김포".toLowerCase()) ||
                course.description?.toLowerCase().includes("김포".toLowerCase())
              : true

      return matchTag && matchesSearch && matchQuick
    })

    let isCanceled = false

    const finishFiltering = async () => {
      setFilteredCourses(filtered)

      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!isCanceled && isLoading) {
        setIsLoading(false)
      }
    }

    finishFiltering()

    return () => {
      isCanceled = true
    }
  }, [selectedFilter, searchQuery, coursesData, quickedFilter])

  const filters = [
    "전체",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
  ]
  const quickFilter = ["⭐ 평점 4.5 이상", "💰 20만원 이하", "🔥 이번 주 인기"]
  const sortOptions = ["인기순", "평점순", "최신순", "가격순"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return isLoading ? (
    <Skeleton />
  ) : (
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

            <Card
              filteredCourses={filteredCourses}
              setSelectedFilter={setSelectedFilter}
              setQuickedFilter={setQuickedFilter}
            />
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
                {["김포", "서울", "부산", "강릉", "경주"].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      if (searchQuery === dest) {
                        setSearchQuery("")
                        setSelectedFilter("전체")
                        setDestination("")
                        router.push("/courses")
                      } else {
                        router.push(
                          `/courses?destination=${encodeURIComponent(dest)}`,
                        )
                      }
                    }}
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
                ))}
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
                    {coursesData.length}개
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
                    {avg.rating.toFixed(1)}
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
                    {avg.period.toFixed(1)}일
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
                {quickFilter.map((filter) => {
                  return (
                    <button
                      key={filter}
                      onClick={() => {
                        if (quickedFilter === filter) {
                          setQuickedFilter("")
                        } else setQuickedFilter(filter)
                      }}
                      className={`w-full text-left p-3 text-sm text-gray-600 rounded-lg transition-colors
                      ${
                        quickedFilter === filter
                          ? "bg-blue-50 border !border-blue-200 text-blue-700"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                      data-oid="agx7odp"
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
