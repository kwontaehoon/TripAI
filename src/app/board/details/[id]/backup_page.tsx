"use client"

import {
  Award,
  Bookmark,
  Camera,
  Car,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Mountain,
  Navigation,
  Send,
  Share2,
  Star,
  ThumbsUp
} from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function BoardDetailsPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [selectedDay, setSelectedDay] = useState(1)

  // 사용자 게시글 상세 데이터
  const postDetails = {
    id: params.id,
    title: "제주도 3박 4일 완벽 가족여행 후기 (아이들과 함께)",
    subtitle: "5살, 8살 아이들과 함께한 제주도 여행 코스 공유합니다",
    content: `안녕하세요! 5살, 8살 아이들과 함께 제주도 3박 4일 여행을 다녀왔어요. 
        
아이들과 함께하는 여행이라 많이 고민했는데, 정말 알찬 여행이었습니다. 특히 아이들이 지루해하지 않도록 체험활동 위주로 코스를 짰어요.

첫째 날은 성산일출봉에서 시작해서 섭지코지까지 둘러봤는데, 아이들이 정말 좋아했어요. 특히 성산일출봉은 생각보다 오르기 쉬워서 아이들도 무리 없이 올라갔습니다.

둘째 날 한라산은 어리목 탐방로로 갔는데, 아이들 체력을 고려해서 1시간 정도만 올라갔어요. 그래도 충분히 만족스러웠습니다.

셋째 날 테디베어뮤지엄은 아이들이 가장 좋아한 곳이에요. 사진도 많이 찍고 기념품도 샀습니다.

전체적으로 아이들과 함께하기에 정말 좋은 코스였어요. 다른 가족분들께도 추천드립니다!`,
    author: {
      name: "여행러버맘",
      avatar: "👩‍👧‍👦",
      level: "Gold",
      posts: 23,
      followers: 156,
      following: 89,
      joinDate: "2023년 5월",
      bio: "두 아이와 함께하는 가족여행 전문가입니다. 아이들이 즐거워하는 여행지를 찾아다녀요!",
    },
    duration: "3박 4일",
    rating: 4.8,
    likes: 156,
    comments: 34,
    views: 1247,
    bookmarks: 67,
    participants: "가족 4명",
    tags: ["가족여행", "제주도", "아이동반", "체험활동"],
    difficulty: "쉬움",
    totalCost: "₩1,200,000",
    highlights: [
      "성산일출봉",
      "한라산",
      "협재해수욕장",
      "동문시장",
      "테디베어뮤지엄",
    ],
    createdAt: "2024-03-15",
    lastUpdated: "2024-03-15",
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    ],

    days: [
      {
        day: 1,
        title: "제주 동부 탐방",
        subtitle: "성산일출봉과 섭지코지 중심",
        places: [
          {
            id: 1,
            name: "제주공항",
            type: "출발지",
            address: "제주특별자치도 제주시 공항로 2",
            duration: "30분",
            description: "여행의 시작점, 렌터카 픽업",
            icon: (
              <Navigation
                className="w-4 h-4 sm:w-5 sm:h-5"
                data-oid="9pr8y5v"
              />
            ),
            nextDistance: "42km",
            nextTime: "50분",
            userReview:
              "공항에서 렌터카 픽업이 생각보다 빨랐어요. 아이 카시트도 미리 준비해주셔서 좋았습니다.",
            userRating: 4.5,
            photos: ["airport1.jpg"],
          },
          {
            id: 2,
            name: "성산일출봉",
            type: "관광지",
            address: "제주특별자치도 서귀포시 성산읍 일출로 284-12",
            duration: "2시간",
            description: "제주도 대표 관광지, 일출 명소",
            icon: (
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5" data-oid="wppyc4z" />
            ),
            nextDistance: "8km",
            nextTime: "15분",
            userReview:
              "아이들과 함께 오르기에 딱 좋은 높이였어요. 정상에서 보는 뷰가 정말 멋있었습니다. 아이들도 완주해서 뿌듯해했어요.",
            userRating: 5.0,
            photos: ["seongsan1.jpg", "seongsan2.jpg"],
          },
          {
            id: 3,
            name: "섭지코지",
            type: "관광지",
            address: "제주특별자치도 서귀포시 성산읍 섭지코지로 107",
            duration: "1시간 30분",
            description: "아름다운 해안 절벽과 등대",
            icon: (
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" data-oid="oh817hd" />
            ),
            nextDistance: "15km",
            nextTime: "25분",
            userReview:
              "인생샷 찍기 좋은 곳이에요. 바람이 좀 강했지만 경치가 너무 예뻤습니다. 아이들 사진도 많이 찍었어요.",
            userRating: 4.8,
            photos: ["seopjikoji1.jpg"],
          },
        ],

        totalDistance: "65km",
        totalTime: "4시간",
        estimatedCost: "₩150,000",
        userNote:
          "첫날은 비행기 시간 때문에 여유롭게 계획했어요. 아이들이 피곤해하지 않아서 좋았습니다.",
      },
      {
        day: 2,
        title: "제주 서부 자연 탐방",
        subtitle: "한라산과 협재해수욕장",
        places: [
          {
            id: 4,
            name: "한라산 어리목 탐방로",
            type: "자연관광",
            address: "제주특별자치도 제주시 1100로 2070-61",
            duration: "2시간",
            description: "제주도 최고봉, 가족 트레킹 코스",
            icon: (
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5" data-oid=".1729ma" />
            ),
            nextDistance: "25km",
            nextTime: "35분",
            userReview:
              "아이들 체력을 고려해서 1시간 정도만 올라갔는데도 충분히 만족스러웠어요. 공기도 맑고 좋았습니다.",
            userRating: 4.5,
            photos: ["hallasan1.jpg"],
          },
          {
            id: 5,
            name: "협재해수욕장",
            type: "해변",
            address: "제주특별자치도 제주시 한림읍 협재리",
            duration: "2시간",
            description: "에메랄드빛 바다와 하얀 모래사장",
            icon: (
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" data-oid="u6ovs.q" />
            ),
            nextDistance: "10km",
            nextTime: "15분",
            userReview:
              "물이 정말 깨끗하고 아이들이 안전하게 놀 수 있어서 좋았어요. 모래사장도 부드러워서 아이들이 좋아했습니다.",
            userRating: 5.0,
            photos: ["hyeopjae1.jpg", "hyeopjae2.jpg"],
          },
        ],

        totalDistance: "35km",
        totalTime: "4시간",
        estimatedCost: "₩100,000",
        userNote:
          "한라산은 아이들 체력을 고려해서 짧게 다녀왔어요. 협재해수욕장에서 충분히 쉬었습니다.",
      },
    ],
  }

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

  return (
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
              {postDetails.featured && (
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center mb-4 w-fit"
                  data-oid="p85cdvs"
                >
                  <Award className="w-4 h-4 mr-1" data-oid="4dc31s4" />
                  추천 게시글
                </div>
              )}

              <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                data-oid="kquy6bz"
              >
                {postDetails.title}
              </h1>

              <p
                className="text-sm sm:text-base text-gray-600 mb-4"
                data-oid="5uo_9ew"
              >
                {postDetails.subtitle}
              </p>

              {/* Author Info */}
              <div
                className="flex items-center space-x-3 mb-4 pb-4 border-b !border-gray-200"
                data-oid="cly6160"
              >
                <span className="text-2xl" data-oid="h37gdgx">
                  {postDetails.author.avatar}
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
                      {postDetails.author.name}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getLevelColor(postDetails.author.level)}`}
                      data-oid="axvwyuw"
                    >
                      {postDetails.author.level}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500" data-oid="x9c7r00">
                    게시글 {postDetails.author.posts}개 • 팔로워{" "}
                    {postDetails.author.followers}명 • {postDetails.createdAt}
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
                    {postDetails.views.toLocaleString()}
                  </span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="-zl0g55"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" data-oid="m8.6t6a" />
                  <span data-oid="s5n9rhz">{postDetails.likes}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="nrur02n"
                >
                  <MessageCircle className="w-4 h-4 mr-1" data-oid="3j_2_3j" />
                  <span data-oid="5nzuinf">{postDetails.comments}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="ces7:5u"
                >
                  <Bookmark className="w-4 h-4 mr-1" data-oid="p.i-lhw" />
                  <span data-oid="2nafr0x">{postDetails.bookmarks}</span>
                </div>
                <div
                  className="flex items-center text-sm text-gray-500"
                  data-oid="8x57pfl"
                >
                  <Star className="w-4 h-4 mr-1" data-oid="h674atl" />
                  <span data-oid="36470vj">{postDetails.rating}</span>
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
                {postDetails.content.split("\n").map((paragraph, index) => (
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
            {postDetails.photos && postDetails.photos.length > 0 && (
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
                  {postDetails.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                      data-oid="lev5pmk"
                    >
                      <div
                        className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                        data-oid="an0srn-"
                      >
                        <Camera
                          className="w-8 h-8 text-white"
                          data-oid="h9:jrwq"
                        />
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
                {postDetails.days.map((day) => (
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

              {/* Selected Day Details */}
              {postDetails.days.map(
                (day) =>
                  selectedDay === day.day && (
                    <div key={day.day} data-oid="zg-:5-w">
                      <div
                        className="flex items-center justify-between mb-4"
                        data-oid="-1ub8d9"
                      >
                        <div data-oid="mu3q2o8">
                          <h4
                            className="text-lg font-bold text-gray-900"
                            data-oid="i_ofjjf"
                          >
                            Day {day.day}: {day.title}
                          </h4>
                          <p
                            className="text-sm text-gray-600"
                            data-oid="w62cdp6"
                          >
                            {day.subtitle}
                          </p>
                        </div>
                        <div
                          className="text-right text-sm text-gray-500"
                          data-oid="1x_lonx"
                        >
                          <div data-oid="3wng05s">{day.totalDistance}</div>
                          <div data-oid="wr8bb5:">{day.totalTime}</div>
                        </div>
                      </div>

                      {/* User Note */}
                      {day.userNote && (
                        <div
                          className="bg-green-50 border !border-green-200 rounded-lg p-3 mb-4"
                          data-oid="ys0s0y:"
                        >
                          <div
                            className="flex items-center space-x-2 mb-1"
                            data-oid="ftfa2f."
                          >
                            <MessageCircle
                              className="w-4 h-4 text-green-600"
                              data-oid="_j4zvfl"
                            />

                            <span
                              className="text-sm font-medium text-green-700"
                              data-oid="afonhlh"
                            >
                              작성자 노트
                            </span>
                          </div>
                          <p
                            className="text-sm text-green-600"
                            data-oid="pj:0d:j"
                          >
                            {day.userNote}
                          </p>
                        </div>
                      )}

                      {/* Places */}
                      <div className="space-y-6" data-oid="328h.u7">
                        {day.places.map((place, index) => (
                          <div
                            key={place.id}
                            className="relative"
                            data-oid="qe8kqsn"
                          >
                            {/* Timeline Line */}
                            {index < day.places.length - 1 && (
                              <div
                                className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                                data-oid="yuw.sqh"
                              ></div>
                            )}

                            <div className="flex space-x-4" data-oid="a:ep1j3">
                              {/* Icon */}
                              <div
                                className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                                data-oid="578ymmx"
                              >
                                {place.icon}
                              </div>

                              {/* Content */}
                              <div
                                className="flex-1 min-w-0"
                                data-oid="67w-o:-"
                              >
                                <div
                                  className="flex items-start justify-between mb-2 gap-2"
                                  data-oid="_x_:_fe"
                                >
                                  <h5
                                    className="text-base font-semibold text-gray-900"
                                    data-oid="f.rls9i"
                                  >
                                    {place.name}
                                  </h5>
                                  <span
                                    className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0"
                                    data-oid="jse6qug"
                                  >
                                    {place.type}
                                  </span>
                                </div>

                                <p
                                  className="text-sm text-gray-600 mb-3"
                                  data-oid="tn9vaoz"
                                >
                                  {place.description}
                                </p>

                                {/* Place Info */}
                                <div
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                                  data-oid="x2xebek"
                                >
                                  <div
                                    className="flex items-center"
                                    data-oid="bgetj9a"
                                  >
                                    <MapPin
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="7mfa5ms"
                                    />

                                    <span
                                      className="truncate"
                                      data-oid="ul-prch"
                                    >
                                      {place.address}
                                    </span>
                                  </div>
                                  <div
                                    className="flex items-center"
                                    data-oid="hawcgwt"
                                  >
                                    <Clock
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="xha-bc_"
                                    />

                                    <span data-oid="0:uh2vj">
                                      체류 시간: {place.duration}
                                    </span>
                                  </div>
                                </div>

                                {/* User Review */}
                                <div
                                  className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                                  data-oid="er7w_iw"
                                >
                                  <div
                                    className="flex items-center justify-between mb-2"
                                    data-oid="zd1ila."
                                  >
                                    <div
                                      className="flex items-center space-x-2"
                                      data-oid="a210fs8"
                                    >
                                      <span
                                        className="text-sm font-medium text-blue-700"
                                        data-oid="i5-j4mm"
                                      >
                                        {postDetails.author.name}의 후기
                                      </span>
                                    </div>
                                    <div
                                      className="flex items-center"
                                      data-oid="abv.d4-"
                                    >
                                      <Star
                                        className="w-4 h-4 text-yellow-400 mr-1"
                                        data-oid="cml037d"
                                      />

                                      <span
                                        className="text-sm font-semibold"
                                        data-oid="et045n3"
                                      >
                                        {place.userRating}
                                      </span>
                                    </div>
                                  </div>
                                  <p
                                    className="text-sm text-blue-600"
                                    data-oid="h4gr:l0"
                                  >
                                    {place.userReview}
                                  </p>
                                </div>

                                {/* Next Location Info */}
                                {place.nextDistance && (
                                  <div
                                    className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2"
                                    data-oid="or1m1:b"
                                  >
                                    <Car
                                      className="w-4 h-4 flex-shrink-0"
                                      data-oid="36euwrn"
                                    />

                                    <span data-oid="8bog8nd">
                                      다음 장소까지 {place.nextDistance} •
                                      소요시간 {place.nextTime}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
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
                <span className="text-4xl mb-3 block" data-oid=".wn-buf">
                  {postDetails.author.avatar}
                </span>
                <h4
                  className="font-semibold text-gray-900 mb-1"
                  data-oid="rvsr0b4"
                >
                  {postDetails.author.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getLevelColor(postDetails.author.level)} mb-3 inline-block`}
                  data-oid="1w-iz_w"
                >
                  {postDetails.author.level}
                </span>
                <p className="text-sm text-gray-600 mb-4" data-oid="wsua9ru">
                  {postDetails.author.bio}
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
                      {postDetails.author.posts}
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
                      {postDetails.author.followers}
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
                      {postDetails.author.following}
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
                    {postDetails.duration}
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
                    {postDetails.participants}
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
                    {postDetails.totalCost}
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
                    {postDetails.difficulty}
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
                      {postDetails.rating}
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
                {postDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                    data-oid="snktoue"
                  >
                    {tag}
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
