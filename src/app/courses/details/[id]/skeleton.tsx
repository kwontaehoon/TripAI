"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bot,
  Bookmark,
  Share2,
  MapPin,
  Download,
} from "lucide-react"

export default function CoursesDetailsSkeletonPage() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="nzvfcg-"
    >

      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
        data-oid="3n-yp26"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="qe3r-88"
        >
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2" data-oid="jvseg8a">
            {/* AI Course Header Skeleton */}
            <div
              className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden"
              data-oid="dm:fo4m"
            >
              <div className="relative z-10" data-oid="oq1qsjk">
                <div
                  className="flex items-center space-x-2 mb-3 sm:mb-4"
                  data-oid="l2-l-8f"
                >
                  <div
                    className="w-6 h-6 bg-gray-200 rounded animate-pulse"
                    data-oid="csbdb86"
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                    data-oid="7a0m96x"
                  ></div>
                </div>

                <div
                  className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
                  data-oid="bza8ovz"
                ></div>
                <div
                  className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"
                  data-oid="6defi3i"
                ></div>
                <div className="space-y-2 mb-4" data-oid="6_p-9l8">
                  <div
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                    data-oid="xlrgy8h"
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                    data-oid="rpjv83p"
                  ></div>
                </div>

                {/* AI Analysis Badges Skeleton */}
                <div
                  className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                  data-oid="-6odwa5"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"
                      data-oid="ia4bpps"
                    ></div>
                  ))}
                </div>

                {/* Action Buttons Skeleton */}
                <div
                  className="flex flex-wrap gap-2 sm:gap-3"
                  data-oid=".2d:6b3"
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 rounded-lg w-24 animate-pulse"
                      data-oid="wgffm1s"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Background Pattern */}
              <div
                className="absolute top-4 right-4 w-16 h-16 bg-purple-600/10 rounded-full"
                data-oid="pt4gxa3"
              ></div>
              <div
                className="absolute bottom-4 right-8 w-10 h-10 bg-blue-600/10 rounded-full"
                data-oid="5qig.2n"
              ></div>
            </div>

            {/* Day Selector Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="gni01a8"
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="f2f5zee"
              ></div>
              <div className="flex gap-2 overflow-x-auto" data-oid="0klz.hj">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                    data-oid="ieg-1z2"
                  ></div>
                ))}
              </div>
            </div>

            {/* Selected Day Details Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="oy81au6"
            >
              <div
                className="flex items-center justify-between mb-4"
                data-oid="1-w7y_i"
              >
                <div data-oid="4o9sg3w">
                  <div
                    className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"
                    data-oid="r:4p--i"
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                    data-oid="ho-50ne"
                  ></div>
                </div>
                <div className="text-right" data-oid="ftf.mj4">
                  <div
                    className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"
                    data-oid="bxcfxot"
                  ></div>
                  <div
                    className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                    data-oid="2sk.dxy"
                  ></div>
                </div>
              </div>

              {/* Places Timeline Skeleton */}
              <div className="space-y-6" data-oid="-.y7l.c">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative" data-oid="wyc.ksz">
                    {/* Timeline Line */}
                    {i < 4 && (
                      <div
                        className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                        data-oid="w:m671q"
                      ></div>
                    )}

                    <div className="flex space-x-4" data-oid="4g2gub3">
                      {/* Icon Skeleton */}
                      <div
                        className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full animate-pulse"
                        data-oid="t81piwp"
                      ></div>

                      {/* Content Skeleton */}
                      <div className="flex-1 min-w-0" data-oid="3lprerb">
                        <div
                          className="flex items-start justify-between mb-2 gap-2"
                          data-oid="-jxki_7"
                        >
                          <div
                            className="h-6 bg-gray-200 rounded w-48 animate-pulse"
                            data-oid="6zbym5a"
                          ></div>
                          <div
                            className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                            data-oid=".8jt0hz"
                          ></div>
                        </div>

                        <div
                          className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"
                          data-oid="r6yd5nk"
                        ></div>

                        {/* Place Info Grid Skeleton */}
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3"
                          data-oid=":d9:bxt"
                        >
                          {[1, 2, 3, 4].map((j) => (
                            <div
                              key={j}
                              className="flex items-center"
                              data-oid="d76fr:q"
                            >
                              <div
                                className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                data-oid="ul1jl7u"
                              ></div>
                              <div
                                className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                                data-oid="wf9mm01"
                              ></div>
                            </div>
                          ))}
                        </div>

                        {/* AI Reasoning Skeleton */}
                        <div
                          className="bg-gray-100 rounded-lg p-3 mb-3"
                          data-oid="euewcie"
                        >
                          <div
                            className="flex items-center space-x-2 mb-1"
                            data-oid="51ss0yd"
                          >
                            <div
                              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                              data-oid="3jap.:5"
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                              data-oid="v4s:o_y"
                            ></div>
                          </div>
                          <div
                            className="h-4 bg-gray-200 rounded w-full animate-pulse"
                            data-oid="cnq12oj"
                          ></div>
                        </div>

                        {/* Tips Skeleton */}
                        <div
                          className="bg-gray-100 rounded-lg p-3 mb-3"
                          data-oid="y8spcx8"
                        >
                          <div
                            className="flex items-center space-x-2 mb-2"
                            data-oid="1r4_l66"
                          >
                            <div
                              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                              data-oid="3f_2qaf"
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                              data-oid="wm._8ib"
                            ></div>
                          </div>
                          <div className="space-y-1" data-oid="lj-j0e2">
                            {[1, 2, 3].map((k) => (
                              <div
                                key={k}
                                className="flex items-start"
                                data-oid="6yukwd:"
                              >
                                <div
                                  className="w-2 h-2 bg-gray-200 rounded-full mr-2 mt-1 animate-pulse"
                                  data-oid="c40pht2"
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                                  data-oid="7mh69l4"
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rating and Reviews Skeleton */}
                        <div
                          className="flex items-center space-x-4 mb-3"
                          data-oid="xi1k1i0"
                        >
                          <div className="flex items-center" data-oid="fbarmnd">
                            <div
                              className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                              data-oid="bc--8bw"
                            ></div>
                            <div
                              className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                              data-oid="guyj_10"
                            ></div>
                          </div>
                          <div
                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                            data-oid="tk9ngyp"
                          ></div>
                        </div>

                        {/* Next Location Info Skeleton */}
                        {i < 4 && (
                          <div
                            className="bg-gray-100 rounded-lg px-3 py-2"
                            data-oid="pau4y0o"
                          >
                            <div
                              className="flex items-center space-x-2"
                              data-oid="yeya42z"
                            >
                              <div
                                className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                                data-oid="dqk3l5f"
                              ></div>
                              <div
                                className="h-4 bg-gray-200 rounded w-48 animate-pulse"
                                data-oid="1mss3a6"
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
          <div className="space-y-4 sm:space-y-6" data-oid="98cxk0:">
            {/* Course Summary Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="p0kux8."
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="294f8ud"
              ></div>
              <div className="space-y-3 sm:space-y-4" data-oid=":jwicrv">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                    data-oid="0y-023h"
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="rcqfp1c"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                      data-oid=".j9yv0a"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="z.73h93"
            >
              <div
                className="h-6 bg-gray-200 rounded w-12 mb-4 animate-pulse"
                data-oid="lasx.yv"
              ></div>
              <div className="space-y-3 sm:space-y-4" data-oid=":g8p6q0">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                    data-oid="0q6bgrd"
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="5oxv86."
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                      data-oid="x5332bz"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="-j1lm4g"
            >
              <div
                className="h-6 bg-gray-200 rounded w-12 mb-4 animate-pulse"
                data-oid="xy6.n_c"
              ></div>
              <div className="flex flex-wrap gap-2" data-oid=".2x9yar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                    data-oid="syul_:h"
                  ></div>
                ))}
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="space-y-3" data-oid="nnj20-:">
              <div
                className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
                data-oid="cm2p4hf"
              ></div>
              <div
                className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
                data-oid="7pufblz"
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
