"use client"
import { useLikeMutation } from "@/hooks/supabase/dev"
import { userInfoAtom } from "@/store/ai"
import { comma } from "@/util/comma"
import { useSetAtom } from "jotai"
import {
  ArrowRight,
  Calendar,
  Car,
  Heart,
  MapPin,
  Share2,
  Star,
  Search,
  Users,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { If } from "react-haiku"

const Page = ({
  filteredCourses,
  setSelectedFilter,
  setQuickedFilter,
  ref,
  userInfo,
  coursesRefetch,
}) => {
  const router = useRouter()
  const setUserInfo = useSetAtom(userInfoAtom)
  const { mutateAsync: like } = useLikeMutation()

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/details/${courseId}`)
  }
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 2) {
      return "bg-green-100 text-green-700"
    } else if (difficulty < 4) {
      return "bg-yellow-100 text-yellow-700"
    } else if (difficulty < 6) {
      return "bg-red-100 text-red-700"
    } else {
      return "bg-gray-100 text-gray-700"
    }
  }

  const getDifficultyText = (difficulty: number) => {
    if (difficulty < 2) {
      return "쉬움"
    } else if (difficulty < 4) {
      return "보통"
    } else if (difficulty < 6) {
      return "어려움"
    }
  }

  const handleLike = async (e: React.FormEvent, id) => {
    e.stopPropagation()

    if (!userInfo) {
      alert("로그인 후 이용할 수 있습니다!")
      return
    }
    await like({
      course_id: Number(id),
      user_id: userInfo.id,
    })
    const copyUserInfo = { ...userInfo }
    if (userInfo.likesItem.courses.includes(Number(id))) {
      const deletedCourseLike = copyUserInfo.likesItem.courses.filter(
        (x) => x !== Number(id),
      )
      copyUserInfo.likesItem.courses = deletedCourseLike
    } else {
      copyUserInfo.likesItem.courses.push(Number(id))
    }
    setUserInfo(copyUserInfo)
    coursesRefetch()
  }

  return (
    <div className="space-y-6" data-oid="r0qbuqm">
      {filteredCourses.map((course, idx) => {
        // 유저가 코스에 좋아요를 눌렀는지 유무
        const userCourseLikeFlag = !userInfo
          ? null
          : userInfo.likesItem.courses.includes(course.id)

        const totalCommentsReplies = course.comments.reduce((sum, comment) => {
          return (
            sum +
            (comment.comments_replies ? comment.comments_replies.length : 0)
          )
        }, 0)

        const totalCommentsCount = course.comments.length + totalCommentsReplies

        const isLastItem = idx === filteredCourses.length - 1
        return (
          <div
            ref={isLastItem ? ref : null}
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
                  {course.course_images.length === 0 ? (
                    ""
                  ) : (
                    <Image
                      src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${course.course_images[0].image_url}`}
                      alt={course.title}
                      fill
                      quality={50}
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  )}
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
                      onClick={(e) => handleLike(e, course.id)}
                      className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                      data-oid="9ppg2aj"
                    >
                      <If isTrue={!userCourseLikeFlag}>
                        <Heart
                          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                          data-oid="g-kd11o"
                        />
                      </If>
                      <If isTrue={userCourseLikeFlag}>
                        <Heart
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="#dc2626"
                          stroke="#dc2626"
                          data-oid="g-kd11o"
                        />
                      </If>
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
                    {getDifficultyText(course.difficulty)}
                  </span>
                </div>

                <p
                  className="text-gray-600 mb-4 line-clamp-2"
                  data-oid="f-nhw22"
                >
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

                    <span data-oid="0yxumys">
                      {course.total_locations}개 장소
                    </span>
                  </div>
                  <div
                    className="flex items-center text-gray-600"
                    data-oid="mow0u52"
                  >
                    <Car className="w-4 h-4 mr-1" data-oid="ogfr54e" />

                    <span data-oid="hreqngf">{course.total_distance}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4" data-oid="64wm59a">
                  {course.course_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs"
                      data-oid="v-8y:al"
                    >
                      {tag.tag}
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
                    {course.course_highlights.map(
                      (highlight, index: number) => (
                        <span
                          key={index}
                          className="text-xs text-gray-600"
                          data-oid="6ib44xu"
                        >
                          {highlight.highlight}
                          {index < course.course_highlights.length - 1 && " • "}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Bottom Info */}
                <div
                  className="flex items-center justify-between"
                  data-oid="s.o:409"
                >
                  <div
                    className="flex items-center space-x-4"
                    data-oid="ssicyv5"
                  >
                    <div className="flex items-center" data-oid="vhxyxtw">
                      <Star
                        className="w-4 h-4 text-yellow-400 mr-1"
                        data-oid="i:wskb6"
                      />

                      <span
                        className="text-sm font-semibold"
                        data-oid="5krlute"
                      >
                        {course.rating}
                      </span>
                      <span
                        className="text-sm text-gray-500 ml-1"
                        data-oid="f::lxx3"
                      >
                        ({totalCommentsCount})
                      </span>
                    </div>
                    <span
                      className="text-lg font-bold text-blue-600"
                      data-oid="k_2:9hi"
                    >
                      {comma(course.total_cost, true)}
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
        )
      })}
      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div
          className="bg-white rounded-2xl p-8 text-center border !border-gray-200"
          data-oid="l8l2px-"
        >
          <Search
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            data-oid="b69idox"
          />

          <h3
            className="text-lg font-semibold text-gray-900 mb-2"
            data-oid="6exf0:t"
          >
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600 mb-4" data-oid="v..-ugo">
            다른 키워드로 검색해보시거나 필터를 조정해보세요.
          </p>
          <button
            onClick={() => {
              setSelectedFilter("전체")
              setQuickedFilter("")
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            data-oid="r5cfql4"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  )
}

export default Page
