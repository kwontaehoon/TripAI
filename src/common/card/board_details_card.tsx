"use client"

import {
  Car,
  Clock,
  MapPin  ,
  MessageCircle,
  Mountain,
  Star
} from "lucide-react"

const Board_details_card = ({data, selectedDay}) => {
  return (
    <div>{/* Selected Day Details */}
    {data[0].board_days.map(
      (day) =>
        selectedDay === day.day && (
          <div key={day.day} data-oid="zg-:5-w">
            <div
              className="flex items-center justify-between mb-4"
              data-oid="-1ub8d9"
            >
              <div data-oid="mu3q2o8">
                <h4
                  className="text-lg font-bold text-gray-900"
                  data-oid="i_ofjjf"
                >
                  Day {day.day}: {day.title}
                </h4>
                <p
                  className="text-sm text-gray-600"
                  data-oid="w62cdp6"
                >
                  {day.subtitle}
                </p>
              </div>
              <div
                className="text-right text-sm text-gray-500"
                data-oid="1x_lonx"
              >
                <div data-oid="3wng05s">{day.total_distance}</div>
                <div data-oid="wr8bb5:">{day.total_time}</div>
              </div>
            </div>

            {/* User Note */}
            {day.author_note && (
              <div
                className="bg-green-50 border !border-green-200 rounded-lg p-3 mb-4"
                data-oid="ys0s0y:"
              >
                <div
                  className="flex items-center space-x-2 mb-1"
                  data-oid="ftfa2f."
                >
                  <MessageCircle
                    className="w-4 h-4 text-green-600"
                    data-oid="_j4zvfl"
                  />

                  <span
                    className="text-sm font-medium text-green-700"
                    data-oid="afonhlh"
                  >
                    작성자 노트
                  </span>
                </div>
                <p
                  className="text-sm text-green-600"
                  data-oid="pj:0d:j"
                >
                  {day.author_note}
                </p>
              </div>
            )}

            {/* Places */}
            <div className="space-y-6" data-oid="328h.u7">
              {day.board_places.map((place, index) => (
                <div
                  key={place.id}
                  className="relative"
                  data-oid="qe8kqsn"
                >
                  {/* Timeline Line */}
                  {index < day.board_places.length - 1 && (
                    <div
                      className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                      data-oid="yuw.sqh"
                    ></div>
                  )}

                  <div className="flex space-x-4" data-oid="a:ep1j3">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                      data-oid="578ymmx"
                    >
                      <Mountain />
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 min-w-0"
                      data-oid="67w-o:-"
                    >
                      <div
                        className="flex items-start justify-between mb-2 gap-2"
                        data-oid="_x_:_fe"
                      >
                        <h5
                          className="text-base font-semibold text-gray-900"
                          data-oid="f.rls9i"
                        >
                          {place.name}
                        </h5>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0"
                          data-oid="jse6qug"
                        >
                          {place.location_type}
                        </span>
                      </div>

                      <p
                        className="text-sm text-gray-600 mb-3"
                        data-oid="tn9vaoz"
                      >
                        {place.description}
                      </p>

                      {/* Place Info */}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-3"
                        data-oid="x2xebek"
                      >
                        <div
                          className="flex items-center"
                          data-oid="bgetj9a"
                        >
                          <MapPin
                            className="w-4 h-4 mr-1 flex-shrink-0"
                            data-oid="7mfa5ms"
                          />

                          <span
                            className="truncate"
                            data-oid="ul-prch"
                          >
                            {place.location}
                          </span>
                        </div>
                        <div
                          className="flex items-center"
                          data-oid="hawcgwt"
                        >
                          <Clock
                            className="w-4 h-4 mr-1 flex-shrink-0"
                            data-oid="xha-bc_"
                          />

                          <span data-oid="0:uh2vj">
                            체류 시간: {place.stay ? place.stay : '-'}
                          </span>
                        </div>
                      </div>

                      {/* User Review */}
                      <div
                        className="bg-blue-50 border !border-blue-200 rounded-lg p-3 mb-3"
                        data-oid="er7w_iw"
                      >
                        <div
                          className="flex items-center justify-between mb-2"
                          data-oid="zd1ila."
                        >
                          <div
                            className="flex items-center space-x-2"
                            data-oid="a210fs8"
                          >
                            <span
                              className="text-sm font-medium text-blue-700"
                              data-oid="i5-j4mm"
                            >
                              {data[0].author}님의 후기
                            </span>
                          </div>
                          <div
                            className="flex items-center"
                            data-oid="abv.d4-"
                          >
                            <Star
                              className="w-4 h-4 text-yellow-400 mr-1"
                              data-oid="cml037d"
                            />

                            <span
                              className="text-sm font-semibold"
                              data-oid="et045n3"
                            >
                              {place.rating_count}
                            </span>
                          </div>
                        </div>
                        <p
                          className="text-sm text-blue-600"
                          data-oid="h4gr:l0"
                        >
                          {place.review ? place.review : "-"}
                        </p>
                      </div>

                      {/* Next Location Info */}
                      {place.next_distance !== "km" && place.next_distance !== "" && (
                        <div
                          className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2"
                          data-oid="or1m1:b"
                        >
                          <Car
                            className="w-4 h-4 flex-shrink-0"
                            data-oid="36euwrn"
                          />

                          <span data-oid="8bog8nd">
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
    )}</div>
  )
}

export default Board_details_card