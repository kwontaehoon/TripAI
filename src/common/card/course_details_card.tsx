"use client"

import {
  Calendar,
  Car,
  Clock,
  MapPin,
  Mountain,
  Sparkles,
  Star,
  Zap
} from "lucide-react"

const Course_details_card = ({ data, selectedDay }) => {

  return (
    <div>
        {/* Selected Day Details */}
        {data[0].course_days.map(
              (day) =>
                selectedDay === day.day && (
                  <div
                    key={day.day}
                    className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                   
                  >
                    <div
                      className="flex items-center justify-between mb-4"
                     
                    >
                      <div>
                        <h3
                          className="text-lg sm:text-xl font-bold text-gray-900"
                         
                        >
                          Day {day.day}: {day.title}
                        </h3>
                        <p
                          className="text-sm sm:text-base text-gray-600"
                         
                        >
                          {day.subtitle}
                        </p>
                      </div>
                      <div
                        className="text-right text-sm text-gray-500"
                       
                      >
                        <div>{day.total_distance}</div>
                        <div>{day.total_time}</div>
                      </div>
                    </div>

                    {/* Places Timeline */}
                    <div className="space-y-6">
                      {day.course_places.map((place, index) => (
                        <div
                          key={place.id}
                          className="relative"
                         
                        >
                          {/* Timeline Line */}
                          {index < day.course_places.length - 1 && (
                            <div
                              className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                             
                            ></div>
                          )}

                          <div className="flex space-x-4">
                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
                             
                            >
                              <Mountain />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div
                                className="flex items-start justify-between mb-2 gap-2"
                               
                              >
                                <h4
                                  className="text-base sm:text-lg font-semibold text-gray-900"
                                 
                                >
                                  {place.name}
                                </h4>
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex-shrink-0"
                                 
                                >
                                  {place.location_type}
                                </span>
                              </div>

                              <p
                                className="text-sm sm:text-base text-gray-600 mb-3"
                               
                              >
                                {place.description}
                              </p>

                              {/* Place Info Grid */}
                              <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                               
                              >
                                <div
                                  className="flex items-center"
                                 
                                >
                                  <MapPin
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                   
                                  />
                                  <span className="truncate">
                                    {place.location}
                                  </span>
                                </div>
                                <div
                                  className="flex items-center"
                                 
                                >
                                  <Clock
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                   
                                  />
                                  <span>
                                    체류 시간: {place.stay}
                                  </span>
                                </div>
                                {place.openTime && (
                                  <div
                                    className="flex items-center"
                                   
                                  >
                                    <Calendar
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                     
                                    />
                                    <span>
                                      운영시간: {place.openTime}
                                    </span>
                                  </div>
                                )}
                                {place.entryFee && (
                                  <div
                                    className="flex items-center"
                                   
                                  >
                                    <span
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                     
                                    >
                                      💰
                                    </span>
                                    <span>
                                      입장료: {place.entryFee}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* AI Reasoning */}
                              <div
                                className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                               
                              >
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                 
                                >
                                  <Sparkles
                                    className="w-4 h-4 text-blue-600"
                                   
                                  />
                                  <span
                                    className="text-sm font-medium text-blue-700"
                                   
                                  >
                                    AI 추천 이유
                                  </span>
                                </div>
                                <p
                                  className="text-sm text-blue-600"
                                 
                                >
                                  {place.recommend_reason}
                                </p>
                              </div>

                              {/* Tips */}
                              {place.place_tips && place.place_tips.length > 0 && (
                                <div
                                  className="bg-yellow-50 border !border-yellow-200 rounded-lg p-3 mb-3"
                                 
                                >
                                  <div
                                    className="flex items-center space-x-2 mb-2"
                                   
                                  >
                                    <Zap
                                      className="w-4 h-4 text-yellow-600"
                                     
                                    />
                                    <span
                                      className="text-sm font-medium text-yellow-700"
                                     
                                    >
                                      여행 팁
                                    </span>
                                  </div>
                                  <ul
                                    className="text-sm text-yellow-600 space-y-1"
                                   
                                  >
                                    {place.place_tips.map((tip, tipIndex) => (
                                      <li
                                        key={tipIndex}
                                        className="flex items-start"
                                       
                                      >
                                        <span
                                          className="mr-2"
                                         
                                        >
                                          •
                                        </span>
                                        <span>{tip.tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Rating and Reviews */}
                              <div
                                className="flex items-center space-x-4 mb-3"
                               
                              >
                                <div
                                  className="flex items-center"
                                 
                                >
                                  <Star
                                    className="w-4 h-4 text-yellow-400 mr-1"
                                   
                                  />
                                  <span
                                    className="text-sm font-semibold"
                                   
                                  >
                                    {place.rating_count}
                                  </span>
                                </div>
                                <div
                                  className="text-sm text-gray-500"
                                 
                                >
                                  리뷰 {place.review_count}개
                                </div>
                              </div>

                              {/* Next Location Info */}
                              {place.next_distance !== "km" && place.next_distance !== "" && place.next_distance !== "0km" && (
                                <div
                                  className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2"
                                 
                                >
                                  <Car
                                    className="w-4 h-4 flex-shrink-0"
                                   
                                  />
                                  <span>
                                    다음 장소까지 {place.next_distance} •
                                    소요시간 {place.next_time}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
  )
}

export default Course_details_card