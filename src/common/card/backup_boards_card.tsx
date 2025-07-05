"use client"

import { comma } from "@/util/comma"
import {
  ArrowRight,
  Calendar,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  ThumbsUp,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ai_courseText } from "../text/ai"

const Backup_board_card = () => {
  const router = useRouter()
  const [selectedFilter] = useState("전체")

  const handlePostClick = (postId: number) => {
    router.push(`/board/details/${postId}`)
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

  const filteredPosts = ai_courseText.filter((post) => {
    if (selectedFilter === "전체") return true
    return post.tags.includes(selectedFilter)
  })
  return (
    <div>
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
                  {/* {post.featured && (
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
                  )} */}

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
                            {/* {post.author.level} */}level
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
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor((post.difficulty))} flex-shrink-0`}
                          data-oid="tm.u:-."
                        >
                          {getDifficultyText(post.difficulty)}
                        </span>
                      </div>

                      {/* Author Info */}
                      <div
                        className="flex items-center space-x-2 mb-3"
                        data-oid="1qonzi3"
                      >
                        <span className="text-lg sm:text-xl border w-8 h-8 rounded-full" data-oid="aqxkzhp">
                          {/* {post.author.avatar} */}
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
                              {post.author}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs`}
                              data-oid="_fofxo."
                            >
                              {/* {post.author.level} */}
                              level
                            </span>
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="2o6.2-t"
                          >
                            게시글 0개 • {post.created_at}
                            {/* {post.author.posts} */}
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
                          <span data-oid="-6m4kn6">{post.total_places}개 장소</span>
                        </div>
                        <div
                          className="flex items-center text-gray-600"
                          data-oid="qjpkpk_"
                        >
                          <span
                            className="font-bold text-blue-600"
                            data-oid="k7i5hm5"
                          >
                            {comma(post.total_cost)}
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
                            className="text-xs flex items-center text-gray-500"
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
                            <span data-oid="03q0u6.">{post.total_comments}</span>
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
  )
}

export default Backup_board_card