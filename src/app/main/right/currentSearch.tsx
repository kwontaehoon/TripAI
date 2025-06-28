import React from "react"

const currentSearch = () => {
  const recentSearches = [
    "제주도 3박 4일 가족여행",
    "서울 데이트 코스",
    "부산 맛집 투어",
    "경주 역사 탐방",
  ]
  return (
    <div className="bg-white rounded-2xl p-6 border !border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">최근 검색어</h3>
      <div className="space-y-2">
        {recentSearches.map((search, index) => (
          <button
            key={index}
            className="
            w-full 
            py-1
            text-left text-sm text-gray-600 
            hover:text-blue-600"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

export default currentSearch
