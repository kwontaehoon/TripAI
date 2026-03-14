import React, { use, useState } from "react"
import { Send, ThumbsUp, X, Trash2, User } from "lucide-react"
import {
  useCommentDeleteMutation,
  useCommentLikeMutation,
  useCommentRegisterMutation,
  useCommentReplyDeleteMutation,
  useCommentReplyLikeMutation,
  useCommentReplyRegisterMutation,
  useCommentsQuery,
} from "@/hooks/supabase/queries"
import { usePathname } from "next/navigation"
import moment from "moment"
const comments = ({ id, userInfo }) => {
  const pathname = usePathname()

  // pathname이 '/courses'로 시작하는지 확인
  const isCoursePage = pathname.startsWith("/courses")

  // pathname이 '/board'로 시작하는지 확인
  const isBoardPage = pathname.startsWith("/board")

  const [newComment, setNewComment] = useState("")
  const { mutateAsync: commentRegister } = useCommentRegisterMutation()
  const { mutateAsync: commentReplyRegister } =
    useCommentReplyRegisterMutation()
  const {
    data: commentsData,
    isLoading: commentsDataIsLoading,
    refetch: commentsDataRefetch,
  } = useCommentsQuery({
    board_id: isBoardPage ? id : null,
    course_id: isCoursePage ? id : null,
  })

  const totalCommentCount =
    commentsData?.length +
    commentsData?.reduce((accumulator, comment) => {
      return accumulator + comment.comments_replies.length
    }, 0)

  const { mutateAsync: commentDelete } = useCommentDeleteMutation()
  const { mutateAsync: commentReplyDelete } = useCommentReplyDeleteMutation()
  const { mutateAsync: commentLike } = useCommentLikeMutation()
  const { mutateAsync: commentReplyLike } = useCommentReplyLikeMutation()

  const [activeReplyForm, setActiveReplyForm] = useState<number | null>(null)
  const [newReplyComment, setNewReplyComment] = useState("")

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInfo) {
      alert("로그인 후 이용할 수 있습니다!")
      return
    }
    e.preventDefault()
    if (newComment.trim()) {
      await commentRegister({
        content: newComment,
        user_id: userInfo.id,
        board_id: isBoardPage ? id : null,
        course_id: isCoursePage ? id : null,
        likes: 0,
      })
      commentsDataRefetch()
      setNewComment("")
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

  const handleNestedReplySubmit = async (comment_id: number) => {
    await commentReplyRegister({
      user_id: userInfo.id,
      parent_comment_id: comment_id,
      content: newReplyComment,
      likes: 0,
    })
    setTimeout(() => {
      commentsDataRefetch()
    }, 500)
    setActiveReplyForm(null)
  }

  const handleCommentLike = async (comment_id: number) => {
    await commentLike({
      comment_id: comment_id,
      user_id: userInfo.id,
      board_id: isBoardPage ? id : null,
      course_id: isCoursePage ? id : null,
    })
    commentsDataRefetch()
  }

  const handleCommentReplyLike = async (comment_reply_id: number) => {
    await commentReplyLike({
      comment_reply_id: comment_reply_id,
      user_id: userInfo.id,
      board_id: isBoardPage ? id : null,
      course_id: isCoursePage ? id : null,
    })
    commentsDataRefetch()
  }

  // 댓글 삭제
  const handleCommentDelete = async (comment_id: number) => {
    await commentDelete(comment_id)
    commentsDataRefetch()
  }

  // 댓글 답글 삭제
  const handleCommentDeleteReply = async (reply_id: number) => {
    await commentReplyDelete(reply_id)
    commentsDataRefetch()
  }

  return commentsDataIsLoading ? (
    ""
  ) : (
    <div
      className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
     
    >
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
       
      >
        댓글 ({totalCommentCount})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex space-x-3">
          <div
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
           
          >
            <span className="text-sm">
              👤
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해주세요..."
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
             
            />

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
               
              >
                <Send className="w-4 h-4" />
                <span>댓글 작성</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {commentsData.map((comment) => (
          <div
            key={comment.id}
            className="border-b !border-gray-100 pb-4 last:border-b-0"
           
          >
            <div className="flex space-x-3">
              <div
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
               
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div
                  className="flex items-center space-x-2 mb-1"
                 
                >
                  <span
                    className="font-medium text-gray-900"
                   
                  >
                    {comment.users.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs bg-pink-300`}
                   
                  >
                    Gold
                  </span>
                  <span className="text-xs text-gray-500">
                    {moment(comment.created_at).format("YYYY-MM-DD")}
                  </span>
                  {userInfo &&
                    userInfo.commentsItem.comments.includes(comment.id) && (
                      <button
                        onClick={() => handleCommentDelete(comment.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="답글 삭제"
                       
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                   
                  >
                    <ThumbsUp className="w-3 h-3" />

                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className={`text-xs hover:text-blue-600 transition-colors ${
                      activeReplyForm === comment.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                   
                  >
                    {activeReplyForm === comment.id ? "답글 취소" : "답글"}
                  </button>
                </div>

                {/* Nested Reply Form */}
                {activeReplyForm === comment.id && (
                  <div
                    className="mt-3 p-3 bg-blue-50 rounded-lg border !border-blue-200"
                   
                  >
                    <div
                      className="flex items-center justify-between mb-2"
                     
                    >
                      <span
                        className="text-sm font-medium text-blue-700"
                       
                      >
                        {comment.users.name}님에게 답글 작성
                      </span>
                      <button
                        onClick={() => setActiveReplyForm(null)}
                        className="text-gray-400 hover:text-gray-600"
                       
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <div
                          className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                         
                        >
                          <span className="text-xs">
                            👤
                          </span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newReplyComment}
                            onChange={(e) => setNewReplyComment(e.target.value)}
                            placeholder={`@${comment.users.name}님에게 답글을 작성해주세요...`}
                            className="w-full px-3 py-2 border !border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                            rows={2}
                           
                          />

                          <div
                            className="flex justify-end mt-2 space-x-2"
                           
                          >
                            <button
                              type="button"
                              onClick={() => setActiveReplyForm(null)}
                              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-xs"
                             
                            >
                              취소
                            </button>
                            <button
                              onClick={() =>
                                handleNestedReplySubmit(comment.id)
                              }
                              type="submit"
                              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center space-x-1"
                             
                            >
                              <Send className="w-3 h-3" />

                              <span>답글</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.comments_replies.length !== 0 && (
                  <div className="mt-3 ml-4 space-y-3">
                    {comment.comments_replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex space-x-3"
                       
                      >
                        <div
                          className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                         
                        >
                          <User
                            className="w-4 h-4 text-white"
                           
                          />
                        </div>
                        <div className="flex-1">
                          <div
                            className="flex items-center space-x-2 mb-1"
                           
                          >
                            <span
                              className="font-medium text-gray-900 text-sm"
                             
                            >
                              {reply.users.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs bg-pink-300`}
                             
                            >
                              {/* {reply.author.level} */}gold
                            </span>
                            <span
                              className="text-xs text-gray-500"
                             
                            >
                              {moment(reply.created_at).format("YYYY-MM-DD")}
                            </span>
                            {userInfo &&
                              userInfo.commentsItem.comments_replies.includes(
                                reply.id,
                              ) && (
                                <button
                                  onClick={() =>
                                    handleCommentDeleteReply(reply.id)
                                  }
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="답글 삭제"
                                 
                                >
                                  <Trash2
                                    className="w-3 h-3"
                                   
                                  />
                                </button>
                              )}
                          </div>
                          <p
                            className="text-sm text-gray-700 mb-2"
                           
                          >
                            {reply.content}
                          </p>
                          <button
                            onClick={() => handleCommentReplyLike(reply.id)}
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                           
                          >
                            <ThumbsUp className="w-3 h-3" />

                            <span>{reply.likes}</span>
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
