"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Users,
  Car,
  Calendar,
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
  Menu,
} from "lucide-react"
import { ai_courseText } from "@/common/text/ai"
import { comma } from "@/util/comma"

export default function AICourse() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState(1)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // URL 파라미터에서 사용자 선택 정보 가져오기
  const destination = searchParams.get("destination") || ""
  const duration = searchParams.get("duration") || ""
  const transportation = searchParams.get("transportation") || ""
  const travelers = searchParams.get("travelers") || ""
  const purpose = searchParams.get("purpose") || ""
  const budget = searchParams.get("budget") || ""

  // 선택 정보를 한국어로 변환
  const getDisplayText = (type: string, value: string) => {
    const mappings: Record<string, Record<string, string>> = {
      destination: {
        jeju: "제주도",
        seoul: "서울",
        busan: "부산",
        gangneung: "강릉",
        gyeongju: "경주",
        jeonju: "전주",
      },
      duration: {
        day: "당일치기",
        "1night": "1박 2일",
        "2nights": "2박 3일",
        "3nights": "3박 4일",
        week: "일주일 이상",
      },
      transportation: {
        car: "자동차",
        public: "대중교통",
        flight: "항공기",
        train: "기차",
      },
      travelers: {
        solo: "혼자",
        couple: "커플",
        family: "가족",
        friends: "친구들",
      },
      purpose: {
        healing: "힐링",
        adventure: "모험",
        culture: "문화",
        food: "맛집",
        nature: "자연",
        photo: "사진",
      },
      budget: {
        low: "10만원 이하",
        medium: "10-30만원",
        high: "30-50만원",
        luxury: "50만원 이상",
      },
    }
    return mappings[type]?.[value] || value
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // AI 재생성 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRegenerating(false)
    // 실제로는 새로운 코스를 생성하겠지만, 여기서는 시뮬레이션
  }

  const handleSaveCourse = () => {
    // 코스 저장 로직
    alert("코스가 저장되었습니다!")
  }

  const handleShareCourse = () => {
    // 코스 공유 로직
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다!")
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="lch9c6i"
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8" data-oid="mycs_pn">
        <div className="grid lg:grid-cols-3 gap-8" data-oid="46qf365">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2" data-oid="885xoh-">
            {/* AI Generated Header */}
            <div
              className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 mb-8 relative overflow-hidden"
              data-oid="tcbd-f8"
            >
              <div className="relative z-10" data-oid="z_uh6ur">
                <div
                  className="flex items-center space-x-2 mb-4"
                  data-oid="fcwsx3a"
                >
                  <Sparkles
                    className="w-6 h-6 text-purple-600"
                    data-oid="1644tt."
                  />

                  <span
                    className="text-sm font-medium text-purple-600"
                    data-oid="8csn9n4"
                  >
                    AI 실시간 생성 완료
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="mlgqfl_"
                >
                  {ai_courseText[0].title}
                </h2>
                <p className="text-lg text-gray-600 mb-6" data-oid="2mx33p4">
                  {ai_courseText[0].subtitle}
                </p>

                {/* User Selections */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
                  data-oid=":ecznmr"
                >
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="_f3_65i"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="5g7uj:t"
                    >
                      여행지
                    </div>
                    <div className="font-medium" data-oid="yla9hop">
                      {getDisplayText("destination", destination)}
                    </div>
                  </div>
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="5uznd.2"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="jryelow"
                    >
                      기간
                    </div>
                    <div className="font-medium" data-oid="t51w_d5">
                      {getDisplayText("duration", duration)}
                    </div>
                  </div>
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="knqir-c"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="o-x8ufc"
                    >
                      동행자
                    </div>
                    <div className="font-medium" data-oid="m4b31zl">
                      {getDisplayText("travelers", travelers)}
                    </div>
                  </div>
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="c0p7je_"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="styh.u3"
                    >
                      목적
                    </div>
                    <div className="font-medium" data-oid="jz_2eg.">
                      {getDisplayText("purpose", purpose)}
                    </div>
                  </div>
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="iecnptv"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="bn21dye"
                    >
                      교통수단
                    </div>
                    <div className="font-medium" data-oid="hb:sbe9">
                      {getDisplayText("transportation", transportation)}
                    </div>
                  </div>
                  <div
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3"
                    data-oid="wuml206"
                  >
                    <div
                      className="text-xs text-gray-500 mb-1"
                      data-oid="35z7dk3"
                    >
                      예산
                    </div>
                    <div className="font-medium" data-oid="kzrlfaj">
                      {getDisplayText("budget", budget)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3" data-oid="tc-jjf.">
                  <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    data-oid="-:ja0cv"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
                      data-oid="y_pvlyk"
                    />

                    <span data-oid="ejlyu2z">
                      {isRegenerating ? "재생성 중..." : "다시 생성"}
                    </span>
                  </button>
                  <button
                    onClick={handleSaveCourse}
                    className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="0y6kuna"
                  >
                    <Heart className="w-4 h-4" data-oid="p.zkmv5" />
                    <span data-oid="4uj:8c_">저장</span>
                  </button>
                  <button
                    onClick={handleShareCourse}
                    className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="3t6_-y_"
                  >
                    <Share2 className="w-4 h-4" data-oid="d6oyp56" />
                    <span data-oid="nyejxje">공유</span>
                  </button>
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-purple-600/10 rounded-full"
                data-oid="18_uexo"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-12 h-12 bg-blue-600/10 rounded-full"
                data-oid="_-u51ff"
              ></div>
            </div>

            {/* Course Timeline */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="lud-9ut"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-6"
                data-oid="ygn--28"
              >
                AI 추천 상세 일정
              </h3>
              <div className="space-y-6" data-oid="y60va29">
                {ai_courseText[0].days[0].places.map((place, index) => (
                  <div key={place.id} className="relative" data-oid="_er4ys1">
                    {/* Timeline Line */}
                    {index < ai_courseText[0].days[0].places.length - 1 && (
                      <div
                        className="absolute left-6 top-16 w-0.5 h-20 bg-gray-200"
                        data-oid="bgd0kbk"
                      ></div>
                    )}

                    <div className="flex space-x-4" data-oid="bx4_vk5">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
                        data-oid="b-el4t3"
                      >
                        <Mountain />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0" data-oid="xpb:i7f">
                        <div
                          className="flex items-start justify-between mb-2"
                          data-oid="0zckzjs"
                        >
                          <h4
                            className="text-lg font-semibold text-gray-900"
                            data-oid=".cowdhu"
                          >
                            {place.name}
                          </h4>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
                            data-oid="y25oe6n"
                          >
                            {place.location_type}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3" data-oid="gh6sj7m">
                          {place.description}
                        </p>

                        {/* AI Reasoning */}
                        <div
                          className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                          data-oid="hsu_lge"
                        >
                          <div
                            className="flex items-center space-x-2 mb-1"
                            data-oid="pj5-ir8"
                          >
                            <Sparkles
                              className="w-4 h-4 text-blue-600"
                              data-oid="9c.rc9o"
                            />

                            <span
                              className="text-sm font-medium text-blue-700"
                              data-oid="k5ka7c."
                            >
                              AI 추천 이유
                            </span>
                          </div>
                          <p
                            className="text-sm text-blue-600"
                            data-oid="n8.g4cg"
                          >
                            {place.recommend_reason}
                          </p>
                        </div>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                          data-oid="bd9erfz"
                        >
                          <div className="flex items-center" data-oid="-4nrjif">
                            <MapPin
                              className="w-4 h-4 mr-1"
                              data-oid="6gjk.xq"
                            />

                            <span className="truncate" data-oid="7hf_dg5">
                              {place.location}
                            </span>
                          </div>
                          <div className="flex items-center" data-oid="500i3-q">
                            <Clock
                              className="w-4 h-4 mr-1"
                              data-oid="8c3q.iq"
                            />

                            <span data-oid="v4wjooe">
                              체류 시간: {place.stay}
                            </span>
                          </div>
                        </div>

                        {/* Next Location Info */}
                        {place.next_distance && (
                          <div
                            className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2"
                            data-oid="2bpmz-k"
                          >
                            <Car className="w-4 h-4" data-oid="jybpc9d" />

                            <span data-oid="lzqzou6">
                              다음 장소까지 {place.next_distance} • 소요시간{" "}
                              {place.next_time}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6" data-oid="_i6xt74">
            {/* Course Summary */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
              data-oid="8zvfuyi"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="avb0wch"
              >
                코스 요약
              </h3>
              <div className="space-y-4" data-oid="h8vowgb">
                <div
                  className="flex justify-between items-center"
                  data-oid="k85_r8c"
                >
                  <span className="text-sm text-gray-600" data-oid="sh5-zme">
                    총 장소
                  </span>
                  <span className="font-medium" data-oid="csy:ayx">
                    {ai_courseText[0].total_places}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="ftgez3g"
                >
                  <span className="text-sm text-gray-600" data-oid="9kp7loz">
                    예상 비용
                  </span>
                  <span className="font-bold text-blue-600" data-oid="bebxtu:">
                    {comma(ai_courseText[0].total_cost)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="xwdwme-"
                >
                  <span className="text-sm text-gray-600" data-oid="gph8ekl">
                    AI 신뢰도
                  </span>
                  <div className="flex items-center" data-oid="zloj:uh">
                    <Star
                      className="w-4 h-4 text-yellow-400 mr-1"
                      data-oid="ucmwke5"
                    />

                    <span className="font-medium" data-oid=".-58epd">
                      {ai_courseText[0].rating}
                    </span>
                  </div>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="5kk7s8i"
                >
                  <span className="text-sm text-gray-600" data-oid="24-ctl5">
                    맞춤도
                  </span>
                  <span
                    className="font-medium text-green-600"
                    data-oid="6cthx_a"
                  >
                    {ai_courseText[0].reliability}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border !border-purple-200"
              data-oid="o.i0pfe"
            >
              <h3
                className="font-semibold text-gray-900 mb-4 flex items-center"
                data-oid="_z7zf.w"
              >
                <Sparkles
                  className="w-5 h-5 text-purple-600 mr-2"
                  data-oid="_:n87ol"
                />
                AI 인사이트
              </h3>
              <div className="space-y-3 text-sm" data-oid="yvkv1.7">
                {ai_courseText[0].ai_insight.map((insight, idx) => {
                  return (
                    <div
                    key={idx}
                      className="bg-white/70 rounded-lg p-3"
                      data-oid="3gql7yd"
                    >
                      <div
                        className="font-medium text-purple-700 mb-1"
                        data-oid="wo3zb_j"
                      >
                        {insight.title}
                      </div>
                      <div className="text-gray-600" data-oid="5u::a:s">
                        {insight.insight}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3" data-oid="2q7pyfu">
              <button
                onClick={() => router.push(`/map?courseId=ai-generated`)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                data-oid="zh-gahp"
              >
                <MapPin className="w-5 h-5 mr-2" data-oid="o55dp9p" />
                지도에서 보기
              </button>
              <button
                onClick={handleSaveCourse}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                data-oid="hixlimn"
              >
                <Download className="w-5 h-5 mr-2" data-oid="qkkw400" />
                코스 다운로드
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
