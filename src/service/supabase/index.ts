import { createClient } from "./client";

const keywordQueries = [
  { keyword: "김포", key: "gimpo" },
  { keyword: "제주", key: "jeju" },
  { keyword: "강원도", key: "gangwon" },
];

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
        ),
        latitude,
        longitude
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
        ),
        latitude,
        longitude
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
            board_place_tips ( tip ),
            latitude,
            longitude
          )
        )
      `),
  ]);
  return {
    courses: coursesRes.data ?? [],
    boards: boardsRes.data ?? []
  };
}

export const getPopularSearch = async() => {
  const results: Record<string, number> = {};
  const supabase = await createClient();
  for (const { keyword, key } of keywordQueries) {
    const [coursesRes, boardsRes] = await Promise.all([
      supabase
        .from("courses")
        .select(`
          id, title, subtitle, description
        `)
        .or(`title.ilike.%${keyword}%,subtitle.ilike.%${keyword}%,description.ilike.%${keyword}%`),

      supabase
        .from("boards")
        .select(`
          id, title, subtitle, description
        `)
        .or(`title.ilike.%${keyword}%,subtitle.ilike.%${keyword}%,description.ilike.%${keyword}%`),
    ]);

    if (coursesRes.error) {
      console.error(`Error fetching courses for ${keyword}:`, coursesRes.error);
      results[`${key}_courses_count`] = 0;
    } else {
      results[`${key}_courses_count`] = coursesRes.data ? coursesRes.data.length : 0;
    }

    if (boardsRes.error) {
      console.error(`Error fetching boards for ${keyword}:`, boardsRes.error);
      results[`${key}_boards_count`] = 0;
    } else {
      results[`${key}_boards_count`] = boardsRes.data ? boardsRes.data.length : 0;
    }
  }

  return results;
}