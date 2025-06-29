import React from "react"
import { ArrowRight } from "lucide-react"

const Recommend = () => {
  const aiSuggestions = [
    "가족과 함께하는 제주도 여행",
    "연인과의 로맨틱한 서울 데이트",
    "친구들과 떠나는 부산 여행",
    "혼자 즐기는 경주 힐링 여행",
  ]

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        AI 추천 여행 코스
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {aiSuggestions.map((suggestion, index) => (
          <button
            key={index}
            className="
                    p-4
                    rounded-xl
                    text-left
              bg-white border !border-gray-200
              hover:shadow-md hover:border-blue-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {suggestion}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Recommend
