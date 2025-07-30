"use client"

import {
  ArrowRight,
  Mic,
  Search,
  Send,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"
import { useState } from "react"

export default function HomeSkeleton() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      data-oid="skeleton-home"
    >
      {/* Main Content */}
      <div
        className="bg-#f8fafc justify-center py-28 mb-4 space-x-0 lg:flex lg:mb-12 lg:space-x-12"
        data-oid="tobkwj1"
      >
        <div className="mb-12 w-full lg:w-[700px]" data-oid="o14r9mp">
          {/* Hero Section - Keep Original */}
          <div
            className="relative overflow-hidden p-8 mb-8 rounded-3xl bg-yellow-100 bg-gradient-to-br from-gray-100 to-gray-200"
            data-oid="gx1onaa"
          >
            <div data-oid="x4my206">
              <div
                className="flex items-center space-x-2 mb-4"
                data-oid="ctj36se"
              >
                <Sparkles
                  className="w-6 h-6 text-blue-600"
                  data-oid="zn:4747"
                />
                <span
                  className="text-sm font-medium text-gray-600"
                  data-oid="s_b18g."
                >
                  AI 크리에이티브 디렉터
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                data-oid="z0e1b_1"
              >
                완벽한 여행 코스가 필요할 때,
              </h2>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                data-oid="x9yf:of"
              >
                <span className="text-blue-600" data-oid="sdl1x.h">
                  &ldquo;TripAI&rdquo;
                </span>
                가 함께할게요.
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6" data-oid="qh-z068">
                <div
                  className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
                  data-oid="rz2n_xz"
                >
                  <div
                    className="flex-1 flex items-center space-x-3 px-4"
                    data-oid="blv8v79"
                  >
                    <Search
                      className="w-5 h-5 text-gray-400"
                      data-oid="in:zjto"
                    />
                    <input
                      type="text"
                      placeholder="어떤 여행을 계획하고 계신가요?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                      data-oid="_pzd4a5"
                    />
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="go1rii8"
                  >
                    <button
                      className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      onClick={() => setIsListening(!isListening)}
                      data-oid="yc04_8w"
                    >
                      <Mic className="w-5 h-5" data-oid="54ah106" />
                    </button>
                    <button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                      data-oid="p:e74zn"
                    >
                      <Send className="w-5 h-5" data-oid="-.mkbd." />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex" data-oid="zrg5z19">
                <button
                  className="flex flex-1 items-center space-x-2 text-blue-600 font-medium hover:text-blue-700"
                  data-oid="5no-d39"
                >
                  <span data-oid="ugekji1">로그인 후 이용하기</span>
                  <ArrowRight className="w-4 h-4" data-oid="nmst9tc" />
                </button>
                <button
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all mr-1"
                  data-oid="bapqirh"
                >
                  <Zap className="w-4 h-4" data-oid="wx1emfv" />
                  <span data-oid="3u_88ge">AI 맞춤 코스</span>
                </button>
                <button
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all ml-1"
                  data-oid="7h70-m_"
                >
                  <Zap className="w-4 h-4" data-oid="v6q0v7d" />
                  <span data-oid="nj5kroq">AI 선택 코스</span>
                </button>
              </div>
            </div>

            {/* Background Pattern */}
            <div
              className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
              data-oid="-ld3dqz"
            ></div>
            <div
              className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
              data-oid="a:u.71k"
            ></div>
          </div>

          {/* AI Suggestions Skeleton */}
          <div className="mb-8" data-oid="7h-z3ao">
            <h3
              className="text-lg font-semibold text-gray-900 mb-4"
              data-oid="sg.gjic"
            >
              AI 추천 여행 코스
            </h3>
            <div className="grid md:grid-cols-2 gap-4" data-oid="d5c.bch">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl border !border-gray-200 animate-pulse"
                  data-oid="jc.du1a"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="4e_v9wf"
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-3/4"
                      data-oid="eyxg-vu"
                    ></div>
                    <ArrowRight
                      className="w-4 h-4 text-gray-300"
                      data-oid="wwzllig"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Destinations Skeleton */}
          <div className="mb-8" data-oid="adpxl0i">
            <h3
              className="text-lg font-semibold text-gray-900 mb-4"
              data-oid="e.kyfn-"
            >
              인기 여행지
            </h3>
            <div className="grid md:grid-cols-2 gap-4" data-oid="a44ry8_">
              {[
                "from-blue-400 to-cyan-300",
                "from-purple-400 to-pink-300",
                "from-orange-400 to-red-300",
                "from-green-400 to-teal-300",
              ].map((gradient, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${gradient} rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 animate-pulse`}
                  data-oid="wtmjen6"
                >
                  <div
                    className="h-6 bg-white/20 rounded w-16 mb-1"
                    data-oid="gdws_c1"
                  ></div>
                  <div
                    className="h-4 bg-white/20 rounded w-24"
                    data-oid="u99yonh"
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Board Preview Skeleton */}
          <div data-oid="ys_vegy">
            <div
              className="flex items-center justify-between mb-4"
              data-oid="9lu9g8x"
            >
              <h3
                className="text-lg font-semibold text-gray-900"
                data-oid="6gftqrv"
              >
                여행자들의 생생한 후기
              </h3>
              <button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                data-oid="bfgjshv"
              >
                더보기
                <ArrowRight className="w-4 h-4 ml-1" data-oid="88o23o2" />
              </button>
            </div>
            <div className="space-y-3" data-oid="m_eakhc">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-full p-4 bg-white rounded-xl border !border-gray-200 animate-pulse"
                  data-oid="d1ul38p"
                >
                  <div
                    className="flex items-start justify-between mb-2"
                    data-oid="m2c-l07"
                  >
                    <div
                      className="h-5 bg-gray-200 rounded w-3/4"
                      data-oid="yymqj.y"
                    ></div>
                    <div
                      className="flex items-center text-xs text-gray-500 ml-2"
                      data-oid="j2io_u_"
                    >
                      <Star
                        className="w-3 h-3 text-yellow-400 mr-1"
                        data-oid="841-s5o"
                      />

                      <div
                        className="h-3 bg-gray-200 rounded w-8"
                        data-oid="w_:js4t"
                      ></div>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    data-oid="cxrgfv4"
                  >
                    <div
                      className="flex items-center space-x-2"
                      data-oid="ql3r9-n"
                    >
                      <div
                        className="h-4 bg-gray-200 rounded w-16"
                        data-oid="xqs_-i_"
                      ></div>
                      <div className="flex gap-1" data-oid="8lif7v:">
                        <div
                          className="h-5 bg-gray-200 rounded w-12"
                          data-oid="lxd1d4t"
                        ></div>
                        <div
                          className="h-5 bg-gray-200 rounded w-12"
                          data-oid="zl0hs3g"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="h-4 bg-gray-200 rounded w-12"
                      data-oid="_-2e0rl"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Info Skeleton */}
        <div className="space-y-6 w-full lg:w-[230px]" data-oid="61.cxjv">
          {/* Stats Card Skeleton */}
          <div
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white"
            data-oid="vdbcnz-"
          >
            <div className="text-center" data-oid="0rtdvif">
              <div className="text-sm opacity-80 mb-2" data-oid="bila5_9">
                전체 생성된 코스 수
              </div>
              <div
                className="text-3xl font-bold mb-4 animate-pulse"
                data-oid="nyah40p"
              >
                <div
                  className="h-8 bg-white/20 rounded w-20 mx-auto"
                  data-oid="_8y7e5q"
                ></div>
              </div>
              <div className="text-xs opacity-60" data-oid="jmic8l3">
                개
              </div>
            </div>
          </div>

          {/* Recent Activity Skeleton */}
          <div
            className="bg-white rounded-2xl p-6 border !border-gray-200"
            data-oid="qoztyki"
          >
            <div
              className="flex items-center space-x-2 mb-4"
              data-oid="oy_-z:h"
            >
              <div
                className="w-2 h-2 bg-green-500 rounded-full"
                data-oid="0:0oli7"
              ></div>
              <span
                className="text-sm font-medium text-gray-900"
                data-oid="5slrcd4"
              >
                실시간
              </span>
            </div>
            <div
              className="h-5 bg-gray-200 rounded w-24 mb-3 animate-pulse"
              data-oid="2lt9qxs"
            ></div>
            <div className="space-y-3" data-oid="m:0uuqm">
              <div className="space-y-2" data-oid="-6_32s8">
                <div
                  className="h-4 bg-gray-200 rounded w-full animate-pulse"
                  data-oid="j71v.uw"
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"
                  data-oid="42rqaxu"
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"
                  data-oid="778q2f1"
                ></div>
              </div>
              <div
                className="pt-3 border-t !border-gray-100"
                data-oid="o6buhs8"
              >
                <div
                  className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"
                  data-oid="g-22yy7"
                ></div>
                <div className="space-y-1" data-oid="oplcp-h">
                  <div
                    className="h-3 bg-gray-200 rounded w-32 animate-pulse"
                    data-oid="mfx:xan"
                  ></div>
                  <div
                    className="h-3 bg-gray-200 rounded w-32 animate-pulse"
                    data-oid="d29ohos"
                  ></div>
                </div>
                <div
                  className="h-3 bg-gray-200 rounded w-16 mt-2 animate-pulse"
                  data-oid="s3v6qvq"
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Searches Skeleton */}
          <div
            className="bg-white rounded-2xl p-6 border !border-gray-200"
            data-oid="seqw32e"
          >
            <h3 className="font-semibold text-gray-900 mb-4" data-oid="m5cak4_">
              최근 검색어
            </h3>
            <div className="space-y-2" data-oid="mm3olge">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded w-full animate-pulse"
                  data-oid="-dc2r7_"
                ></div>
              ))}
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-2 gap-4" data-oid="n7ul4-x">
            <div
              className="bg-white rounded-xl p-4 border !border-gray-200 text-center"
              data-oid="msbzui9"
            >
              <div
                className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"
                data-oid="ckh4q.v"
              ></div>
              <div
                className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"
                data-oid="we79bpj"
              ></div>
            </div>
            <div
              className="bg-white rounded-xl p-4 border !border-gray-200 text-center"
              data-oid="4i3ocxw"
            >
              <div
                className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"
                data-oid="83-x2v4"
              ></div>
              <div
                className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"
                data-oid="fo8hx1f"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div
        className="bg-white border-t !border-gray-200 mt-12"
        data-oid="lygm5ia"
      >
        <div className="max-w-6xl mx-auto px-4 py-8" data-oid="1:lidn1">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            data-oid="b5tj974"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3" data-oid="-d5xeqb">
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                  data-oid=":6.n09w"
                ></div>
                <div className="space-y-2" data-oid="fjwif34">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="c5eqlfx"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="border-t !border-gray-200 mt-8 pt-8"
            data-oid="o::gmz8"
          >
            <div
              className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
              data-oid="ts-_bry"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
