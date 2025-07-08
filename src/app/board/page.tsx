"use client"

import Card from "@/common/card/boards_card"
import { useBoardsQuery } from "@/hooks/supabase/dev"
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
import { useEffect, useState } from "react"
import Skeleton from "./skeletion"

export default function BoardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [quickedFilter, setQuickedFilter] = useState("")
  const [sortBy, setSortBy] = useState("최신순")
  const [avg, setAvg] = useState({
    rating: 1,
    period: 1,
  })
  const [filteredBoards, setFilteredBoards] = useState([])

  const { data: boardsData, isSuccess, isLoading } = useBoardsQuery()
  console.log("boardsData: ", boardsData)

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handlePostClick = (postId: number) => {
    router.push(`/board/details/${postId}`)
  }

  useEffect(() => {
    if (!isSuccess || !boardsData?.length) return

    setAvg({
      rating:
        boardsData.reduce((sum, board) => sum + board.rating, 0) /
        boardsData.length,
      period:
        boardsData.reduce((sum, board) => sum + board.board_days.length, 0) /
        boardsData.length,
    })

    const filtered = boardsData.filter((board) => {
      const matchTag =
        selectedFilter === "전체" ||
        board.board_tags.some((tag) => tag.tag === selectedFilter)
      const matchesSearch =
        !searchQuery ||
        board.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchQuick =
        quickedFilter.trim() === quickFilter[0]
          ? board.rating >= 4.5
          : quickedFilter.trim() === quickFilter[1]
            ? board.total_cost <= 200000
            : quickedFilter.trim() === quickedFilter[2]
              ? board.title?.toLowerCase().includes("김포".toLowerCase()) ||
                board.subtitle?.toLowerCase().includes("김포".toLowerCase()) ||
                board.description?.toLowerCase().includes("김포".toLowerCase())
              : true

      return matchTag && matchesSearch && matchQuick
    })

    setFilteredBoards(filtered)
  }, [isSuccess, selectedFilter, searchQuery, boardsData, quickedFilter])

  return isLoading ? (
    <Skeleton />
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="sp5n.ik"
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4" data-oid="b4nvgyl">
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="1v49vl4"
        >
          {/* Left Column - Post List */}
          <div className="lg:col-span-2" data-oid="b-6d26g">
            {/* Search Section */}
            <div
              className="
              relative overflow-hidden
              p-4 mb-4
              rounded-2xl
              bg-gradient-to-br from-gray-100 to-gray-200
              sm:rounded-3xl sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
              data-oid="mk-elkj"
            >
              <div className="relative z-10" data-oid="5jt.ks6">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                  data-oid="mu18m9y"
                >
                  <MessageCircle
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    data-oid="-l7l:0j"
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-gray-600"
                    data-oid="l11s:t."
                  >
                    여행 코스 커뮤니티
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="_0lhn6t"
                >
                  실제 여행자들의 생생한 코스
                </h2>

                <p
                  className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6"
                  data-oid="7gogit6"
                >
                  직접 다녀온 여행자들이 공유하는 진짜 여행 코스를 만나보세요
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} data-oid="girdhfi">
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2 mb-4"
                    data-oid="2kufqc8"
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                      data-oid="lvcxpnx"
                    >
                      <Search
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                        data-oid="1zq-b5c"
                      />
                      <input
                        type="text"
                        placeholder="여행 코스를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                        data-oid="c7_l5dg"
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      data-oid="ofz767v"
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                        data-oid="pxh4jhf"
                      >
                        <Mic
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid="ki99:36"
                        />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        data-oid="1nrkf-_"
                      >
                        <Send
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid=".swrglv"
                        />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Write Post Button */}
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
                  data-oid="larkkgs"
                >
                  <Plus
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    data-oid="b1sbr6g"
                  />
                  여행 코스 공유하기
                </button>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/10 rounded-full"
                data-oid="v_n5d.7"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full"
                data-oid="y6gzvwt"
              ></div>
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
              data-oid="63o.5tu"
            >
              <div className="flex items-center space-x-2" data-oid="0kmaq-:">
                <Filter
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="gxt3348"
                />
                <div className="flex flex-wrap gap-2" data-oid="mswidwj">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200"
                      }`}
                      data-oid="z:fa:h7"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="o4sw_r-">
                <SlidersHorizontal
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="lcn7qqc"
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
                  data-oid="9jy5q4z"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option} data-oid="0e77uat">
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
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6" data-oid="h0.jzj3">
            {/* Popular Posts */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="3daz3wi"
            >
              <h3
                className="font-semibold text-gray-900 mb-4 flex items-center"
                data-oid="ozq61qk"
              >
                <TrendingUp
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2"
                  data-oid="_nkmdy0"
                />
                인기 게시글
              </h3>
              <div className="space-y-3" data-oid="6:78ejy">
                {boardsData.slice(0, 5).map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="t6.m4m0"
                  >
                    <div
                      className="flex items-start space-x-2"
                      data-oid="wajfxzd"
                    >
                      <span
                        className="text-sm font-bold text-orange-500 flex-shrink-0"
                        data-oid=":t:t4nx"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1" data-oid="sodvjdp">
                        <div
                          className="font-medium text-sm line-clamp-2 mb-1"
                          data-oid="gzmcci4"
                        >
                          {post.title}
                        </div>
                        <div
                          className="text-xs text-gray-500 flex items-center space-x-2"
                          data-oid="d_.k.7w"
                        >
                          <span data-oid=":1ozlj6">{post.author}</span>
                          <span data-oid="z74xvr1">•</span>
                          <span
                            className="flex items-center"
                            data-oid="465luoa"
                          >
                            <ThumbsUp
                              className="w-3 h-3 mr-1"
                              data-oid="1vfs3b_"
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
              data-oid="tfjfsfo"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="5dufa7c"
              >
                커뮤니티 통계
              </h3>
              <div className="space-y-3 sm:space-y-4" data-oid="7_3-2gq">
                <div
                  className="flex justify-between items-center"
                  data-oid="iv8.m9u"
                >
                  <span className="text-sm text-gray-600" data-oid=".4ogomv">
                    총 게시글
                  </span>
                  <span className="font-bold text-blue-600" data-oid="d7-j2.d">
                    {boardsData.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="ekj0rmg"
                >
                  <span className="text-sm text-gray-600" data-oid="gecdm21">
                    이번 주 신규
                  </span>
                  <span className="font-bold text-green-600" data-oid="e26xr-a">
                    12개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="f320r34"
                >
                  <span className="text-sm text-gray-600" data-oid="cvbu.75">
                    평균 평점
                  </span>
                  <span
                    className="font-bold text-yellow-600"
                    data-oid="l:srj-y"
                  >
                    {avg.rating.toFixed(1)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="or0rs7w"
                >
                  <span className="text-sm text-gray-600" data-oid="1w3wojh">
                    활성 사용자
                  </span>
                  <span
                    className="font-bold text-purple-600"
                    data-oid="u6dtp8_"
                  >
                    1,247명
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
