import React from "react"
import {
  ArrowRight,
  Camera,
  Heart,
  MessageCircle
} from "lucide-react"
import { useCoursesAndBoardsGalleryQuery } from "@/hooks/supabase/dev"
import Image from "next/image"
import { If } from "react-haiku"
import { useRouter } from "next/navigation"

const gallery = () => {
  const router = useRouter()

  const { data: galleryList, isSuccess } = useCoursesAndBoardsGalleryQuery()
  
  return !isSuccess ? '' : (
    <div className="mb-8" data-oid="travel-gallery">
      <div
        className="flex items-center justify-between mb-4"
        data-oid="597zgny"
      >
        <h3
          className="text-lg font-semibold text-gray-900 flex-1"
          data-oid="zdis:ie"
        >
          인기 여행 갤러리
        </h3>
        {/* <button
          onClick={() => ""}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          data-oid=".o:lty4"
        >
          전체보기
          <ArrowRight className="w-4 h-4 ml-1" data-oid="h4j:yx8" />
        </button> */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-oid="kl5i13x">
        {galleryList.map((post, index) => {
          return (
            <div
              key={`${post.id}-${post.type}`}
              onClick={()=>router.push(`/${post.type === "use-post" ? `boards/details/${post.id}` : `courses/details/${post.id}`}`)}
              className="relative group cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
              data-oid="4c4p553"
            >
              {/* Image */}
              <div
                className="aspect-[4/3] relative overflow-hidden"
                data-oid="hz1x341"
              >
                <div
                  className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                  data-oid="8fr2jpa"
                >
                  <If isTrue={post.type === "user-post"}>
                    {post.board_images && post.board_images.length > 0 && (
                      <Image
                        src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${post.board_images[0].image_url}`}
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
                        src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${post.course_images[0].image_url}`}
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
                    data-oid="w-tp_l1"
                  >
                    {/* <span
                      className="bg-white text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                      data-oid="gh.f4xn"
                    >
                      level
                    </span> */}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="ck8xk5r"
                ></div>

                {/* Overlay Content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="-gfxl86"
                >
                  <div className="flex justify-end" data-oid="yenzr5g">
                    <Camera
                      className="w-5 h-5 text-white drop-shadow-lg"
                      data-oid="47l:3tv"
                    />
                  </div>
                  <div className="text-white" data-oid="isuzgmc">
                    <h4
                      className="font-semibold text-sm mb-1 drop-shadow-lg"
                      data-oid="k0yajva"
                    >
                      {post.subtitle}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4" data-oid="5rsd1-c">
                <h4
                  className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1"
                  data-oid="_ydlwvd"
                >
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 mb-3 truncate" data-oid="wcj2.2x">
                  {post.description}
                </p>
                <div
                  className="flex items-center justify-between text-xs text-gray-400"
                  data-oid=".ffomx5"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="u-1pltt"
                  >
                    <Heart
                      className="w-3 h-3 text-red-400"
                      data-oid=":.0yqx6"
                    />
                    <span
                      className="text-red-400 font-medium"
                      data-oid="p0td9ux"
                    >
                      {post.likes}
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="hbz8f_i"
                  >
                    <MessageCircle className="w-3 h-3" data-oid=".rq6jc9" />
                    <span data-oid="lyz2n5j">{post.comments_count}</span>
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

export default gallery
