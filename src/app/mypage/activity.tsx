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
        return <Star className="w-4 h-4 text-yellow-500" />
      case "bookmark":
        return <Bookmark className="w-4 h-4 text-blue-500" />
      case "trip":
        return <MapPin className="w-4 h-4 text-green-500" />
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />
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
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
       
      >
        최근 활동
      </h3>

      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
           
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div
                className="flex items-center space-x-2 mb-1"
               
              >
                <span
                  className="text-sm font-medium text-gray-900"
                 
                >
                  {getActivityTypeText(activity.type)}
                </span>
                {activity.rating && (
                  <div
                    className="flex items-center space-x-1"
                   
                  >
                    <Star
                      className="w-3 h-3 text-yellow-400 fill-current"
                     
                    />

                    <span className="text-xs text-gray-600">
                      {activity.rating}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1">
                {activity.title}
              </p>
              <div
                className="flex items-center space-x-2 text-xs text-gray-500"
               
              >
                <span>{activity.date}</span>
                {activity.location && (
                  <>
                    <span>•</span>
                    <span>{activity.location}</span>
                  </>
                )}
              </div>
            </div>
            <ChevronRight
              className="w-4 h-4 text-gray-400"
             
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          className="text-purple-600 hover:text-purple-700 font-medium"
         
        >
          더 많은 활동 보기
        </button>
      </div>
    </div>
  )
}

export default activity
