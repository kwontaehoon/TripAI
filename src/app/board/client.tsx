"use client"

import Card from "@/common/card/boards_card"
import { useBoardsInfiniteQuery } from "@/hooks/supabase/queries"
import {
  Filter,
  MessageCircle,
  Mic,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  ThumbsUp,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Skeleton from "./skeleton"
import { useInView } from "react-intersection-observer"
import { BoardPageProps } from "./type"

export default function BoardPage({ userInfo }: BoardPageProps) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [quickedFilter, setQuickedFilter] = useState("")
  const [sortBy, setSortBy] = useState("최신순")

  const {
    data: boardsInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: boardsInfiniteDataRefresh,
  } = useBoardsInfiniteQuery()

  const activeUsers = boardsInfiniteData?.map((board) => board.users.id)

  const filters = [
    "전체",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
    "해외여행",
  ]

  const quickFilter = ["⭐ 평점 4.5 이상", "💰 20만원 이하", "🔥 이번 주 인기"]
  const sortOptions = ["최신순", "인기순", "평점순", "댓글순"]

  const { ref, inView } = useInView({
    threshold: 0,
  })
  
  useEffect(() => {
    window.scrollTo({ behavior: "instant", top: 0 })
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      const timer = setTimeout(() => {
        fetchNextPage()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`)
    }
  }

  const handlePostClick = (postId: number) => {
    router.push(`/board/details/${postId}`)
  }

  const avg = useMemo(() => {
    if (!boardsInfiniteData?.length) return { rating: 0, period: 0 }
    return {
      rating:
        boardsInfiniteData.reduce((sum, board) => sum + board.rating, 0) /
        boardsInfiniteData.length,
      period:
        boardsInfiniteData.reduce(
          (sum, board) => sum + board.board_days.length,
          0,
        ) / boardsInfiniteData.length,
    }
  }, [boardsInfiniteData])

  const filteredBoards = useMemo(() => {
    if (!boardsInfiniteData?.length) return []

    const filtered = boardsInfiniteData.filter((board) => {
      const matchTag =
        selectedFilter === "전체" ||
        board.board_tags.some((tag) => tag.tag === selectedFilter)
      const matchesSearch =
        !searchInput ||
        board.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        board.subtitle?.toLowerCase().includes(searchInput.toLowerCase()) ||
        board.description?.toLowerCase().includes(searchInput.toLowerCase())

      const matchQuick =
        quickedFilter.trim() === quickFilter[0]
          ? board.rating >= 4.5
          : quickedFilter.trim() === quickFilter[1]
            ? board.total_cost <= 200000
            : quickedFilter.trim() === quickFilter[2]
              ? board.title?.toLowerCase().includes("김포".toLowerCase()) ||
                board.subtitle?.toLowerCase().includes("김포".toLowerCase()) ||
                board.description?.toLowerCase().includes("김포".toLowerCase())
              : true

      return matchTag && matchesSearch && matchQuick
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === "인기순") return (b.likes ?? 0) - (a.likes ?? 0)
      if (sortBy === "평점순") return (b.rating ?? 0) - (a.rating ?? 0)
      if (sortBy === "댓글순") return (b.total_comments ?? 0) - (a.total_comments ?? 0)
      return b.id - a.id // 최신순
    })
  }, [selectedFilter, boardsInfiniteData, quickedFilter, searchInput, sortBy])

  return !boardsInfiniteData ? (
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
          {/* Left Column - Post List */}
          <div className="lg:col-span-2">
            {/* Search Section */}
            <div
              className="
              relative overflow-hidden
              p-4 mb-4
              rounded-2xl
              bg-gradient-to-br from-gray-100 to-gray-200
              sm:rounded-3xl sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
             
            >
              <div className="relative z-10">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                 
                >
                  <MessageCircle
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                   
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-gray-600"
                   
                  >
                    여행 코스 커뮤니티
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                 
                >
                  실제 여행자들의 생생한 코스
                </h2>

                <p
                  className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6"
                 
                >
                  직접 다녀온 여행자들이 공유하는 진짜 여행 코스를 만나보세요
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch}>
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2 mb-4"
                   
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                     
                    >
                      <Search
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                       
                      />
                      <input
                        type="text"
                        placeholder="여행 코스를 검색해보세요"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                       
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
                        <Mic
                          className="w-4 h-4 sm:w-5 sm:h-5"
                         
                        />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                       
                      >
                        <Send
                          className="w-4 h-4 sm:w-5 sm:h-5"
                         
                        />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Write Post Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/board/write")}
                    className="
                  w-full
                  flex items-center justify-center
                  px-4
                  font-medium text-white text-sm
                  rounded-lg
                  bg-gradient-to-r from-green-600 to-blue-600
                  sm:px-6 py-2.5 sm:py-3 sm:text-base sm:w-auto
                  hover:shadow-lg
                  transition-all"
                   
                  >
                    <Plus
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                     
                    />
                    여행 코스 공유하기
                  </button>
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/10 rounded-full"
               
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full"
               
              ></div>
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
             
            >
              <div className="flex items-center space-x-2">
                <Filter
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                 
                />
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                 
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                  px-2 py-2 
                  border !border-gray-200 rounded-lg
                  text-xs
                  bg-white
                  sm:text-sm sm:px-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                 
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
              filteredBoards={filteredBoards}
              setSelectedFilter={setSelectedFilter}
              setQuickedFilter={setQuickedFilter}
              ref={ref}
              userInfo={userInfo}
              boardsRefetch={boardsInfiniteDataRefresh}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Popular Posts */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4 flex items-center"
               
              >
                <TrendingUp
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2"
                 
                />
                인기 게시글
              </h3>
              <div className="space-y-3">
                {boardsInfiniteData?.slice(0, 5).map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                   
                  >
                    <div
                      className="flex items-start space-x-2"
                     
                    >
                      <span
                        className="text-sm font-bold text-orange-500 flex-shrink-0"
                       
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-medium text-sm line-clamp-2 mb-1"
                         
                        >
                          {post.title}
                        </div>
                        <div
                          className="text-xs text-gray-500 flex items-center space-x-2"
                         
                        >
                          <span>{post.author}</span>
                          <span>•</span>
                          <span
                            className="flex items-center"
                           
                          >
                            <ThumbsUp
                              className="w-3 h-3 mr-1"
                             
                            />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                커뮤니티 통계
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    총 게시글
                  </span>
                  <span className="font-bold text-blue-600">
                    {boardsInfiniteData.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    이번 주 신규
                  </span>
                  <span className="font-bold text-green-600">
                    3개
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
                    활성 사용자
                  </span>
                  <span
                    className="font-bold text-purple-600"
                   
                  >
                    {new Set(activeUsers).size}
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
