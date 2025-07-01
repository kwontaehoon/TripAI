import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Search,
    MapPin,
    Clock,
    Star,
    Users,
    ArrowRight,
    Bot,
    Sparkles,
    Send,
    Mic,
    Calendar,
    Car,
    Filter,
    SlidersHorizontal,
    Heart,
    Share2,
  } from "lucide-react"

const dummy = () => {
  const router = useRouter()
  const travelCourses = [
    {
      id: 1,
      title: "제주도 3박 4일 완벽 가족여행 코스",
      subtitle: "아이들과 함께하는 제주 대표 명소 투어",
      duration: "3박 4일",
      rating: 4.9,
      reviews: 234,
      participants: "2-6명",
      tags: ["가족여행", "자연", "맛집", "체험"],
      difficulty: "쉬움",
      totalDistance: "245km",
      highlights: ["성산일출봉", "한라산", "협재해수욕장", "동문시장"],
      description:
        "AI가 추천하는 제주도 가족여행 최적 코스입니다. 아이들과 함께 즐길 수 있는 명소들과 체험 활동을 포함했습니다.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 11,
      estimatedCost: "₩320,000",
    },
  ]
  const [selectedFilter, setSelectedFilter] = useState("전체")

  const filteredCourses = travelCourses.filter((course) => {
    if (selectedFilter === "전체") return true
    return course.tags.includes(selectedFilter)
  })

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/details/${courseId}`)
  }
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-100 text-green-700"
      case "보통":
        return "bg-yellow-100 text-yellow-700"
      case "어려움":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }
  return (
    <div className="space-y-6" data-oid="r0qbuqm">
      {filteredCourses.map((course) => (
        <div
          key={course.id}
          onClick={() => handleCourseClick(course.id)}
          className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
          data-oid="mc17bzh"
        >
          <div className="md:flex" data-oid="n0okxto">
            {/* Image */}
            <div className="md:w-1/3" data-oid="j0d:6-e">
              <div
                className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                data-oid="-8470dr"
              >
                <div className="absolute top-4 left-4" data-oid="h6-0_oq">
                  <span
                    className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                    data-oid="gj80mk_"
                  >
                    AI 추천
                  </span>
                </div>
                <div
                  className="absolute top-4 right-4 flex space-x-2"
                  data-oid="mlx8-ft"
                >
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    data-oid="9ppg2aj"
                  >
                    <Heart
                      className="w-4 h-4 text-gray-600"
                      data-oid="jyne4yd"
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    data-oid="2rhy7:7"
                  >
                    <Share2
                      className="w-4 h-4 text-gray-600"
                      data-oid="yr7p9hu"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-6" data-oid="0gwpsnf">
              <div
                className="flex items-start justify-between mb-3"
                data-oid="30gzrb6"
              >
                <div className="flex-1" data-oid="j0w7dqw">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-1"
                    data-oid="s6:c3xb"
                  >
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm" data-oid="0sb8r3j">
                    {course.subtitle}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}
                  data-oid="-pd028x"
                >
                  {course.difficulty}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2" data-oid="f-nhw22">
                {course.description}
              </p>

              {/* Course Info */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm"
                data-oid="5g_y:84"
              >
                <div
                  className="flex items-center text-gray-600"
                  data-oid=":u24l_s"
                >
                  <Calendar className="w-4 h-4 mr-1" data-oid="hprmlo4" />

                  <span data-oid="07:7_rf">{course.duration}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="dlb7_td"
                >
                  <Users className="w-4 h-4 mr-1" data-oid="ks5_bme" />

                  <span data-oid="ep:-xxe">{course.participants}</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="8aytff3"
                >
                  <MapPin className="w-4 h-4 mr-1" data-oid="5:c3ao:" />

                  <span data-oid="0yxumys">{course.places}개 장소</span>
                </div>
                <div
                  className="flex items-center text-gray-600"
                  data-oid="mow0u52"
                >
                  <Car className="w-4 h-4 mr-1" data-oid="ogfr54e" />

                  <span data-oid="hreqngf">{course.totalDistance}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4" data-oid="64wm59a">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs"
                    data-oid="v-8y:al"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-4" data-oid="21b2n9s">
                <h4
                  className="text-sm font-semibold text-gray-900 mb-2"
                  data-oid="z-:rum."
                >
                  주요 명소
                </h4>
                <div className="flex flex-wrap gap-1" data-oid="idilg5w">
                  {course.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-600"
                      data-oid="6ib44xu"
                    >
                      {highlight}
                      {index < course.highlights.length - 1 && " • "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Info */}
              <div
                className="flex items-center justify-between"
                data-oid="s.o:409"
              >
                <div className="flex items-center space-x-4" data-oid="ssicyv5">
                  <div className="flex items-center" data-oid="vhxyxtw">
                    <Star
                      className="w-4 h-4 text-yellow-400 mr-1"
                      data-oid="i:wskb6"
                    />

                    <span className="text-sm font-semibold" data-oid="5krlute">
                      {course.rating}
                    </span>
                    <span
                      className="text-sm text-gray-500 ml-1"
                      data-oid="f::lxx3"
                    >
                      ({course.reviews})
                    </span>
                  </div>
                  <span
                    className="text-lg font-bold text-blue-600"
                    data-oid="k_2:9hi"
                  >
                    {course.estimatedCost}
                  </span>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  data-oid="m1f2xs."
                >
                  상세보기
                  <ArrowRight className="w-4 h-4 ml-1" data-oid="dseklef" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default dummy
