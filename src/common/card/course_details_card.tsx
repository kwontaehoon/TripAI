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

    console.log("data: ", data)

  return (
    <div>
        {/* Selected Day Details */}
        {data[0].course_days.map(
              (day) =>
                selectedDay === day.day && (
                  <div
                    key={day.day}
                    className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                    data-oid="-vsxk4k"
                  >
                    <div
                      className="flex items-center justify-between mb-4"
                      data-oid="_93xo4t"
                    >
                      <div data-oid="r0:.wis">
                        <h3
                          className="text-lg sm:text-xl font-bold text-gray-900"
                          data-oid="ytf9::k"
                        >
                          Day {day.day}: {day.title}
                        </h3>
                        <p
                          className="text-sm sm:text-base text-gray-600"
                          data-oid="07y.6g."
                        >
                          {day.subTitle}
                        </p>
                      </div>
                      <div
                        className="text-right text-sm text-gray-500"
                        data-oid="z-hksd8"
                      >
                        <div data-oid="x329twq">{day.total_distance}</div>
                        <div data-oid="9.q2an-">{day.total_time}</div>
                      </div>
                    </div>

                    {/* Places Timeline */}
                    <div className="space-y-6" data-oid="ixfy:al">
                      {day.course_places.map((place, index) => (
                        <div
                          key={place.id}
                          className="relative"
                          data-oid="_lo9t8o"
                        >
                          {/* Timeline Line */}
                          {index < day.course_places.length - 1 && (
                            <div
                              className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                              data-oid="tbielp2"
                            ></div>
                          )}

                          <div className="flex space-x-4" data-oid="sc.fx_l">
                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
                              data-oid="p9vfdn-"
                            >
                              <Mountain />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0" data-oid="j40foyt">
                              <div
                                className="flex items-start justify-between mb-2 gap-2"
                                data-oid="yr8uuwc"
                              >
                                <h4
                                  className="text-base sm:text-lg font-semibold text-gray-900"
                                  data-oid="adj30pl"
                                >
                                  {place.name}
                                </h4>
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex-shrink-0"
                                  data-oid="xvtxx_."
                                >
                                  {place.location_type}
                                </span>
                              </div>

                              <p
                                className="text-sm sm:text-base text-gray-600 mb-3"
                                data-oid="p9g7x:h"
                              >
                                {place.description}
                              </p>

                              {/* Place Info Grid */}
                              <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                                data-oid="hkg3axr"
                              >
                                <div
                                  className="flex items-center"
                                  data-oid="rhwdh2f"
                                >
                                  <MapPin
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                    data-oid="t1_5d2n"
                                  />
                                  <span className="truncate" data-oid="ar1rvfv">
                                    {place.location}
                                  </span>
                                </div>
                                <div
                                  className="flex items-center"
                                  data-oid="i7qgxz."
                                >
                                  <Clock
                                    className="w-4 h-4 mr-1 flex-shrink-0"
                                    data-oid="qe8ton9"
                                  />
                                  <span data-oid="uospgq3">
                                    체류 시간: {place.stay}
                                  </span>
                                </div>
                                {place.openTime && (
                                  <div
                                    className="flex items-center"
                                    data-oid="l6u2qv5"
                                  >
                                    <Calendar
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="py6bken"
                                    />
                                    <span data-oid="b-z0gm-">
                                      운영시간: {place.openTime}
                                    </span>
                                  </div>
                                )}
                                {place.entryFee && (
                                  <div
                                    className="flex items-center"
                                    data-oid=".-_jpe6"
                                  >
                                    <span
                                      className="w-4 h-4 mr-1 flex-shrink-0"
                                      data-oid="hggkyvn"
                                    >
                                      💰
                                    </span>
                                    <span data-oid="530p4ly">
                                      입장료: {place.entryFee}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* AI Reasoning */}
                              <div
                                className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                                data-oid="wbi9jn7"
                              >
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                  data-oid="c2d9:bu"
                                >
                                  <Sparkles
                                    className="w-4 h-4 text-blue-600"
                                    data-oid="lf:-fhl"
                                  />
                                  <span
                                    className="text-sm font-medium text-blue-700"
                                    data-oid="3r17pw:"
                                  >
                                    AI 추천 이유
                                  </span>
                                </div>
                                <p
                                  className="text-sm text-blue-600"
                                  data-oid="sukjvhi"
                                >
                                  {place.recommend_reason}
                                </p>
                              </div>

                              {/* Tips */}
                              {place.place_tips && place.place_tips.length > 0 && (
                                <div
                                  className="bg-yellow-50 border !border-yellow-200 rounded-lg p-3 mb-3"
                                  data-oid="4q9ilh5"
                                >
                                  <div
                                    className="flex items-center space-x-2 mb-2"
                                    data-oid="e-59mew"
                                  >
                                    <Zap
                                      className="w-4 h-4 text-yellow-600"
                                      data-oid="fxwn.us"
                                    />
                                    <span
                                      className="text-sm font-medium text-yellow-700"
                                      data-oid="tgb5z31"
                                    >
                                      여행 팁
                                    </span>
                                  </div>
                                  <ul
                                    className="text-sm text-yellow-600 space-y-1"
                                    data-oid="z0b:lam"
                                  >
                                    {place.place_tips.map((tip, tipIndex) => (
                                      <li
                                        key={tipIndex}
                                        className="flex items-start"
                                        data-oid="j:e.i6s"
                                      >
                                        <span
                                          className="mr-2"
                                          data-oid="zwck3b-"
                                        >
                                          •
                                        </span>
                                        <span data-oid="kze6t-q">{tip.tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Rating and Reviews */}
                              <div
                                className="flex items-center space-x-4 mb-3"
                                data-oid="mx4u9oo"
                              >
                                <div
                                  className="flex items-center"
                                  data-oid="x0pfse7"
                                >
                                  <Star
                                    className="w-4 h-4 text-yellow-400 mr-1"
                                    data-oid="y89.ma1"
                                  />
                                  <span
                                    className="text-sm font-semibold"
                                    data-oid="hw7n5:j"
                                  >
                                    {place.rating_count}
                                  </span>
                                </div>
                                <div
                                  className="text-sm text-gray-500"
                                  data-oid="-bx8fv:"
                                >
                                  리뷰 {place.review_count}개
                                </div>
                              </div>

                              {/* Next Location Info */}
                              {place.next_distance && (
                                <div
                                  className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2"
                                  data-oid="b-rmbq:"
                                >
                                  <Car
                                    className="w-4 h-4 flex-shrink-0"
                                    data-oid="sj30h20"
                                  />
                                  <span data-oid="0asui.y">
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