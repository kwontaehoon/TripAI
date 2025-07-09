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