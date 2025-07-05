type Tag = {
  tag: string
};
type Highlights = string;
type Image = string;
type Badge = string;
type Tip = string;

type Place = {
  id: number;
  name: string;
  description: string;
  location_type: string;
  stay: string;
  openTime: string;
  entryFee: string;
  location: string;
  distance: string;
  recommend_reason: string;
  tips: Tip[];
  rating_count: number;
  review_count: number;
  next_distance: string;
  next_time: string;
};

type Day = {
  day: number;
  title: string;
  subTitle: string;
  total_distance: string;
  total_time: string;
  author_note: string;
  estimatedCost: number;
  places: Place[];
};

export type BoardProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  author_type: string;
  duration: string;
  estimated_time: string;
  rating: number;
  views: number;
  likes: number;
  content: string;
  participants: string;
  difficulty: number;
  total_cost: number;
  total_locations: number;
  total_comments: number;
  total_distance: string;
  total_places: number;
  created_at: string;
  board_tags: Tag[];
  highlights: Highlights[];
  images: Image[];
  reliability: string;
  bookmark: number;
  badges: Badge[];
  days: Day[];
};

export type CourseProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  author_type: string;
  duration: string;
  estimated_time: string;
  rating: number;
  views: number;
  likes: number;
  content: string;
  participants: string;
  difficulty: number;
  total_cost: number;
  total_locations: number;
  total_comments: number;
  total_distance: string;
  total_places: number;
  created_at: string;
  course_tags: Tag[];
  highlights: Highlights[];
  images: Image[];
  reliability: string;
  bookmark: number;
  badges: Badge[];
  days: Day[];
};

export type PageProps = {
  boardsData: BoardProps[];
  coursesData: CourseProps[];
};