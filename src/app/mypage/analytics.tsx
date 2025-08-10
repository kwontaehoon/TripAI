import React, { useState } from "react"

const analytics = () => {
  interface MonthlyData {
    month: string
    trips: number
    photos: number
    reviews: number
  }
  const [monthlyData] = useState<MonthlyData[]>([
    { month: "1월", trips: 2, photos: 45, reviews: 3 },
    { month: "2월", trips: 1, photos: 28, reviews: 2 },
    { month: "3월", trips: 3, photos: 67, reviews: 4 },
    { month: "4월", trips: 2, photos: 52, reviews: 3 },
    { month: "5월", trips: 4, photos: 89, reviews: 6 },
    { month: "6월", trips: 3, photos: 71, reviews: 5 },
  ])

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
          {["trips", "photos", "reviews"].map((metric) => (
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
                  className="bg-gradient-to-r from-gray-900 to-gray-700 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
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
