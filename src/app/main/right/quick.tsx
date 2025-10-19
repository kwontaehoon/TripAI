"use client"

const Quick = ({ boardsData, coursesData }) => {
  let ratingSum = 0
  let reliabilitySum = 0

  const boards = Array.isArray(boardsData) ? boardsData : []
  const courses = Array.isArray(coursesData) ? coursesData : []

  for (const board of boards) {
    ratingSum += board.rating
    if (!board.reliability) {
      continue
    }
    reliabilitySum += Number(board.reliability.replace("%", ""))
  }
  for (const course of courses) {
    ratingSum += course.rating
    if (!course.reliability) {
      continue
    }
    reliabilitySum += Number(course.reliability.replace("%", ""))
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {(
            ratingSum /
            ((coursesData?.length ?? 0) + (boardsData?.length ?? 0))
          ).toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">평균 평점</div>
      </div>
      <div className="bg-white rounded-xl p-4 border !border-gray-200 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">
          {(
            reliabilitySum /
            ((coursesData?.length ?? 0) + (boardsData?.length ?? 0))
          ).toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">만족도</div>
      </div>
    </div>
  )
}

export default Quick
