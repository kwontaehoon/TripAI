"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Bot,
  Sparkles,
  Mic,
  Send,
} from "lucide-react"

export default function CoursesSkeletonPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?destination=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="ff0yr4j"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-4"
        data-oid="arq-cqd"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="wt3:n1e"
        >
          {/* Left Column - Course List */}
          <div className="lg:col-span-2" data-oid=":74_ijk">
            {/* Search Section - Keep Original UI */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
              data-oid="s:ngdn4"
            >
              <div className="relative z-10" data-oid=".damq0h">
                <div
                  className="flex items-center space-x-2 mb-4"
                  data-oid="767wiuu"
                >
                  <Sparkles
                    className="w-6 h-6 text-blue-600"
                    data-oid="ge3ga7v"
                  />
                  <span
                    className="text-sm font-medium text-gray-600"
                    data-oid="tcpv.ta"
                  >
                    AI 여행 코스 검색
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="96vjkta"
                >
                  여행지 추천 코스
                </h2>
                <p className="text-gray-600 mb-6" data-oid="lf5apwf">
                  AI가 엄선한 여행지 최고의 여행 코스들을 만나보세요
                </p>

                {/* Search Bar - Original UI */}
                <form onSubmit={handleSearch} data-oid=":s:tnob">
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
                    data-oid="c_:pcfa"
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-4"
                      data-oid=".bl-rt:"
                    >
                      <Search
                        className="w-5 h-5 text-gray-400"
                        data-oid="7i3p1_q"
                      />
                      <input
                        type="text"
                        placeholder="다른 여행지를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                        data-oid="0d3l:bz"
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      data-oid="i7yc:im"
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                        data-oid="g:18_s9"
                      >
                        <Mic className="w-5 h-5" data-oid="k33xiy5" />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        data-oid="ko1:hfg"
                      >
                        <Send className="w-5 h-5" data-oid="xa0r:v-" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
                data-oid="6-1ltaz"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
                data-oid="l1sbag0"
              ></div>
            </div>

            {/* Filters Skeleton */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
              data-oid="yb4.km8"
            >
              <div className="flex items-center space-x-2" data-oid="-jfnia5">
                <div
                  className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                  data-oid="r_jsd0z"
                ></div>
                <div className="flex flex-wrap gap-2" data-oid="uhs0wav">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                      data-oid="y8tgk0v"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="xfm_:4y">
                <div
                  className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                  data-oid="5uty1:a"
                ></div>
                <div
                  className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                  data-oid=":t-.tmc"
                ></div>
              </div>
            </div>

            {/* Course List Skeleton */}
            <div className="space-y-6" data-oid="sb:xlmk">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden animate-pulse"
                  data-oid="4.fnwea"
                >
                  <div className="md:flex" data-oid="e79x:sv">
                    {/* Image Skeleton */}
                    <div className="md:w-1/3" data-oid="kca0-2q">
                      <div
                        className="h-48 md:h-full bg-gray-300 relative"
                        data-oid="yr5x6xk"
                      >
                        <div
                          className="absolute top-4 left-4"
                          data-oid="-:j9j52"
                        >
                          <div
                            className="bg-gray-200 h-6 w-16 rounded-full"
                            data-oid="5:y8reh"
                          ></div>
                        </div>
                        <div
                          className="absolute top-4 right-4 flex space-x-2"
                          data-oid="j5dd8dt"
                        >
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full"
                            data-oid=".q.svf0"
                          ></div>
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full"
                            data-oid="vfhw8rj"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="md:w-2/3 p-6" data-oid="bcs3l2p">
                      <div
                        className="flex items-start justify-between mb-3"
                        data-oid=".bl:b0:"
                      >
                        <div className="flex-1" data-oid="29m.q8p">
                          <div
                            className="bg-gray-300 h-6 w-3/4 rounded mb-2"
                            data-oid="ysvlobh"
                          ></div>
                          <div
                            className="bg-gray-200 h-4 w-1/2 rounded"
                            data-oid="zthhbn-"
                          ></div>
                        </div>
                        <div
                          className="bg-gray-200 h-6 w-12 rounded-full"
                          data-oid="nxyj_5e"
                        ></div>
                      </div>

                      <div
                        className="bg-gray-200 h-4 w-full rounded mb-2"
                        data-oid="o0:dy97"
                      ></div>
                      <div
                        className="bg-gray-200 h-4 w-5/6 rounded mb-4"
                        data-oid="va852eq"
                      ></div>

                      {/* Course Info Skeleton */}
                      <div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4"
                        data-oid="684fk6y"
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="flex items-center"
                            data-oid="wxg0gk5"
                          >
                            <div
                              className="bg-gray-200 h-4 w-4 rounded mr-2"
                              data-oid="_ih9o1v"
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-16 rounded"
                              data-oid=":no7_36"
                            ></div>
                          </div>
                        ))}
                      </div>

                      {/* Tags Skeleton */}
                      <div
                        className="flex flex-wrap gap-2 mb-4"
                        data-oid="qszkp6h"
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="bg-gray-200 h-6 w-16 rounded-md"
                            data-oid=":8tom8z"
                          ></div>
                        ))}
                      </div>

                      {/* Highlights Skeleton */}
                      <div className="mb-4" data-oid="eyfotel">
                        <div
                          className="bg-gray-300 h-4 w-20 rounded mb-2"
                          data-oid="gz5lqv:"
                        ></div>
                        <div
                          className="bg-gray-200 h-3 w-full rounded"
                          data-oid="y_ltuqj"
                        ></div>
                      </div>

                      {/* Bottom Info Skeleton */}
                      <div
                        className="flex items-center justify-between"
                        data-oid="lx.k5q_"
                      >
                        <div
                          className="flex items-center space-x-4"
                          data-oid="xzb.iy:"
                        >
                          <div className="flex items-center" data-oid="cvx45i4">
                            <div
                              className="bg-gray-200 h-4 w-4 rounded mr-1"
                              data-oid="daihhv9"
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-8 rounded mr-1"
                              data-oid="v8l2a7a"
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-12 rounded"
                              data-oid="o1c5wqy"
                            ></div>
                          </div>
                          <div
                            className="bg-gray-300 h-5 w-20 rounded"
                            data-oid="wqayh1r"
                          ></div>
                        </div>
                        <div
                          className="bg-gray-300 h-10 w-24 rounded-lg"
                          data-oid=":bav4qm"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-6" data-oid="uxf3gwr">
            {/* Popular Destinations Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="n_8x:l7"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid=".:75b1v"
              ></div>
              <div className="space-y-3" data-oid="27np_ta">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse" data-oid="91xgsjz">
                    <div
                      className="bg-gray-200 h-16 rounded-lg"
                      data-oid="o-4hmkg"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Stats Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="5ub5wi0"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="7v1sd00"
              ></div>
              <div className="space-y-4" data-oid="7e7zbhz">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center animate-pulse"
                    data-oid="faodczz"
                  >
                    <div
                      className="bg-gray-200 h-4 w-20 rounded"
                      data-oid="2v3ht44"
                    ></div>
                    <div
                      className="bg-gray-300 h-5 w-12 rounded"
                      data-oid="p.9ob_d"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Filters Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="wonjh.p"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="6gdzi.g"
              ></div>
              <div className="space-y-2" data-oid="ykdo:xi">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse" data-oid="nvescxy">
                    <div
                      className="bg-gray-200 h-8 rounded-lg"
                      data-oid="m34k5er"
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div
        className="bg-white border-t !border-gray-200 mt-12"
        data-oid="dso05a_"
      >
        <div className="max-w-6xl mx-auto px-4 py-8" data-oid="9hk3iv2">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            data-oid="1w1hft9"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3" data-oid="1a:34y6">
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                  data-oid="cgdwmzl"
                ></div>
                <div className="space-y-2" data-oid="e6_uh.4">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="h-pnzbf"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="border-t !border-gray-200 mt-8 pt-8"
            data-oid="z.9zwwd"
          >
            <div
              className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
              data-oid="rr847sg"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
