import React, { useState } from "react"
import {
  Heart,
  MapPin,
  Share2,
  Plus
} from "lucide-react"
const favorites = () => {
  const [favoriteDestinations] = useState([
    { name: "교토", visits: 7, image: "/images/kyoto.jpg" },
    { name: "도쿄", visits: 5, image: "/images/tokyo.jpg" },
    { name: "오사카", visits: 4, image: "/images/osaka.jpg" },
    { name: "후쿠오카", visits: 3, image: "/images/fukuoka.jpg" },
  ])

  return (
    <div className="space-y-6" data-oid="xx0eth7">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
        data-oid="ieyrw.w"
      >
        즐겨찾는 여행지
      </h3>

      <div className="grid md:grid-cols-2 gap-6" data-oid="ne1.ro:">
        {favoriteDestinations.map((destination, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
            data-oid="wipms-z"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="nxu-fvj"
            >
              <h4 className="text-xl font-bold" data-oid="yniklu2">
                {destination.name}
              </h4>
              <Heart
                className="w-6 h-6 text-red-300 fill-current"
                data-oid="y_w9exo"
              />
            </div>
            <p className="text-purple-100 text-sm mb-2" data-oid="-b_-di5">
              {destination.visits}번 방문
            </p>
            <div className="flex items-center space-x-2" data-oid="bgdxi1m">
              <button
                className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                data-oid="ritx_4x"
              >
                <Share2 className="w-3 h-3" data-oid="swvablf" />

                <span data-oid="jpjogts">공유</span>
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
      </div>

      <div className="text-center" data-oid="e51l7ug">
        <button
          className="flex items-center space-x-2 mx-auto px-4 py-2 border-2 border-dashed !border-gray-300 rounded-lg text-gray-600 hover:!border-purple-400 hover:text-purple-600 transition-colors"
          data-oid="3bknqnf"
        >
          <Plus className="w-4 h-4" data-oid="aq0c:z0" />
          <span data-oid="ydpjot.">새 여행지 추가</span>
        </button>
      </div>
    </div>
  )
}

export default favorites
