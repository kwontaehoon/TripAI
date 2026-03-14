"use client"

import {
  Mic,
  Search,
  Send,
  Sparkles
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CoursesSkeletonPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?destination=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-4"
       
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
         
        >
          {/* Left Column - Course List */}
          <div className="lg:col-span-2">
            {/* Search Section - Keep Original UI */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
             
            >
              <div className="relative z-10">
                <div
                  className="flex items-center space-x-2 mb-4"
                 
                >
                  <Sparkles
                    className="w-6 h-6 text-blue-600"
                   
                  />
                  <span
                    className="text-sm font-medium text-gray-600"
                   
                  >
                    AI 여행 코스 검색
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                 
                >
                  여행지 추천 코스
                </h2>
                <p className="text-gray-600 mb-6">
                  AI가 엄선한 여행지 최고의 여행 코스들을 만나보세요
                </p>

                {/* Search Bar - Original UI */}
                <form onSubmit={handleSearch}>
                  <div
                    className="flex items-center bg-white rounded-2xl shadow-lg border !border-gray-200 p-2"
                   
                  >
                    <div
                      className="flex-1 flex items-center space-x-3 px-4"
                     
                    >
                      <Search
                        className="w-5 h-5 text-gray-400"
                       
                      />
                      <input
                        type="text"
                        placeholder="다른 여행지를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                       
                      />
                    </div>
                    <div
                      className="flex items-center space-x-2"
                     
                    >
                      <button
                        type="button"
                        className={`p-2 rounded-xl transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setIsListening(!isListening)}
                       
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                       
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
               
              ></div>
              <div
                className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
               
              ></div>
            </div>

            {/* Filters Skeleton */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
             
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                 
                ></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                     
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                 
                ></div>
                <div
                  className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                 
                ></div>
              </div>
            </div>

            {/* Course List Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden animate-pulse"
                 
                >
                  <div className="md:flex">
                    {/* Image Skeleton */}
                    <div className="md:w-1/3">
                      <div
                        className="h-48 md:h-full bg-gray-300 relative"
                       
                      >
                        <div
                          className="absolute top-4 left-4"
                         
                        >
                          <div
                            className="bg-gray-200 h-6 w-16 rounded-full"
                           
                          ></div>
                        </div>
                        <div
                          className="absolute top-4 right-4 flex space-x-2"
                         
                        >
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full"
                           
                          ></div>
                          <div
                            className="bg-gray-200 h-8 w-8 rounded-full"
                           
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="md:w-2/3 p-6">
                      <div
                        className="flex items-start justify-between mb-3"
                       
                      >
                        <div className="flex-1">
                          <div
                            className="bg-gray-300 h-6 w-3/4 rounded mb-2"
                           
                          ></div>
                          <div
                            className="bg-gray-200 h-4 w-1/2 rounded"
                           
                          ></div>
                        </div>
                        <div
                          className="bg-gray-200 h-6 w-12 rounded-full"
                         
                        ></div>
                      </div>

                      <div
                        className="bg-gray-200 h-4 w-full rounded mb-2"
                       
                      ></div>
                      <div
                        className="bg-gray-200 h-4 w-5/6 rounded mb-4"
                       
                      ></div>

                      {/* Course Info Skeleton */}
                      <div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4"
                       
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="flex items-center"
                           
                          >
                            <div
                              className="bg-gray-200 h-4 w-4 rounded mr-2"
                             
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-16 rounded"
                             
                            ></div>
                          </div>
                        ))}
                      </div>

                      {/* Tags Skeleton */}
                      <div
                        className="flex flex-wrap gap-2 mb-4"
                       
                      >
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="bg-gray-200 h-6 w-16 rounded-md"
                           
                          ></div>
                        ))}
                      </div>

                      {/* Highlights Skeleton */}
                      <div className="mb-4">
                        <div
                          className="bg-gray-300 h-4 w-20 rounded mb-2"
                         
                        ></div>
                        <div
                          className="bg-gray-200 h-3 w-full rounded"
                         
                        ></div>
                      </div>

                      {/* Bottom Info Skeleton */}
                      <div
                        className="flex items-center justify-between"
                       
                      >
                        <div
                          className="flex items-center space-x-4"
                         
                        >
                          <div className="flex items-center">
                            <div
                              className="bg-gray-200 h-4 w-4 rounded mr-1"
                             
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-8 rounded mr-1"
                             
                            ></div>
                            <div
                              className="bg-gray-200 h-4 w-12 rounded"
                             
                            ></div>
                          </div>
                          <div
                            className="bg-gray-300 h-5 w-20 rounded"
                           
                          ></div>
                        </div>
                        <div
                          className="bg-gray-300 h-10 w-24 rounded-lg"
                         
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Popular Destinations Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div
                      className="bg-gray-200 h-16 rounded-lg"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Stats Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center animate-pulse"
                   
                  >
                    <div
                      className="bg-gray-200 h-4 w-20 rounded"
                     
                    ></div>
                    <div
                      className="bg-gray-300 h-5 w-12 rounded"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Filters Skeleton */}
            <div
              className="bg-white rounded-2xl p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div
                      className="bg-gray-200 h-8 rounded-lg"
                     
                    ></div>
                  </div>
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
