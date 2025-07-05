"use client"

import {
  MessageCircle,
  Mic,
  Plus,
  Search,
  Send
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BoardSkeletonPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="qdhqbk5"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-4"
        data-oid="ibti4xo"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="8n6ghnz"
        >
          {/* Left Column - Post List */}
          <div className="lg:col-span-2" data-oid="cghsrmy">
            {/* Search Section - Keep Original UI */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden"
              data-oid="ujk698_"
            >
              <div className="relative z-10" data-oid="ao.8-wl">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                  data-oid="e57lvgb"
                >
                  <MessageCircle
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    data-oid="7c-3oq9"
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-gray-600"
                    data-oid="lxruudo"
                  >
                    여행 코스 커뮤니티
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="b5v3z_z"
                >
                  실제 여행자들의 생생한 코스
                </h2>

                <p
                  className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6"
                  data-oid="vjkps2:"
                >
                  직접 다녀온 여행자들이 공유하는 진짜 여행 코스를 만나보세요
                </p>

                {/* Search Bar - Original UI */}
                <form onSubmit={handleSearch} data-oid="__ef4kq">
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2 mb-4"
                    data-oid="a.g12cj"
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                      data-oid="6:.ajx5"
                    >
                      <Search
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                        data-oid=".br_x7o"
                      />
                      <input
                        type="text"
                        placeholder="여행 코스를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                        data-oid="n3hebk9"
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      data-oid="zk2qi3s"
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                        data-oid="z5uvro."
                      >
                        <Mic
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid="zn:zlta"
                        />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        data-oid="bnju5ro"
                      >
                        <Send
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid="ombd_59"
                        />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Write Post Button - Original UI */}
                <button
                  onClick={() => router.push("/board/write")}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium"
                  data-oid="11ks3h5"
                >
                  <Plus
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    data-oid="olki.4n"
                  />
                  여행 코스 공유하기
                </button>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/10 rounded-full"
                data-oid="xlhihor"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full"
                data-oid="7wszr:-"
              ></div>
            </div>

            {/* Filters Skeleton */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
              data-oid="k1rwned"
            >
              <div className="flex items-center space-x-2" data-oid="eq7-dt2">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                  data-oid="tvblk0k"
                ></div>
                <div className="flex flex-wrap gap-2" data-oid="14as.aw">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                      data-oid="4_ob935"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="297vf6g">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                  data-oid="w195xfs"
                ></div>
                <div
                  className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                  data-oid="z8qysue"
                ></div>
              </div>
            </div>

            {/* Post List Skeleton */}
            <div className="space-y-4 sm:space-y-6" data-oid="h1ig7i.">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
                  data-oid="yzs72-q"
                >

                  <div className="md:flex" data-oid="952kw93">
                    {/* Image Skeleton */}
                    <div className="md:w-1/3" data-oid="pokp6we">
                      <div
                        className="h-48 md:h-full bg-gray-300 relative animate-pulse"
                        data-oid="5jdjzm_"
                      >
                        <div
                          className="absolute top-3 sm:top-4 left-3 sm:left-4"
                          data-oid="klmt8o3"
                        >
                          <div
                            className="bg-gray-200 h-6 w-16 rounded-full animate-pulse"
                            data-oid="1wq6l5c"
                          ></div>
                        </div>
                        <div
                          className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2"
                          data-oid="fqlko2d"
                        >
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full animate-pulse"
                            data-oid="p1fis4v"
                          ></div>
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full animate-pulse"
                            data-oid="l:r_q0l"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="md:w-2/3 p-4 sm:p-6" data-oid="6b_rx.w">
                      {/* Title and Subtitle Skeleton */}
                      <div
                        className="flex items-start justify-between mb-3 gap-2"
                        data-oid="rgnnf30"
                      >
                        <div className="flex-1 min-w-0" data-oid="6ymr69t">
                          <div
                            className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
                            data-oid="4u210:a"
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded w-full animate-pulse"
                            data-oid="85busp_"
                          ></div>
                        </div>
                        <div
                          className="h-6 bg-gray-200 rounded w-12 animate-pulse"
                          data-oid=".3m8.9l"
                        ></div>
                      </div>

                      {/* Author Info Skeleton */}
                      <div
                        className="flex items-center space-x-2 mb-3"
                        data-oid="k3dv_q0"
                      >
                        <div
                          className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"
                          data-oid="moi152q"
                        ></div>
                        <div className="min-w-0" data-oid="6saw7:1">
                          <div
                            className="flex items-center space-x-2"
                            data-oid="bmvw_ck"
                          >
                            <div
                              className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                              data-oid="k.4fb:q"
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                              data-oid="v27ih1n"
                            ></div>
                          </div>
                          <div
                            className="h-3 bg-gray-200 rounded w-32 mt-1 animate-pulse"
                            data-oid="8tdjp:-"
                          ></div>
                        </div>
                      </div>

                      {/* Description Skeleton */}
                      <div className="space-y-2 mb-4" data-oid="l1sr2ws">
                        <div
                          className="h-4 bg-gray-200 rounded w-full animate-pulse"
                          data-oid="pt8l31x"
                        ></div>
                        <div
                          className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                          data-oid="w_80:2f"
                        ></div>
                      </div>

                      {/* Course Info Skeleton */}
                      <div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4"
                        data-oid="crvs43-"
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="flex items-center"
                            data-oid="f357bra"
                          >
                            <div
                              className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                              data-oid="h8eafeg"
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                              data-oid="ada0vwv"
                            ></div>
                          </div>
                        ))}
                      </div>

                      {/* Tags Skeleton */}
                      <div
                        className="flex flex-wrap gap-1 sm:gap-2 mb-4"
                        data-oid="xwlyixl"
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="h-6 bg-gray-200 rounded-md w-16 animate-pulse"
                            data-oid="7hbnzic"
                          ></div>
                        ))}
                      </div>

                      {/* Highlights Skeleton */}
                      <div className="mb-4" data-oid="sf_ixhi">
                        <div
                          className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"
                          data-oid="l6mj.ki"
                        ></div>
                        <div
                          className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"
                          data-oid="zufq_lv"
                        ></div>
                      </div>

                      {/* Bottom Info Skeleton */}
                      <div
                        className="flex items-center justify-between"
                        data-oid="t5ir2ok"
                      >
                        <div
                          className="flex items-center space-x-3 sm:space-x-4"
                          data-oid="fyp-0m_"
                        >
                          {[1, 2, 3, 4].map((j) => (
                            <div
                              key={j}
                              className="flex items-center"
                              data-oid="bx2o36g"
                            >
                              <div
                                className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                data-oid="3id5yud"
                              ></div>
                              <div
                                className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                                data-oid="46-zrzq"
                              ></div>
                            </div>
                          ))}
                        </div>
                        <div
                          className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                          data-oid="-7gyci."
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-4 sm:space-y-6" data-oid="e7h.4um">
            {/* Popular Posts Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="hbye7tx"
            >
              <div className="flex items-center mb-4" data-oid=".1o4mzj">
                <div
                  className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"
                  data-oid="4rp-xet"
                ></div>
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                  data-oid="-60e0wj"
                ></div>
              </div>
              <div className="space-y-3" data-oid="46z5zyn">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 rounded-lg" data-oid="hdp0f_:">
                    <div
                      className="flex items-start space-x-2"
                      data-oid="9gjfd6j"
                    >
                      <div
                        className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                        data-oid="uaj89l2"
                      ></div>
                      <div className="min-w-0 flex-1" data-oid="g0.oicu">
                        <div
                          className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"
                          data-oid="66kk3-0"
                        ></div>
                        <div
                          className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"
                          data-oid="992xbkp"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="sk5uomn"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="6shqgo9"
              ></div>
              <div className="space-y-3 sm:space-y-4" data-oid="03ais98">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                    data-oid="q-idqbb"
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="07wev.2"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                      data-oid="slg5fed"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Filters Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid=":yj3b8g"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid=".osznja"
              ></div>
              <div className="space-y-2" data-oid="_5szl6j">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-full animate-pulse"
                    data-oid="rtmem90"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div
        className="bg-white border-t !border-gray-200 mt-12"
        data-oid="ce25n-."
      >
        <div className="max-w-6xl mx-auto px-4 py-8" data-oid="5-_72dx">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            data-oid="z1ppm4k"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3" data-oid="embt8.f">
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                  data-oid=".alcnc:"
                ></div>
                <div className="space-y-2" data-oid="4pzye3g">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="7f4z3by"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="border-t !border-gray-200 mt-8 pt-8"
            data-oid="esf4ds_"
          >
            <div
              className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
              data-oid="b7kkn_3"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
