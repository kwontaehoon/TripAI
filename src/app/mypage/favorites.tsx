import React, { useState } from "react"
import { Heart, MapPin, Share2, Plus, Globe } from "lucide-react"
import { useMypageLikesQuery } from "@/hooks/supabase/dev"
import FavoritesSkeletonPage from "./skeleton"
import { If } from "react-haiku"
import { useRouter } from "next/navigation"
const favorites = ({ userInfo }) => {
  const router = useRouter()

  const { data: mypageLikesData, isLoading } = useMypageLikesQuery(
    userInfo.likesItem.courses.filter((like) => !!like),
    userInfo.likesItem.boards.filter((like) => !!like),
  )

  const handleSharePost = (e) => {
    e.stopPropagation()
    alert("링크가 복사되었습니다!")
  }

  return (
    <div className="space-y-6" data-oid="xx0eth7">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
        data-oid="ieyrw.w"
      >
        내가 좋아한 글
      </h3>
      {/* 데이터 로딩 중 */}
      <If isTrue={isLoading}>
        <FavoritesSkeletonPage />
      </If>
      {/* 데이터 로딩 끝 */}
      <If isTrue={!isLoading}>
        <div
          className={`grid ${mypageLikesData?.length === 0 ? "md:grid-cols-1" : "md:grid-cols-2"} gap-6`}
          data-oid="ne1.ro:"
        >
          {/* 데이터가 없을 때 */}
          <If isTrue={mypageLikesData?.length === 0}>
            <div className="text-center py-16 w-full" data-oid="mfe3gkd">
              <div className="max-w-md mx-auto" data-oid=":c-plez">
                <div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                  data-oid="::o5uls"
                >
                  <Heart
                    className="w-12 h-12 text-gray-400"
                    data-oid=":.jshxd"
                  />
                </div>
                <h4
                  className="text-xl font-semibold text-gray-900 mb-3"
                  data-oid="ciqheh-"
                >
                  아직 좋아요한 여행지가 없어요
                </h4>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="632-hnp"
                >
                  마음에 드는 여행지를 찾아서 좋아요를 추가해보세요.
                  <br data-oid="vy3zvff" />
                  나만의 특별한 여행지 컬렉션을 만들어보세요!
                </p>
                <div className="space-y-3" data-oid="ai4f.gk">
                  <button
                    onClick={() => router.push("/search")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
                    data-oid="4ys857o"
                  >
                    <div
                      className="flex items-center justify-center space-x-2"
                      data-oid="0z2tsu4"
                    >
                      <Globe className="w-5 h-5" data-oid="m:07ffy" />

                      <span data-oid="8hr1at8">여행지 둘러보기</span>
                    </div>
                  </button>
                  <button
                    onClick={() => router.push("/courses")}
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors font-medium"
                    data-oid="p9s6lpr"
                  >
                    <div
                      className="flex items-center justify-center space-x-2"
                      data-oid="ne43n42"
                    >
                      <MapPin className="w-5 h-5" data-oid="okw3x7l" />

                      <span data-oid="-ezdbbi">추천 코스 보기</span>
                    </div>
                  </button>
                </div>
                <div
                  className="mt-8 pt-6 border-t border-gray-200"
                  data-oid="t2k4sze"
                >
                  <p className="text-sm text-gray-500 mb-4" data-oid="-j:.kl.">
                    💡 <strong data-oid="ia.uqvf">팁:</strong> 여행지 페이지에서
                    하트 아이콘을 클릭하면 좋아요에 추가됩니다
                  </p>
                </div>
              </div>
            </div>
          </If>

          {/* 데이터가 있을 때 */}
          <If isTrue={mypageLikesData?.length !== 0}>
            {mypageLikesData?.map((post, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
                onClick={() => {
                  if (post.type === "user-post") {
                    router.push(`/board/details/${post.id}`)
                  }else router.push(`/courses/details/${post.id}`)
                }}
                data-oid="wipms-z"
              >
                <div
                  className="flex items-center justify-between mb-4"
                  data-oid="nxu-fvj"
                >
                  <h4 className="text-xl font-bold" data-oid="yniklu2">
                    {post.title}
                  </h4>
                </div>
                <p className="text-purple-100 text-sm mb-3" data-oid="-b_-di5">
                  {post.description}
                </p>
                <div className="flex items-center space-x-2" data-oid="bgdxi1m">
                  <button
                    className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                    data-oid="ritx_4x"
                  >
                    <Share2 className="w-3 h-3" data-oid="swvablf" />

                    <span onClick={(e)=>handleSharePost(e)} data-oid="jpjogts">공유</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                    data-oid="erc708o"
                  >
                    <MapPin className="w-3 h-3" data-oid="jmkmw3u" />

                    <span data-oid=".vovljj">코스 보기</span>
                  </button>
                </div>
              </div>
            ))}
          </If>
        </div>
      </If>
    </div>
  )
}

export default favorites
