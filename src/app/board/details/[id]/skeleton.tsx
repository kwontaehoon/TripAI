"use client"

export default function BoardDetailsSkeletonPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
       
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
         
        >
          {/* Left Column - Post Content */}
          <div className="lg:col-span-2">
            {/* Post Header Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              {/* Featured Badge Skeleton */}
              <div
                className="h-8 bg-gray-200 rounded-lg w-32 mb-4 animate-pulse"
               
              ></div>

              {/* Title Skeleton */}
              <div
                className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
               
              ></div>
              <div
                className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"
               
              ></div>

              {/* Author Info Skeleton */}
              <div
                className="flex items-center space-x-3 mb-4 pb-4 border-b !border-gray-200"
               
              >
                <div
                  className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"
                 
                ></div>
                <div className="flex-1">
                  <div
                    className="flex items-center space-x-2"
                   
                  >
                    <div
                      className="h-5 bg-gray-200 rounded w-24 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                     
                    ></div>
                  </div>
                  <div
                    className="h-4 bg-gray-200 rounded w-48 mt-1 animate-pulse"
                   
                  ></div>
                </div>
                <div
                  className="h-8 bg-gray-200 rounded w-16 animate-pulse"
                 
                ></div>
              </div>

              {/* Post Stats Skeleton */}
              <div
                className="flex items-center space-x-4 sm:space-x-6 mb-4"
               
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                     
                    ></div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>

            {/* Post Content Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                   
                  ></div>
                ))}
                <div
                  className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                 
                ></div>
              </div>
            </div>

            {/* Photos Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
               
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>

            {/* Day Selector Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div
                className="flex gap-2 overflow-x-auto mb-6"
               
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                   
                  ></div>
                ))}
              </div>

              {/* Selected Day Details Skeleton */}
              <div>
                <div
                  className="flex items-center justify-between mb-4"
                 
                >
                  <div>
                    <div
                      className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                     
                    ></div>
                  </div>
                  <div className="text-right">
                    <div
                      className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                     
                    ></div>
                  </div>
                </div>

                {/* User Note Skeleton */}
                <div
                  className="bg-gray-100 rounded-lg p-3 mb-4"
                 
                >
                  <div
                    className="flex items-center space-x-2 mb-1"
                   
                  >
                    <div
                      className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                     
                    ></div>
                  </div>
                  <div
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                   
                  ></div>
                </div>

                {/* Places Skeleton */}
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative">
                      {/* Timeline Line */}
                      {i < 4 && (
                        <div
                          className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                         
                        ></div>
                      )}

                      <div className="flex space-x-4">
                        {/* Icon Skeleton */}
                        <div
                          className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full animate-pulse"
                         
                        ></div>

                        {/* Content Skeleton */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="flex items-start justify-between mb-2 gap-2"
                           
                          >
                            <div
                              className="h-5 bg-gray-200 rounded w-48 animate-pulse"
                             
                            ></div>
                            <div
                              className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                             
                            ></div>
                          </div>

                          <div
                            className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"
                           
                          ></div>

                          {/* Place Info Skeleton */}
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3"
                           
                          >
                            {[1, 2].map((j) => (
                              <div
                                key={j}
                                className="flex items-center"
                               
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                 
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                                 
                                ></div>
                              </div>
                            ))}
                          </div>

                          {/* User Review Skeleton */}
                          <div
                            className="bg-gray-100 rounded-lg p-3 mb-3"
                           
                          >
                            <div
                              className="flex items-center justify-between mb-2"
                             
                            >
                              <div
                                className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                               
                              ></div>
                              <div
                                className="flex items-center"
                               
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                 
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                                 
                                ></div>
                              </div>
                            </div>
                            <div
                              className="h-4 bg-gray-200 rounded w-full animate-pulse"
                             
                            ></div>
                          </div>

                          {/* Next Location Info Skeleton */}
                          {i < 4 && (
                            <div
                              className="bg-gray-100 rounded-lg px-3 py-2"
                             
                            >
                              <div
                                className="flex items-center space-x-2"
                               
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                                 
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-48 animate-pulse"
                                 
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>

              {/* Comment Form Skeleton */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <div
                    className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                   
                  ></div>
                  <div className="flex-1">
                    <div
                      className="h-20 bg-gray-200 rounded-lg mb-2 animate-pulse"
                     
                    ></div>
                    <div className="flex justify-end">
                      <div
                        className="h-8 bg-gray-200 rounded w-24 animate-pulse"
                       
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-b !border-gray-100 pb-4 last:border-b-0"
                   
                  >
                    <div className="flex space-x-3">
                      <div
                        className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                       
                      ></div>
                      <div className="flex-1">
                        <div
                          className="flex items-center space-x-2 mb-1"
                         
                        >
                          <div
                            className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                           
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                           
                          ></div>
                          <div
                            className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                           
                          ></div>
                        </div>
                        <div
                          className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"
                         
                        ></div>
                        <div
                          className="flex items-center space-x-4"
                         
                        >
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 bg-gray-200 rounded mr-1 animate-pulse"
                             
                            ></div>
                            <div
                              className="h-3 bg-gray-200 rounded w-4 animate-pulse"
                             
                            ></div>
                          </div>
                          <div
                            className="h-3 bg-gray-200 rounded w-8 animate-pulse"
                           
                          ></div>
                        </div>

                        {/* Reply Skeleton */}
                        {i === 1 && (
                          <div className="mt-3 ml-4">
                            <div className="flex space-x-3">
                              <div
                                className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"
                               
                              ></div>
                              <div className="flex-1">
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                 
                                >
                                  <div
                                    className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                                   
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-10 animate-pulse"
                                   
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-12 animate-pulse"
                                   
                                  ></div>
                                </div>
                                <div
                                  className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"
                                 
                                ></div>
                                <div
                                  className="flex items-center"
                                 
                                >
                                  <div
                                    className="w-3 h-3 bg-gray-200 rounded mr-1 animate-pulse"
                                   
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-4 animate-pulse"
                                   
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Author Profile Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="text-center">
                <div
                  className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"
                 
                ></div>
                <div
                  className="h-5 bg-gray-200 rounded w-24 mx-auto mb-1 animate-pulse"
                 
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-16 mx-auto mb-3 animate-pulse"
                 
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"
                 
                ></div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <div
                        className="h-5 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"
                       
                      ></div>
                      <div
                        className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"
                       
                      ></div>
                    </div>
                  ))}
                </div>
                <div
                  className="h-8 bg-gray-200 rounded w-full animate-pulse"
                 
                ></div>
              </div>
            </div>

            {/* Post Summary Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                   
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-12 mb-4 animate-pulse"
               
              ></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>

            {/* Related Posts Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg">
                    <div
                      className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"
                     
                    ></div>
                    <div
                      className="h-3 bg-gray-200 rounded w-20 animate-pulse"
                     
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
