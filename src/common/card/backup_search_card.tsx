"use client"

import {
  ArrowRight,
  Calendar,
  Eye,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  ThumbsUp,
  Users
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { comma } from "@/util/comma"

const Search_card = ({filteredData}) => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const [searchQuery] = useState(searchParams.get("q") || "")
    
    const handleResultClick = (result) => {
        if (result.type === "ai-course") {
          router.push(`/courses/details/${result.id}`)
        } else {
          router.push(`/board/details/${result.id}`)
        }
      }
    
      const getDifficultyColor = (difficulty: number) => {
        if (difficulty < 2) {
          return "bg-green-100 text-green-700"
        } else if (difficulty < 4) {
          return "bg-yellow-100 text-yellow-700"
        } else if (difficulty < 6) {
          return "bg-red-100 text-red-700"
        } else {
          return "bg-gray-100 text-gray-700"
        }
      }
    
      const getDifficultyText = (difficulty: number) => {
        if (difficulty < 2) {
          return "쉬움"
        } else if (difficulty < 4) {
          return "보통"
        } else if (difficulty < 6) {
          return "어려움"
        }
      }
    
      const getLevelColor = (level: string) => {
        switch (level) {
          case "Platinum":
            return "bg-purple-100 text-purple-700"
          case "Gold":
            return "bg-yellow-100 text-yellow-700"
          case "Silver":
            return "bg-gray-100 text-gray-700"
          default:
            return "bg-blue-100 text-blue-700"
        }
      }
  return (
    <div>
      {/* Search Results */}
      <div className="space-y-4 sm:space-y-6" data-oid="ep:hvv:">
        {filteredData.map((result, index) => (
          <div
            key={`${result.type}-${index}`}
            onClick={() => handleResultClick(result)}
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
            data-oid="nl279as"
          >
            {/* Type Badge */}
            <div
              className={`px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium flex items-center ${
                result.type === "ai-course"
                  ? "bg-gradient-to-r from-purple-400 to-blue-400 text-white"
                  : "bg-gradient-to-r from-green-400 to-blue-400 text-white"
              }`}
              data-oid="7g-pgh4"
            >
              {result.type === "ai-course" ? (
                <>
                  <Sparkles
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    data-oid="w9sr2ud"
                  />
                  AI 추천 코스
                </>
              ) : (
                <>
                  <MessageCircle
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    data-oid="op6c_vk"
                  />
                  사용자 코스
                </>
              )}
            </div>

            <div className="p-4 sm:p-6" data-oid="5m0nh56">
              <div
                className="flex items-start justify-between mb-3 gap-2"
                data-oid="ca4fh.:"
              >
                <div className="flex-1 min-w-0" data-oid="g_lpo.s">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2"
                    data-oid="sqy7p9w"
                  >
                    {result.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600 line-clamp-2"
                    data-oid="r-lzkpu"
                  >
                    {result.subtitle}
                  </p>
                </div>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)} flex-shrink-0`}
                  data-oid="evuv02x"
                >
                  {getDifficultyText(result.difficulty)}
                </span>
              </div>

              {/* Author Info (for user posts) */}
              {result.type === "user-post" && (
                <div
                  className="flex items-center space-x-2 mb-3"
                  data-oid="3rdmb_1"
                >
                  <span
                    className="text-lg border w-8 h-8 rounded-full sm:text-xl"
                    data-oid="313ycoo"
                  >
                    {/* {result.author.avatar} */}
                  </span>
                  <div className="min-w-0" data-oid="n8nfu_h">
                    <div
                      className="flex items-center space-x-2"
                      data-oid="g54yjel"
                    >
                      <span
                        className="text-sm font-medium text-gray-900"
                        data-oid="ua88r2t"
                      >
                        {result.author}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(result.author.level)}`}
                        data-oid="l_anzot"
                      >
                        {/* {result.author.level} */}
                        level
                      </span>
                    </div>
                    <div className="text-xs text-gray-500" data-oid="i.:.ldz">
                      게시글 11개 • {result.created_at}
                    </div>
                  </div>
                </div>
              )}

              <p
                className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2"
                data-oid="3er5t85"
              >
                {result.description}
              </p>

              {/* Course Info */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm"
                data-oid="8minhm-"
              >
                <div
                  className="flex items-center text-gray-600"
                  data-oid="np9:h2c"
                >
                  <Calendar
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    data-oid="46ri4tl"
                  />

                  <span data-oid="0c5sdt6">{result.duration}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="b.gi-y1"
                >
                  <Users
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    data-oid="5cdjr62"
                  />

                  <span data-oid="l55jz2-">{result.participants}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="mvo6pm5"
                >
                  <MapPin
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    data-oid="itzu917"
                  />

                  <span data-oid="itd7fcq">{result.total_places}개 장소</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="ot8z_z4"
                >
                  <span className="font-bold text-blue-600" data-oid="z.mlotg">
                    {comma(result.total_cost)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div
                className="flex flex-wrap gap-1 sm:gap-2 mb-4"
                data-oid="aac976m"
              >
                {(result.course_tags || result.board_tags)
                  .slice(0, 4)
                  .map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs ${
                        result.type === "ai-course"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                      data-oid="w_ac:5a"
                    >
                      {tag.tag}
                    </span>
                  ))}
                {(result.course_tags || result.board_tags).length > 4 && (
                  <span className="text-xs text-gray-500" data-oid="pab0hzw">
                    +{(result.course_tags || result.board_tags).length - 4}
                  </span>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-4" data-oid="p.1n9hi">
                <h4
                  className="text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  data-oid="lno9tu_"
                >
                  주요 명소
                </h4>
                <div className="flex flex-wrap gap-1" data-oid="_4:h-pz">
                  {(result.course_highlights || result.board_highlights)
                    .slice(0, 3)
                    .map((highlight, index, arr) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600"
                        data-oid="5p51l3-"
                      >
                        {highlight.highlight}
                        {index < arr.length - 1 && " • "}
                      </span>
                    ))}

                  {(result.course_highlights || result.board_highlights)
                    .length > 3 && (
                    <span className="text-xs text-gray-500" data-oid="0qlm2we">
                      외{" "}
                      {(result.course_highlights || result.board_highlights)
                        .length - 3}
                      곳
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Info */}
              <div
                className="flex items-center justify-between"
                data-oid="f827i2g"
              >
                <div
                  className="flex items-center space-x-3 sm:space-x-4"
                  data-oid="yc2luhg"
                >
                  <div className="flex items-center" data-oid="aamz2th">
                    <Star
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                      data-oid="n-a:6xi"
                    />

                    <span
                      className="text-xs sm:text-sm font-semibold"
                      data-oid="ydg-90s"
                    >
                      {result.rating}
                    </span>
                  </div>
                  <div
                    className="flex items-center text-xs sm:text-sm text-gray-500"
                    data-oid="gc6.wry"
                  >
                    <Eye
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      data-oid="pwacq2i"
                    />

                    <span data-oid="ioc:s9o">
                      {result.views || result.likes}
                    </span>
                  </div>
                  {result.type === "user-post" && (
                    <>
                      <div
                        className="flex items-center text-xs sm:text-sm text-gray-500"
                        data-oid="acmwz.5"
                      >
                        <ThumbsUp
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          data-oid="k6zjhsm"
                        />

                        <span data-oid="2.nvh3c">{result.likes}</span>
                      </div>
                      <div
                        className="flex items-center text-xs sm:text-sm text-gray-500"
                        data-oid=".71o5mk"
                      >
                        <MessageCircle
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          data-oid="7ppvft_"
                        />

                        <span data-oid="betu9wv">{result.comments}</span>
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs sm:text-sm"
                  data-oid="ufdl2r5"
                >
                  상세보기
                  <ArrowRight
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    data-oid="4_90s0p"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredData.length === 0 && searchQuery && (
        <div
          className="bg-white rounded-2xl p-8 text-center border !border-gray-200"
          data-oid="l8l2px-"
        >
          <Search
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            data-oid="b69idox"
          />

          <h3
            className="text-lg font-semibold text-gray-900 mb-2"
            data-oid="6exf0:t"
          >
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600 mb-4" data-oid="v..-ugo">
            다른 키워드로 검색해보시거나 필터를 조정해보세요.
          </p>
          <button
            onClick={() => setSelectedFilter("전체")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            data-oid="r5cfql4"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  )
}

export default Search_card
