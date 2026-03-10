"use client"

import Card from "@/common/card/search_card"
import {
  Filter,
  Mic,
  Search,
  Send,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import {
  useCoursesAndBoardsQuery,
  usePopularSearchQuery,
} from "@/hooks/supabase/queries"
import Skeletion from "./skeleton"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [sortBy, setSortBy] = useState("관련도순")
  const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const {
    data: coursesAndBoardsData,
    isSuccess,
    isLoading: listLoading,
  } = useCoursesAndBoardsQuery()

  const { data: popularSearch, isLoading: popularSearchLoading } =
    usePopularSearchQuery()

  const filters = [
    "전체",
    "AI 추천",
    "사용자 코스",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
  ]

  const sortOptions = ["관련도순", "최신순", "인기순", "평점순"]
  // const searchTypes = ["전체", "AI 추천 코스", "사용자 코스", "여행지"]

  useEffect(() => {
    setSearchQuery((prev) => (prev !== query ? query : prev))
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue === "") {
      router.push("/search")
    } else router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
  }

  useEffect(() => {
    const currentSearch = JSON.parse(
      localStorage.getItem("currentSearch") || "[]",
    )
    const updatedSearch = currentSearch.filter((item: string) => item !== query)
    updatedSearch.push(query)
    if (updatedSearch.length > 5) {
      updatedSearch.shift()
    }
    localStorage.setItem("currentSearch", JSON.stringify(updatedSearch))
  }, [query])

  useEffect(() => {
    if (!isSuccess) return

    const filtered = coursesAndBoardsData.filter((result) => {
      const matchesFilter =
        selectedFilter === "전체" ||
        (selectedFilter === "AI 추천" && result.type === "ai-course") ||
        (selectedFilter === "사용자 코스" && result.type === "user-post") ||
        (result.course_tags || result.board_tags).some(
          (tag) => tag.tag === selectedFilter,
        )

      const matchesSearch =
        !searchQuery ||
        result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })

    setFilteredData(filtered)
  }, [isSuccess, selectedFilter, searchQuery, coursesAndBoardsData])

  const handleCount = (keyword: string) => {
    if (!popularSearch) {
      return 0
    }

    switch (keyword) {
      case "김포":
        return (
          popularSearch.gimpo_boards_count + popularSearch.gimpo_courses_count
        )
      case "제주":
        return (
          popularSearch.jeju_boards_count + popularSearch.jeju_courses_count
        )
      case "강원도":
        return (
          popularSearch.gangwon_boards_count +
          popularSearch.gangwon_courses_count
        )
      default:
        return 0
    }
  }

  return listLoading || popularSearchLoading ? (
    <Skeletion />
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="hl4bmwd"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
        data-oid="1t5gz7d"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="tizxp16"
        >
          {/* Left Column - Search Results */}
          <div className="lg:col-span-2" data-oid="hvt7eb5">
            {/* Search Section */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="vxhkvn4"
            >
              <div
                className="flex items-center space-x-2 mb-4"
                data-oid="dx5655-"
              >
                <Search
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  data-oid="tgczjcf"
                />

                <h1
                  className="text-lg sm:text-xl font-bold text-gray-900"
                  data-oid="i-jh9v8"
                >
                  검색 결과
                </h1>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-4" data-oid="od3sam2">
                <div
                  className="flex items-center bg-gray-50 rounded-2xl border !border-gray-200 p-2"
                  data-oid="k3ev88z"
                >
                  <div
                    className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                    data-oid="_v00o.-"
                  >
                    <Search
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      data-oid="9-1oby4"
                    />

                    <input
                      type="text"
                      placeholder="여행 코스를 검색해보세요"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base bg-transparent"
                      data-oid="ux5jtjg"
                    />
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid=".ji0t2i"
                  >
                    <button
                      type="button"
                      className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      onClick={() => setIsListening(!isListening)}
                      data-oid="fsbumet"
                    >
                      <Mic
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        data-oid="og6uyxt"
                      />
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                      data-oid="ug2i_uk"
                    >
                      <Send
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        data-oid="vit99o7"
                      />
                    </button>
                  </div>
                </div>
              </form>

              {/* Search Info */}
              {searchQuery && (
                <div className="text-sm text-gray-600" data-oid="53ot0fm">
                  '
                  <span
                    className="font-medium text-gray-900"
                    data-oid="dx3umcr"
                  >
                    {searchValue !== "" ? searchValue : searchQuery}
                  </span>
                  ' 검색 결과 {filteredData.length}개
                </div>
              )}
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
              data-oid="vj8621b"
            >
              <div className="flex items-center space-x-2" data-oid=".rjbu.k">
                <Filter
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="yk7h0k:"
                />

                <div className="flex flex-wrap gap-2" data-oid="l8vomso">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200"
                      }`}
                      data-oid="9_p:04."
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="cyj1lwl">
                <SlidersHorizontal
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="4nd3i22"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border !border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid="ug64wm:"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option} data-oid="ljk5xpm">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Card
              filteredData={filteredData}
              setSelectedFilter={setSelectedFilter}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6" data-oid="j:izj1l">
            {/* Search Stats */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="gkcpyyp"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="n4enh0."
              >
                검색 통계
              </h3>
              <div className="space-y-3 sm:space-y-4" data-oid="o8ib-bi">
                <div
                  className="flex justify-between items-center"
                  data-oid="5q_:a8k"
                >
                  <span className="text-sm text-gray-600" data-oid="qift9ny">
                    총 결과
                  </span>
                  <span className="font-bold text-blue-600" data-oid="hh14d8c">
                    {filteredData.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="tox0dw9"
                >
                  <span className="text-sm text-gray-600" data-oid="v8xua8y">
                    AI 추천
                  </span>
                  <span
                    className="font-bold text-purple-600"
                    data-oid="c54e00s"
                  >
                    {filteredData.filter((r) => r.type === "ai-course").length}
                    개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="e50spgs"
                >
                  <span className="text-sm text-gray-600" data-oid="dser80c">
                    사용자 코스
                  </span>
                  <span className="font-bold text-green-600" data-oid="xb033n8">
                    {filteredData.filter((r) => r.type === "user-post").length}
                    개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="5gm69gm"
                >
                  <span className="text-sm text-gray-600" data-oid="9:zf.i7">
                    평균 평점
                  </span>
                  <span
                    className="font-bold text-yellow-600"
                    data-oid="162b6rf"
                  >
                    {(
                      filteredData.reduce((acc, r) => acc + r.rating, 0) /
                        filteredData.length || 0
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="pt3-joo"
            >
              <h3
                className="font-semibold text-gray-900 mb-4 flex items-center"
                data-oid="6hurexh"
              >
                <TrendingUp
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2"
                  data-oid="k3elz0v"
                />
                인기 검색어
              </h3>
              <div className="space-y-2" data-oid="stvzkd2">
                {["김포", "제주", "강원도"].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword)
                      setSearchValue("")
                      router.push(`/search?q=${encodeURIComponent(keyword)}`)
                    }}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-between"
                    data-oid="7u2sek:"
                  >
                    <span data-oid="nxop8wk">{keyword}</span>
                    <span className="text-xs text-gray-400" data-oid="1k-m8ak">
                      {popularSearch && handleCount(keyword)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="8l_st6r"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="g5f0d4u"
              >
                빠른 액션
              </h3>
              <div className="space-y-2" data-oid="b9dr_z0">
                <button
                  onClick={() => router.push("/courses")}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="pynbc4e"
                >
                  🤖 AI 추천 코스 보기
                </button>
                <button
                  onClick={() => router.push("/board")}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="eruh04q"
                >
                  👥 사용자 코스 보기
                </button>
                <button
                  onClick={() => router.push("/board/write")}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="3b8zadq"
                >
                  ✍️ 내 코스 작성하기
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="747-.:_"
                >
                  🏠 홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
