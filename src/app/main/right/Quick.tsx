"use client"
import { useBoardsQuery, useCoursesQuery } from "@/hooks/supabase/dev"

const Quick = () => {
  
  const { data: boardsData, isLoading: boardLoading } = useBoardsQuery([])
  const { data: coursesData, isLoading: courseLoading } = useCoursesQuery([])
  let ratingSum = 0
  let reliabilitySum = 0

  const boards = Array.isArray(boardsData) ? boardsData : [];
  const courses = Array.isArray(coursesData) ? coursesData : [];

  for (const board of boards) {
    ratingSum += board.rating
    reliabilitySum += Number(board.reliability.replace("%", ""))
  }
  for (const course of courses) {
    ratingSum += course.rating
    reliabilitySum += Number(course.reliability.replace("%", ""))
  }

  return boardLoading || courseLoading ? (
    ""
  ) : (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {(ratingSum / (coursesData.length + (boardsData.length))).toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">평균 평점</div>
      </div>
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">
          {(reliabilitySum / (coursesData.length + (boardsData.length))).toFixed(
            1,
          )}
        </div>
        <div className="text-xs text-gray-500">만족도</div>
      </div>
    </div>
  )
}

export default Quick
