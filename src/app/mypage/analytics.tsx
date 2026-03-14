"use client"
import React, { useState } from "react"

const analytics = ({ userInfo, analyticsData }) => {
  interface MonthlyData {
    month: string
    trips: number
    photos: number
    reviews: number
  }

  const [activeMetric, setActiveMetric] = useState("trips")
  return (
    <div className="space-y-6">
      <div className="flex">
        <h2
          className="flex-1 text-lg font-semibold text-gray-900"
         
        >
          활동 분석
        </h2>

        <div className="flex space-x-2 justify-end">
          {["trips", "photos"].map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeMetric === metric
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
             
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
      <div className="space-y-4">
        {analyticsData.map((data, index) => {
          const value = data[activeMetric as keyof MonthlyData] as number
          const maxValue = Math.max(
            ...analyticsData.map(
              (d) => d[activeMetric as keyof MonthlyData] as number,
            ),
          )
          const percentage = (value / maxValue) * 100

          return (
            <div
              key={index}
              className="flex items-center space-x-4"
             
            >
              <div
                className="w-8 text-sm text-gray-600 font-medium"
               
              >
                {data.month}
              </div>
              <div
                className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden"
               
              >
                <div
                  className={`bg-gradient-to-r from-gray-900 to-gray-700 h-full rounded-full transition-all duration-1000 flex items-center justify-end ${percentage === 0 ? "pr-0" : "pr-3"}`}
                  style={{ width: `${percentage}%` }}
                 
                >
                  <span
                    className="text-white text-sm font-medium"
                   
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
