import { useBoardsQuery, useCoursesQuery } from "@/hooks/supabase/dev"

const Quick = () => {
  const { data: boardsData } = useBoardsQuery()
  const { data: coursesData } = useCoursesQuery()
  let ratingSum = 0
  let reliabilitySum = 0

  for (const board of boardsData) {
    ratingSum += board.rating
    reliabilitySum += Number(board.reliability.replace("%", ""))
  }
  for (const course of coursesData) {
    ratingSum += course.rating
    reliabilitySum += Number(course.reliability.replace("%", ""))
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {(ratingSum / (coursesData.length + boardsData.length)).toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">평균 평점</div>
      </div>
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">
          {(reliabilitySum / (coursesData.length + boardsData.length)).toFixed(
            1,
          )}
        </div>
        <div className="text-xs text-gray-500">만족도</div>
      </div>
    </div>
  )
}

export default Quick
