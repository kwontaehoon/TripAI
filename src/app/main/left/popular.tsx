"use client"
import { usePopularLocationQuery } from "@/hooks/supabase/dev"
import { useRouter } from "next/navigation"

const Popular = () => {
  const router = useRouter()
  const popularDestinations = [
    {
      name: "제주",
      count: "1,247개 코스",
      gradient: "from-blue-400 to-cyan-300",
    },
    {
      name: "서울",
      count: "2,156개 코스",
      gradient: "from-purple-400 to-pink-300",
    },
    {
      name: "부산",
      count: "892개 코스",
      gradient: "from-orange-400 to-red-300",
    },
    {
      name: "강릉",
      count: "634개 코스",
      gradient: "from-green-400 to-teal-300",
    },
  ]

  const { data: popularLocation, isLoading: popularLocationIsLoading } =
    usePopularLocationQuery()

  return popularLocationIsLoading ? (
    ""
  ) : (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 여행지</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`
              p-6
              rounded-xl
              text-white
              bg-gradient-to-r from-blue-400 to-cyan-300
              hover:shadow-lg hover:-translate-y-1
              cursor-pointer`}
          onClick={() => router.push(`/search?q=${encodeURIComponent("제주")}`)}
        >
          <h4 className="text-xl font-bold mb-1">제주</h4>
          <p className="text-white/80 text-sm">
            {popularLocation?.jeju.length}개 코스
          </p>
        </div>
        <div
          className={`
              p-6
              rounded-xl
              text-white
              bg-gradient-to-r from-purple-400 to-pink-300
              hover:shadow-lg hover:-translate-y-1
              cursor-pointer`}
          onClick={() =>
            router.push(`/search?q=${encodeURIComponent("강원도")}`)
          }
        >
          <h4 className="text-xl font-bold mb-1">강원도</h4>
          <p className="text-white/80 text-sm">
            {popularLocation?.gangwon.length}개 코스
          </p>
        </div>
        <div
          className={`
              p-6
              rounded-xl
              text-white
              bg-gradient-to-r from-orange-400 to-red-300
              hover:shadow-lg hover:-translate-y-1
              cursor-pointer`}
          onClick={() => router.push(`/search?q=${encodeURIComponent("서울")}`)}
        >
          <h4 className="text-xl font-bold mb-1">서울</h4>
          <p className="text-white/80 text-sm">
            {popularLocation?.seoul.length}개 코스
          </p>
        </div>
        <div
          className={`
              p-6
              rounded-xl
              text-white
              bg-gradient-to-r from-green-400 to-teal-300
              hover:shadow-lg hover:-translate-y-1
              cursor-pointer`}
          onClick={() => router.push(`/search?q=${encodeURIComponent("김포")}`)}
        >
          <h4 className="text-xl font-bold mb-1">김포</h4>
          <p className="text-white/80 text-sm">
            {popularLocation?.gimpo.length}개 코스
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popular
