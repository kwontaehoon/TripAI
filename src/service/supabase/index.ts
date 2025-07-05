import { createClient } from "./client";

// courses
export const getCourses = async() => {
    const supabase = await createClient();
    return await supabase
    .from("courses")
    .select(`
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
        course_day_places (
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
          )
        )
      )
    `);
}

// courseDetails
export const getCourseDetails = async(params: number) => {
  const supabase = await createClient();
  return await supabase
  .from("courses")
  .select(`
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
      course_day_places (
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
        )
      )
    )
  `)
  .eq('id', params)

}

// boards
export const getBoards = async() => {
  const supabase = await createClient();
  return await supabase
  .from("boards")
  .select(`
    *,
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
        )
      )
    )
  `);
}

// boardDetails
export const getBoardDetails = async(params: number) => {
  const supabase = await createClient();
  return await supabase
  .from("boards")
  .select(`
    *,
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
        )
      )
    )
  `)
  .eq('id', params)
}

export const getCoursesAndBoards = async() => {
  const supabase = await createClient()
  const [coursesRes, boardsRes] = await Promise.all([
    supabase
      .from("courses")
      .select(`
        *,
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
          course_day_places (
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
            place_tips ( tip )
          )
        )
      `),

    supabase
      .from("boards")
      .select(`
        *,
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
            board_place_tips ( tip )
          )
        )
      `),
  ]);
  return {
    courses: coursesRes.data ?? [],
    boards: boardsRes.data ?? []
  };
}