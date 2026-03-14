"use client"

import { Camera, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import { If } from "react-haiku"
import { useRouter } from "next/navigation"
import { getStorageUrl } from "@/util/supabaseStorage"
import { useCoursesAndBoardsGalleryQuery } from "@/hooks/supabase/queries"

const Gallery = () => {
  const router = useRouter()
  const { data: galleryList } = useCoursesAndBoardsGalleryQuery()

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between mb-4"
       
      >
        <h3
          className="text-lg font-semibold text-gray-900 flex-1"
         
        >
          인기 여행 갤러리
        </h3>
        {/* <button
          onClick={() => ""}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
         
        >
          전체보기
          <ArrowRight className="w-4 h-4 ml-1" />
        </button> */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryList?.map((post) => {
          return (
            <div
              key={`${post.id}-${post.type}`}
              onClick={() =>
                router.push(
                  `/${post.type === "user-post" ? `boards/details/${post.id}` : `courses/details/${post.id}`}`,
                )
              }
              className="relative group cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
             
            >
              {/* Image */}
              <div
                className="aspect-[4/3] relative overflow-hidden"
               
              >
                <div
                  className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                 
                >
                  <If isTrue={post.type === "user-post"}>
                    {post.board_images && post.board_images.length > 0 && (
                      <Image
                        src={getStorageUrl(post.board_images[0].image_url)}
                        alt={post.title}
                        fill
                        quality={50}
                        priority={true}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    )}
                  </If>

                  <If isTrue={post.type === "ai-course"}>
                    {post.course_images && post.course_images.length > 0 && (
                      <Image
                        src={getStorageUrl(post.course_images[0].image_url)}
                        alt={post.title}
                        fill
                        quality={50}
                        priority={true}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    )}
                  </If>

                  <div
                    className="absolute top-3 sm:top-4 left-3 sm:left-4"
                   
                  >
                    {/* <span
                      className="bg-white text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                     
                    >
                      level
                    </span> */}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 
                ></div>

                {/* Overlay Content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 
                >
                  <div className="flex justify-end">
                    <Camera
                      className="w-5 h-5 text-white drop-shadow-lg"
                     
                    />
                  </div>
                  <div className="text-white">
                    <h4
                      className="font-semibold text-sm mb-1 drop-shadow-lg"
                     
                    >
                      {post.subtitle}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4
                  className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1"
                 
                >
                  {post.title}
                </h4>
                <p
                  className="text-xs text-gray-500 mb-3 truncate"
                 
                >
                  {post.description}
                </p>
                <div
                  className="flex items-center justify-between text-xs text-gray-400"
                 
                >
                  <div
                    className="flex items-center space-x-1"
                   
                  >
                    <Heart
                      className="w-3 h-3 text-red-400"
                     
                    />
                    <span
                      className="text-red-400 font-medium"
                     
                    >
                      {post.likes}
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                   
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments_count}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Gallery
