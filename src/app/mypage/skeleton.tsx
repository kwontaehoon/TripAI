import { Heart, Share2, MapPin } from "lucide-react"
import React from "react"

const FavoritesSkeletonPage = ({ likePostsLength }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[...Array(likePostsLength)].map((_, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-6 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-20 bg-white/30 rounded"></div>
            <Heart className="w-6 h-6 text-white/30" />
          </div>
          <div className="h-4 w-16 bg-white/30 rounded mb-2"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
              <Share2 className="w-3 h-3 text-white/50" />
              <div className="h-3 w-8 bg-white/30 rounded"></div>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-white/50" />
              <div className="h-3 w-12 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavoritesSkeletonPage
