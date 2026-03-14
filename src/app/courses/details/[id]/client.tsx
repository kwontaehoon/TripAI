"use client"

import Card from "@/common/card/course_details_card"
import {
  useCourseDetailsQuery,
  useLikeMutation,
} from "@/hooks/supabase/queries"
import { comma } from "@/util/comma"
import { getStorageUrl } from "@/util/supabaseStorage"
import { getBadgeColor } from "@/util/styles"
import { Download, Heart, MapPin, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { use, useState } from "react"
import Skeleton from "./skeleton"
import Image from "next/image"
import CommentCard from "@/common/card/comment_details_card"
import { userInfoAtom } from "@/store/ai"
import { useSetAtom } from "jotai"

import { CoursesDetailsPageProps } from "./type"

export default function CourseDetailsPage({
  params,
  userInfo,
}: CoursesDetailsPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [selectedDay, setSelectedDay] = useState(1)
  const setUserInfo = useSetAtom(userInfoAtom)

  // 유저가 코스에 좋아요를 눌렀는지 유무
  const userCourseLikeFlag = !userInfo
    ? null
    : userInfo.likesItem.courses.includes(Number(id))

  const {
    data: courseDetailsData,
    isLoading: courseDetailsDataIsLoading,
    refetch: courseDetailsDataRefetch,
  } = useCourseDetailsQuery(Number(id))

  const { mutateAsync: like } = useLikeMutation()

  const handleLike = async () => {
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
    courseDetailsDataRefetch()
    router.refresh()
  }

  const handleDownload = async () => {
    alert("코스 다운로드 기능은 준비 중입니다.")
  }

  return courseDetailsDataIsLoading ? (
    <Skeleton />
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
       
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
         
        >
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2">
            {/* AI Course Header */}
            <div
              className="
                            relative overflow-hidden
                            p-4 mb-4
                            rounded-2xl
                            bg-gradient-to-br from-purple-100 to-blue-100
                            sm:rounded-3xl  sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
             
            >
              <div className="relative z-10">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                 
                >
                  <Sparkles
                    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                   
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-purple-600"
                   
                  >
                    AI 신뢰도 {courseDetailsData[0].reliability}
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                 
                >
                  {courseDetailsData[0].title}
                </h2>

                <p
                  className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6"
                 
                >
                  {courseDetailsData[0].subtitle}
                </p>

                <p
                  className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6"
                 
                >
                  {courseDetailsData[0].description}
                </p>

                {/* AI Analysis Badges */}
                <div
                  className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                 
                >
                  {courseDetailsData[0].course_badges &&
                    courseDetailsData[0].course_badges.map((badgeName, idx) => {
                      return (
                        <span
                          key={idx}
                          className={`
                            px-2 py-1
                            rounded-full
                            text-xs text-blue-700 font-medium
                            ${getBadgeColor(idx)}
                          bg-blue-100
                            sm:px-3 sm:text-sm `}
                         
                        >
                          {badgeName.badge}
                        </span>
                      )
                    })}
                </div>

                {/* Action Buttons */}
                <div
                  className="flex flex-wrap gap-2 sm:gap-3"
                 
                >
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                      userCourseLikeFlag
                        ? "bg-red-100 text-red-600"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                   
                  >
                    <Heart
                      className={`w-4 h-4 ${userCourseLikeFlag ? "fill-current" : ""}`}
                     
                    />

                    <span className="hidden sm:inline">
                      {userCourseLikeFlag ? "좋아요 취소" : "좋아요"}
                    </span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="
                                        flex items-center
                                        space-x-1 px-3 py-2
                                        rounded-lg
                                        text-sm text-blue-600
                                        bg-white
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                   
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      다운로드
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/map?courseId=${courseDetailsData[0].id}`)
                    }
                    className="
                                        flex items-center 
                                        px-3 py-2 space-x-1
                                        rounded-lg
                                        text-sm text-green-600
                                        bg-white  
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                   
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      지도보기
                    </span>
                  </button>
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 bg-purple-600/10 rounded-full"
               
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 bg-blue-600/10 rounded-full"
               
              ></div>
            </div>

            {/* Photos */}
            {courseDetailsData[0].course_images &&
              courseDetailsData[0].course_images.length > 0 && (
                <div
                  className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                 
                >
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-4"
                   
                  >
                    여행 사진
                  </h3>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                   
                  >
                    {courseDetailsData[0].course_images.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                       
                      >
                        <div
                          className="w-full h-full flex items-center justify-center relative"
                         
                        >
                          <Image
                            src={getStorageUrl(photo.image_url)}
                            alt={courseDetailsData[0].title}
                            fill
                            priority={true}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                          />
                          {/* <Camera
                          className="w-8 h-8 text-white"
                         
                        /> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Day Selector */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
               
              >
                일정 선택
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                {courseDetailsData[0].course_days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day.day
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                   
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
            </div>
            <Card data={courseDetailsData} selectedDay={selectedDay} />
            <CommentCard id={id} userInfo={userInfo} />
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Course Summary */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
               
              >
                코스 요약
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    총 기간
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].duration}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    인원 수
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].participants}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    예상 비용
                  </span>
                  <span className="font-bold text-blue-600">
                    {comma(courseDetailsData[0].total_cost, true)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    난이도
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].difficulty}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    총 거리
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].total_distance}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    예상 시간
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].estimated_time}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
               
              >
                통계
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    좋아요
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].likes}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    북마크
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].bookmark}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    생성일
                  </span>
                  <span className="font-medium">
                    {courseDetailsData[0].created_at}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
               
              >
                태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {courseDetailsData[0].course_tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm"
                   
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  router.push(`/map?courseId=${courseDetailsData[0].id}`)
                }
                className="
                                w-full
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-sm font-medium text-white
                                bg-blue-600
                                hover:bg-blue-700"
               
              >
                <MapPin className="w-4 h-4 mr-2" />
                지도에서 보기
              </button>
              <button
                onClick={handleDownload}
                className="
                                w-full 
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-gray-700 text-sm font-medium
                                bg-gray-100
                                hover:bg-gray-200"
               
              >
                <Download className="w-4 h-4 mr-2" />
                코스 다운로드
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
