"use client"

import { Car, Clock, MapPin, MessageCircle, Mountain, Star } from "lucide-react"
import { If } from "react-haiku"

const Board_details_card = ({ data, selectedDay }) => {
  return (
    <div>
      {/* Selected Day Details */}
      {data[0].board_days.map(
        (day) =>
          selectedDay === day.day && (
            <div key={day.day}>
              <div
                className="flex items-center justify-between mb-4"
               
              >
                <div>
                  <h4
                    className="text-lg font-bold text-gray-900"
                   
                  >
                    Day {day.day}: {day.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {day.subtitle}
                  </p>
                </div>
                <div
                  className="text-right text-sm text-gray-500"
                 
                >
                  <div>약 {day.total_distance}</div>
                  <div>약 {day.total_time}</div>
                </div>
              </div>

              {/* User Note */}
              {day.author_note && (
                <div
                  className="bg-green-50 border !border-green-200 rounded-lg p-3 mb-4"
                 
                >
                  <div
                    className="flex items-center space-x-2 mb-1"
                   
                  >
                    <MessageCircle
                      className="w-4 h-4 text-green-600"
                     
                    />

                    <span
                      className="text-sm font-medium text-green-700"
                     
                    >
                      작성자 노트
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    {day.author_note}
                  </p>
                </div>
              )}

              {/* Places */}
              <div className="space-y-6">
                {day.board_places.map((place, index) => (
                  <div key={place.id} className="relative">
                    {/* Timeline Line */}
                    {index < day.board_places.length - 1 && (
                      <div
                        className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                       
                      ></div>
                    )}

                    <div className="flex space-x-4">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                       
                      >
                        <Mountain />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="flex items-start justify-between mb-2 gap-2"
                         
                        >
                          <h5
                            className="text-base font-semibold text-gray-900"
                           
                          >
                            {place.name}
                          </h5>
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0"
                           
                          >
                            {place.location_type}
                          </span>
                        </div>

                        <p
                          className="text-sm text-gray-600 mb-3"
                         
                        >
                          {place.description}
                        </p>

                        {/* Place Info */}
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                         
                        >
                          <div className="flex items-center">
                            <MapPin
                              className="w-4 h-4 mr-1 flex-shrink-0"
                             
                            />

                            <span className="truncate">
                              {place.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock
                              className="w-4 h-4 mr-1 flex-shrink-0"
                             
                            />

                            <span>
                              체류 시간: {place.stay ? place.stay : "-"}
                            </span>
                          </div>
                        </div>

                        {/* User Review */}
                        <If isTrue={place.review}>
                          <div
                            className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                           
                          >
                            <div
                              className="flex items-center justify-between mb-2"
                             
                            >
                              <div
                                className="flex items-center space-x-2"
                               
                              >
                                <span
                                  className="text-sm font-medium text-blue-700"
                                 
                                >
                                  {data[0].users.name}님의 후기
                                </span>
                              </div>
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
                            </div>
                            <p
                              className="text-sm text-blue-600"
                             
                            >
                              {place.review ? place.review : "-"}
                            </p>
                          </div>
                        </If>
                        <If isTrue={!place.review}>
                          <div className="flex items-center">
                            <Star
                              className="w-4 h-4 text-yellow-400 mr-1"
                             
                            />

                            <span
                              className="text-sm font-semibold"
                             
                            >
                              {place.rating_count}
                            </span>
                          </div>
                        </If>

                        {/* Next Location Info */}
                        {place.next_distance &&
                          place.next_distance !== "km" &&
                          place.next_distance !== "" &&
                          place.next_distance !== "0km" && (
                            <div
                              className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2 my-3"
                             
                            >
                              <span>
                                다음 장소까지 {place.next_distance} • 소요시간{" "}
                                {place.next_time}
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

export default Board_details_card
