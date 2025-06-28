import React from "react"

const Quick = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-blue-600 mb-1">4.9</div>
        <div className="text-xs text-gray-500">평균 평점</div>
      </div>
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
        <div className="text-xs text-gray-500">만족도</div>
      </div>
    </div>
  )
}

export default Quick
