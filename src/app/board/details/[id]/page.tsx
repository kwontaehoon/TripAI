"use client"

import Card from "@/common/card/board_details_card"
import { useBoardDetailssQuery } from "@/hooks/supabase/dev"
import { comma } from "@/util/comma"
import {
  Bookmark,
  Camera,
  Eye,
  MessageCircle,
  Send,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react"
import { use, useState } from "react"
import Skeleton from "./skeleton"
import Image from "next/image"

export default function BoardDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [selectedDay, setSelectedDay] = useState(1)

  const { data: boradDetailsData, isLoading } = useBoardDetailssQuery(id)
  console.log("data: ", boradDetailsData)

  // 댓글 데이터
  const comments = [
    {
      id: 1,
      author: {
        name: "가족여행러",
        avatar: "👨‍👩‍👧",
        level: "Silver",
      },
      content:
        "정말 유용한 정보 감사해요! 저희도 7살, 9살 아이들과 제주도 가려고 하는데 많은 도움이 됐습니다.",
      createdAt: "2024-03-16",
      likes: 12,
      replies: [
        {
          id: 11,
          author: {
            name: "여행러버맘",
            avatar: "👩‍👧‍👦",
            level: "Gold",
          },
          content:
            "도움이 되셨다니 기뻐요! 혹시 궁금한 점 있으시면 언제든 물어보세요 😊",
          createdAt: "2024-03-16",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "제주도민",
        avatar: "🏝️",
        level: "Platinum",
      },
      content:
        "제주도민으로서 정말 잘 다녀가신 것 같아요! 성산일출봉은 정말 아이들과 가기 좋은 곳이죠.",
      createdAt: "2024-03-16",
      likes: 8,
      replies: [],
    },
    {
      id: 3,
      author: {
        name: "여행초보맘",
        avatar: "🤱",
        level: "Bronze",
      },
      content:
        "아이들과 첫 여행 계획 중인데 정말 도움이 많이 됐어요. 혹시 준비물 리스트 같은 것도 공유해주실 수 있나요?",
      createdAt: "2024-03-17",
      likes: 6,
      replies: [],
    },
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다!")
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // 댓글 추가 로직
      alert("댓글이 추가되었습니다!")
      setNewComment("")
    }
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

  return isLoading ? (
    <Skeleton />
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="7o6rs87"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
        data-oid="mmb06ds"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="0x6ct-t"
        >
          {/* Left Column - Post Content */}
          <div className="lg:col-span-2" data-oid="w13.j:o">
            {/* Post Header */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="p8.zch0"
            >
              {/* {boradDetailsData[0].featured && (
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center mb-4 w-fit"
                  data-oid="p85cdvs"
                >
                  <Award className="w-4 h-4 mr-1" data-oid="4dc31s4" />
                  추천 게시글
                </div>
              )} */}

              <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                data-oid="kquy6bz"
              >
                {boradDetailsData[0].title}
              </h1>

              <p
                className="text-sm sm:text-base text-gray-600 mb-4"
                data-oid="5uo_9ew"
              >
                {boradDetailsData[0].subtitle}
              </p>

              {/* Author Info */}
              <div
                className="flex items-center space-x-3 mb-4 pb-4 border-b !border-gray-200"
                data-oid="cly6160"
              >
                <span
                  className="text-2xl border w-8 h-8 rounded-full"
                  data-oid="h37gdgx"
                >
                  {/* {boradDetailsData[0].author.avatar} */}
                </span>
                <div className="flex-1" data-oid="yqef21d">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="tgdfr09"
                  >
                    <span
                      className="font-semibold text-gray-900"
                      data-oid="jc95hi7"
                    >
                      {boradDetailsData[0].author}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                        ${getLevelColor("Platinum")}
                      `}
                      data-oid="axvwyuw"
                    >
                      {/* {boradDetailsData[0].author.level} */}
                      level
                    </span>
                  </div>
                  <div className="text-sm text-gray-500" data-oid="x9c7r00">
                    게시글 0개 • 팔로워{" 12"}명 •{" "}
                    {boradDetailsData[0].created_at}
                    {/* {boradDetailsData[0].author.posts} */}
                    {/* {boradDetailsData[0].author.followers} */}
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  data-oid="hvphz-z"
                >
                  팔로우
                </button>
              </div>

              {/* Post Stats */}
              <div
                className="flex items-center space-x-4 sm:space-x-6 mb-4"
                data-oid="wlbp22r"
              >
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="hqigo8y"
                >
                  <Eye className="w-4 h-4 mr-1" data-oid="tutpe_9" />
                  <span data-oid="knr.:yc">
                    {boradDetailsData[0].views.toLocaleString()}
                  </span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="-zl0g55"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" data-oid="m8.6t6a" />
                  <span data-oid="s5n9rhz">{boradDetailsData[0].likes}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="nrur02n"
                >
                  <MessageCircle className="w-4 h-4 mr-1" data-oid="3j_2_3j" />
                  <span data-oid="5nzuinf">
                    {boradDetailsData[0].total_comments}
                  </span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="ces7:5u"
                >
                  <Bookmark className="w-4 h-4 mr-1" data-oid="p.i-lhw" />
                  <span data-oid="2nafr0x">{boradDetailsData[0].bookmark}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="8x57pfl"
                >
                  <Star className="w-4 h-4 mr-1" data-oid="h674atl" />
                  <span data-oid="36470vj">{boradDetailsData[0].rating}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3" data-oid="99bjt89">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                    isLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  data-oid=".cj27r6"
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                    data-oid="qeka-fy"
                  />

                  <span className="hidden sm:inline" data-oid="3j72pdm">
                    {isLiked ? "좋아요 취소" : "좋아요"}
                  </span>
                </button>
                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  data-oid="8utv2pd"
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                    data-oid="h2x1:ul"
                  />

                  <span className="hidden sm:inline" data-oid=":s.p8ya">
                    북마크
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  data-oid="bqegnee"
                >
                  <Share2 className="w-4 h-4" data-oid="u7iqdfk" />
                  <span className="hidden sm:inline" data-oid="bh3z13f">
                    공유
                  </span>
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="0j_wn.7"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                data-oid="hc4_t.h"
              >
                여행 후기
              </h3>
              <div
                className="prose prose-sm sm:prose max-w-none"
                data-oid="o5-:rk6"
              >
                {boradDetailsData[0].content
                  .split("\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 text-gray-700 leading-relaxed"
                      data-oid="uey53sz"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Photos */}
            {boradDetailsData[0].board_images &&
              boradDetailsData[0].board_images.length > 0 && (
                <div
                  className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                  data-oid="wbf9zj1"
                >
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-4"
                    data-oid="mg7t2t4"
                  >
                    여행 사진
                  </h3>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    data-oid="n7uke8i"
                  >
                    {boradDetailsData[0].board_images.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                        data-oid="lev5pmk"
                      >
                        <div
                          className="w-full h-full flex items-center justify-center relative"
                          data-oid="an0srn-"
                        >
                          <Image
                            src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${photo.image_url}`}
                            alt=""
                            fill
                          />
                          {/* <Camera
                          className="w-8 h-8 text-white"
                          data-oid="h9:jrwq"
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
              data-oid="umvc04k"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                data-oid="ios1kxe"
              >
                상세 일정
              </h3>
              <div
                className="flex gap-2 overflow-x-auto mb-6"
                data-oid="uf.o1n3"
              >
                {boradDetailsData[0].board_days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day.day
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    data-oid="2sy9t_:"
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              <Card data={boradDetailsData} selectedDay={selectedDay} />
            </div>

            {/* Comments Section */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="bo3q-72"
            >
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                data-oid="beshk9h"
              >
                댓글 ({comments.length})
              </h3>

              {/* Comment Form */}
              <form
                onSubmit={handleCommentSubmit}
                className="mb-6"
                data-oid="io--qsl"
              >
                <div className="flex space-x-3" data-oid="s0-b2ay">
                  <div
                    className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
                    data-oid="ocy7gkp"
                  >
                    <span className="text-sm" data-oid="net.pr6">
                      👤
                    </span>
                  </div>
                  <div className="flex-1" data-oid="a31gqxp">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="댓글을 작성해주세요..."
                      className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                      data-oid="6ox.mtp"
                    />

                    <div className="flex justify-end mt-2" data-oid=".ecwohc">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                        data-oid=":dj_:ff"
                      >
                        <Send className="w-4 h-4" data-oid="6vu4b_y" />
                        <span data-oid="m77r-zv">댓글 작성</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4" data-oid="2:ie8f8">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b !border-gray-100 pb-4 last:border-b-0"
                    data-oid="psvy3jc"
                  >
                    <div className="flex space-x-3" data-oid="m.8zi0f">
                      <span className="text-lg" data-oid="0teb3c9">
                        {comment.author.avatar}
                      </span>
                      <div className="flex-1" data-oid="7ecfe30">
                        <div
                          className="flex items-center space-x-2 mb-1"
                          data-oid="s-utqls"
                        >
                          <span
                            className="font-medium text-gray-900"
                            data-oid=".to9qt_"
                          >
                            {comment.author.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(comment.author.level)}`}
                            data-oid="1el87ys"
                          >
                            {comment.author.level}
                          </span>
                          <span
                            className="text-xs text-gray-500"
                            data-oid="n76upee"
                          >
                            {comment.createdAt}
                          </span>
                        </div>
                        <p
                          className="text-sm text-gray-700 mb-2"
                          data-oid="hyvu73a"
                        >
                          {comment.content}
                        </p>
                        <div
                          className="flex items-center space-x-4"
                          data-oid="0kae553"
                        >
                          <button
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                            data-oid="tmkwnl9"
                          >
                            <ThumbsUp className="w-3 h-3" data-oid="me7y.ri" />

                            <span data-oid="2a43611">{comment.likes}</span>
                          </button>
                          <button
                            className="text-xs text-gray-500 hover:text-blue-600"
                            data-oid="h8py4x_"
                          >
                            답글
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div
                            className="mt-3 ml-4 space-y-3"
                            data-oid="wcof1o:"
                          >
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="flex space-x-3"
                                data-oid="zgn:9r."
                              >
                                <span className="text-sm" data-oid="vkcjuhc">
                                  {reply.author.avatar}
                                </span>
                                <div className="flex-1" data-oid="swvjkj:">
                                  <div
                                    className="flex items-center space-x-2 mb-1"
                                    data-oid="ze0322p"
                                  >
                                    <span
                                      className="font-medium text-gray-900 text-sm"
                                      data-oid="ne34g.2"
                                    >
                                      {reply.author.name}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(reply.author.level)}`}
                                      data-oid="yix7y.9"
                                    >
                                      {reply.author.level}
                                    </span>
                                    <span
                                      className="text-xs text-gray-500"
                                      data-oid="nvh-h.y"
                                    >
                                      {reply.createdAt}
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm text-gray-700 mb-2"
                                    data-oid="9qd5x6f"
                                  >
                                    {reply.content}
                                  </p>
                                  <button
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                                    data-oid="ot95jg0"
                                  >
                                    <ThumbsUp
                                      className="w-3 h-3"
                                      data-oid=".8bd3m4"
                                    />

                                    <span data-oid="oyelwnx">
                                      {reply.likes}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6" data-oid="pibmeqc">
            {/* Author Profile */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="77j_xp:"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="65lbsu6"
              >
                작성자 정보
              </h3>
              <div className="text-center" data-oid="2_i4s3k">
                <span
                  className="text-4xl mb-3 block m-auto border w-8 h-8 rounded-full"
                  data-oid=".wn-buf"
                >
                  {/* {boradDetailsData[0].author.avatar} */}
                </span>
                <h4
                  className="font-semibold text-gray-900 mb-1"
                  data-oid="rvsr0b4"
                >
                  {boradDetailsData[0].author}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getLevelColor("Platinum")} mb-3 inline-block`}
                  data-oid="1w-iz_w"
                >
                  {/* {boradDetailsData[0].author.level} */}level
                </span>
                <p className="text-sm text-gray-600 mb-4" data-oid="wsua9ru">
                  {/* {boradDetailsData[0].author.bio} */}두 아이와 함께하는
                  가족여행 전문가입니다. 아이들이 즐거워하는 여행지를
                  찾아다녀요!
                </p>
                <div
                  className="grid grid-cols-3 gap-4 text-center mb-4"
                  data-oid="j7rygv3"
                >
                  <div data-oid="wuv.3vi">
                    <div
                      className="font-semibold text-gray-900"
                      data-oid="v_pf3hq"
                    >
                      {/* {boradDetailsData[0].author.posts} */}0
                    </div>
                    <div className="text-xs text-gray-500" data-oid="35kbqh1">
                      게시글
                    </div>
                  </div>
                  <div data-oid="vba5w:k">
                    <div
                      className="font-semibold text-gray-900"
                      data-oid="hvo7tug"
                    >
                      {/* {boradDetailsData[0].author.followers} */}0
                    </div>
                    <div className="text-xs text-gray-500" data-oid="j2sbkzo">
                      팔로워
                    </div>
                  </div>
                  <div data-oid="_nb9n.v">
                    <div
                      className="font-semibold text-gray-900"
                      data-oid="4rocb71"
                    >
                      {/* {boradDetailsData[0].author.following} */}0
                    </div>
                    <div className="text-xs text-gray-500" data-oid="_0pgcn0">
                      팔로잉
                    </div>
                  </div>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  data-oid="fsr0oo3"
                >
                  팔로우
                </button>
              </div>
            </div>

            {/* Post Summary */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="0hstaqe"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="hz.c:m4"
              >
                여행 정보
              </h3>
              <div className="space-y-3" data-oid="e4kex08">
                <div
                  className="flex justify-between items-center"
                  data-oid=":t-k9l9"
                >
                  <span className="text-sm text-gray-600" data-oid="aa.2wn1">
                    기간
                  </span>
                  <span className="font-medium" data-oid="5tl.l4a">
                    {boradDetailsData[0].duration}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="pg3gbfj"
                >
                  <span className="text-sm text-gray-600" data-oid="yt-www_">
                    참가자
                  </span>
                  <span className="font-medium" data-oid="30bl._t">
                    {boradDetailsData[0].participants}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="o-oohyz"
                >
                  <span className="text-sm text-gray-600" data-oid="d7cap6a">
                    총 비용
                  </span>
                  <span className="font-bold text-blue-600" data-oid="y0c96w8">
                    {comma(boradDetailsData[0].total_cost, true)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="ym3j7g."
                >
                  <span className="text-sm text-gray-600" data-oid="oyl_wo_">
                    난이도
                  </span>
                  <span className="font-medium" data-oid="9ds20rw">
                    {boradDetailsData[0].difficulty}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="dza276n"
                >
                  <span className="text-sm text-gray-600" data-oid="w9.ehvf">
                    평점
                  </span>
                  <div className="flex items-center" data-oid="5s-etr3">
                    <Star
                      className="w-4 h-4 text-yellow-400 mr-1"
                      data-oid="i8dc_gd"
                    />

                    <span className="font-medium" data-oid="iyfzrh1">
                      {boradDetailsData[0].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="02-:h4t"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="_gxe.32"
              >
                태그
              </h3>
              <div className="flex flex-wrap gap-2" data-oid="n8yapiw">
                {boradDetailsData[0].board_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                    data-oid="snktoue"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="z8s47k-"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="xy9zgm-"
              >
                관련 게시글
              </h3>
              <div className="space-y-3" data-oid="11m.djg">
                {[
                  "부산 2박 3일 맛집 투어 완전 정복",
                  "경주 역사 탐방 1박 2일 (대학생 추천)",
                  "강릉 바다 힐링 여행 (혼자 여행 추천)",
                ].map((title, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="lac8_ly"
                  >
                    <div
                      className="font-medium text-sm line-clamp-2 mb-1"
                      data-oid="my.suuc"
                    >
                      {title}
                    </div>
                    <div className="text-xs text-gray-500" data-oid="tjwe-.o">
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
