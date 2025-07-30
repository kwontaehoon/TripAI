"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  MapPin,
  Clock,
  Zap,
  Car,
  Sparkles,
  Calendar,
  Download,
  Mountain,
  Share2,
  Heart,
  RefreshCw,
  Star
} from "lucide-react"
import { comma } from "@/util/comma"
import { If } from "react-haiku"
import Card from "@/common/card/course_details_card"

export default function AICourse() {
  const [aiCourseData, setAiCourseData] = useState([])
  console.log("aiCourseData: ", aiCourseData)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [selectedDay, setSelectedDay] = useState(1)

  // URL 파라미터에서 사용자 선택 정보 가져오기
  const destination = searchParams.get("destination") || ""
  const duration = searchParams.get("duration") || ""
  const transportation = searchParams.get("transportation") || ""
  const travelers = searchParams.get("travelers") || ""
  const purpose = searchParams.get("purpose") || ""
  const budget = searchParams.get("budget") || ""
  const mapDashboard = searchParams.get("mapDashboard") || ""

  useEffect(() => {
    const stored = localStorage.getItem("aiList")
    if (stored) {
      setAiCourseData(JSON.parse(stored))
    }
  }, [])

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

  const selectedDayData = aiCourseData[0]?.course_days?.find(
    (day) => day.day === selectedDay,
  )

  return (
    aiCourseData.length !== 0 && (
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
                    {aiCourseData[0].title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6" data-oid="2mx33p4">
                    {aiCourseData[0].subtitle}
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
                        {/* 여행지가 한 개일 때 */}
                        <If isTrue={destination.split(",").length === 1}>
                          {destination}
                        </If>
                        {/* 여행지가 여러 개일 때 */}
                        <If isTrue={destination.split(",").length !== 1}>
                          {destination.split(",")[0]} 외{" "}
                          {destination.split(",").length - 1}곳
                        </If>
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
                        {/* 맞춤 코스 */}
                        <If isTrue={duration !== ""}>{duration}</If>
                        {/* 선택 코스 */}
                        <If isTrue={duration === ""}>
                          {aiCourseData[0].duration}
                        </If>
                      </div>
                    </div>
                    {/* 맞춤 코스 */}
                    <If isTrue={travelers !== ""}>
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
                          {travelers}
                        </div>
                      </div>
                    </If>
                    {/* 맞춤 코스 */}
                    <If isTrue={purpose !== ""}>
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
                          {purpose}
                        </div>
                      </div>
                    </If>
                    {/* 맞춤 코스 */}
                    <If isTrue={transportation !== ""}>
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
                          {transportation}
                        </div>
                      </div>
                    </If>
                    {/* 맞춤 코스 */}
                    <If isTrue={budget !== ""}>
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
                          {budget}
                        </div>
                      </div>
                    </If>
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

              {/* Day Selector */}
              <div
                className="bg-white rounded-2xl p-6 border !border-gray-200 mb-6"
                data-oid="4717ro6"
              >
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                  data-oid="hx.4ac5"
                >
                  일정 선택
                </h3>
                <div className="flex gap-2 overflow-x-auto" data-oid="1lb45jp">
                  {aiCourseData[0].course_days.map((day) => (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDay(day.day)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDay === day.day
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      data-oid="gon_ic2"
                    >
                      Day {day.day}
                    </button>
                  ))}
                </div>
              </div>

              <Card data={aiCourseData} selectedDay={selectedDay} />
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
                      {aiCourseData[0].total_places}개
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="k85_r8c"
                  >
                    <span className="text-sm text-gray-600" data-oid="sh5-zme">
                      인원 수
                    </span>
                    <span className="font-medium" data-oid="csy:ayx">
                      {aiCourseData[0].participants}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="ftgez3g"
                  >
                    <span className="text-sm text-gray-600" data-oid="9kp7loz">
                      예상 비용
                    </span>
                    <span
                      className="font-bold text-blue-600"
                      data-oid="bebxtu:"
                    >
                      {comma(aiCourseData[0].total_cost, true)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="ftgez3g"
                  >
                    <span className="text-sm text-gray-600" data-oid="9kp7loz">
                      총 거리
                    </span>
                    <span
                      data-oid="bebxtu:"
                    >
                      {aiCourseData[0].total_distance}
                    </span>
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
                      {aiCourseData[0].reliability}
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
                  {aiCourseData[0].course_ai_insights.map((insight, idx) => {
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
                  onClick={() => router.push(`/map?courseId=ai-course`)}
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
  )
}
