import React, { use, useState } from "react"
import { Send, ThumbsUp, X } from "lucide-react"
import {
  useCommentDeleteMutation,
  useCommentRegisterMutation,
  useCommentReplyRegisterMutation,
  useCommentsQuery,
} from "@/hooks/supabase/dev"
import { sessionAtom, userInfoAtom } from "@/store/ai"
import { useAtomValue } from "jotai"
import { usePathname } from "next/navigation"
import moment from "moment"
const comments = ({ id }) => {
  const pathname = usePathname()

  // pathname이 '/courses'로 시작하는지 확인
  const isCoursePage = pathname.startsWith("/courses")

  // pathname이 '/board'로 시작하는지 확인
  const isBoardPage = pathname.startsWith("/board")

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

  const [newComment, setNewComment] = useState("")
  const { mutateAsync: commentRegister } = useCommentRegisterMutation()
  const { mutateAsync: commentReplyRegister } =
    useCommentReplyRegisterMutation()
  const userInfo = useAtomValue(userInfoAtom)
  const {
    data: commentsData,
    isLoading: commentsDataIsLoading,
    refetch: commentsDataRefetch,
  } = useCommentsQuery({
    board_id: isBoardPage ? id : null,
    course_id: isCoursePage ? id : null,
  })
  console.log("aaa commentsData: ", commentsData)
  const { mutate: commentDelete } = useCommentDeleteMutation(id)

  const [replies, setReplies] = useState<any[]>([])
  const [activeReplyForm, setActiveReplyForm] = useState<number | null>(null)
  const [newReplyComment, setNewReplyComment] = useState("")

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // 댓글 추가 로직
      await commentRegister({
        content: newComment,
        user_id: userInfo.id,
        board_id: isBoardPage ? id : null,
        course_id: isCoursePage ? id : null,
        like: 0,
      })
      setNewComment("")
      commentsDataRefetch()
    }
  }

  const handleReplyClick = (replyId: number) => {
    if (activeReplyForm === replyId) {
      setActiveReplyForm(null)
      setNewReplyComment("")
    } else {
      setActiveReplyForm(replyId)
      setNewReplyComment("")
    }
  }

  const handleLikeReply = (replyId: number) => {
    setReplies(
      replies.map((reply) =>
        reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply,
      ),
    )
  }

  const handleNestedReplySubmit = async (comment_id: number) => {
    await commentReplyRegister({
      user_id: userInfo.id,
      parent_comment_id: comment_id,
      content: newReplyComment,
    })
    commentsDataRefetch()
  }

  return commentsDataIsLoading ? (
    ""
  ) : (
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
      <form onSubmit={handleCommentSubmit} className="mb-6" data-oid="io--qsl">
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
        {commentsData.map((comment) => (
          <div
            key={comment.id}
            className="border-b !border-gray-100 pb-4 last:border-b-0"
            data-oid="psvy3jc"
          >
            <div className="flex space-x-3" data-oid="m.8zi0f">
              <span className="text-lg" data-oid="0teb3c9">
                👩‍👧‍👦
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
                    {comment.users.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs bg-pink-300`}
                    data-oid="1el87ys"
                  >
                    Gold
                  </span>
                  <span className="text-xs text-gray-500" data-oid="n76upee">
                    {moment(comment.created_at).format("YYYY-MM-DD")}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2" data-oid="hyvu73a">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4" data-oid="0kae553">
                  <button
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                    data-oid="tmkwnl9"
                  >
                    <ThumbsUp className="w-3 h-3" data-oid="me7y.ri" />

                    <span data-oid="2a43611">{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className={`text-xs hover:text-blue-600 transition-colors ${
                      activeReplyForm === comment.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                    data-oid="czt3b:n"
                  >
                    {activeReplyForm === comment.id ? "답글 취소" : "답글"}
                  </button>
                </div>

                {/* Nested Reply Form */}
                {activeReplyForm === comment.id && (
                  <div
                    className="mt-3 p-3 bg-blue-50 rounded-lg border !border-blue-200"
                    data-oid="bxqo7ew"
                  >
                    <div
                      className="flex items-center justify-between mb-2"
                      data-oid="mrqr-lj"
                    >
                      <span
                        className="text-sm font-medium text-blue-700"
                        data-oid="e6s9eec"
                      >
                        {comment.users.name}님에게 답글 작성
                      </span>
                      <button
                        onClick={() => setActiveReplyForm(null)}
                        className="text-gray-400 hover:text-gray-600"
                        data-oid="r74sow_"
                      >
                        <X className="w-4 h-4" data-oid="lk1i:n." />
                      </button>
                    </div>
                    <div data-oid="n93ni44">
                      <div className="flex space-x-2" data-oid="n0:igo.">
                        <div
                          className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                          data-oid=".6fhf.s"
                        >
                          <span className="text-xs" data-oid="c_zdnb_">
                            👤
                          </span>
                        </div>
                        <div className="flex-1" data-oid="q-k4z.5">
                          <textarea
                            value={newReplyComment}
                            onChange={(e) => setNewReplyComment(e.target.value)}
                            placeholder={`@${comment.users.name}님에게 답글을 작성해주세요...`}
                            className="w-full px-3 py-2 border !border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                            rows={2}
                            data-oid="rgb7p-m"
                          />

                          <div
                            className="flex justify-end mt-2 space-x-2"
                            data-oid="t0rc6bi"
                          >
                            <button
                              type="button"
                              onClick={() => setActiveReplyForm(null)}
                              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-xs"
                              data-oid="aq:_e0x"
                            >
                              취소
                            </button>
                            <button
                              onClick={() =>
                                handleNestedReplySubmit(comment.id)
                              }
                              type="submit"
                              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center space-x-1"
                              data-oid="mp8joc9"
                            >
                              <Send className="w-3 h-3" data-oid="dc-qetq" />

                              <span data-oid="omuh0gw">답글</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.comments_replies.length !== 0 && (
                  <div className="mt-3 ml-4 space-y-3" data-oid="wcof1o:">
                    {comment.comments_replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex space-x-3"
                        data-oid="zgn:9r."
                      >
                        <span className="text-sm" data-oid="vkcjuhc">
                          {/* {reply.author.avatar} */}
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
                              {reply.users.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs bg-pink-300`}
                              data-oid="yix7y.9"
                            >
                              {/* {reply.author.level} */}gold
                            </span>
                            <span
                              className="text-xs text-gray-500"
                              data-oid="nvh-h.y"
                            >
                              {moment(reply.created_at).format("YYYY-MM-DD")}
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
                            <ThumbsUp className="w-3 h-3" data-oid=".8bd3m4" />

                            <span data-oid="oyelwnx">{reply.likes}</span>
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
  )
}

export default comments
