interface PlaceTip { tip: string; }
interface BoardPlace {
  name: string;
  description: string;
  location_type: string;
  stay: string;
  open_time: string;
  entry_fee: string;
  location: string;
  distance: string;
  recommend_reason: string;
  board_place_tips: PlaceTip[];
  latitude: number;
  longitude: number;
  rating_count: number;
  review_count: number;
  next_distance: string;
  next_time: string;
}
interface BoardDay {
  day: number;
  title: string;
  subtitle: string;
  total_distance: string;
  total_time: string;
  author_note: string;
  estimated_cost: number;
  board_id: number;
  board_places: BoardPlace[];
}
interface BoardTag { tag: string; }
interface BoardHighlight { highlight: string; }
interface BoardImage { image_url: string; }
interface BoardBadge { badge: string; }
interface BoardAiInsights { title: string, insight: string }

export interface GeminiBoardResponse {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  author_type: string;
  duration: string;
  content: string;
  estimated_time: string;
  rating: number;
  views: number;
  likes: number;
  participants: string;
  difficulty: string;
  total_cost: string;
  total_locations: number;
  total_comments: number;
  total_distance: string;
  total_places: number;
  created_at: string;
  reliability: string;
  bookmark: number;
  board_tags: BoardTag[];
  board_highlights: BoardHighlight[];
  board_images: BoardImage[];
  board_badges: BoardBadge[];
  board_days: BoardDay[];
  board_ai_insights: BoardAiInsights[];
}

export interface GeminiRecommendResponse {
  budget: string,
  customDestination: string
  customDestinationDescription: string
  destination: string
  destinationType: string
  duration: string
  purpose: string
  transportation: string
  travelers: string
}

export const ai_boardResponse_func = (assignBoard: GeminiBoardResponse) => {

  return {
    "contents": [
      {
        "parts": [
          {
            "text": `${JSON.stringify(assignBoard)} total_distance는 board_places의 총 이동거리를, total_time은 총 시간을 만들어주고 거리는 km 단위, 시간은 시간과 분 단위로 붙여주고, views, likes, total_comments, bookmark는 0으로하고 rating은 places의 rating_count 평균을, places에는 위도경도와 distance, next_distance, next_time을 포함하여 n일차를 board_places.day를 참고하여 board_days의 board_places의 index 순서대로 생성하되 부족한 값을 채워서 json으로 다시 만들어줘 json 말고 다른 내용은 없이 응답해줘`
          }
        ]
      }
    ]
  }
}

export const ai_RecommendResponse_func = (recommend: GeminiRecommendResponse) => {

  return {
    "contents": [
      {
        "parts": [
          {
            "text": `[{'id':1,'title':'','subtitle':'','description':'','author':'','author_type':'','duration':'', 'content':'', 'estimated_time':'약 12시간','rating':1,'views':1,'likes':1,'participants':'1-6명','difficulty':1,'total_cost':1,'total_locations':1,'total_comments':1,'total_distance':'30km', 'total_places':1, 'created_at':'2025-07-01','course_tags':[],'course_highlights':[], 'course_ai_insights':[{'title':'', 'insight':''}], 'reliability':'80%','bookmark':1,'course_badges':[],'course_days':[{'day':1,'title':'','subtitle':'','total_distance':'70km','total_time':'5시간 30분', 'author_note': '', 'estimatedCost':1,'course_places':[{'id':1,'name':'','description':'','location_type':'출발지','stay':'30분','openTime':'05:00 ~ 20:00','entryFee':'성인 5,000원','location':'경기도 김포시 유현로 200','distance':'','recommend_reason':'','place_tips':[{tip: ''}], 'latitude': 1.1111, 'longitude': 1.1111, 'rating_count':3.5,'review_count':1,'next_distance':'10km','next_time':'20분'}]}]}] 이 형식대로 tags의 길이는 2개 이상 5개이하이며 [가족여행,커플여행,친구여행,혼자여행,당일치기] 중 하나만 마지막 요소로하고 ${recommend.destination || recommend.customDestination} 코스를 ${recommend.duration} 일정으로 ${recommend.destinationType} ${recommend.travelers} ${recommend.transportation}를 교통수단으로 ${recommend.purpose} ${recommend.budget}의 예산으로 맛집도 함께 json으로 추천해주는데 반드시 쌍따옴표(")를 사용해서 JSON.parse가 가능한 유효한 JSON으로만 출력해줘.`
          }
        ]
      }
    ]
  }
}

export const ai_mapDashboardResponse_func = (locations, filters) => {
  const locationsString = locations.map(x => x.spot.displayName.text + "(" +x.spot.formattedAddress + ")").join(",")

  return {
    "contents": [
      {
        "parts": [
          {
            "text": `[{'id':1,'title':'','subtitle':'','description':'','author':'','author_type':'','duration':'', 'content':'', 'estimated_time':'약 00시간','rating':1,'views':1,'likes':1,'participants':'00-00명','difficulty':1,'total_cost':1,'total_locations':1,'total_comments':1,'total_distance':'00km', 'total_places':1, 'created_at':'0000-00-00','course_tags':[],'course_highlights':[], 'course_ai_insights':[{'title':'', 'insight':''}], 'reliability':'00%','bookmark':1,'course_badges':[],'course_days':[{'day':1,'title':'','subtitle':'','total_distance':'70km','total_time':'5시간 30분', 'author_note': '', 'estimatedCost':1,'course_places':[{'id':1,'name':'','description':'','location_type':'출발지','stay':'00분','openTime':'05:00 ~ 20:00','entryFee':'성인 5,000원','location':'경기도 김포시 유현로 200','distance':'','recommend_reason':'','place_tips':[{tip: ''}], 'latitude': 1.1111, 'longitude': 1.1111, 'rating_count':3.5,'review_count':1,'next_distance':'10km','next_time':'20분'}]}]}] 이 형식대로 tags의 길이는 2개 이상 5개이하이며 [가족여행,커플여행,친구여행,혼자여행,당일치기] 중 하나만 마지막 요소로하고 기간은 ${filters.period}로 나머진 ${filters}에 따라 ${locationsString} 모두 하나의 코스로 id는 하나로하는데 거리가 멀면 course_days로 나눠서 json으로 추천해주는데 반드시 쌍따옴표(")를 사용해서 JSON.parse가 가능한 유효한 JSON으로만 출력해줘.`
          }
        ]
      }
    ]
  }
}