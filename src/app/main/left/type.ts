export type { BoardProps, CourseProps } from "../type"

export type GalleryItem = {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  comments_count: number;
  board_images?: { image_url: string }[];
  course_images?: { image_url: string }[];
};

export type PopularLocation = {
  jeju: unknown[];
  gangwon: unknown[];
  seoul: unknown[];
  gimpo: unknown[];
};

