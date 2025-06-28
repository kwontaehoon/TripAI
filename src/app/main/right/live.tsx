import React from "react"

const live = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border !border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-900">실시간</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-3">2024.03.18</h3>
      <div className="space-y-3">
        <div className="text-sm text-gray-600">
          <div className="font-medium mb-1">새롭게 업데이트 되어</div>
          <div>
            이제는 음성 인식을 통해 여행지를 검색할 수 있어요. 마이크 버튼을
            눌러 음성으로 검색해보세요!
          </div>
        </div>
        <div className="pt-3 border-t !border-gray-100">
          <div className="text-xs text-gray-500 mb-2">• 새로운 기능 소개</div>
          <div className="text-xs text-gray-600">
            <div>출시: 2024.03.18 09:00</div>
            <div>종료: 2024.03.18 23:00</div>
          </div>
          <div className="text-xs text-gray-500 mt-2">업데이트</div>
        </div>
      </div>
    </div>
  )
}

export default live
