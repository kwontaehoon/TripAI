"use client"

import { ai_RecommendResponse_func } from "@/common/ai/ai_response"
import { useAiRecommendMutation } from "@/hooks/supabase/queries"
import { aiResponseAtom, modalUiStateAtom } from "@/store/ai"
import { cleanJson } from "@/util/cleanJson"
import { useAtom } from "jotai"
import {
  ArrowRight,
  Calendar,
  Car,
  Loader2,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function AIRecommendationModal() {
  const router = useRouter()
  const modalContentRef = useRef<HTMLDivElement>(null)
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

  const [_, setAiResponse] = useAtom(aiResponseAtom)

  const [modalUiState, setModalUiState] = useAtom(modalUiStateAtom)

  const { mutateAsync: aiRecommend, data, isSuccess } = useAiRecommendMutation()

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
    { id: "friends", name: "친구", emoji: "👥", desc: "친구들과 함께" },
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

  useEffect(() => {
    localStorage.removeItem("aiList")
  }, [])

  // 스텝이 변경될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [step])

  useEffect(() => {
    if (isSuccess) {
      setModalUiState({ ...modalUiState, aiInput: false })
      const cleanedJsonString = cleanJson(
        data.candidates[0].content.parts[0].text,
      )

      try {
        const jsonData = JSON.parse(cleanedJsonString)
        setAiResponse(jsonData)
        localStorage.setItem("aiList", JSON.stringify(jsonData))
      } catch (error) {
        console.log(error)
        alert("오류가 발생했습니다. 다시 시도해주세요.")
        router.push("/")
        return
      }

      // 생성된 코스 페이지로 이동
      const destinationValue = isCustomDestination
        ? formData.customDestination
        : formData.destination

      const params = new URLSearchParams({
        destination: destinationValue,
        customDestinationDescription:
          formData.customDestinationDescription || "",
        duration: formData.duration,
        transportation: formData.transportation,
        travelers: formData.travelers,
        purpose: formData.purpose,
        budget: formData.budget,
        generated: "true",
        mapDashboard: "false", // ai-input에서 생성한 ai 코스를 구분하기 위한 값
      })

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

      //   setModalUiState({ ...modalUiState, aiInput: false })
      //   setIsCustomDestination(false)
      router.push(`/ai-course?${params.toString()}`)
    }
  }, [data])

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
    await aiRecommend(ai_RecommendResponse_func(formData))

    setIsGenerating(false)
    setStep(1)
  }

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        const hasDestination = isCustomDestination
          ? formData.customDestination.trim() !== ""
          : formData.destination !== ""
        return hasDestination && formData.duration
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
        ref={modalContentRef}
        className="bg-white rounded-2xl overflow-y-scroll scrollbar-hide"
       
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
         
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
             
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2
                className="text-xl font-bold text-gray-900"
               
              >
                AI 맞춤 여행 코스
              </h2>
              <p className="text-sm text-gray-500">
                몇 가지 질문으로 완벽한 여행을 만들어드려요
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalUiState({ ...modalUiState, aiInput: false })}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
           
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                 
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                   
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {step === 1 && "여행지와 기간을 선택해주세요"}
            {step === 2 && "교통수단과 동행자를 선택해주세요"}
            {step === 3 && "여행 목적과 예산을 선택해주세요"}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Step 1: 여행지 & 기간 */}
          {step === 1 && (
            <div className="space-y-6">
              {/* 여행지 선택 */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-3"
                 
                >
                  어디로 여행가고 싶으세요? *
                </label>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"
                 
                >
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          destination: dest.name,
                          customDestination: "",
                        }))
                        setIsCustomDestination(false)
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.destination === dest.name &&
                        !isCustomDestination
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="text-2xl mb-2">
                        {dest.emoji}
                      </div>
                      <div
                        className="font-medium text-gray-900"
                       
                      >
                        {dest.name}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 직접 입력 옵션 */}
                <div
                  className="border-t !border-gray-200 pt-4"
                 
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
                   
                  >
                    <div
                      className="flex items-center space-x-3"
                     
                    >
                      <div className="text-2xl">
                        ✏️
                      </div>
                      <div>
                        <div
                          className="font-medium text-gray-900"
                         
                        >
                          직접 입력
                        </div>
                        <div
                          className="text-xs text-gray-500"
                         
                        >
                          원하는 여행지를 직접 입력해보세요
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* 커스텀 여행지 입력 필드 */}
                  {isCustomDestination && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                         
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
                         
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                         
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
                         
                        />
                      </div>

                      {/* AI 추천 힌트 */}
                      <div
                        className="bg-purple-50 border !border-purple-200 rounded-lg p-4"
                       
                      >
                        <div
                          className="flex items-start space-x-3"
                         
                        >
                          <div
                            className="text-purple-600 mt-0.5"
                           
                          >
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h4
                              className="text-sm font-medium text-purple-900 mb-1"
                             
                            >
                              AI 추천 팁
                            </h4>
                            <p
                              className="text-sm text-purple-700"
                             
                            >
                              구체적인 여행지명을 입력하면 더 정확한 맞춤 코스를
                              추천받을 수 있어요. 예: &ldquo;부산 해운대&rdquo;,
                              &ldquo;제주도 서귀포&rdquo;, &ldquo;일본
                              오사카&rdquo; 등
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 인기 검색어 제안 */}
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                         
                        >
                          인기 여행지 제안
                        </label>
                        <div
                          className="flex flex-wrap gap-2"
                         
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
              <div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                 
                >
                  <Calendar
                    className="w-5 h-5 mr-2 text-blue-600"
                   
                  />
                  얼마나 머무르실 예정인가요?
                </h3>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() =>
                        setFormData({ ...formData, duration: duration.name })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.duration === duration.name
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="font-medium">
                        {duration.name}
                      </div>
                      <div className="text-sm text-gray-500">
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
            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                 
                >
                  <Car
                    className="w-5 h-5 mr-2 text-blue-600"
                   
                  />
                  어떤 교통수단을 이용하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {transportations.map((transport) => (
                    <button
                      key={transport.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          transportation: transport.name,
                        })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.transportation === transport.name
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="text-2xl mb-1">
                        {transport.emoji}
                      </div>
                      <div className="font-medium">
                        {transport.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transport.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                 
                >
                  <Users
                    className="w-5 h-5 mr-2 text-blue-600"
                   
                  />
                  누구와 함께 여행하시나요?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {travelers.map((traveler) => (
                    <button
                      key={traveler.id}
                      onClick={() =>
                        setFormData({ ...formData, travelers: traveler.name })
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.travelers === traveler.name
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="text-2xl mb-1">
                        {traveler.emoji}
                      </div>
                      <div className="font-medium">
                        {traveler.name}
                      </div>
                      <div className="text-xs text-gray-500">
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
            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                 
                >
                  <Sparkles
                    className="w-5 h-5 mr-2 text-blue-600"
                   
                  />
                  어떤 여행을 원하시나요?
                </h3>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                 
                >
                  {purposes.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() => {
                        if (!isGenerating) {
                          setFormData({ ...formData, purpose: purpose.name })
                        }
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.purpose === purpose.name
                          ? "!border-blue-500 bg-blue-50 text-blue-700"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="text-2xl mb-1">
                        {purpose.emoji}
                      </div>
                      <div className="font-medium">
                        {purpose.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {purpose.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-4"
                 
                >
                  💰 예산은 어느 정도 생각하고 계신가요?
                </h3>
                <div className="space-y-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() => {
                        if (!isGenerating) {
                          setFormData({ ...formData, budget: budget.name })
                        }
                      }}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.budget === budget.name
                          ? "!border-blue-500 bg-blue-50"
                          : "!border-gray-200 hover:!border-gray-300"
                      }`}
                     
                    >
                      <div className="font-medium">
                        {budget.name}
                      </div>
                      <div className="text-sm text-gray-500">
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
            <div className="text-center py-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
               
              >
                <Loader2
                  className="w-8 h-8 text-blue-600 animate-spin"
                 
                />
              </div>
              <h3
                className="text-lg font-semibold text-gray-900 mb-2"
               
              >
                AI가 여행 코스를 생성하고 있어요
              </h3>
              <p className="text-gray-600">
                잠시만 기다려주세요...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div
            className="flex items-center justify-between p-6 border-t !border-gray-200"
           
          >
            <button
              onClick={() =>
                step > 1
                  ? setStep(step - 1)
                  : setModalUiState({ ...modalUiState, aiInput: false })
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
             
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
             
            >
              {step === 3 ? "AI 코스 생성" : "다음"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
