"use client"

import { useState } from "react"
import {
  X,
  MapPin,
  Calendar,
  Car,
  Users,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { modalUiStateAtom } from "@/store/ai"
import { useAtom } from "jotai"


export default function AIRecommendationModal() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    destination: "",
    customDestination: "",
    customDestinationDescription: "",
    destinationType: "",
    duration: "",
    transportation: "",
    travelers: "",
    purpose: "",
    budget: "",
  })
  const [isCustomDestination, setIsCustomDestination] = useState(false)

  const [modalUiState, setModalUiState] = useAtom(modalUiStateAtom)

  const destinations = [
    { id: "jeju", name: "제주도", emoji: "🌴" },
    { id: "seoul", name: "서울", emoji: "🏙️" },
    { id: "busan", name: "부산", emoji: "🌊" },
    { id: "gangneung", name: "강릉", emoji: "🏔️" },
    { id: "gyeongju", name: "경주", emoji: "🏛️" },
    { id: "jeonju", name: "전주", emoji: "🍜" },
  ]

  const durations = [
    { id: "day", name: "당일치기", desc: "하루 여행" },
    { id: "1night", name: "1박 2일", desc: "주말 여행" },
    { id: "2nights", name: "2박 3일", desc: "짧은 휴가" },
    { id: "3nights", name: "3박 4일", desc: "여유로운 여행" },
    { id: "week", name: "일주일 이상", desc: "장기 여행" },
  ]

  const transportations = [
    { id: "car", name: "자동차", emoji: "🚗", desc: "자유로운 이동" },
    { id: "public", name: "대중교통", emoji: "🚌", desc: "경제적인 이동" },
    { id: "flight", name: "항공기", emoji: "✈️", desc: "빠른 이동" },
    { id: "train", name: "기차", emoji: "🚄", desc: "편안한 이동" },
  ]

  const travelers = [
    { id: "solo", name: "혼자", emoji: "🧳", desc: "나만의 시간" },
    { id: "couple", name: "커플", emoji: "💕", desc: "둘만의 여행" },
    { id: "family", name: "가족", emoji: "👨‍👩‍👧‍👦", desc: "가족과 함께" },
    { id: "friends", name: "친구들", emoji: "👥", desc: "친구들과 함께" },
  ]

  const purposes = [
    { id: "healing", name: "힐링", emoji: "🧘‍♀️", desc: "휴식과 재충전" },
    { id: "adventure", name: "모험", emoji: "🏃‍♂️", desc: "액티비티와 체험" },
    { id: "culture", name: "문화", emoji: "🎭", desc: "역사와 문화 탐방" },
    { id: "food", name: "맛집", emoji: "🍽️", desc: "미식 여행" },
    { id: "nature", name: "자연", emoji: "🌿", desc: "자연 속 여행" },
    { id: "photo", name: "사진", emoji: "📸", desc: "인생샷 명소" },
  ]

  const budgets = [
    { id: "low", name: "10만원 이하", desc: "경제적인 여행" },
    { id: "medium", name: "10-30만원", desc: "적당한 예산" },
    { id: "high", name: "30-50만원", desc: "여유로운 여행" },
    { id: "luxury", name: "50만원 이상", desc: "럭셔리 여행" },
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleGenerate()
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    // AI 생성 시뮬레이션 (3초 대기)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 생성된 코스 페이지로 이동
    const params = new URLSearchParams({
      destination: formData.destination,
      duration: formData.duration,
      transportation: formData.transportation,
      travelers: formData.travelers,
      purpose: formData.purpose,
      budget: formData.budget,
      generated: "true",
    })

    router.push(`/ai-course?${params.toString()}`)
    setModalUiState({ ...modalUiState, aiInput: false })
    setIsGenerating(false)
    setStep(1)
    setFormData({
      destination: "",
      customDestination: "",
      customDestinationDescription: "",
      destinationType: "",
      duration: "",
      transportation: "",
      travelers: "",
      purpose: "",
      budget: "",
    })
  }

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return formData.destination && formData.duration
      case 2:
        return formData.transportation && formData.travelers
      case 3:
        return formData.purpose && formData.budget
      default:
        return false
    }
  }

  return (
    <div className="modal flex flex-col">
      <div
        className="bg-white rounded-2xl overflow-y-scroll scrollbar-hide"
        data-oid="8sgmkor"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
          data-oid="91:ular"
        >
          <div className="flex items-center space-x-3" data-oid="pg4fvz5">
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              data-oid="v3vv.z4"
            >
              <Sparkles className="w-6 h-6 text-white" data-oid="k.8c0t." />
            </div>
            <div data-oid="7-sv:u7">
              <h2
                className="text-xl font-bold text-gray-900"
                data-oid="uc5l:9f"
              >
                AI 맞춤 여행 코스
              </h2>
              <p className="text-sm text-gray-500" data-oid="561nnr2">
                몇 가지 질문으로 완벽한 여행을 만들어드려요
              </p>
            </div>
          </div>
          <button
            onClick={()=>setModalUiState({ ...modalUiState, aiInput: false })}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            data-oid="7wf9p01"
          >
            <X className="w-5 h-5 text-gray-500" data-oid="hx6wjbe" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4" data-oid="ybl61gh">
          <div className="flex items-center space-x-2 mb-2" data-oid="xrcvk_7">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center" data-oid="73n5p5k">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  data-oid="uc0p2r."
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    data-oid="v8ibe6v"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600" data-oid="_06bvk6">
            {step === 1 && "여행지와 기간을 선택해주세요"}
            {step === 2 && "교통수단과 동행자를 선택해주세요"}
            {step === 3 && "여행 목적과 예산을 선택해주세요"}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6" data-oid="q4l:s1v">
          {/* Step 1: 여행지 & 기간 */}
          {step === 1 && (
            <div className="space-y-6" data-oid="mwwdc:z">
              {/* 여행지 선택 */}
              <div className="mb-6" data-oid="destination-section">
                <label
                  className="block text-sm font-medium text-gray-700 mb-3"
                  data-oid="16kp-jq"
                >
                  어디로 여행가고 싶으세요? *
                </label>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"
                  data-oid="yb9dl11"
                >
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          destination: dest.id,
                          customDestination: "",
                        }))
                        setIsCustomDestination(false)
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.destination === dest.id && !isCustomDestination
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="cn29_pu"
                    >
                      <div className="text-2xl mb-2" data-oid="pu4bi7_">
                        {dest.emoji}
                      </div>
                      <div
                        className="font-medium text-gray-900"
                        data-oid="madjf0w"
                      >
                        {dest.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="67uuqw2">
                        {dest.description}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 직접 입력 옵션 */}
                <div
                  className="border-t !border-gray-200 pt-4"
                  data-oid="e9dyc14"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomDestination(!isCustomDestination)
                      if (!isCustomDestination) {
                        setFormData((prev) => ({
                          ...prev,
                          destination: "",
                        }))
                      }
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isCustomDestination
                        ? "!border-purple-500 bg-purple-50"
                        : "!border-gray-200 hover:!border-gray-300"
                    }`}
                    data-oid="k8m:7.y"
                  >
                    <div
                      className="flex items-center space-x-3"
                      data-oid=":kpshdb"
                    >
                      <div className="text-2xl" data-oid="nh7jfgb">
                        ✏️
                      </div>
                      <div data-oid="xh528wn">
                        <div
                          className="font-medium text-gray-900"
                          data-oid="pvr0ejt"
                        >
                          직접 입력
                        </div>
                        <div
                          className="text-xs text-gray-500"
                          data-oid="xnqpr_-"
                        >
                          원하는 여행지를 직접 입력해보세요
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* 커스텀 여행지 입력 필드 */}
                  {isCustomDestination && (
                    <div className="mt-4 space-y-3" data-oid="p9_eeqv">
                      <div data-oid="ej6ggd1">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid="g42im11"
                        >
                          여행지 이름 *
                        </label>
                        <input
                          type="text"
                          value={formData.customDestination}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              customDestination: e.target.value,
                            }))
                          }
                          placeholder="예: 오키나와, 다낭, 프라하, 교토 등"
                          className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          data-oid="kco5vrj"
                        />
                      </div>

                      <div data-oid="3om3zl0">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid="9vcyyex"
                        >
                          여행지 설명 (선택사항)
                        </label>
                        <textarea
                          value={formData.customDestinationDescription}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              customDestinationDescription: e.target.value,
                            }))
                          }
                          placeholder="여행지에 대한 간단한 설명이나 특별한 요청사항을 입력해주세요"
                          rows={3}
                          className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          data-oid="mygpxck"
                        />
                      </div>

                      {/* AI 추천 힌트 */}
                      <div
                        className="bg-purple-50 border !border-purple-200 rounded-lg p-4"
                        data-oid="04k06og"
                      >
                        <div
                          className="flex items-start space-x-3"
                          data-oid="owjsi1h"
                        >
                          <div
                            className="text-purple-600 mt-0.5"
                            data-oid="9zmp8uk"
                          >
                            <Sparkles className="w-5 h-5" data-oid="r536kiq" />
                          </div>
                          <div data-oid="b9aqc-h">
                            <h4
                              className="text-sm font-medium text-purple-900 mb-1"
                              data-oid="h6l4_0t"
                            >
                              AI 추천 팁
                            </h4>
                            <p
                              className="text-sm text-purple-700"
                              data-oid="6xg2qvg"
                            >
                              구체적인 여행지명을 입력하면 더 정확한 맞춤 코스를
                              추천받을 수 있어요. 예: "부산 해운대", "제주도
                              서귀포", "일본 오사카" 등
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 인기 검색어 제안 */}
                      <div data-oid="mrq9b8a">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid="k9qn38l"
                        >
                          인기 여행지 제안
                        </label>
                        <div
                          className="flex flex-wrap gap-2"
                          data-oid="bv7m333"
                        >
                          {[
                            "오키나와",
                            "다낭",
                            "방콕",
                            "싱가포르",
                            "홍콩",
                            "타이베이",
                            "도쿄",
                            "오사카",
                            "후쿠오카",
                            "괌",
                            "사이판",
                            "세부",
                            "파리",
                            "런던",
                            "로마",
                            "바르셀로나",
                            "프라하",
                            "비엔나",
                            "뉴욕",
                            "로스앤젤레스",
                            "하와이",
                            "라스베이거스",
                          ].map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  customDestination: suggestion,
                                }))
                              }
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                              data-oid="3w6crbb"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>{" "}
              <div data-oid="bg1tr4a">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="fleqmj:"
                >
                  <Calendar
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="3.vo3ks"
                  />
                  얼마나 머무르실 예정인가요?
                </h3>
                <div className="space-y-2" data-oid="fp6z9o5">
                  {durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() =>
                        setFormData({ ...formData, duration: duration.id })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.duration === duration.id
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="9fc-kau"
                    >
                      <div className="font-medium" data-oid="tkm_3yt">
                        {duration.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="gsb4mh5">
                        {duration.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 교통수단 & 동행자 */}
          {step === 2 && (
            <div className="space-y-6" data-oid="-2j4jp4">
              <div data-oid="0djpgt4">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="iv.cqd0"
                >
                  <Car
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="r1a.z09"
                  />
                  어떤 교통수단을 이용하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3" data-oid="dhq0ib.">
                  {transportations.map((transport) => (
                    <button
                      key={transport.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          transportation: transport.id,
                        })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.transportation === transport.id
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="60gts7b"
                    >
                      <div className="text-2xl mb-1" data-oid=":lpq08d">
                        {transport.emoji}
                      </div>
                      <div className="font-medium" data-oid=".b7xiq6">
                        {transport.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="4xtgakm">
                        {transport.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div data-oid="nfetx33">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="1e0mac9"
                >
                  <Users
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="tvfr:hc"
                  />
                  누구와 함께 여행하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3" data-oid="lpn:j9p">
                  {travelers.map((traveler) => (
                    <button
                      key={traveler.id}
                      onClick={() =>
                        setFormData({ ...formData, travelers: traveler.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.travelers === traveler.id
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="7rnugh7"
                    >
                      <div className="text-2xl mb-1" data-oid="-fj_i4x">
                        {traveler.emoji}
                      </div>
                      <div className="font-medium" data-oid="vfhfjxc">
                        {traveler.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="wxr90o6">
                        {traveler.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 목적 & 예산 */}
          {step === 3 && (
            <div className="space-y-6" data-oid="ad1m9k7">
              <div data-oid="ior_2yy">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="j4mn1ls"
                >
                  <Sparkles
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid=":ytnz78"
                  />
                  어떤 여행을 원하시나요?
                </h3>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  data-oid="2agd._x"
                >
                  {purposes.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() =>
                        setFormData({ ...formData, purpose: purpose.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.purpose === purpose.id
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="-mpatwf"
                    >
                      <div className="text-2xl mb-1" data-oid="nsaul7i">
                        {purpose.emoji}
                      </div>
                      <div className="font-medium" data-oid="fmu3z2i">
                        {purpose.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="zu9-0th">
                        {purpose.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div data-oid=":ka9nhz">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                  data-oid="cchyrxe"
                >
                  💰 예산은 어느 정도 생각하고 계신가요?
                </h3>
                <div className="space-y-2" data-oid="_c_dddi">
                  {budgets.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() =>
                        setFormData({ ...formData, budget: budget.id })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.budget === budget.id
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                      data-oid="c.du8dk"
                    >
                      <div className="font-medium" data-oid="76o649o">
                        {budget.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="a6vt3wq">
                        {budget.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-8" data-oid="gxtwp.7">
              <div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
                data-oid="00o0e9d"
              >
                <Loader2
                  className="w-8 h-8 text-blue-600 animate-spin"
                  data-oid="h:ajb16"
                />
              </div>
              <h3
                className="text-lg font-semibold text-gray-900 mb-2"
                data-oid="valzkjo"
              >
                AI가 여행 코스를 생성하고 있어요
              </h3>
              <p className="text-gray-600" data-oid="hwse_l:">
                잠시만 기다려주세요...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div
            className="flex items-center justify-between p-6 border-t !border-gray-200"
            data-oid="gryq2zh"
          >
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : setModalUiState({ ...modalUiState, aiInput: false }))}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              data-oid="wwq9v38"
            >
              {step > 1 ? "이전" : "취소"}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepComplete(step)}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center ${
                isStepComplete(step)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              data-oid=":r9:7iu"
            >
              {step === 3 ? "AI 코스 생성" : "다음"}
              <ArrowRight className="w-4 h-4 ml-1" data-oid="a7bkyzi" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
