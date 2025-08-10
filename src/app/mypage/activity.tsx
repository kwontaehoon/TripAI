import React, { useState } from "react"
import {
    MapPin,
    Calendar,
    Star,
    Bookmark,
    ChevronRight
  } from "lucide-react"
const activity = () => {
  interface RecentActivity {
    id: number
    type: "review" | "bookmark" | "trip"
    title: string
    date: string
    rating?: number
    location?: string
  }
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: "review",
      title: "교토 전통 료칸 체험 후기",
      date: "2024.03.18",
      rating: 5,
      location: "교토",
    },
    {
      id: 2,
      type: "bookmark",
      title: "오사카 현지인 추천 맛집 리스트",
      date: "2024.03.16",
      location: "오사카",
    },
    {
      id: 3,
      type: "trip",
      title: "도쿄 벚꽃 명소 투어 5일",
      date: "2024.03.10",
      location: "도쿄",
    },
    {
      id: 4,
      type: "review",
      title: "후쿠오카 야타이 거리 탐방기",
      date: "2024.03.02",
      rating: 5,
      location: "후쿠오카",
    },
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Star className="w-4 h-4 text-yellow-500" data-oid="y3s17nb" />
      case "bookmark":
        return <Bookmark className="w-4 h-4 text-blue-500" data-oid="71vzd-r" />
      case "trip":
        return <MapPin className="w-4 h-4 text-green-500" data-oid="od_fc-z" />
      default:
        return <Calendar className="w-4 h-4 text-gray-500" data-oid="oi3oyfo" />
    }
  }

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case "review":
        return "리뷰 작성"
      case "bookmark":
        return "북마크 추가"
      case "trip":
        return "여행 완료"
      default:
        return "활동"
    }
  }

  return (
    <div className="space-y-6" data-oid="a3zx42r">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
        data-oid="w69z0n:"
      >
        최근 활동
      </h3>

      <div className="space-y-4" data-oid="jp-72ln">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            data-oid="b:_1k5h"
          >
            <div className="flex-shrink-0" data-oid="0n_urxr">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1" data-oid="0-3t:n8">
              <div
                className="flex items-center space-x-2 mb-1"
                data-oid="0-2-apw"
              >
                <span
                  className="text-sm font-medium text-gray-900"
                  data-oid="lsb37nt"
                >
                  {getActivityTypeText(activity.type)}
                </span>
                {activity.rating && (
                  <div
                    className="flex items-center space-x-1"
                    data-oid="7-:o5k4"
                  >
                    <Star
                      className="w-3 h-3 text-yellow-400 fill-current"
                      data-oid="700-s:z"
                    />

                    <span className="text-xs text-gray-600" data-oid="rrhku.h">
                      {activity.rating}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1" data-oid="jqrl7v2">
                {activity.title}
              </p>
              <div
                className="flex items-center space-x-2 text-xs text-gray-500"
                data-oid="l35sm2n"
              >
                <span data-oid="aboqh8e">{activity.date}</span>
                {activity.location && (
                  <>
                    <span data-oid="o8z1yx8">•</span>
                    <span data-oid="ew_9y-a">{activity.location}</span>
                  </>
                )}
              </div>
            </div>
            <ChevronRight
              className="w-4 h-4 text-gray-400"
              data-oid="ws1lf7d"
            />
          </div>
        ))}
      </div>

      <div className="text-center" data-oid="ua1k0hh">
        <button
          className="text-purple-600 hover:text-purple-700 font-medium"
          data-oid="0_9lp44"
        >
          더 많은 활동 보기
        </button>
      </div>
    </div>
  )
}

export default activity
