"use client"

import {
  ArrowRight,
  Award,
  Calendar,
  Eye,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  Mic,
  Plus,
  Search,
  Send,
  Share2,
  SlidersHorizontal,
  Star,
  ThumbsUp,
  TrendingUp,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BoardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const [sortBy, setSortBy] = useState("최신순")

  const filters = [
    "전체",
    "가족여행",
    "커플여행",
    "친구여행",
    "혼자여행",
    "당일치기",
    "해외여행",
  ]

  const sortOptions = ["최신순", "인기순", "평점순", "댓글순"]

  // 사용자 게시글 데이터
  const userPosts = [
    {
      id: 1,
      title: "제주도 3박 4일 완벽 가족여행 후기 (아이들과 함께)",
      subtitle: "5살, 8살 아이들과 함께한 제주도 여행 코스 공유합니다",
      author: {
        name: "여행러버맘",
        avatar: "👩‍👧‍👦",
        level: "Gold",
        posts: 23,
      },
      duration: "3박 4일",
      rating: 4.8,
      likes: 156,
      comments: 34,
      views: 1247,
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
      description:
        "아이들과 함께 제주도를 여행하면서 정말 좋았던 코스들을 정리해봤어요. 특히 아이들이 좋아할만한 체험활동들을 중심으로 구성했습니다.",
      createdAt: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 12,
      featured: true,
    },
    {
      id: 2,
      title: "부산 2박 3일 맛집 투어 완전 정복",
      subtitle: "현지인이 추천하는 진짜 부산 맛집들만 골라서",
      author: {
        name: "부산토박이",
        avatar: "🍜",
        level: "Platinum",
        posts: 45,
      },
      duration: "2박 3일",
      rating: 4.9,
      likes: 203,
      comments: 67,
      views: 2156,
      participants: "커플",
      tags: ["맛집투어", "부산", "현지맛집", "해산물"],
      difficulty: "쉬움",
      totalCost: "₩450,000",
      highlights: ["자갈치시장", "광안리", "해운대", "남포동", "서면"],
      description:
        "부산에서 30년 살면서 정말 맛있다고 생각하는 맛집들만 엄선해서 코스로 만들었어요. 관광지 맛집이 아닌 진짜 맛집들입니다.",
      createdAt: "2024-03-14",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 8,
      featured: false,
    },
    {
      id: 3,
      title: "경주 역사 탐방 1박 2일 (대학생 추천)",
      subtitle: "역사 전공생이 추천하는 경주 역사 여행 코스",
      author: {
        name: "역사덕후",
        avatar: "🏛️",
        level: "Silver",
        posts: 12,
      },
      duration: "1박 2일",
      rating: 4.7,
      likes: 89,
      comments: 23,
      views: 567,
      participants: "친구 3명",
      tags: ["역사탐방", "경주", "문화유산", "교육여행"],
      difficulty: "보통",
      totalCost: "₩280,000",
      highlights: ["불국사", "석굴암", "첨성대", "안압지", "국립경주박물관"],
      description:
        "역사를 전공하면서 경주를 여러 번 다녀온 경험을 바탕으로 만든 코스입니다. 단순 관광이 아닌 깊이 있는 역사 탐방을 원하시는 분들께 추천해요.",
      createdAt: "2024-03-13",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 7,
      featured: false,
    },
    {
      id: 4,
      title: "강릉 바다 힐링 여행 (혼자 여행 추천)",
      subtitle: "혼자서도 충분히 즐길 수 있는 강릉 여행 코스",
      author: {
        name: "솔로트래블러",
        avatar: "🌊",
        level: "Gold",
        posts: 31,
      },
      duration: "2박 3일",
      rating: 4.6,
      likes: 124,
      comments: 18,
      views: 892,
      participants: "혼자",
      tags: ["혼자여행", "강릉", "바다", "힐링", "카페"],
      difficulty: "쉬움",
      totalCost: "₩350,000",
      highlights: ["경포해수욕장", "안목해변", "오죽헌", "강릉커피거리"],
      description:
        "혼자 여행하기 좋은 강릉 코스를 소개합니다. 바다를 보며 힐링할 수 있는 장소들과 혼자 가기 좋은 카페들을 중심으로 구성했어요.",
      createdAt: "2024-03-12",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 6,
      featured: false,
    },
    {
      id: 5,
      title: "서울 데이트 코스 베스트 (20대 커플 추천)",
      subtitle: "20대 커플이 좋아할만한 서울 데이트 코스 모음",
      author: {
        name: "데이트마스터",
        avatar: "💕",
        level: "Gold",
        posts: 28,
      },
      duration: "당일치기",
      rating: 4.8,
      likes: 267,
      comments: 45,
      views: 1834,
      participants: "커플",
      tags: ["데이트", "서울", "커플여행", "당일치기", "카페"],
      difficulty: "쉬움",
      totalCost: "₩150,000",
      highlights: ["홍대", "명동", "남산타워", "한강공원", "이태원"],
      description:
        "20대 커플들이 좋아할만한 서울 데이트 코스를 정리했어요. 인스타 감성 카페부터 야경 명소까지 다양하게 포함되어 있습니다.",
      createdAt: "2024-03-11",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      places: 5,
      featured: false,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 검색 로직 구현
  }

  const handlePostClick = (postId: number) => {
    router.push(`/board/details/${postId}`)
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Platinum":
        return "bg-purple-100 text-purple-700"
      case "Gold":
        return "bg-yellow-100 text-yellow-700"
      case "Silver":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  const filteredPosts = userPosts.filter((post) => {
    if (selectedFilter === "전체") return true
    return post.tags.includes(selectedFilter)
  })

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="sp5n.ik"
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4" data-oid="b4nvgyl">
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="1v49vl4"
        >
          {/* Left Column - Post List */}
          <div className="lg:col-span-2" data-oid="b-6d26g">
            {/* Search Section */}
            <div
              className="
              relative overflow-hidden
              p-4 mb-4
              rounded-2xl
              bg-gradient-to-br from-gray-100 to-gray-200
              sm:rounded-3xl sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
              data-oid="mk-elkj"
            >
              <div className="relative z-10" data-oid="5jt.ks6">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                  data-oid="mu18m9y"
                >
                  <MessageCircle
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    data-oid="-l7l:0j"
                  />
                  <span
                    className="text-xs sm:text-sm font-medium text-gray-600"
                    data-oid="l11s:t."
                  >
                    여행 코스 커뮤니티
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                  data-oid="_0lhn6t"
                >
                  실제 여행자들의 생생한 코스
                </h2>

                <p
                  className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6"
                  data-oid="7gogit6"
                >
                  직접 다녀온 여행자들이 공유하는 진짜 여행 코스를 만나보세요
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} data-oid="girdhfi">
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2 mb-4"
                    data-oid="2kufqc8"
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                      data-oid="lvcxpnx"
                    >
                      <Search
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                        data-oid="1zq-b5c"
                      />
                      <input
                        type="text"
                        placeholder="여행 코스를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                        data-oid="c7_l5dg"
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      data-oid="ofz767v"
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                        data-oid="pxh4jhf"
                      >
                        <Mic
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid="ki99:36"
                        />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        data-oid="1nrkf-_"
                      >
                        <Send
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          data-oid=".swrglv"
                        />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Write Post Button */}
                <button
                  onClick={() => router.push("/board/write")}
                  className="
                  w-full
                  flex items-center justify-center
                  px-4
                  font-medium text-white text-sm
                  rounded-lg
                  bg-gradient-to-r from-green-600 to-blue-600
                  sm:px-6 py-2.5 sm:py-3 sm:text-base sm:w-auto
                  hover:shadow-lg
                  transition-all"
                  data-oid="larkkgs"
                >
                  <Plus
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    data-oid="b1sbr6g"
                  />
                  여행 코스 공유하기
                </button>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/10 rounded-full"
                data-oid="v_n5d.7"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full"
                data-oid="y6gzvwt"
              ></div>
            </div>

            {/* Filters */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
              data-oid="63o.5tu"
            >
              <div className="flex items-center space-x-2" data-oid="0kmaq-:">
                <Filter
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="gxt3348"
                />
                <div className="flex flex-wrap gap-2" data-oid="mswidwj">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200"
                      }`}
                      data-oid="z:fa:h7"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2" data-oid="o4sw_r-">
                <SlidersHorizontal
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  data-oid="lcn7qqc"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                  px-2 py-2 
                  border !border-gray-200 rounded-lg
                  text-xs
                  bg-white
                  sm:text-sm sm:px-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid="9jy5q4z"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option} data-oid="0e77uat">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post List */}
            <div className="space-y-4 sm:space-y-6" data-oid="oug.bhz">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="
                  overflow-hidden 
                  border !border-gray-200 rounded-2xl
                  bg-white shadow-lg  
                  hover:-translate-y-1 hover:shadow-xl
                  cursor-pointer
                  transform transition-all"
                  data-oid="fjcc2mf"
                >
                  {post.featured && (
                    <div
                      className="
                      flex items-center
                      px-3 py-1
                      font-medium text-white text-xs
                      bg-gradient-to-r from-yellow-400 to-orange-400  
                      sm:text-sm sm:px-4"
                      data-oid="3g1.-k3"
                    >
                      <Award
                        className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                        data-oid="8odhcb7"
                      />
                      추천 게시글
                    </div>
                  )}

                  <div className="md:flex" data-oid="olwzf4m">
                    {/* Image */}
                    <div className="md:w-1/3" data-oid="q8u:-49">
                      <div
                        className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                        data-oid="8fr2jpa"
                      >
                        <div
                          className="absolute top-3 sm:top-4 left-3 sm:left-4"
                          data-oid="w-tp_l1"
                        >
                          <span
                            className="bg-white text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                            data-oid="gh.f4xn"
                          >
                            {post.author.level}
                          </span>
                        </div>
                        <div
                          className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2"
                          data-oid="vf.k7tg"
                        >
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/80 p-1.5 sm:p-2 rounded-full hover:bg-white transition-colors"
                            data-oid="l3o25pn"
                          >
                            <Heart
                              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                              data-oid="g-kd11o"
                            />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/80 p-1.5 sm:p-2 rounded-full hover:bg-white transition-colors"
                            data-oid="c8c548t"
                          >
                            <Share2
                              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                              data-oid="yp3it8i"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-4 sm:p-6" data-oid="payx7es">
                      <div
                        className="flex items-start justify-between mb-3 gap-2"
                        data-oid="umca60j"
                      >
                        <div className="flex-1 min-w-0" data-oid="05c6j57">
                          <h3
                            className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2"
                            data-oid="c.tumwm"
                          >
                            {post.title}
                          </h3>
                          <p
                            className="text-sm sm:text-base text-gray-600 line-clamp-2"
                            data-oid="xv3da63"
                          >
                            {post.subtitle}
                          </p>
                        </div>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)} flex-shrink-0`}
                          data-oid="tm.u:-."
                        >
                          {post.difficulty}
                        </span>
                      </div>

                      {/* Author Info */}
                      <div
                        className="flex items-center space-x-2 mb-3"
                        data-oid="1qonzi3"
                      >
                        <span className="text-lg sm:text-xl" data-oid="aqxkzhp">
                          {post.author.avatar}
                        </span>
                        <div className="min-w-0" data-oid="o7zv6:o">
                          <div
                            className="flex items-center space-x-2"
                            data-oid="d2kc:s0"
                          >
                            <span
                              className="text-sm font-medium text-gray-900"
                              data-oid="_2vzhp0"
                            >
                              {post.author.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(post.author.level)}`}
                              data-oid="_fofxo."
                            >
                              {post.author.level}
                            </span>
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="2o6.2-t"
                          >
                            게시글 {post.author.posts}개 • {post.createdAt}
                          </div>
                        </div>
                      </div>

                      <p
                        className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2"
                        data-oid="bjuxggw"
                      >
                        {post.description}
                      </p>

                      {/* Course Info */}
                      <div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm"
                        data-oid="uk2rjwp"
                      >
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="jr2xvx1"
                        >
                          <Calendar
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            data-oid="vaw5r5c"
                          />
                          <span data-oid="fq3zo1:">{post.duration}</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="3dnyaiy"
                        >
                          <Users
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            data-oid=":g-jkkt"
                          />
                          <span data-oid="juka_zs">{post.participants}</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="s4f0w1."
                        >
                          <MapPin
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            data-oid="-6zi5aj"
                          />
                          <span data-oid="-6m4kn6">{post.places}개 장소</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="qjpkpk_"
                        >
                          <span
                            className="font-bold text-blue-600"
                            data-oid="k7i5hm5"
                          >
                            {post.totalCost}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div
                        className="flex flex-wrap gap-1 sm:gap-2 mb-4"
                        data-oid=".eevsua"
                      >
                        {post.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs"
                            data-oid="g4o:5jn"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 4 && (
                          <span
                            className="text-xs text-gray-500"
                            data-oid=".iz11:7"
                          >
                            +{post.tags.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Highlights */}
                      <div className="mb-4" data-oid="s_p.6z:">
                        <h4
                          className="text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          data-oid="xch:h1w"
                        >
                          주요 명소
                        </h4>
                        <div
                          className="flex flex-wrap gap-1"
                          data-oid="ihovclx"
                        >
                          {post.highlights
                            .slice(0, 3)
                            .map((highlight, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-600"
                                data-oid="dwxl-_q"
                              >
                                {highlight}
                                {index <
                                  Math.min(post.highlights.length, 3) - 1 &&
                                  " • "}
                              </span>
                            ))}
                          {post.highlights.length > 3 && (
                            <span
                              className="text-xs text-gray-500"
                              data-oid="35ukzcw"
                            >
                              외 {post.highlights.length - 3}곳
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div
                        className="flex items-center justify-between"
                        data-oid="wisa9t3"
                      >
                        <div
                          className="flex items-center space-x-3 sm:space-x-4"
                          data-oid="qzp6v:c"
                        >
                          <div className="flex items-center" data-oid="0oo:n_g">
                            <Star
                              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                              data-oid="ks2v.co"
                            />
                            <span
                              className="text-xs sm:text-sm font-semibold"
                              data-oid=":jx.yzr"
                            >
                              {post.rating}
                            </span>
                          </div>
                          <div
                            className="flex items-center text-xs sm:text-sm text-gray-500"
                            data-oid="x5-x0q0"
                          >
                            <ThumbsUp
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                              data-oid="y6wqi0q"
                            />
                            <span data-oid="mxks21w">{post.likes}</span>
                          </div>
                          <div
                            className="flex items-center text-xs sm:text-sm text-gray-500"
                            data-oid="5ot.ks4"
                          >
                            <MessageCircle
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                              data-oid="du4cvy7"
                            />
                            <span data-oid="03q0u6.">{post.comments}</span>
                          </div>
                          <div
                            className="flex items-center text-xs sm:text-sm text-gray-500"
                            data-oid="_tuhps9"
                          >
                            <Eye
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                              data-oid="7na-8jd"
                            />
                            <span data-oid="iwpg.p7">{post.views}</span>
                          </div>
                        </div>
                        <button
                          className="
                          flex items-center
                          px-3 py-1.5
                          rounded-lg
                          text-xs text-white
                          bg-blue-600 
                          sm:px-4 sm:py-2
                          hover:bg-blue-700 sm:text-sm
                          transition-colors"
                          data-oid="ncf8lql"
                        >
                          상세보기
                          <ArrowRight
                            className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                            data-oid="l0hf0yd"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6" data-oid="h0.jzj3">
            {/* Popular Posts */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="3daz3wi"
            >
              <h3
                className="font-semibold text-gray-900 mb-4 flex items-center"
                data-oid="ozq61qk"
              >
                <TrendingUp
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2"
                  data-oid="_nkmdy0"
                />
                인기 게시글
              </h3>
              <div className="space-y-3" data-oid="6:78ejy">
                {userPosts.slice(0, 5).map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="t6.m4m0"
                  >
                    <div
                      className="flex items-start space-x-2"
                      data-oid="wajfxzd"
                    >
                      <span
                        className="text-sm font-bold text-orange-500 flex-shrink-0"
                        data-oid=":t:t4nx"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1" data-oid="sodvjdp">
                        <div
                          className="font-medium text-sm line-clamp-2 mb-1"
                          data-oid="gzmcci4"
                        >
                          {post.title}
                        </div>
                        <div
                          className="text-xs text-gray-500 flex items-center space-x-2"
                          data-oid="d_.k.7w"
                        >
                          <span data-oid=":1ozlj6">{post.author.name}</span>
                          <span data-oid="z74xvr1">•</span>
                          <span
                            className="flex items-center"
                            data-oid="465luoa"
                          >
                            <ThumbsUp
                              className="w-3 h-3 mr-1"
                              data-oid="1vfs3b_"
                            />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="tfjfsfo"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="5dufa7c"
              >
                커뮤니티 통계
              </h3>
              <div className="space-y-3 sm:space-y-4" data-oid="7_3-2gq">
                <div
                  className="flex justify-between items-center"
                  data-oid="iv8.m9u"
                >
                  <span className="text-sm text-gray-600" data-oid=".4ogomv">
                    총 게시글
                  </span>
                  <span className="font-bold text-blue-600" data-oid="d7-j2.d">
                    {filteredPosts.length}개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="ekj0rmg"
                >
                  <span className="text-sm text-gray-600" data-oid="gecdm21">
                    이번 주 신규
                  </span>
                  <span className="font-bold text-green-600" data-oid="e26xr-a">
                    12개
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="f320r34"
                >
                  <span className="text-sm text-gray-600" data-oid="cvbu.75">
                    평균 평점
                  </span>
                  <span
                    className="font-bold text-yellow-600"
                    data-oid="l:srj-y"
                  >
                    4.7
                  </span>
                </div>
                <div
                  className="flex justify-between items-center"
                  data-oid="or0rs7w"
                >
                  <span className="text-sm text-gray-600" data-oid="1w3wojh">
                    활성 사용자
                  </span>
                  <span
                    className="font-bold text-purple-600"
                    data-oid="u6dtp8_"
                  >
                    1,247명
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="kibo8j2"
            >
              <h3
                className="font-semibold text-gray-900 mb-4"
                data-oid="b584sat"
              >
                빠른 필터
              </h3>
              <div className="space-y-2" data-oid="9:crgm0">
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="y:kqlh6"
                >
                  ⭐ 평점 4.5 이상
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="0ngf-4n"
                >
                  🔥 이번 주 인기
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="-2xnfie"
                >
                  💰 예산별 코스
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="h0rais5"
                >
                  📅 당일치기
                </button>
                <button
                  className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  data-oid="2awm16j"
                >
                  👨‍👩‍👧‍👦 가족 추천
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
