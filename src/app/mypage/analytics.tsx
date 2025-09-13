"use client"
import moment from "moment"
import React, { useEffect, useState } from "react"

const analytics = ({ userInfo }) => {
  interface MonthlyData {
    month: string
    trips: number
    photos: number
    reviews: number
  }
  const [monthlyData, setMonthlyData] = useState(
    Array.from({ length: 12 }, (_, index) => ({
      month: `${index + 1}월`,
      trips: 0,
      photos: 0,
      reviews: 0,
    })),
  )

  useEffect(() => {
    const updateMonthlyData = Array.from({ length: 12 }, (_, index) => ({
      month: `${index + 1}월`,
      trips: 0,
      photos: 0,
      reviews: 0,
    }))

    userInfo.boards.map((board) => {
      if (moment(board.created_at).year() === moment().year()) {
        // months 값
        updateMonthlyData[moment(board.created_at).month()].trips += 1
        // photos 값
        updateMonthlyData[moment(board.created_at).month()].photos +=
          board.board_images.length
      }
    })
    setMonthlyData(updateMonthlyData)
  }, [])

  const [activeMetric, setActiveMetric] = useState("trips")
  return (
    <div className="space-y-6" data-oid="xx0eth7">
      <div className="flex">
        <h2
          className="flex-1 text-xl font-bold text-gray-900"
          data-oid="8omxw_c"
        >
          활동 분석
        </h2>

        <div className="flex space-x-2 justify-end" data-oid="nlwopiw">
          {["trips", "photos"].map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeMetric === metric
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-oid="-1935k:"
            >
              {metric === "trips"
                ? "여행"
                : metric === "photos"
                  ? "사진"
                  : "리뷰"}
            </button>
          ))}
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-4" data-oid="r9mms9:">
        {monthlyData.map((data, index) => {
          const value = data[activeMetric as keyof MonthlyData] as number
          const maxValue = Math.max(
            ...monthlyData.map(
              (d) => d[activeMetric as keyof MonthlyData] as number,
            ),
          )
          const percentage = (value / maxValue) * 100

          return (
            <div
              key={index}
              className="flex items-center space-x-4"
              data-oid="mj0iks1"
            >
              <div
                className="w-8 text-sm text-gray-600 font-medium"
                data-oid="dvkhtxp"
              >
                {data.month}
              </div>
              <div
                className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden"
                data-oid="h0pxpmq"
              >
                <div
                  className={`bg-gradient-to-r from-gray-900 to-gray-700 h-full rounded-full transition-all duration-1000 flex items-center justify-end ${percentage === 0 ? "pr-0" : "pr-3"}`}
                  style={{ width: `${percentage}%` }}
                  data-oid="9q80ioh"
                >
                  <span
                    className="text-white text-sm font-medium"
                    data-oid="jxdrxb4"
                  >
                    {value}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default analytics
