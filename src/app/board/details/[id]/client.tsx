"use client"

import Card from "@/common/card/board_details_card"
import {
  useBoardDetailsQuery,
  useLikeMutation,
} from "@/hooks/supabase/queries"
import { comma } from "@/util/comma"
import { getStorageUrl } from "@/util/supabaseStorage"
import {
  Bookmark,
  Eye,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  ThumbsUp,
  User,
} from "lucide-react"
import { use, useState } from "react"
import Skeleton from "./skeleton"
import Image from "next/image"
import CommentCard from "@/common/card/comment_details_card"
import { userInfoAtom } from "@/store/ai"
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation"

import { BoardDetailsPageProps } from "./type"

export default function BoardDetailsPage({
  params,
  userInfo,
}: BoardDetailsPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [selectedDay, setSelectedDay] = useState(1)
  const setUserInfo = useSetAtom(userInfoAtom)

  // 유저가 코스에 좋아요를 눌렀는지 유무
  const userBoardLikeFlag = !userInfo
    ? null
    : userInfo.likesItem.boards.includes(Number(id))

  const {
    data: boardDetailsData,
    isLoading: boardDetailsDataIsLoading,
    refetch: boardDetailsDataRefetch,
  } = useBoardDetailsQuery(Number(id))

  const { mutateAsync: like } = useLikeMutation()

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다!")
  }

  const handleLike = async () => {
    if (!userInfo) {
      alert("로그인 후 이용할 수 있습니다!")
      return
    }
    await like({
      board_id: Number(id),
      user_id: userInfo.id,
    })
    const copyUserInfo = { ...userInfo }
    if (userInfo.likesItem.boards.includes(Number(id))) {
      const deletedBoardLike = copyUserInfo.likesItem.boards.filter(
        (x) => x !== Number(id),
      )
      copyUserInfo.likesItem.boards = deletedBoardLike
    } else {
      copyUserInfo.likesItem.boards.push(Number(id))
    }
    setUserInfo(copyUserInfo)
    boardDetailsDataRefetch()
    router.refresh()
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Platinum":
        return "bg-purple-100 text-purple-700"
      case "Gold":
        return "bg-yellow-100 text-yellow-700"
      case "Silver":
        return "bg-gray-100 text-gray-700"
      case "Bronze":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  const totalCommentCount = () => {
    const comments = boardDetailsData ? boardDetailsData[0].comments : []
    const totalReplies = comments.reduce((sum, comment) => {
      return (
        sum + (comment.comments_replies ? comment.comments_replies.length : 0)
      )
    }, 0)

    const totalCount = comments.length + totalReplies

    return totalCount
  }

  return boardDetailsDataIsLoading || !boardDetailsData ? (
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
          {/* Left Column - Post Content */}
          <div className="lg:col-span-2">
            {/* Post Header */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              {/* {boardDetailsData[0].featured && (
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center mb-4 w-fit"
                 
                >
                  <Award className="w-4 h-4 mr-1" />
                  추천 게시글
                </div>
              )} */}

              <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2"
               
              >
                {boardDetailsData[0].title}
              </h1>

              <p
                className="text-sm sm:text-base text-gray-600 mb-4"
               
              >
                {boardDetailsData[0].subtitle}
              </p>

              {/* Author Info */}
              <div
                className="flex items-center space-x-3 mb-4 pb-4 border-b !border-gray-200 "
               
              >
                <span
                  className="text-lg sm:text-xl w-8 h-8 rounded-full relative"
                 
                >
                  {boardDetailsData[0].users.profile_image_url && (
                    <Image
                      src={getStorageUrl(boardDetailsData[0].users.profile_image_url)}
                      alt={boardDetailsData[0].users.name}
                      className="rounded-full overflow-hidden"
                      fill
                    />
                  )}
                  {!boardDetailsData[0].users.profile_image_url && (
                    <div
                      className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                     
                    >
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </span>

                {/* {boardDetailsData[0].author.avatar} */}
                <div className="flex-1">
                  <div
                    className="flex items-center space-x-2"
                   
                  >
                    <span
                      className="font-semibold text-gray-900"
                     
                    >
                      {boardDetailsData[0].users.name}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                        ${getLevelColor("Platinum")}
                      `}
                     
                    >
                      {/* {boardDetailsData[0].author.level} */}
                      level
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {/* 게시글 0개 • 팔로워{" 12"}명 •{" "} */}
                    {boardDetailsData[0].created_at}
                    {/* {boardDetailsData[0].author.posts} */}
                    {/* {boardDetailsData[0].author.followers} */}
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                 
                >
                  팔로우
                </button>
              </div>

              {/* Post Stats */}
              <div
                className="flex items-center space-x-4 sm:space-x-6 mb-4"
               
              >
                <div
                  className="flex items-center text-sm text-gray-500"
                 
                >
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{boardDetailsData[0].views}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                 
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{boardDetailsData[0].likes}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                 
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{totalCommentCount()}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                 
                >
                  <Bookmark className="w-4 h-4 mr-1" />
                  <span>{boardDetailsData[0].bookmark}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                 
                >
                  <Star className="w-4 h-4 mr-1" />
                  <span>{boardDetailsData[0].rating}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                    userBoardLikeFlag
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                 
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${userBoardLikeFlag ? "fill-current" : ""}`}
                   
                  />

                  <span className="hidden sm:inline">
                    {userBoardLikeFlag ? "좋아요 취소" : "좋아요"}
                  </span>
                </button>
                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                 
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                   
                  />

                  <span className="hidden sm:inline">
                    북마크
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                 
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    공유
                  </span>
                </button>
                <button
                  onClick={() =>
                    router.push(`/map?boardId=${boardDetailsData[0].id}`)
                  }
                  className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                 
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    지도보기
                  </span>
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
               
              >
                여행 후기
              </h3>
              <div
                className="prose prose-sm sm:prose max-w-none"
               
              >
                {boardDetailsData[0].description
                  .split("\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed"
                     
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Photos */}
            {boardDetailsData[0].board_images &&
              boardDetailsData[0].board_images.length > 0 && (
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
                    {boardDetailsData[0].board_images.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                       
                      >
                        <div
                          className="w-full h-full flex items-center justify-center relative"
                         
                        >
                          <Image
                            src={getStorageUrl(photo.image_url)}
                            alt={boardDetailsData[0].title}
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
                className="text-lg font-semibold text-gray-900 mb-4"
               
              >
                상세 일정
              </h3>
              <div
                className="flex gap-2 overflow-x-auto mb-6"
               
              >
                {boardDetailsData[0].board_days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day.day
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                   
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
              <Card data={boardDetailsData} selectedDay={selectedDay} />
            </div>
            <CommentCard id={id} userInfo={userInfo} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Author Profile */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                작성자 정보
              </h3>
              <div className="text-center">
                {
                  <div className="w-h-center mb-4">
                    <span
                      className="text-lg sm:text-xl w-8 h-8 rounded-full relative"
                     
                    >
                      {boardDetailsData[0].users.profile_image_url && (
                        <Image
                          src={getStorageUrl(boardDetailsData[0].users.profile_image_url)}
                          alt=""
                          className="rounded-full overflow-hidden"
                          fill
                        />
                      )}
                      {!boardDetailsData[0].users.profile_image_url && (
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-full w-h-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </span>
                  </div>
                }
                {/* {boardDetailsData[0].author.avatar} */}
                <h4
                  className="font-semibold text-gray-900 mb-1"
                 
                >
                  {boardDetailsData[0].users.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getLevelColor("Platinum")} mb-3 inline-block`}
                 
                >
                  {/* {boardDetailsData[0].author.level} */}level
                </span>
                {boardDetailsData[0].users.introduce && (
                  <p className="text-sm text-gray-600 mb-4">
                    {boardDetailsData[0].users.introduce}
                  </p>
                )}
                <div
                  className="grid grid-cols-3 gap-4 text-center mb-4"
                 
                >
                  <div>
                    <div
                      className="font-semibold text-gray-900"
                     
                    >
                      {boardDetailsData[0].users.total_post}
                    </div>
                    <div className="text-xs text-gray-500">
                      게시글
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-semibold text-gray-900"
                     
                    >
                      {boardDetailsData[0].users.follower}
                    </div>
                    <div className="text-xs text-gray-500">
                      팔로워
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-semibold text-gray-900"
                     
                    >
                      {boardDetailsData[0].users.following}
                    </div>
                    <div className="text-xs text-gray-500">
                      팔로잉
                    </div>
                  </div>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                 
                >
                  팔로우
                </button>
              </div>
            </div>

            {/* Post Summary */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                여행 정보
              </h3>
              <div className="space-y-3">
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    기간
                  </span>
                  <span className="font-medium">
                    {boardDetailsData[0].duration}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    참가자
                  </span>
                  <span className="font-medium">
                    {boardDetailsData[0].participants}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    총 비용
                  </span>
                  <span className="font-bold text-blue-600">
                    {comma(boardDetailsData[0].total_cost, true)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    난이도
                  </span>
                  <span className="font-medium">
                    {boardDetailsData[0].difficulty}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                 
                >
                  <span className="text-sm text-gray-600">
                    평균 평점
                  </span>
                  <div className="flex items-center">
                    <Star
                      className="w-4 h-4 text-yellow-400 mr-1"
                     
                    />

                    <span className="font-medium">
                      {boardDetailsData[0].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {boardDetailsData[0].board_tags.length > 0 && (
              <div
                className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
               
              >
                <h3
                  className="font-semibold text-gray-900 mb-4"
                 
                >
                  태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {boardDetailsData[0].board_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                     
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
               
              >
                관련 게시글
              </h3>
              <div className="space-y-3">
                {[
                  "부산 2박 3일 맛집 투어 완전 정복",
                  "경주 역사 탐방 1박 2일 (대학생 추천)",
                  "강릉 바다 힐링 여행 (혼자 여행 추천)",
                ].map((title, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                   
                  >
                    <div
                      className="font-medium text-sm line-clamp-2 mb-1"
                     
                    >
                      {title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {["부산토박이", "역사덕후", "솔로트래블러"][index]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
