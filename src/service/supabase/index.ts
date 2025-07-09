import { cleanJson } from "@/util/cleanJson";
import { getGeminiAi } from "../gemini";
import { createClient } from "./client";
import moment from 'moment';
import { GeminiBoardResponse } from "./type";
import { ai_response_func } from "@/common/ai/ai_response";

const supabase = await createClient();

const keywordQueries = [
  { keyword: "김포", key: "gimpo" },
  { keyword: "제주", key: "jeju" },
  { keyword: "강원도", key: "gangwon" },
];

// courses
export const getCourses = async() => {
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

export const postBoardCreate = async(
  boardData:any
) => {

  // board/write의 원본 데이터 변경을 방지하기 위해 복사
  const copiedData = { ...boardData };

  // boards.board_places를 boards.board_days: [{ board_places: [{ ... }] }] 형태로 변경
  const groupedDays = copiedData.board_places.reduce((acc, place) => {
    const { day, ...rest } = place;
    const dayIndex = acc.findIndex((entry) => entry.day === day);

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
      rating_count: 4.5,
      recommend_reason: "",
      review_count: 0
    };
  
    if (dayIndex > -1) {
      acc[dayIndex].board_places.push(placeWithoutDay);
    } else {

      const meta = copiedData.board_day_meta?.find((d) => d.day === day) || {};
  
      // boards에 필요한 나머지 데이터 추가
      acc.push({
        day,
        title: meta.title || "",
        subtitle: meta.subtitle || "",
        total_distance: meta.total_distance || "",
        total_time: meta.total_time || "",
        estimated_cost: meta.estimated_cost || 0,
        author_note: meta.author_note || "",
        board_places: [placeWithoutDay],
      });
    }
  
    return acc;
  }, []);
  // boards.board_days에 board_places를 넣었으므로 boards.board_places는 삭제
  delete copiedData.board_places;
  
  // boards.board_tags = { tag: tag }
  const board_tags_input = copiedData.board_tags.map((tag) => ({ tag }));

  // boards.board_highlight = { highlight: highlight }
  const board_highlights_input = copiedData.board_highlights.map((highlight) => ({ highlight }));

  const assignBoard = Object.assign(copiedData, {
    board_tags: board_tags_input,
    board_highlights: board_highlights_input,
    author: "게스트",
    author_type: "guest",
    type: "user-post",
    estimated_time: copiedData.duration,
     bookmark: 0,
     content: "",
     created_at: moment().format('YYYY-MM-DD'),
     likes: 0,
     rating: 0,
     total_comments: 0,
     total_distance: "km",
     total_locations: 0,
     total_places: 0,
     views: 0,
     board_ai_insights: [
      {
        insight: "",
        title: ""
      }
     ],
     board_badges: [
      {
        badge: ""
      }
     ],
     board_days: groupedDays,
     board_images: copiedData.board_images
  })

  try {
    // 1. Gemini AI로부터 데이터 가져오기
    const aiResponse = await getGeminiAi(ai_response_func(assignBoard));

    // AI 응답 텍스트를 클리닝하고 JSON 파싱
    const cleanedJsonString = cleanJson(aiResponse.data.candidates[0].content.parts[0].text);
    const fullBoardData: GeminiBoardResponse = JSON.parse(cleanedJsonString);
    console.log("fullBoardData: ", fullBoardData)

    // 2. boards 테이블에 해당 필드의 데이터 삽입
    // fullBoardData에서 boards 테이블에 직접 들어갈 칼럼만 추출
    const { board_tags, board_ai_insights, board_highlights, board_images, board_badges, board_days, ...boardBaseData } = fullBoardData;

    const { data: boardRes, error: boardError } = await supabase
      .from('boards')
      .insert([boardBaseData]) // 추출된 핵심 데이터 삽입
      .select('id'); // 생성된 ID 반환 요청

    if (boardError) {
      throw new Error(`Boards 테이블 삽입 오류: ${boardError.message}`);
    }
    if (!boardRes || boardRes.length === 0) {
      throw new Error('Boards 테이블 삽입 후 ID를 반환받지 못했습니다.');
    }
    const newBoardId = boardRes[0].id;
    console.log(`새로운 게시물(boards) ID: ${newBoardId}`);


    // 2. board_images 테이블에 삽입 (이미지 데이터가 있을 경우)
    if (board_images.length > 0) {
      const imagesToInsert = board_images.map(img => ({
        ...img,
        board_id: newBoardId, // 새로 생성된 board_id 연결
      }));
      const { error: imageError } = await supabase
        .from('board_images')
        .insert(imagesToInsert);

      if (imageError) {
        return { success: false, error: imageError.message };
      }
      console.log("board_images 삽입 완료")
    }

    // 3. board_tags 테이블에 삽입 (태그 데이터가 있을 경우)

    if (board_tags.length > 0) {
      const tagsToInsert = board_tags.map(tag => ({
        ...tag,
        board_id: newBoardId, // 새로 생성된 board_id 연결
      }));
      const { error: tagError } = await supabase
        .from('board_tags')
        .insert(tagsToInsert);

      if (tagError) {
        return { success: false, error: tagError.message };
        // throw new Error(`board_tags 테이블 삽입 오류: ${tagError.message}`);
      }
      console.log("board_tags 삽입 완료")
    }

    // 4. board_highlights 테이블에 삽입 (하이라이트 데이터가 있을 경우)
    if (board_highlights.length > 0) {
      const highlightsToInsert = board_highlights.map(highlight => ({
        ...highlight,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }));
      const { error: highlightError } = await supabase
        .from('board_highlights')
        .insert(highlightsToInsert);

      if (highlightError) {
        return { success: false, error: highlightError.message };
        // throw new Error(`board_highlights 테이블 삽입 오류: ${highlightError.message}`);
      }
      console.log("board_highlights 삽입 완료");
    }

    // 5. board_badges 테이블에 삽입 (배지 데이터가 있을 경우)
    if (board_badges.length > 0) {
      const badgesToInsert = board_badges.map(badge => ({
        ...badge,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }));
      const { error: badgeError } = await supabase
        .from('board_badges')
        .insert(badgesToInsert);

      if (badgeError) {
        return { success: false, error: badgeError.message };
        // throw new Error(`board_badges 테이블 삽입 오류: ${badgeError.message}`);
      }
      console.log("board_badges 삽입 완료");
    }

    // 6. board_ai_insights 테이블에 삽입 (AI 인사이트 데이터가 있을 경우)
    // 가정: fullBoardData에 'ai_insights' 배열이 존재하며, 각 객체는 { title: string, insight: string } 형태
    if (board_ai_insights.length > 0) {
      const aiInsightsToInsert = board_ai_insights.map(insight => ({
        ...insight,
        board_id: newBoardId, // boards 테이블에서 생성된 ID 연결
      }));
      const { error: aiInsightError } = await supabase
        .from('board_ai_insights')
        .insert(aiInsightsToInsert);

      if (aiInsightError) {
        return { success: false, error: aiInsightError.message };
        // throw new Error(`board_ai_insights 테이블 삽입 오류: ${aiInsightError.message}`);
      }
      console.log("board_ai_insights 삽입 완료");
    }

    // 7. days 및 중첩된 places, tips 삽입 (먼저 처리)
    if (board_days && board_days.length > 0) {
      for (const day of board_days) {
        // days 테이블에 삽입할 데이터 추출
        const { board_places, ...dayBaseData } = day;
        const { data: dayRes, error: dayError } = await supabase
          .from('board_days') // 'board_days' 테이블명 가정
          .insert([{ ...dayBaseData, board_id: newBoardId }]) // board_id 연결
          .select('id'); // 생성된 day_id 반환 요청

        if (dayError) {
          return { success: false, error: dayError.message };
        }
        const newDayId = dayRes[0].id;
        console.log(`새로운 일차(board_days) ID: ${newDayId}`);

        // places 삽입 (places 배열이 있을 경우)
        if (board_places && board_places.length > 0) {
          for (const place of board_places) {
            // places 테이블에 삽입할 데이터 추출
            const { board_place_tips, ...placeBaseData } = place;

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
                review_count: placeBaseData.review_count,
                next_distance: placeBaseData.next_distance,
                next_time: placeBaseData.next_time,
            };

            const { data: placeRes, error: placeError } = await supabase
              .from('board_places')
              .insert([{ ...formattedPlaceBaseData, board_day_id: newDayId }])
              .select('id'); // 생성된 place_id 반환 요청

            if (placeError) {
              return { success: false, error: placeError.message };
            }
            const newPlaceId = placeRes[0].id;
            console.log(`새로운 장소(board_places) ID: ${newPlaceId}`);

            // tips 삽입 (tips 배열이 있을 경우)
            if (board_place_tips && board_place_tips.length > 0) {
              const tipsToInsert = board_place_tips.map(tip => ({ ...tip, board_place_id: newPlaceId }));
              const { error: tipsError } = await supabase.from('board_place_tips').insert(tipsToInsert);
              if (tipsError) return { success: false, error: tipsError.message };
              else console.log("place_tips 삽입 완료");
            }
          }
        }
      }
    }

    console.log(`게시물 및 연관 데이터 삽입 성공! 새 게시물 ID: ${newBoardId}`);
    return { success: true, newBoardId: newBoardId };

  } catch (error: any) {
    console.error('데이터 삽입 과정에서 오류 발생:', error.message);
    return { success: false, error: error.message };
  }
}