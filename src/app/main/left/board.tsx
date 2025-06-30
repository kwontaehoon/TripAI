"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Star } from "lucide-react"

const board = () => {
  const router = useRouter()
  return (
    <div>
      {/* Community Board Preview */}
      <div data-oid="board-preview">
        <div
          className="flex items-center justify-between mb-4"
          data-oid="1_-2jma"
        >
          <h3
            className="text-lg font-semibold text-gray-900"
            data-oid=":3hlta6"
          >
            여행자들의 생생한 후기
          </h3>
          <button
            onClick={() => router.push("/board")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            data-oid=".o:lty4"
          >
            더보기
            <ArrowRight className="w-4 h-4 ml-1" data-oid="7:1utcm" />
          </button>
        </div>
        <div className="space-y-3" data-oid="8pkznx8">
          {[
            {
              id: 1,
              title: "제주도 3박 4일 완벽 가족여행 후기",
              author: "여행러버맘",
              rating: 4.8,
              likes: 156,
              tags: ["가족여행", "제주도"],
            },
            {
              id: 2,
              title: "부산 2박 3일 맛집 투어 완전 정복",
              author: "부산토박이",
              rating: 4.9,
              likes: 203,
              tags: ["맛집투어", "부산"],
            },
            {
              id: 5,
              title: "서울 데이트 코스 베스트 (20대 커플 추천)",
              author: "데이트마스터",
              rating: 4.8,
              likes: 267,
              tags: ["데이트", "서울"],
            },
          ].map((post, index) => (
            <button
              key={index}
              onClick={() => router.push(`/board/details/${post.id}`)}
              className="w-full text-left p-4 bg-white rounded-xl border !border-gray-200 hover:!border-blue-300 hover:shadow-md transition-all group"
              data-oid="q30-2r:"
            >
              <div
                className="flex items-start justify-between mb-2"
                data-oid="rf1p52c"
              >
                <h4
                  className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1"
                  data-oid="qh11_de"
                >
                  {post.title}
                </h4>
                <div
                  className="flex items-center text-xs text-gray-500 ml-2"
                  data-oid="8_b3_sc"
                >
                  <Star
                    className="w-3 h-3 text-yellow-400 mr-1"
                    data-oid="n45p2em"
                  />
                  {post.rating}
                </div>
              </div>
              <div
                className="flex items-center justify-between"
                data-oid="uij_t9-"
              >
                <div className="flex items-center space-x-2" data-oid="pgej4gz">
                  <span className="text-sm text-gray-600" data-oid="h37e4u.">
                    {post.author}
                  </span>
                  <div className="flex gap-1" data-oid="1yq5uz9">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs"
                        data-oid="bd_mxj6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="flex items-center text-xs text-gray-500"
                  data-oid="rnis-j6"
                >
                  <span data-oid="1wuf53h">👍 {post.likes}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default board
