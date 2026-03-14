"use client"

export default function CoursesDetailsSkeletonPage() {
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
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2">
            {/* AI Course Header Skeleton */}
            <div
              className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden"
             
            >
              <div className="relative z-10">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                 
                >
                  <div
                    className="w-6 h-6 bg-gray-200 rounded animate-pulse"
                   
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                   
                  ></div>
                </div>

                <div
                  className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
                 
                ></div>
                <div
                  className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"
                 
                ></div>
                <div className="space-y-2 mb-4">
                  <div
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                   
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                   
                  ></div>
                </div>

                {/* AI Analysis Badges Skeleton */}
                <div
                  className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                 
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"
                     
                    ></div>
                  ))}
                </div>

                {/* Action Buttons Skeleton */}
                <div
                  className="flex flex-wrap gap-2 sm:gap-3"
                 
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-24 animate-pulse"
                     
                    ></div>
                  ))}
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 bg-purple-600/10 rounded-full"
               
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 bg-blue-600/10 rounded-full"
               
              ></div>
            </div>

            {/* Day Selector Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="flex gap-2 overflow-x-auto">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>

            {/* Selected Day Details Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
             
            >
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

              {/* Places Timeline Skeleton */}
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
                            className="h-6 bg-gray-200 rounded w-48 animate-pulse"
                           
                          ></div>
                          <div
                            className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                           
                          ></div>
                        </div>

                        <div
                          className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"
                         
                        ></div>

                        {/* Place Info Grid Skeleton */}
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3"
                         
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
                                className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                               
                              ></div>
                            </div>
                          ))}
                        </div>

                        {/* AI Reasoning Skeleton */}
                        <div
                          className="bg-gray-100 rounded-lg p-3 mb-3"
                         
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

                        {/* Tips Skeleton */}
                        <div
                          className="bg-gray-100 rounded-lg p-3 mb-3"
                         
                        >
                          <div
                            className="flex items-center space-x-2 mb-2"
                           
                          >
                            <div
                              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                             
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                             
                            ></div>
                          </div>
                          <div className="space-y-1">
                            {[1, 2, 3].map((k) => (
                              <div
                                key={k}
                                className="flex items-start"
                               
                              >
                                <div
                                  className="w-2 h-2 bg-gray-200 rounded-full mr-2 mt-1 animate-pulse"
                                 
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                                 
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rating and Reviews Skeleton */}
                        <div
                          className="flex items-center space-x-4 mb-3"
                         
                        >
                          <div className="flex items-center">
                            <div
                              className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                             
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                             
                            ></div>
                          </div>
                          <div
                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                           
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

          {/* Right Column - Summary & Info Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Course Summary Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
               
              ></div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
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

            {/* Statistics Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
             
            >
              <div
                className="h-6 bg-gray-200 rounded w-12 mb-4 animate-pulse"
               
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
                      className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                     
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
                className="h-6 bg-gray-200 rounded w-12 mb-4 animate-pulse"
               
              ></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                   
                  ></div>
                ))}
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="space-y-3">
              <div
                className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
               
              ></div>
              <div
                className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
               
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
