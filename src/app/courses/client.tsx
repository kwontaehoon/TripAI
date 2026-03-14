"use client"

import Card from "@/common/card/courses_card"
import { useCoursesInfiniteQuery } from "@/hooks/supabase/queries"
import {
  Filter,
  Mic,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Skeleton from "./skeleton"
import { useInView } from "react-intersection-observer"
import { CoursesPageProps } from "./type"

export default function CoursesPage({ userInfo }: CoursesPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [quickedFilter, setQuickedFilter] = useState("")
  const [sortBy, setSortBy] = useState("인기순")
  const [destination, setDestination] = useState("")

  const {
    data: coursesInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: coursesInfiniteRefetch,
  } = useCoursesInfiniteQuery()

  useEffect(() => {
    const dest = searchParams.get("destination")
    window.scrollTo({ behavior: "instant", top: 0 })

    if (dest) {
      setDestination(dest)
      setSearchQuery(dest)
    }
  }, [searchParams])

  const quickFilter = ["⭐ 평점 4.5 이상", "💰 20만원 이하", "🔥 이번 주 인기"]

  const avg = useMemo(() => {
    if (!coursesInfiniteData?.length) return { rating: 0, period: 0 }
    return {
      rating:
        coursesInfiniteData.reduce((sum, course) => sum + course.rating, 0) /
        coursesInfiniteData.length,
      period:
        coursesInfiniteData.reduce(
          (sum, course) => sum + course.course_days.length,
          0,
        ) / coursesInfiniteData.length,
    }
  }, [coursesInfiniteData])

  const filteredCourses = useMemo(() => {
    if (!coursesInfiniteData?.length) return []
    return coursesInfiniteData.filter((course) => {
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
            : quickedFilter.trim() === quickFilter[2]
              ? course.title?.toLowerCase().includes("김포".toLowerCase()) ||
                course.subtitle?.toLowerCase().includes("김포".toLowerCase()) ||
                course.description
                  ?.toLowerCase()
                  .includes("김포".toLowerCase())
              : true
      return matchTag && matchesSearch && matchQuick
    }).sort((a, b) => {
      if (sortBy === "인기순") return (b.likes ?? 0) - (a.likes ?? 0)
      if (sortBy === "평점순") return (b.rating ?? 0) - (a.rating ?? 0)
      if (sortBy === "최신순") return (b.id ?? 0) - (a.id ?? 0)
      if (sortBy === "가격순") return (a.total_cost ?? 0) - (b.total_cost ?? 0)
      return 0
    })
  }, [selectedFilter, searchQuery, coursesInfiniteData, quickedFilter, sortBy])

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      const timer = setTimeout(() => {
        fetchNextPage()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const filters = [
    "전체",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
  ]
  const sortOptions = ["인기순", "평점순", "최신순", "가격순"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`)
    }
  }

  return !coursesInfiniteData ? (
    <Skeleton />
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
         
        >
          {/* Left Column - Course List */}
          <div className="lg:col-span-2">
            {/* Search Section */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
             
            >
              <div className="relative z-10">
                <div
                  className="flex items-center space-x-2 mb-4"
                 
                >
                  <Sparkles
                    className="w-6 h-6 text-blue-600"
                   
                  />

                  <span
                    className="text-sm font-medium text-gray-600"
                   
                  >
                    AI 여행 코스 검색
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                 
                >
                  {destination || "여행지"} 추천 코스
                </h2>
                <p className="text-gray-600 mb-6">
                  AI가 엄선한 {destination || "여행지"} 최고의 여행 코스들을
                  만나보세요
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch}>
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
                   
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-4"
                     
                    >
                      <Search
                        className="w-5 h-5 text-gray-400"
                       
                      />

                      <input
                        type="text"
                        placeholder="다른 여행지를 검색해보세요"
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                       
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                     
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                       
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                       
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
               
              ></div>
              <div
                className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
               
              ></div>
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
             
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200"
                      }`}
                     
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <SlidersHorizontal
                  className="w-5 h-5 text-gray-500"
                 
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border !border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
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
              ref={ref}
              userInfo={userInfo}
              coursesRefetch={coursesInfiniteRefetch}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Popular Destinations */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                인기 여행지
              </h3>
              <div className="space-y-3">
                {["김포", "서울", "부산", "강릉", "제주"].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      if (searchQuery === dest) {
                        setSearchQuery("")
                        setSelectedFilter("전체")
                        setDestination("")
                        router.push("/courses")
                      } else {
                        router.push(`/search?q=${encodeURIComponent(dest)}`)
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      destination === dest
                        ? "bg-blue-50 border !border-blue-200 text-blue-700"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                   
                  >
                    <div className="font-medium">
                      {dest}
                    </div>
                    <div className="text-sm opacity-75">
                      {/* {Math.floor(Math.random() * 50) + 20}개 코스 */}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Stats */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                코스 통계
              </h3>
              <div className="space-y-4">
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    총 코스 수
                  </span>
                  <span className="font-bold text-blue-600">
                    {coursesInfiniteData.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    평균 평점
                  </span>
                  <span
                    className="font-bold text-yellow-600"
                   
                  >
                    {avg.rating.toFixed(1)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    평균 기간
                  </span>
                  <span className="font-bold text-green-600">
                    {avg.period.toFixed(1)}일
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                빠른 필터
              </h3>
              <div className="space-y-2">
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
