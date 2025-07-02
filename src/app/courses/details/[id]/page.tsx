"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Users,
  Calendar,
  Car,
  Bot,
  Sparkles,
  Navigation,
  Camera,
  Utensils,
  Mountain,
  Download,
  Share2,
  Heart,
  RefreshCw,
  Eye,
  ThumbsUp,
  Bookmark,
  ExternalLink,
  Route,
  Zap,
} from "lucide-react"
import { ai_courseText } from "@/common/text/ai"
import { getBadgeColor } from "@/util/styles"
import { comma } from "@/util/comma"

export default function CourseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [selectedDay, setSelectedDay] = useState(1)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다!")
  }

  const handleDownload = () => {
    alert("코스 다운로드 기능은 준비 중입니다.")
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24"
      data-oid="u-qd:ag"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
        data-oid="8mf8_wm"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="1hm7qzr"
        >
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2" data-oid="zftf_be">
            {/* AI Course Header */}
            <div
              className="
                            relative overflow-hidden
                            p-4 mb-4
                            rounded-2xl
                            bg-gradient-to-br from-purple-100 to-blue-100
                            sm:rounded-3xl  sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
              data-oid="ob7xy.s"
            >
              <div className="relative z-10" data-oid="1mdxbf2">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                  data-oid="1bsezv:"
                >
                  <Sparkles
                    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                    data-oid="pmuy3vj"
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-purple-600"
                    data-oid="d.hx6we"
                  >
                    AI 신뢰도 {ai_courseText[0].reliability}%
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="ruzhgcp"
                >
                  {ai_courseText[0].title}
                </h2>

                <p
                  className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6"
                  data-oid="m.pxaq2"
                >
                  {ai_courseText[0].subtitle}
                </p>

                <p
                  className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6"
                  data-oid="eytz6u-"
                >
                  {ai_courseText[0].description}
                </p>

                {/* AI Analysis Badges */}
                <div
                  className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                  data-oid="3wb-n1w"
                >
                  {ai_courseText[0].badges &&
                    ai_courseText[0].badges.map((badgeName, idx) => {
                      return (
                        <span
                          key={idx}
                          className={`
                            px-2 py-1
                            rounded-full
                            text-xs text-blue-700 font-medium
                            ${getBadgeColor(idx)}
                          bg-blue-100
                            sm:px-3 sm:text-sm `}
                          data-oid=":31r4z:"
                        >
                          {badgeName}
                        </span>
                      )
                    })}
                </div>

                {/* Action Buttons */}
                <div
                  className="flex flex-wrap gap-2 sm:gap-3"
                  data-oid="eolj5g_"
                >
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                      isLiked
                        ? "bg-red-100 text-red-600"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    data-oid="1x35gks"
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                      data-oid="0v-kjcb"
                    />

                    <span className="hidden sm:inline" data-oid="zmgv42v">
                      {isLiked ? "좋아요 취소" : "좋아요"}
                    </span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="
                                        flex items-center
                                        space-x-1 px-3 py-2
                                        rounded-lg
                                        text-sm text-blue-600
                                        bg-white
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                    data-oid="w1od31_"
                  >
                    <Download className="w-4 h-4" data-oid="m9npxt-" />
                    <span className="hidden sm:inline" data-oid="v9qf8fk">
                      다운로드
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/map?courseId=${ai_courseText}`)
                    }
                    className="
                                        flex items-center 
                                        px-3 py-2 space-x-1
                                        rounded-lg
                                        text-sm text-green-600
                                        bg-white  
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                    data-oid="fisp5uj"
                  >
                    <MapPin className="w-4 h-4" data-oid="o:-alxo" />
                    <span className="hidden sm:inline" data-oid="jvp0t.v">
                      지도보기
                    </span>
                  </button>
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 bg-purple-600/10 rounded-full"
                data-oid="k0mza.5"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 bg-blue-600/10 rounded-full"
                data-oid="fnfbcjy"
              ></div>
            </div>

            {/* Day Selector */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="a-72::-"
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                data-oid="17g825i"
              >
                일정 선택
              </h3>
              <div className="flex gap-2 overflow-x-auto" data-oid="v3wb7y:">
                {ai_courseText[0].days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day.day
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    data-oid="zxs1wkb"
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Day Details */}
            {ai_courseText[0].days?.map(
              (day) =>
                selectedDay === day.day && (
                  <div
                    key={day.day}
                    className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                    data-oid="-vsxk4k"
                  >
                    <div
                      className="flex items-center justify-between mb-4"
                      data-oid="_93xo4t"
                    >
                      <div data-oid="r0:.wis">
                        <h3
                          className="text-lg sm:text-xl font-bold text-gray-900"
                          data-oid="ytf9::k"
                        >
                          Day {day.day}: {day.title}
                        </h3>
                        <p
                          className="text-sm sm:text-base text-gray-600"
                          data-oid="07y.6g."
                        >
                          {day.subTitle}
                        </p>
                      </div>
                      <div
                        className="text-right text-sm text-gray-500"
                        data-oid="z-hksd8"
                      >
                        <div data-oid="x329twq">{day.total_distance}</div>
                        <div data-oid="9.q2an-">{day.total_time}</div>
                      </div>
                    </div>

                    {/* Places Timeline */}
                    <div className="space-y-6" data-oid="ixfy:al">
                      {day.places.map((place, index) => (
                        <div
                          key={place.id}
                          className="relative"
                          data-oid="_lo9t8o"
                        >
                          {/* Timeline Line */}
                          {index < day.places.length - 1 && (
                            <div
                              className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                              data-oid="tbielp2"
                            ></div>
                          )}

                          <div className="flex space-x-4" data-oid="sc.fx_l">
                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
                              data-oid="p9vfdn-"
                            >
                              <Mountain />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0" data-oid="j40foyt">
                              <div
                                className="flex items-start justify-between mb-2 gap-2"
                                data-oid="yr8uuwc"
                              >
                                <h4
                                  className="text-base sm:text-lg font-semibold text-gray-900"
                                  data-oid="adj30pl"
                                >
                                  {place.name}
                                </h4>
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex-shrink-0"
                                  data-oid="xvtxx_."
                                >
                                  {place.location_type}
                                </span>
                              </div>

                              <p
                                className="text-sm sm:text-base text-gray-600 mb-3"
                                data-oid="p9g7x:h"
                              >
                                {place.description}
                              </p>

                              {/* Place Info Grid */}
                              <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                                data-oid="hkg3axr"
                              >
                                <div
                                  className="flex items-center"
                                  data-oid="rhwdh2f"
                                >
                                  <MapPin
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                    data-oid="t1_5d2n"
                                  />
                                  <span className="truncate" data-oid="ar1rvfv">
                                    {place.location}
                                  </span>
                                </div>
                                <div
                                  className="flex items-center"
                                  data-oid="i7qgxz."
                                >
                                  <Clock
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                    data-oid="qe8ton9"
                                  />
                                  <span data-oid="uospgq3">
                                    체류 시간: {place.stay}
                                  </span>
                                </div>
                                {place.openTime && (
                                  <div
                                    className="flex items-center"
                                    data-oid="l6u2qv5"
                                  >
                                    <Calendar
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="py6bken"
                                    />
                                    <span data-oid="b-z0gm-">
                                      운영시간: {place.openTime}
                                    </span>
                                  </div>
                                )}
                                {place.entryFee && (
                                  <div
                                    className="flex items-center"
                                    data-oid=".-_jpe6"
                                  >
                                    <span
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="hggkyvn"
                                    >
                                      💰
                                    </span>
                                    <span data-oid="530p4ly">
                                      입장료: {place.entryFee}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* AI Reasoning */}
                              <div
                                className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                                data-oid="wbi9jn7"
                              >
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                  data-oid="c2d9:bu"
                                >
                                  <Sparkles
                                    className="w-4 h-4 text-blue-600"
                                    data-oid="lf:-fhl"
                                  />
                                  <span
                                    className="text-sm font-medium text-blue-700"
                                    data-oid="3r17pw:"
                                  >
                                    AI 추천 이유
                                  </span>
                                </div>
                                <p
                                  className="text-sm text-blue-600"
                                  data-oid="sukjvhi"
                                >
                                  {place.recommend_reason}
                                </p>
                              </div>

                              {/* Tips */}
                              {place.tips && place.tips.length > 0 && (
                                <div
                                  className="bg-yellow-50 border !border-yellow-200 rounded-lg p-3 mb-3"
                                  data-oid="4q9ilh5"
                                >
                                  <div
                                    className="flex items-center space-x-2 mb-2"
                                    data-oid="e-59mew"
                                  >
                                    <Zap
                                      className="w-4 h-4 text-yellow-600"
                                      data-oid="fxwn.us"
                                    />
                                    <span
                                      className="text-sm font-medium text-yellow-700"
                                      data-oid="tgb5z31"
                                    >
                                      여행 팁
                                    </span>
                                  </div>
                                  <ul
                                    className="text-sm text-yellow-600 space-y-1"
                                    data-oid="z0b:lam"
                                  >
                                    {place.tips.map((tip, tipIndex) => (
                                      <li
                                        key={tipIndex}
                                        className="flex items-start"
                                        data-oid="j:e.i6s"
                                      >
                                        <span
                                          className="mr-2"
                                          data-oid="zwck3b-"
                                        >
                                          •
                                        </span>
                                        <span data-oid="kze6t-q">{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Rating and Reviews */}
                              <div
                                className="flex items-center space-x-4 mb-3"
                                data-oid="mx4u9oo"
                              >
                                <div
                                  className="flex items-center"
                                  data-oid="x0pfse7"
                                >
                                  <Star
                                    className="w-4 h-4 text-yellow-400 mr-1"
                                    data-oid="y89.ma1"
                                  />
                                  <span
                                    className="text-sm font-semibold"
                                    data-oid="hw7n5:j"
                                  >
                                    {place.rating_count}
                                  </span>
                                </div>
                                <div
                                  className="text-sm text-gray-500"
                                  data-oid="-bx8fv:"
                                >
                                  리뷰 {place.review_count}개
                                </div>
                              </div>

                              {/* Next Location Info */}
                              {place.next_distance && (
                                <div
                                  className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2"
                                  data-oid="b-rmbq:"
                                >
                                  <Car
                                    className="w-4 h-4 flex-shrink-0"
                                    data-oid="sj30h20"
                                  />
                                  <span data-oid="0asui.y">
                                    다음 장소까지 {place.next_distance} •
                                    소요시간 {place.next_time}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-4 sm:space-y-6" data-oid="ewuh0o6">
            {/* Course Summary */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="tna1sky"
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                data-oid="rdvocr7"
              >
                코스 요약
              </h3>
              <div className="space-y-3 sm:space-y-4" data-oid="nf9galu">
                <div
                  className="flex justify-between items-center"
                  data-oid="ag10olx"
                >
                  <span className="text-sm text-gray-600" data-oid="1of1j_7">
                    총 기간
                  </span>
                  <span className="font-medium" data-oid="twxnk95">
                    {ai_courseText[0].duration}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="oxu16ck"
                >
                  <span className="text-sm text-gray-600" data-oid="mjoff3j">
                    참가자
                  </span>
                  <span className="font-medium" data-oid="e2kx:v0">
                    {ai_courseText[0].participants}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid=".-1lift"
                >
                  <span className="text-sm text-gray-600" data-oid="uo.yb0u">
                    총 비용
                  </span>
                  <span className="font-bold text-blue-600" data-oid="bklu7ia">
                    {comma(ai_courseText[0].total_cost)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="coe9d:y"
                >
                  <span className="text-sm text-gray-600" data-oid="dsfse28">
                    난이도
                  </span>
                  <span className="font-medium" data-oid="_lh.l0u">
                    {ai_courseText[0].difficulty}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="w-wtkzl"
                >
                  <span className="text-sm text-gray-600" data-oid="-wk5e7s">
                    총 거리
                  </span>
                  <span className="font-medium" data-oid="_zvyg4z">
                    {ai_courseText[0].total_distance}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="i4s:9.p"
                >
                  <span className="text-sm text-gray-600" data-oid="u3b9zkj">
                    예상 시간
                  </span>
                  <span className="font-medium" data-oid="3.ak_.u">
                    {ai_courseText[0].estimated_time}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="qilu6y."
                >
                  <span className="text-sm text-gray-600" data-oid="eyr615d">
                    AI 신뢰도
                  </span>
                  <div className="flex items-center" data-oid="_.uz4_1">
                    <span className="font-medium" data-oid="47w8v3e">
                      {ai_courseText[0].reliability}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="fe0d1ur"
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                data-oid="dr.yxqk"
              >
                통계
              </h3>
              <div className="space-y-3 sm:space-y-4" data-oid="6ntr7vf">
                <div
                  className="flex justify-between items-center"
                  data-oid="1xtm:vg"
                >
                  <span className="text-sm text-gray-600" data-oid="g5xy6s4">
                    조회수
                  </span>
                  <span className="font-medium" data-oid="imtq.hz">
                    {ai_courseText[0].views?.toLocaleString()}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="pm:xq42"
                >
                  <span className="text-sm text-gray-600" data-oid="4nkr:va">
                    좋아요
                  </span>
                  <span className="font-medium" data-oid="l4fynrq">
                    {ai_courseText[0].likes}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="s.jz36n"
                >
                  <span className="text-sm text-gray-600" data-oid="5o6qq7t">
                    북마크
                  </span>
                  <span className="font-medium" data-oid="yrygku0">
                    {ai_courseText[0].bookmark}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="_j5xuju"
                >
                  <span className="text-sm text-gray-600" data-oid="_7l4hn8">
                    생성일
                  </span>
                  <span className="font-medium" data-oid="-cpwzj3">
                    {ai_courseText[0].created_at}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="buk3bth"
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                data-oid="eth-uml"
              >
                태그
              </h3>
              <div className="flex flex-wrap gap-2" data-oid="upko3y8">
                {ai_courseText[0].tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm"
                    data-oid="ffv9vhz"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3" data-oid="57_rw86">
              <button
                onClick={() =>
                  router.push(`/map?courseId=${ai_courseText}`)
                }
                className="
                                w-full
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-sm font-medium text-white
                                bg-blue-600
                                hover:bg-blue-700"
                data-oid="4anf-sy"
              >
                <MapPin className="w-4 h-4 mr-2" data-oid="35rd-7_" />
                지도에서 보기
              </button>
              <button
                onClick={handleDownload}
                className="
                                w-full 
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-gray-700 text-sm font-medium
                                bg-gray-100
                                hover:bg-gray-200"
                data-oid="g:qkrct"
              >
                <Download className="w-4 h-4 mr-2" data-oid="kn4f757" />
                코스 다운로드
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
