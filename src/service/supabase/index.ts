import { cleanJson } from "@/util/cleanJson"
import { getGeminiAi } from "../gemini"
import { createClient } from "./client"
import moment from "moment"
import { GeminiBoardResponse } from "./type"
import { ai_boardResponse_func } from "@/common/ai/ai_response"

const supabase = await createClient()

const keywordQueries = [
  { keyword: "김포", key: "gimpo" },
  { keyword: "제주", key: "jeju" },
  { keyword: "강원도", key: "gangwon" },
]

// user 정보 가져오기
export const getUserInfo = async (params) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      *,
      boards(
      *,
      board_images(*)
      ),
      likes(
        id,
        board_id,
        course_id,
        comment_id,
        comment_reply_id
      ),
      comments(
        id
      ),
      comments_replies(
        id
      )
    `,
    )
    .eq("email", params)
    .single()

  if (error) {
    console.error("Error fetching user info with likes:", error)
    return null
  }

  if (data) {
    const { comments, comments_replies, likes, ...userInfo } = data

    // 본인이 작성한 댓글, 댓글의 답글 id 조회한 배열을 userInfo에 추가
    const commentsItem = {
      comments: comments.map((comment) => comment.id),
      comments_replies: comments_replies.map((reply) => reply.id),
    }
    // 본인이 누른 좋아요 추가
    const likesItem = {
      courses: likes.map((course) => course.course_id),
      boards: likes.map((board) => board.board_id),
      comments: likes.map((comments) => comments.comment_id),
      comments_replies: likes.map(
        (comments_replies) => comments_replies.comments_replies,
      ),
    }

    return {
      ...userInfo,
      commentsItem,
      likesItem,
    }
  }

  return null
}

// user 이메일 확인
export const postEmailCheck = async (params) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", params)
    .single()

  return data
}

// user 계정 삭제
export const deleteUser = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("email", email)

  return data
}

// 회원가입
// 사실상 회원가입은 auth -> 트리거로 users 테이블에 생성되기 때문에 users 테이블의 name만 변경
export const postSignup = async (params: object) => {
  const { data, error } = await supabase
    .from("users")
    .update({ name: params.name })
    .eq("email", params.email)

  if (error) {
    console.error("사용자 이름 업데이트 실패:", error)
  } else {
    console.log("사용자 이름 업데이트 성공:", data)
  }

  return data
}

// mypage update profile
export const postMypageUpdateProfile = async (params: object) => {
  const updateData = {
    profile_image_url: params.profile_image_url[0].image_url,
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData) // update 메서드 사용 및 객체 전달
    .eq("email", params.email) // email이 일치하는 행을 찾아서 업데이트

  if (error) {
    console.error("프로필 이미지 업데이트 오류:", error)
    return { success: false, error: error.message }
  }

  return data
}

// mypage edit
export const postMypageEdit = async (params: object) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      name: params.name,
      introduce: params.introduce,
    })
    .eq("email", params.email)
    .select("profile_image_url")

  if (error) {
    console.error("mypage 업데이트 실패:", error)
  } else {
    console.log("mypage 업데이트 성공:", data)
  }

  return data
}

// mypage like
export const getMypageLikes = async (courseIds: [], boardIds: []) => {
  const [coursesRes, boardsRes] = await Promise.all([
    supabase.from("courses").select("*").in("id", courseIds),
    supabase.from("boards").select("*").in("id", boardIds),
  ])
  return [...(coursesRes.data ?? []), ...(boardsRes.data ?? [])]
}

// courses
export const getCourses = async () => {
  const { data } = await supabase
    .from("courses")
    .select(
      `
      *,
      course_ai_insights (
        title,
        insight
      ),
      course_tags (
        tag
      ),
      course_highlights (
        highlight
      ),
      course_images (
        image_url
      ),
      course_badges (
        badge
      ),
      course_days (
        day,
        title,
        subtitle,
        total_distance,
        total_time,
        author_note,
        estimated_cost,
        course_places (
          id,
          name,
          description,
          location_type,
          stay,
          open_time,
          entry_fee,
          location,
          distance,
          recommend_reason,
          rating_count,
          review_count,
          next_distance,
          next_time,
          place_tips (
            tip
          ),
          latitude,
          longitude
        )
      )
    `,
    )
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
  return data
}

type GetCoursesResponse = {
  courses: object[] | null
  nextCursor: string | null
}

// getCoursesInfinite
export const getCoursesInfinite = async ({
  pageParam,
  limit = 10,
}: {
  pageParam?: string | null
  limit?: number
}): Promise<GetCoursesResponse> => {
  let query = supabase
    .from("courses")
    .select(
      `
      *,
      comments (
          *,
          comments_replies (*)
        ),
      course_ai_insights (
        title,
        insight
      ),
      course_tags (
        tag
      ),
      course_highlights (
        highlight
      ),
      course_images (
        image_url
      ),
      course_badges (
        badge
      ),
      course_days (
        day,
        title,
        subtitle,
        total_distance,
        total_time,
        author_note,
        estimated_cost,
        course_places (
          id,
          name,
          description,
          location_type,
          stay,
          open_time,
          entry_fee,
          location,
          distance,
          recommend_reason,
          rating_count,
          review_count,
          next_distance,
          next_time,
          place_tips (
            tip
          ),
          latitude,
          longitude
        )
      )
      `,
    )
    .order("id", { ascending: true })

  if (pageParam) {
    query = query.gte("id", pageParam)
  }

  const { data, error } = await query.limit(limit + 1)

  if (error) {
    throw error
  }

  let nextCursor = null
  if (data && data.length > limit) {
    const lastItem = data[limit - 1]
    nextCursor = lastItem.id + 1
    data.pop()
  }

  return {
    courses: data,
    nextCursor,
  }
}

// courseDetails
export const getCourseDetails = async (params: number) => {
  const { data } = await supabase
    .from("courses")
    .select(
      `
    *,
    comments (
          *,
          comments_replies (*)
        ),
    course_ai_insights (
      title,
      insight
    ),
    course_tags (
      tag
    ),
    course_highlights (
      highlight
    ),
    course_images (
      image_url
    ),
    course_badges (
      badge
    ),
    course_days (
      day,
      title,
      subtitle,
      total_distance,
      total_time,
      author_note,
      estimated_cost,
      course_places (
        id,
        name,
        description,
        location_type,
        stay,
        open_time,
        entry_fee,
        location,
        distance,
        recommend_reason,
        rating_count,
        review_count,
        next_distance,
        next_time,
        place_tips (
          tip
        ),
        latitude,
        longitude
      )
    )
  `,
    )
    .eq("id", params)
  return data
}

// boards
export const getBoards = async () => {
  const { data } = await supabase
    .from("boards")
    .select(
      `
    *,
    users(*),
    board_ai_insights (
      title,
      insight
    ),
    board_tags (
      tag
    ),
    board_highlights (
      highlight
    ),
    board_images (
      image_url
    ),
    board_badges (
      badge
    ),
    board_days (
      id,
      day,
      title,
      subtitle,
      total_distance,
      total_time,
      author_note,
      estimated_cost,
      board_places (
        id,
        name,
        description,
        location_type,
        stay,
        open_time,
        entry_fee,
        location,
        distance,
        recommend_reason,
        rating_count,
        review_count,
        next_distance,
        next_time,
        board_place_tips (
          tip
        ),
        latitude,
        longitude
      )
    )
  `,
    )
    .order("id", { ascending: true })
  return data
}

type GetBoardsResponse = {
  boards: object[] | null
  nextCursor: string | null
}

// getBoardInfinite
export const getBoardsInfinite = async ({
  pageParam,
  limit = 10,
}: {
  pageParam?: string | null
  limit?: number
}): Promise<GetBoardsResponse> => {
  let query = supabase
    .from("boards")
    .select(
      `
        *,
        users(*),
        comments (
          *,
          comments_replies (*)
        ),
        board_ai_insights (
          title,
          insight
        ),
        board_tags (
          tag
        ),
        board_highlights (
          highlight
        ),
        board_images (
          image_url
        ),
        board_badges (
          badge
        ),
        board_days (
          id,
          day,
          title,
          subtitle,
          total_distance,
          total_time,
          author_note,
          estimated_cost,
          board_places (
            id,
            name,
            description,
            location_type,
            stay,
            open_time,
            entry_fee,
            location,
            distance,
            recommend_reason,
            rating_count,
            review_count,
            next_distance,
            next_time,
            board_place_tips (
              tip
            ),
            latitude,
            longitude
          )
        )
      `,
    )
    .order("id", { ascending: true })

  if (pageParam) {
    query = query.gte("id", pageParam)
  }

  const { data, error } = await query.limit(limit + 1)

  if (error) {
    throw error
  }

  let nextCursor = null
  if (data && data.length > limit) {
    const lastItem = data[limit - 1]
    nextCursor = lastItem.id + 1
    data.pop()
  }

  return {
    boards: data,
    nextCursor,
  }
}

// boardDetails
export const getBoardDetails = async (params: number) => {
  const { data, error } = await supabase
    .from("boards")
    .select(
      `
    *,
    users(*),
    comments (
          *,
          comments_replies (*)
        ),
    board_ai_insights (
      title,
      insight
    ),
    board_tags (
      tag
    ),
    board_highlights (
      highlight
    ),
    board_images (
      image_url
    ),
    board_badges (
      badge
    ),
    board_days (
      id,
      day,
      title,
      subtitle,
      total_distance,
      total_time,
      author_note,
      estimated_cost,
      board_places (
        id,
        name,
        description,
        location_type,
        stay,
        open_time,
        entry_fee,
        location,
        distance,
        recommend_reason,
        rating_count,
        review,
        review_count,
        next_distance,
        next_time,
        board_place_tips (
          tip
        ),
        latitude,
        longitude
      )
    )
  `,
    )
    .eq("id", params)
    .order("day", { foreignTable: "board_days" }) // board_days를 day 기준으로 정렬
    .order("id", { foreignTable: "board_days.board_places" }) // board_places를 id 기준으로 정렬

  if (error || !data || data.length === 0) {
    console.error("데이터를 찾을 수 없거나 오류가 발생했습니다.", error)
    return []
  }

  const userId = data[0].users.id

  // boards의 게시글 수
  const { count: boardCount, error: boardError } = await supabase
    .from("boards")
    .select("*", { count: "exact" })
    .eq("user_id", userId)

  const totalCount = boardCount || 0

  data[0].users = {
    ...data[0].users,
    total_post: totalCount,
  }

  return data
}

export const getCoursesAndBoards = async () => {
  const [coursesRes, boardsRes] = await Promise.all([
    supabase
      .from("courses")
      .select(
        `
        *,
        comments (
          *,
          comments_replies (*)
        ),
        course_ai_insights ( title, insight ),
        course_tags ( tag ),
        course_highlights ( highlight ),
        course_images ( image_url ),
        course_badges ( badge ),
        course_days (
          day,
          title,
          subtitle,
          total_distance,
          total_time,
          author_note,
          estimated_cost,
          course_places (
            id,
            name,
            description,
            location_type,
            stay,
            open_time,
            entry_fee,
            location,
            distance,
            recommend_reason,
            rating_count,
            review_count,
            next_distance,
            next_time,
            place_tips ( tip ),
            latitude,
            longitude
          )
        )
      `,
      )
      .order("id", { ascending: true }),

    supabase
      .from("boards")
      .select(
        `
        *,
        users(*),
        comments (
          *,
          comments_replies (*)
        ),
        board_ai_insights ( title, insight ),
        board_tags ( tag ),
        board_highlights ( highlight ),
        board_images ( image_url ),
        board_badges ( badge ),
        board_days (
          id,
          day,
          title,
          subtitle,
          total_distance,
          total_time,
          author_note,
          estimated_cost,
          board_places (
            id,
            name,
            description,
            location_type,
            stay,
            open_time,
            entry_fee,
            location,
            distance,
            recommend_reason,
            rating_count,
            review_count,
            next_distance,
            next_time,
            board_place_tips ( tip ),
            latitude,
            longitude
          )
        )
      `,
      )
      .order("id", { ascending: true }),
  ])
  return [...(coursesRes.data ?? []), ...(boardsRes.data ?? [])]
}

export const getCoursesAndBoardsGallery = async () => {
  const [coursesRes, boardsRes] = await Promise.all([
    supabase
      .from("courses")
      .select(
        `
        *,
        comments_count:comments!course_id(count),
        comments (
          *,
          comments_replies (*)
        ),
        course_ai_insights ( title, insight ),
        course_tags ( tag ),
        course_highlights ( highlight ),
        course_images ( image_url ),
        course_badges ( badge ),
        course_days (
          day,
          title,
          subtitle,
          total_distance,
          total_time,
          author_note,
          estimated_cost,
          course_places (
            id,
            name,
            description,
            location_type,
            stay,
            open_time,
            entry_fee,
            location,
            distance,
            recommend_reason,
            rating_count,
            review_count,
            next_distance,
            next_time,
            place_tips ( tip ),
            latitude,
            longitude
          )
        )
      `,
      )
      .order("likes", { ascending: false })
      .order("count", { ascending: false, foreignTable: "comments!course_id" })
      .limit(6),

    supabase
      .from("boards")
      .select(
        `
        *,
        users(*),
        comments_count:comments!board_id(count),
        comments (
          *,
          comments_replies (*)
        ),
        board_ai_insights ( title, insight ),
        board_tags ( tag ),
        board_highlights ( highlight ),
        board_images ( image_url ),
        board_badges ( badge ),
        board_days (
          id,
          day,
          title,
          subtitle,
          total_distance,
          total_time,
          author_note,
          estimated_cost,
          board_places (
            id,
            name,
            description,
            location_type,
            stay,
            open_time,
            entry_fee,
            location,
            distance,
            recommend_reason,
            rating_count,
            review_count,
            next_distance,
            next_time,
            board_place_tips ( tip ),
            latitude,
            longitude
          )
        )
      `,
      )
      .order("likes", { ascending: false })
      .order("count", { ascending: false, foreignTable: "comments!board_id" })
      .limit(6),
  ])

  // 데이터 가공: comments_count 필드의 count 값을 추출하여 숫자로 만듭니다.
  const coursesData = (coursesRes.data ?? []).map(item => ({ 
    ...item, 
    comments_count: item.comments_count?.[0]?.count || 0 
  }));
  const boardsData = (boardsRes.data ?? []).map(item => ({ 
    ...item, 
    comments_count: item.comments_count?.[0]?.count || 0 
  }));

  const allData = [...coursesData, ...boardsData]

  // 최종 정렬 로직: 1차 likes 내림차순, 2차 comments_count 내림차순
  allData.sort((a, b) => {
    // 1차 정렬: likes
    if ((b.likes || 0) !== (a.likes || 0)) {
      return (b.likes || 0) - (a.likes || 0);
    }
    // 2차 정렬: comments_count
    return (b.comments_count || 0) - (a.comments_count || 0);
  });

  // 상위 6개만 반환
  return allData.slice(0, 6)
}

// 게시글 좋아요
export const postLike = async (params) => {
  const { board_id, course_id, user_id } = params

  // 좋아요 대상 ID (board_id 또는 course_id)를 결정합니다.
  const targetId = board_id || course_id
  const targetIdColumn = board_id ? "board_id" : "course_id"

  try {
    // 1. 좋아요가 이미 존재하는지 확인
    const { data: existingLike, error: selectError } = await supabase
      .from("likes")
      .select("id")
      .eq(targetIdColumn, targetId)
      .eq("user_id", user_id)
      .maybeSingle()

    if (selectError) {
      console.error(selectError)
    }

    // 2. 좋아요 상태에 따라 처리
    if (existingLike) {
      // 좋아요가 이미 존재하면 삭제 (좋아요 취소)
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq(targetIdColumn, targetId)
        .eq("user_id", user_id)

      if (deleteError) {
        console.error("Error deleting like:", deleteError.message)
        return { success: false, error: deleteError.message }
      }
      return { success: true, action: "deleted" }
    } else {
      // 좋아요가 존재하지 않으면 추가
      const { error: insertError } = await supabase.from("likes").insert({
        [targetIdColumn]: targetId,
        user_id: user_id,
      })

      if (insertError) {
        console.error("Error inserting like:", insertError.message)
        return { success: false, error: insertError.message }
      }
      return { success: true, action: "inserted" }
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error)
    return { success: false, error: error.message }
  }
}

// 게시글 댓글 좋아요
export const postCommentLike = async (params) => {
  const { comment_id, user_id, board_id, course_id } = params

  const targetId = board_id || course_id
  const targetIdColumn = board_id ? "board_id" : "course_id"
  console.log("aaa target: ", targetId, targetIdColumn)

  try {
    // 1. 좋아요가 이미 존재하는지 확인
    const { data: existingLike, error: selectError } = await supabase
      .from("likes")
      .select("id")
      .eq(targetIdColumn, targetId)
      .eq("comment_id", comment_id)
      .eq("user_id", user_id)
      .maybeSingle()

    if (selectError) {
      console.error(selectError)
    }

    // 2. 좋아요 상태에 따라 처리
    if (existingLike) {
      // 좋아요가 이미 존재하면 삭제 (좋아요 취소)
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq(targetIdColumn, targetId)
        .eq("comment_id", comment_id)
        .eq("user_id", user_id)

      if (deleteError) {
        console.error("Error deleting like:", deleteError.message)
        return { success: false, error: deleteError.message }
      }
      return { success: true, action: "deleted" }
    } else {
      // 좋아요가 존재하지 않으면 추가
      const { error: insertError } = await supabase.from("likes").insert({
        ["comment_id"]: comment_id,
        user_id: user_id,
        [targetIdColumn]: targetId,
      })

      if (insertError) {
        console.error("Error inserting like:", insertError.message)
        return { success: false, error: insertError.message }
      }
      return { success: true, action: "inserted" }
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error)
    return { success: false, error: error.message }
  }
}

// 게시글 답글 좋아요
export const postCommentReplyLike = async (params) => {
  const { comment_reply_id, user_id, board_id, course_id } = params
  const targetId = board_id || course_id
  const targetIdColumn = board_id ? "board_id" : "course_id"
  try {
    // 1. 좋아요가 이미 존재하는지 확인
    const { data: existingLike, error: selectError } = await supabase
      .from("likes")
      .select("id")
      .eq(targetIdColumn, targetId)
      .eq("comment_reply_id", comment_reply_id)
      .eq("user_id", user_id)
      .maybeSingle()

    if (selectError) {
      console.error(selectError)
    }

    // 2. 좋아요 상태에 따라 처리
    if (existingLike) {
      // 좋아요가 이미 존재하면 삭제 (좋아요 취소)
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("comment_reply_id", comment_reply_id)
        .eq("user_id", user_id)

      if (deleteError) {
        console.error("Error deleting like:", deleteError.message)
        return { success: false, error: deleteError.message }
      }
      return { success: true, action: "deleted" }
    } else {
      // 좋아요가 존재하지 않으면 추가
      const { error: insertError } = await supabase.from("likes").insert({
        ["comment_reply_id"]: comment_reply_id,
        user_id: user_id,
        [targetIdColumn]: targetId,
      })

      if (insertError) {
        console.error("Error inserting like:", insertError.message)
        return { success: false, error: insertError.message }
      }
      return { success: true, action: "inserted" }
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error)
    return { success: false, error: error.message }
  }
}

// comments list
export const getComments = async (params) => {
  let query = supabase
    .from("comments")
    .select(
      `
      *,
      users(*),
      comments_replies(
        *,
        users(*)
      )
      `,
    )
    .order("created_at", { ascending: true })
    .order("created_at", {
      referencedTable: "comments_replies",
      ascending: true,
    })

  // `board_id`가 null이 아니면 조건 추가
  if (params.board_id) {
    query = query.eq("board_id", params.board_id)
  }

  // `course_id`가 null이 아니면 조건 추가
  if (params.course_id) {
    query = query.eq("course_id", params.course_id)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching comments:", error)
    return null
  }

  return data
}

// comment 등록
export const postCommentRegister = async (params) => {
  const { data, error } = await supabase
    .from("comments")
    .insert(params)
    .select()
    .single()

  if (error) {
    console.error("Error CommentRegister:", error)
    return null
  }

  return data
}

// comment 답글 등록
export const postCommentReplyRegister = async (params) => {
  const { data, error } = await supabase
    .from("comments_replies")
    .insert(params)
    .select()
    .single()

  if (error) {
    console.error("Error CommentRegister:", error)
    return null
  }

  return data
}

// comment 삭제
export const postCommentDelete = async (id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error CommentDelete:", error)
    return null
  }

  return data
}

// comment 답글 삭제
export const postCommentReplyDelete = async (id: number) => {
  const { data, error } = await supabase
    .from("comments_replies")
    .delete()
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error CommentDelete:", error)
    return null
  }

  return data
}

const locationKeywordMap = {
  gimpo: ["김포"],
  gangwon: ["강원도", "강릉", "속초", "양양"],
  seoul: ["서울", "은평구", "송파구", "강남구", "종로구", "마포구"],
  jeju: ["제주", "제주시", "서귀포시"],
}

// 쿼리 문자열을 동적으로 생성하는 헬퍼 함수
const buildSearchQuery = (map) => {
  const conditions = []
  for (const mainLocation in map) {
    map[mainLocation].forEach((keyword) => {
      conditions.push(`title.ilike.%${keyword}%`)
      conditions.push(`content.ilike.%${keyword}%`)
    })
  }
  return conditions.join(",")
}

// 메인 인기 여행지
export const getPopularLocation = async () => {
  const searchQuery = buildSearchQuery(locationKeywordMap)

  const [coursesRes, boardsRes] = await Promise.all([
    supabase
      .from("courses")
      .select(
        `
        id,
        title,
        content
      `,
      )
      .or(searchQuery),

    supabase
      .from("boards")
      .select(
        `
        id,
        title,
        content
      `,
      )
      .or(searchQuery),
  ])

  const allData = [...(coursesRes.data ?? []), ...(boardsRes.data ?? [])]

  const categorizedData = {
    gimpo: [],
    gangwon: [],
    seoul: [],
    jeju: [],
  }

  const processedIds = new Set()
  const mainLocations = Object.keys(locationKeywordMap)

  allData.forEach((item) => {
    if (!item.title && !item.content) return
    if (processedIds.has(item.id)) return

    const combinedText = `${item.title || ""} ${item.content || ""}`

    for (const mainLocation of mainLocations) {
      if (
        locationKeywordMap[mainLocation].some((keyword) =>
          combinedText.includes(keyword),
        )
      ) {
        categorizedData[mainLocation].push(item)
        processedIds.add(item.id)
        break
      }
    }
  })

  return categorizedData
}

// 인기 여행지
export const getPopularSearch = async () => {
  const results: Record<string, number> = {}
  for (const { keyword, key } of keywordQueries) {
    const [coursesRes, boardsRes] = await Promise.all([
      supabase
        .from("courses")
        .select(
          `
          id, title, subtitle, description
        `,
        )
        .or(
          `title.ilike.%${keyword}%,subtitle.ilike.%${keyword}%,description.ilike.%${keyword}%`,
        ),

      supabase
        .from("boards")
        .select(
          `
          id, title, subtitle, description
        `,
        )
        .or(
          `title.ilike.%${keyword}%,subtitle.ilike.%${keyword}%,description.ilike.%${keyword}%`,
        ),
    ])

    if (coursesRes.error) {
      console.error(`Error fetching courses for ${keyword}:`, coursesRes.error)
      results[`${key}_courses_count`] = 0
    } else {
      results[`${key}_courses_count`] = coursesRes.data
        ? coursesRes.data.length
        : 0
    }

    if (boardsRes.error) {
      console.error(`Error fetching boards for ${keyword}:`, boardsRes.error)
      results[`${key}_boards_count`] = 0
    } else {
      results[`${key}_boards_count`] = boardsRes.data
        ? boardsRes.data.length
        : 0
    }
  }

  return results
}

// interface NewBoardData {
//   title: string;
//   subtitle: string;
//   description: string;
//   user_id: string; // 게시물 작성자 ID
//   // boards 테이블의 다른 필수 컬럼들이 있다면 여기에 추가하세요
// }

// const boardData = {

//   author: "guest",
//   author_type: "guest",
//   estimated_time: "",

//   board_images: [{
//     image_url: "1752001876060-aaa.PNG",
//   }],
//   title: "제목 입니다.",
//   subtitle: "부제목 입니다",
//   total_cost: "500000",
//   participants: "혼자",
//   duration: "2박 3일",
//   difficulty: "쉬움",
//   description: "설명 입니다",
//   board_tags: ["태그1", "태그2"],
//   board_highlights: ["명소1", "명소2", "명소3"],
//   board_places: [
//     {
//       day: 1,
//       location: "주소1",
//       location_type: "관광지",
//       description: "설명",
//       name: "장소1",
//       stay: "2시간"
//     },
//     {
//       day: 1,
//       location: "주소2",
//       location_type: "관광지",
//       description: "설명",
//       name: "장소2",
//       stay: "2시간반"
//     },
//     {
//       day: 2,
//       location: "주소3",
//       location_type: "관광지",
//       description: "설명",
//       name: "장소3",
//       stay: "1시간반"
//     }
//   ]
// }

export const postBoardCreate = async (boardData: any) => {
  // board/write의 원본 데이터 변경을 방지하기 위해 복사
  const copiedData = { ...boardData }

  // boards.board_places를 boards.board_days: [{ board_places: [{ ... }] }] 형태로 변경
  const groupedDays = copiedData.board_places.reduce((acc, place) => {
    const { day, ...rest } = place
    const dayIndex = acc.findIndex((entry) => entry.day === day)

    const placeWithoutDay = {
      ...rest,
      board_place_tips: [{ tip: "" }],
      distance: "km",
      entry_fee: "",
      latitude: 1,
      longitude: 1,
      next_distance: "km",
      next_time: "",
      open_time: "",
      recommend_reason: "",
      review_count: 0,
    }

    if (dayIndex > -1) {
      acc[dayIndex].board_places.push(placeWithoutDay)
    } else {
      // dayTitles, daySubtitles, dayNotes 데이터 추가
      const title = copiedData.dayTitles[day] || ""
      const subtitle = copiedData.daySubtitles[day] || ""
      const author_note = copiedData.dayNotes[day] || ""

      acc.push({
        day,
        title,
        subtitle,
        total_distance: "",
        total_time: "",
        estimated_cost: 0,
        author_note,
        board_places: [placeWithoutDay],
      })
    }

    return acc
  }, [])
  // boards.board_days에 board_places를 넣었으므로 boards.board_places는 삭제
  delete copiedData.dayTitles
  delete copiedData.daySubtitles
  delete copiedData.dayNotes

  // boards.board_tags = { tag: tag }
  const board_tags_input = copiedData.board_tags.map((tag) => ({ tag }))

  // boards.board_highlight = { highlight: highlight }
  const board_highlights_input = copiedData.board_highlights.map(
    (highlight) => ({ highlight }),
  )

  const assignBoard = Object.assign(copiedData, {
    board_tags: board_tags_input,
    board_highlights: board_highlights_input,
    author: copiedData.userInfo.name,
    user_id: copiedData.userInfo.id,
    author_type: "user",
    type: "user-post",
    estimated_time: copiedData.duration,
    bookmark: 0,
    created_at: moment().format("YYYY-MM-DD"),
    likes: 0,
    rating: 0,
    total_cost: copiedData.total_cost || 0,
    total_comments: 0,
    total_distance: "km",
    total_locations: copiedData.board_places.length || 0,
    total_places: copiedData.board_places.length || 0,
    views: 0,
    board_ai_insights: [
      {
        insight: "",
        title: "",
      },
    ],
    board_badges: [
      {
        badge: "",
      },
    ],
    board_days: groupedDays,
    board_images: copiedData.board_images,
  })

  delete copiedData.userInfo
  delete copiedData.board_places

  try {
    // 1. Gemini AI로부터 데이터 가져오기
    const aiResponse = await getGeminiAi(ai_boardResponse_func(assignBoard))

    // AI 응답 텍스트를 클리닝하고 JSON 파싱
    const cleanedJsonString = cleanJson(
      aiResponse.data.candidates[0].content.parts[0].text,
    )
    const fullBoardData: GeminiBoardResponse = JSON.parse(cleanedJsonString)

    // 2. boards 테이블에 해당 필드의 데이터 삽입
    // fullBoardData에서 boards 테이블에 직접 들어갈 칼럼만 추출
    const {
      board_tags,
      board_ai_insights,
      board_highlights,
      board_images,
      board_badges,
      board_days,
      ...boardBaseData
    } = fullBoardData

    const { data: boardRes, error: boardError } = await supabase
      .from("boards")
      .insert([boardBaseData]) // 추출된 핵심 데이터 삽입
      .select("id") // 생성된 ID 반환 요청

    if (boardError) {
      throw new Error(`Boards 테이블 삽입 오류: ${boardError.message}`)
    }
    if (!boardRes || boardRes.length === 0) {
      throw new Error("Boards 테이블 삽입 후 ID를 반환받지 못했습니다.")
    }
    const newBoardId = boardRes[0].id
    console.log(`새로운 게시물(boards) ID: ${newBoardId}`)

    // 2. board_images 테이블에 삽입 (이미지 데이터가 있을 경우)
    if (board_images.length > 0) {
      const imagesToInsert = board_images.map((img) => ({
        ...img,
        board_id: newBoardId, // 새로 생성된 board_id 연결
      }))
      const { error: imageError } = await supabase
        .from("board_images")
        .insert(imagesToInsert)

      if (imageError) {
        return { success: false, error: imageError.message }
      }
      console.log("board_images 삽입 완료")
    }

    // 3. board_tags 테이블에 삽입 (태그 데이터가 있을 경우)

    if (board_tags.length > 0) {
      const tagsToInsert = board_tags.map((tag) => ({
        ...tag,
        board_id: newBoardId, // 새로 생성된 board_id 연결
      }))
      const { error: tagError } = await supabase
        .from("board_tags")
        .insert(tagsToInsert)

      if (tagError) {
        return { success: false, error: tagError.message }
        // throw new Error(`board_tags 테이블 삽입 오류: ${tagError.message}`);
      }
      console.log("board_tags 삽입 완료")
    }

    // 4. board_highlights 테이블에 삽입 (하이라이트 데이터가 있을 경우)
    if (board_highlights.length > 0) {
      const highlightsToInsert = board_highlights.map((highlight) => ({
        ...highlight,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }))
      const { error: highlightError } = await supabase
        .from("board_highlights")
        .insert(highlightsToInsert)

      if (highlightError) {
        return { success: false, error: highlightError.message }
        // throw new Error(`board_highlights 테이블 삽입 오류: ${highlightError.message}`);
      }
      console.log("board_highlights 삽입 완료")
    }

    // 5. board_badges 테이블에 삽입 (배지 데이터가 있을 경우)
    if (board_badges.length > 0) {
      const badgesToInsert = board_badges.map((badge) => ({
        ...badge,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }))
      const { error: badgeError } = await supabase
        .from("board_badges")
        .insert(badgesToInsert)

      if (badgeError) {
        return { success: false, error: badgeError.message }
        // throw new Error(`board_badges 테이블 삽입 오류: ${badgeError.message}`);
      }
      console.log("board_badges 삽입 완료")
    }

    // 6. board_ai_insights 테이블에 삽입 (AI 인사이트 데이터가 있을 경우)
    // 가정: fullBoardData에 'ai_insights' 배열이 존재하며, 각 객체는 { title: string, insight: string } 형태
    if (board_ai_insights.length > 0) {
      const aiInsightsToInsert = board_ai_insights.map((insight) => ({
        ...insight,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }))
      const { error: aiInsightError } = await supabase
        .from("board_ai_insights")
        .insert(aiInsightsToInsert)

      if (aiInsightError) {
        return { success: false, error: aiInsightError.message }
        // throw new Error(`board_ai_insights 테이블 삽입 오류: ${aiInsightError.message}`);
      }
      console.log("board_ai_insights 삽입 완료")
    }

    // 7. days 및 중첩된 places, tips 삽입 (먼저 처리)
    if (board_days && board_days.length > 0) {
      for (const day of board_days) {
        // days 테이블에 삽입할 데이터 추출
        const { board_places, ...dayBaseData } = day
        const { data: dayRes, error: dayError } = await supabase
          .from("board_days") // 'board_days' 테이블명 가정
          .insert([{ ...dayBaseData, board_id: newBoardId }]) // board_id 연결
          .select("id") // 생성된 day_id 반환 요청

        if (dayError) {
          return { success: false, error: dayError.message }
        }
        const newDayId = dayRes[0].id
        console.log(`새로운 일차(board_days) ID: ${newDayId}`)

        // places 삽입 (places 배열이 있을 경우)
        if (board_places && board_places.length > 0) {
          for (const place of board_places) {
            // places 테이블에 삽입할 데이터 추출
            const { board_place_tips, ...placeBaseData } = place

            // placeBaseData의 camelCase를 snake_case로 변환 (DB 컬럼명에 따라)
            const formattedPlaceBaseData = {
              name: placeBaseData.name,
              description: placeBaseData.description,
              location_type: placeBaseData.location_type,
              stay: placeBaseData.stay,
              open_time: placeBaseData.open_time,
              entry_fee: placeBaseData.entry_fee,
              location: placeBaseData.location,
              distance: placeBaseData.distance,
              recommend_reason: placeBaseData.recommend_reason,
              latitude: placeBaseData.latitude,
              longitude: placeBaseData.longitude,
              rating_count: placeBaseData.rating_count,
              review: placeBaseData.review,
              review_count: placeBaseData.review_count,
              next_distance: placeBaseData.next_distance,
              next_time: placeBaseData.next_time,
            }

            const { data: placeRes, error: placeError } = await supabase
              .from("board_places")
              .insert([{ ...formattedPlaceBaseData, board_day_id: newDayId }])
              .select("id") // 생성된 place_id 반환 요청

            console.log("aaa placeRes: ", formattedPlaceBaseData, placeRes)
            if (placeError) {
              return { success: false, error: placeError.message }
            }
            const newPlaceId = placeRes[0].id
            console.log(`새로운 장소(board_places) ID: ${newPlaceId}`)

            // tips 삽입 (tips 배열이 있을 경우)
            if (board_place_tips && board_place_tips.length > 0) {
              const tipsToInsert = board_place_tips.map((tip) => ({
                ...tip,
                board_place_id: newPlaceId,
              }))
              const { error: tipsError } = await supabase
                .from("board_place_tips")
                .insert(tipsToInsert)
              if (tipsError) return { success: false, error: tipsError.message }
              else console.log("place_tips 삽입 완료")
            }
          }
        }
      }
    }

    console.log(`게시물 및 연관 데이터 삽입 성공! 새 게시물 ID: ${newBoardId}`)
    return { success: true, newBoardId: newBoardId }
  } catch (error: any) {
    console.error("데이터 삽입 과정에서 오류 발생:", error.message)
    return { success: false, error: error.message }
  }
}
