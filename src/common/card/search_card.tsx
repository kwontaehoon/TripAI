"use client"

import {
  ArrowRight,
  Calendar,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  ThumbsUp,
  User,
  Users,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { comma } from "@/util/comma"
import { getStorageUrl } from "@/util/supabaseStorage"
import { If } from "react-haiku"
import Image from "next/image"

const Search_card = ({ filteredData, setSelectedFilter }) => {
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
      <div className="space-y-4 sm:space-y-6">
        {filteredData.map((result, index) => (
          <div
            key={`${result.type}-${index}`}
            onClick={() => handleResultClick(result)}
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
           
          >
            {/* Type Badge */}
            <div
              className={`px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium flex items-center ${
                result.type === "ai-course"
                  ? "bg-gradient-to-r from-purple-400 to-blue-400 text-white"
                  : "bg-gradient-to-r from-green-400 to-blue-400 text-white"
              }`}
             
            >
              {result.type === "ai-course" ? (
                <>
                  <Sparkles
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                   
                  />
                  AI 추천 코스
                </>
              ) : (
                <>
                  <MessageCircle
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                   
                  />
                  사용자 코스
                </>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div
                className="flex items-start justify-between mb-3 gap-2"
               
              >
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2"
                   
                  >
                    {result.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600 line-clamp-2"
                   
                  >
                    {result.subtitle}
                  </p>
                </div>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)} flex-shrink-0`}
                 
                >
                  {getDifficultyText(result.difficulty)}
                </span>
              </div>

              {/* Author Info (for user posts) */}
              {result.type === "user-post" && (
                <div
                  className="flex items-center space-x-2 mb-3"
                 
                >
                  <span
                    className="text-lg sm:text-xl w-8 h-8 rounded-full relative"
                   
                  >
                    <If isTrue={result.users.profile_image_url}>
                      <Image
                        src={getStorageUrl(result.users.profile_image_url)}
                        alt={result.users.name}
                        className="rounded-full overflow-hidden"
                        fill
                        sizes="32w"
                      />
                    </If>
                    <If isTrue={!result.users.profile_image_url}>
                      <div
                        className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                       
                      >
                        <User
                          className="w-4 h-4 text-white"
                         
                        />
                      </div>
                    </If>
                    {/* {post.author.avatar} */}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="flex items-center space-x-2"
                     
                    >
                      <span
                        className="text-sm font-medium text-gray-900"
                       
                      >
                        {result.users.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(result.author.level)}`}
                       
                      >
                        {/* {result.author.level} */}
                        level
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.created_at}
                    </div>
                  </div>
                </div>
              )}

              <p
                className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2"
               
              >
                {result.description}
              </p>

              {/* Course Info */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm"
               
              >
                <div
                  className="flex items-center text-gray-600"
                 
                >
                  <Calendar
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                   
                  />

                  <span>{result.duration}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                 
                >
                  <Users
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                   
                  />

                  <span>{result.participants}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                 
                >
                  <MapPin
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                   
                  />

                  <span>{result.total_places}개 장소</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                 
                >
                  <span className="font-bold text-blue-600">
                    {comma(result.total_cost, true)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div
                className="flex flex-wrap gap-1 sm:gap-2 mb-4"
               
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
                     
                    >
                      {tag.tag}
                    </span>
                  ))}
                {(result.course_tags || result.board_tags).length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{(result.course_tags || result.board_tags).length - 4}
                  </span>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <h4
                  className="text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                 
                >
                  주요 명소
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(result.course_highlights || result.board_highlights)
                    .slice(0, 3)
                    .map((highlight, index, arr) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600"
                       
                      >
                        {highlight.highlight}
                        {index < arr.length - 1 && " • "}
                      </span>
                    ))}

                  {(result.course_highlights || result.board_highlights)
                    .length > 3 && (
                    <span className="text-xs text-gray-500">
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
               
              >
                <div
                  className="flex items-center space-x-3 sm:space-x-4"
                 
                >
                  <div className="flex items-center">
                    <Star
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                     
                    />

                    <span
                      className="text-xs sm:text-sm font-semibold"
                     
                    >
                      {result.rating}
                    </span>
                  </div>
                  <div
                    className="flex items-center text-xs sm:text-sm text-gray-500"
                   
                  >
                    <ThumbsUp
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                     
                    />

                    <span>{result.likes}</span>
                  </div>
                  <div
                    className="flex items-center text-xs sm:text-sm text-gray-500"
                   
                  >
                    <MessageCircle
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                     
                    />

                    <span>{result.comments.length}</span>
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs sm:text-sm"
                 
                >
                  상세보기
                  <ArrowRight
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                   
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
         
        >
          <Search
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
           
          />

          <h3
            className="text-lg font-semibold text-gray-900 mb-2"
           
          >
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600 mb-4">
            다른 키워드로 검색해보시거나 필터를 조정해보세요.
          </p>
          <button
            onClick={() => setSelectedFilter("전체")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
           
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  )
}

export default Search_card
