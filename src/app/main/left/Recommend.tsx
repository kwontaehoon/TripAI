"use client"
import React from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCoursesQuery } from "@/hooks/supabase/dev"

const Recommend = () => {
  const router = useRouter()
  const { data: coursesData } = useCoursesQuery()

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          AI 추천 여행 코스
        </h3>
        <button
          onClick={() => router.push("/courses")}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          data-oid=".o:lty4"
        >
          더보기
          <ArrowRight className="w-4 h-4 ml-1" data-oid="7:1utcm" />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {coursesData.slice(0, 4).map((course) => (
          <button
            onClick={() => router.push(`/courses/details/${course.id}`)}
            key={course.id}
            className="
                    p-4
                    rounded-xl
                    text-left
              bg-white border !border-gray-200
              hover:shadow-md hover:border-blue-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {course.title}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Recommend
