"use client"

export default function BoardSkeletonPage() {
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
          {/* Left Column - Post List */}
          <div className="lg:col-span-2">
            {/* Search Section Skeleton */}
            <div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden"
             
            >
              <div className="relative z-10 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
                <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                <div className="h-12 bg-white rounded-2xl animate-pulse" />
                <div className="h-10 bg-gray-300 rounded-lg w-full animate-pulse" />
              </div>
              <div
                className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/10 rounded-full"
               
              />
              <div
                className="absolute bottom-4 right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full"
               
              />
            </div>

            {/* Filters Skeleton */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
             
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                 
                />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                     
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse"
                 
                />
                <div
                  className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                 
                />
              </div>
            </div>

            {/* Post List Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
                 
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div
                        className="h-48 md:h-full bg-gray-300 relative animate-pulse"
                       
                      >
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <div className="bg-gray-200 h-6 w-16 rounded-full animate-pulse" />
                        </div>
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                          <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse" />
                          <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-12 animate-pulse" />
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
                          </div>
                          <div className="h-3 bg-gray-200 rounded w-32 mt-1 animate-pulse" />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="flex items-center">
                            <div className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="h-6 bg-gray-200 rounded-md w-16 animate-pulse" />
                        ))}
                      </div>

                      <div className="mb-4">
                        <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="flex items-center">
                              <div className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                            </div>
                          ))}
                        </div>
                        <div className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="min-w-0 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
              <div className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse" />
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
              <div className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded-lg w-full animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
