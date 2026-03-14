"use client"

import { ArrowRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useBoardsInfiniteQuery } from "@/hooks/supabase/queries"

const Board = () => {
  const { data: boardsInfiniteData } = useBoardsInfiniteQuery()
  const router = useRouter()

  return (
    <div>
      {/* Community Board Preview */}
      <div>
        <div
          className="flex items-center justify-between mb-4"
         
        >
          <h3
            className="text-lg font-semibold text-gray-900"
           
          >
            여행자들의 생생한 후기
          </h3>
          <button
            onClick={() => router.push("/board")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
           
          >
            더보기
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-3">
          {Array.isArray(boardsInfiniteData) &&
            boardsInfiniteData.slice(0, 3).map((board) => (
              <button
                key={board.id}
                onClick={() => router.push(`/board/details/${board.id}`)}
                className="w-full text-left p-4 bg-white rounded-xl border !border-gray-200 hover:!border-blue-300 hover:shadow-md transition-all group"
               
              >
                <div
                  className="flex items-start justify-between mb-2"
                 
                >
                  <h4
                    className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1"
                   
                  >
                    {board.title}
                  </h4>
                  <div
                    className="flex items-center text-xs text-gray-500 ml-2"
                   
                  >
                    <Star
                      className="w-3 h-3 text-yellow-400 mr-1"
                     
                    />
                    {board.rating}
                  </div>
                </div>
                <div
                  className="flex items-center justify-between"
                 
                >
                  <div
                    className="flex items-center space-x-2"
                   
                  >
                    <span className="text-sm text-gray-600">
                      {board.author}
                    </span>
                    <div className="flex gap-1">
                      {board.board_tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs"
                         
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="flex items-center text-xs text-gray-500"
                   
                  >
                    <span>👍 {board.likes}</span>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Board
