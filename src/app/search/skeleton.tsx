"use client"

import { Mic, Search, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchSkeletonPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Search Results Skeleton */}
          <div className="lg:col-span-2">
            {/* Search Section - Keep Original UI */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  검색 결과
                </h1>
              </div>

              {/* Search Bar - Original UI */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex items-center bg-gray-50 rounded-2xl border !border-gray-200 p-2">
                  <div className="flex-1 flex items-center space-x-3 px-2 sm:px-4">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="여행 코스를 검색해보세요"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base bg-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      onClick={() => setIsListening(!isListening)}
                    >
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Search Info Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>

            {/* Filters Skeleton */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
             
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                 
                ></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                     
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                 
                ></div>
                <div
                  className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                 
                ></div>
              </div>
            </div>

            {/* Search Results Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
                 
                >
                  {/* Type Badge Skeleton */}
                  <div
                    className="h-8 bg-gray-200 animate-pulse"
                   
                  ></div>

                  <div className="p-4 sm:p-6">
                    {/* Title and Subtitle Skeleton */}
                    <div
                      className="flex items-start justify-between mb-3 gap-2"
                     
                    >
                      <div className="flex-1 min-w-0">
                        <div
                          className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
                         
                        ></div>
                        <div
                          className="h-4 bg-gray-200 rounded w-full animate-pulse"
                         
                        ></div>
                      </div>
                      <div
                        className="h-6 bg-gray-200 rounded w-12 animate-pulse"
                       
                      ></div>
                    </div>

                    {/* Author Info Skeleton (for some cards) */}
                    {i % 2 === 0 && (
                      <div
                        className="flex items-center space-x-2 mb-3"
                       
                      >
                        <div
                          className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"
                         
                        ></div>
                        <div className="min-w-0">
                          <div
                            className="flex items-center space-x-2"
                           
                          >
                            <div
                              className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                             
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                             
                            ></div>
                          </div>
                          <div
                            className="h-3 bg-gray-200 rounded w-32 mt-1 animate-pulse"
                           
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Description Skeleton */}
                    <div className="space-y-2 mb-4">
                      <div
                        className="h-4 bg-gray-200 rounded w-full animate-pulse"
                       
                      ></div>
                      <div
                        className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                       
                      ></div>
                    </div>

                    {/* Course Info Skeleton */}
                    <div
                      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4"
                     
                    >
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="flex items-center"
                         
                        >
                          <div
                            className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                           
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                           
                          ></div>
                        </div>
                      ))}
                    </div>

                    {/* Tags Skeleton */}
                    <div
                      className="flex flex-wrap gap-1 sm:gap-2 mb-4"
                     
                    >
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-6 bg-gray-200 rounded-md w-16 animate-pulse"
                         
                        ></div>
                      ))}
                    </div>

                    {/* Highlights Skeleton */}
                    <div className="mb-4">
                      <div
                        className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"
                       
                      ></div>
                      <div
                        className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"
                       
                      ></div>
                    </div>

                    {/* Bottom Info Skeleton */}
                    <div
                      className="flex items-center justify-between"
                     
                    >
                      <div
                        className="flex items-center space-x-3 sm:space-x-4"
                       
                      >
                        {[1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="flex items-center"
                           
                          >
                            <div
                              className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                             
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                             
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                       
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Search Stats Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                   
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Searches Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"
                 
                ></div>
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                 
                ></div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2"
                   
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-3 bg-gray-200 rounded w-4 animate-pulse"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-full animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div
        className="bg-white border-t !border-gray-200 mt-12"
       
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
           
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div
                  className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                 
                ></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                     
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="border-t !border-gray-200 mt-8 pt-8"
           
          >
            <div
              className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
             
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
