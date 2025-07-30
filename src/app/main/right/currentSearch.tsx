import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const CurrentSearch = () => {
  const router = useRouter()
  const [currentSearchData, setCurrentSearchData] = useState([])

  useEffect(() => {
    const currentSearch = JSON.parse(
      localStorage.getItem("currentSearch") || "[]",
    )
    setCurrentSearchData(currentSearch)
  }, [])

  return currentSearchData.length === 0 ? '' : (
    <div className="bg-white rounded-2xl p-6 border !border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">최근 검색어</h3>
      <div className="space-y-2">
        {currentSearchData.reverse().map((search, index) => (
          <button
            onClick={() => router.push(`/search?q=${search}`)}
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

export default CurrentSearch
