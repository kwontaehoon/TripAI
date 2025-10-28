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

  return (currentSearchData?.length ?? 0) === 0 ? (
    <div className="bg-white rounded-2xl p-6 border !border-gray-200 animate-pulse">
      <h3 className="font-semibold text-gray-900 mb-4">
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </h3>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  ) : (
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
