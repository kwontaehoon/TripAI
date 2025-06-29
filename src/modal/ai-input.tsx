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

const AiInput = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    transportation: "",
    travelers: "",
    purpose: "",
    budget: "",
  })
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

  if (!modalUiState.aiInput) return null

  return (
    <div className="modal flex flex-col">
      <div
        className="bg-white rounded-2xl overflow-y-scroll scrollbar-hide"
        data-oid="8sgmkor"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
          data-oid="ue9y66v"
        >
          <div className="flex items-center space-x-3" data-oid="wdlvf5k">
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              data-oid="-x.t1h2"
            >
              <Sparkles className="w-6 h-6 text-white" data-oid="c-i.2e5" />
            </div>
            <div data-oid="e0-en0k">
              <h2
                className="text-xl font-bold text-gray-900"
                data-oid="i6ha2f2"
              >
                AI 맞춤 여행 코스
              </h2>
              <p className="text-sm text-gray-500" data-oid="fahr.c7">
                몇 가지 질문으로 완벽한 여행을 만들어드려요
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalUiState({ ...modalUiState, aiInput: false })}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            data-oid="7ghju2_"
          >
            <X className="w-5 h-5 text-gray-500" data-oid="irfj:h7" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4" data-oid="sm8va83">
          <div className="flex items-center space-x-2 mb-2" data-oid="k_2f_pi">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center" data-oid="989xh_-">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  data-oid="iehrp5r"
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    data-oid="znzdiql"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600" data-oid="tnw2:tj">
            {step === 1 && "여행지와 기간을 선택해주세요"}
            {step === 2 && "교통수단과 동행자를 선택해주세요"}
            {step === 3 && "여행 목적과 예산을 선택해주세요"}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6" data-oid=":9ogeko">
          {/* Step 1: 여행지 & 기간 */}
          {step === 1 && (
            <div className="space-y-6" data-oid="j54i88m">
              <div data-oid="my7_jem">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="o97jvwf"
                >
                  <MapPin
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="h78baz7"
                  />
                  어디로 떠나고 싶으신가요?
                </h3>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  data-oid="yltub3k"
                >
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() =>
                        setFormData({ ...formData, destination: dest.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.destination === dest.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="33pbqpt"
                    >
                      <div className="text-2xl mb-1" data-oid="p8i68a3">
                        {dest.emoji}
                      </div>
                      <div className="font-medium" data-oid="c785r7r">
                        {dest.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div data-oid="m2j4uze">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="l33i_6a"
                >
                  <Calendar
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="0s4b4ah"
                  />
                  얼마나 머무르실 예정인가요?
                </h3>
                <div className="space-y-2" data-oid=":c-j:s:">
                  {durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() =>
                        setFormData({ ...formData, duration: duration.id })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.duration === duration.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="1jo9xmq"
                    >
                      <div className="font-medium" data-oid="ypn-m:n">
                        {duration.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="afp040:">
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
            <div className="space-y-6" data-oid="uw3d-9i">
              <div data-oid="txazp8g">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="ngouekp"
                >
                  <Car
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="gvna_ek"
                  />
                  어떤 교통수단을 이용하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3" data-oid="0w7hn1e">
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
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="czaevo."
                    >
                      <div className="text-2xl mb-1" data-oid="nr8zrwn">
                        {transport.emoji}
                      </div>
                      <div className="font-medium" data-oid="020yb4k">
                        {transport.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="7k.gfrz">
                        {transport.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div data-oid="9y9pncc">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="ixisq4c"
                >
                  <Users
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="yp2h_rj"
                  />
                  누구와 함께 여행하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3" data-oid="9noxjjj">
                  {travelers.map((traveler) => (
                    <button
                      key={traveler.id}
                      onClick={() =>
                        setFormData({ ...formData, travelers: traveler.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.travelers === traveler.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="6n.4if4"
                    >
                      <div className="text-2xl mb-1" data-oid="s8.rm.u">
                        {traveler.emoji}
                      </div>
                      <div className="font-medium" data-oid="wgq0hn6">
                        {traveler.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="_3jzi_w">
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
            <div className="space-y-6" data-oid="koaxmbg">
              <div data-oid="d-_kadq">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                  data-oid="i-k03d6"
                >
                  <Sparkles
                    className="w-5 h-5 mr-2 text-blue-600"
                    data-oid="0pu9tro"
                  />
                  어떤 여행을 원하시나요?
                </h3>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  data-oid="nk68bcw"
                >
                  {purposes.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() =>
                        setFormData({ ...formData, purpose: purpose.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.purpose === purpose.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="2bz08sg"
                    >
                      <div className="text-2xl mb-1" data-oid="8cixc07">
                        {purpose.emoji}
                      </div>
                      <div className="font-medium" data-oid=".wf4090">
                        {purpose.name}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="m9yz9ge">
                        {purpose.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div data-oid="mh3ja4e">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                  data-oid="v-5ubsx"
                >
                  💰 예산은 어느 정도 생각하고 계신가요?
                </h3>
                <div className="space-y-2" data-oid="-h3ic2l">
                  {budgets.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() =>
                        setFormData({ ...formData, budget: budget.id })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.budget === budget.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-oid="_p---4m"
                    >
                      <div className="font-medium" data-oid="f1b.lun">
                        {budget.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="g:bcjg9">
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
            <div className="text-center py-8" data-oid="gmsp31z">
              <div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
                data-oid="ka92u1c"
              >
                <Loader2
                  className="w-8 h-8 text-blue-600 animate-spin"
                  data-oid="cm3pahl"
                />
              </div>
              <h3
                className="text-lg font-semibold text-gray-900 mb-2"
                data-oid="rcvk4ss"
              >
                AI가 여행 코스를 생성하고 있어요
              </h3>
              <p className="text-gray-600" data-oid="tdhv-6m">
                잠시만 기다려주세요...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div
            className="flex items-center justify-between p-6 border-t border-gray-200"
            data-oid="37u0bhs"
          >
            <button
              onClick={() =>
                step > 1
                  ? setStep(step - 1)
                  : setModalUiState({ ...modalUiState, aiInput: false })
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              data-oid="6zu0uzc"
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
              data-oid="bj_aw7t"
            >
              {step === 3 ? "AI 코스 생성" : "다음"}
              <ArrowRight className="w-4 h-4 ml-1" data-oid="ef:snzj" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default AiInput
