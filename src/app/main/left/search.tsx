import React, { useState } from "react"
import { Search, Sparkles, ArrowRight, Send, Mic, Zap } from "lucide-react"
import { useAtom } from "jotai"
import { modalUiStateAtom } from "@/store/ai"

const search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [modalUiState, setModalUiState] = useAtom(modalUiStateAtom)

  return (
    <div
      className="
    relative overflow-hidden
    p-8 mb-8
    rounded-3xl
    bg-yellow-100 bg-gradient-to-br from-gray-100 to-gray-200 "
    >
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-6 h-6 text-blue-600" />

        <span className="text-sm font-medium text-gray-600">
          AI 크리에이티브 디렉터
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
        완벽한 여행 코스가 필요할 때,
      </h2>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
        <span className="text-blue-600">"TripAI"</span>가 함께할게요.
      </h2>

      {/* search bar */}
      <div className="relative mb-6">
        <div
          className="
          flex items-center
          p-2
          rounded-2xl border !border-gray-200
          bg-white shadow-lg"
        >
          <div className="flex-1 flex items-center space-x-3 px-4">
            <Search className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="어떤 여행을 계획하고 계신가요?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`
                p-2
                rounded-xl
                ${
                  isListening
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              className="
              p-2
              rounded-xl
              text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <button
          className="
        flex flex-1 items-center
        space-x-2 
        text-blue-600 font-medium
        hover:text-blue-700"
        >
          <span>로그인 후 이용하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setModalUiState({ ...modalUiState, aiInput: true })}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          data-oid="p3hzuw8"
        >
          <Zap className="w-4 h-4" data-oid="r8wgtbh" />
          <span data-oid="pfnw9z8">AI 맞춤 코스</span>
        </button>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"></div>
      <div className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"></div>
    </div>
  )
}

export default search
