"use client"

export default function BoardDetailsSkeletonPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="9t61ech"
    >
      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8"
        data-oid="05red99"
      >
        <div
          className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          data-oid="93_:iu2"
        >
          {/* Left Column - Post Content */}
          <div className="lg:col-span-2" data-oid="p81th-5">
            {/* Post Header Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="p6udeb8"
            >
              {/* Featured Badge Skeleton */}
              <div
                className="h-8 bg-gray-200 rounded-lg w-32 mb-4 animate-pulse"
                data-oid="danbz08"
              ></div>

              {/* Title Skeleton */}
              <div
                className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"
                data-oid="ackzq1v"
              ></div>
              <div
                className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"
                data-oid="4wjjlux"
              ></div>

              {/* Author Info Skeleton */}
              <div
                className="flex items-center space-x-3 mb-4 pb-4 border-b !border-gray-200"
                data-oid="ojmni:b"
              >
                <div
                  className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"
                  data-oid="8q_-8i4"
                ></div>
                <div className="flex-1" data-oid="-xyqm3r">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="96db0gi"
                  >
                    <div
                      className="h-5 bg-gray-200 rounded w-24 animate-pulse"
                      data-oid="zrnqlu:"
                    ></div>
                    <div
                      className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="2w36fvc"
                    ></div>
                  </div>
                  <div
                    className="h-4 bg-gray-200 rounded w-48 mt-1 animate-pulse"
                    data-oid="trgs7xc"
                  ></div>
                </div>
                <div
                  className="h-8 bg-gray-200 rounded w-16 animate-pulse"
                  data-oid="topfp0v"
                ></div>
              </div>

              {/* Post Stats Skeleton */}
              <div
                className="flex items-center space-x-4 sm:space-x-6 mb-4"
                data-oid="_j:kh9k"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center" data-oid="udnszun">
                    <div
                      className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                      data-oid=":m44y5m"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                      data-oid="3kej_ii"
                    ></div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap gap-2 sm:gap-3" data-oid="-_74qwz">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"
                    data-oid="ioiatql"
                  ></div>
                ))}
              </div>
            </div>

            {/* Post Content Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="kw8czaj"
            >
              <div
                className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"
                data-oid="y:.d1hx"
              ></div>
              <div className="space-y-3" data-oid="2yly_65">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                    data-oid="8lylw5b"
                  ></div>
                ))}
                <div
                  className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                  data-oid="rvpd54o"
                ></div>
              </div>
            </div>

            {/* Photos Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="60v.ai2"
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="rkow:fo"
              ></div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                data-oid="xudeohv"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                    data-oid="wiir9.2"
                  ></div>
                ))}
              </div>
            </div>

            {/* Day Selector Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
              data-oid="arym1::"
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="qhkxq9:"
              ></div>
              <div
                className="flex gap-2 overflow-x-auto mb-6"
                data-oid="69eckcs"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-lg w-16 animate-pulse"
                    data-oid="m_k_d:c"
                  ></div>
                ))}
              </div>

              {/* Selected Day Details Skeleton */}
              <div data-oid="3353ifd">
                <div
                  className="flex items-center justify-between mb-4"
                  data-oid="ud9u-pl"
                >
                  <div data-oid="2_vxz4m">
                    <div
                      className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"
                      data-oid=":vutdxm"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                      data-oid="oqxn1rv"
                    ></div>
                  </div>
                  <div className="text-right" data-oid="m1:od87">
                    <div
                      className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"
                      data-oid="8j6kkiv"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                      data-oid="wcfxscl"
                    ></div>
                  </div>
                </div>

                {/* User Note Skeleton */}
                <div
                  className="bg-gray-100 rounded-lg p-3 mb-4"
                  data-oid="z549iyr"
                >
                  <div
                    className="flex items-center space-x-2 mb-1"
                    data-oid="kmwmo:x"
                  >
                    <div
                      className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                      data-oid="_vm.0s8"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                      data-oid="dga.lpu"
                    ></div>
                  </div>
                  <div
                    className="h-4 bg-gray-200 rounded w-full animate-pulse"
                    data-oid="f3..al_"
                  ></div>
                </div>

                {/* Places Skeleton */}
                <div className="space-y-6" data-oid="tayutvh">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative" data-oid=":tifa86">
                      {/* Timeline Line */}
                      {i < 4 && (
                        <div
                          className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                          data-oid="hq8m:zh"
                        ></div>
                      )}

                      <div className="flex space-x-4" data-oid="aea0flj">
                        {/* Icon Skeleton */}
                        <div
                          className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full animate-pulse"
                          data-oid="iytdw9j"
                        ></div>

                        {/* Content Skeleton */}
                        <div className="flex-1 min-w-0" data-oid="eg9hog9">
                          <div
                            className="flex items-start justify-between mb-2 gap-2"
                            data-oid="q2o-1l6"
                          >
                            <div
                              className="h-5 bg-gray-200 rounded w-48 animate-pulse"
                              data-oid=".gf_1.b"
                            ></div>
                            <div
                              className="h-5 bg-gray-200 rounded w-16 animate-pulse"
                              data-oid=".pnbm3s"
                            ></div>
                          </div>

                          <div
                            className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"
                            data-oid="5qvwk5d"
                          ></div>

                          {/* Place Info Skeleton */}
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3"
                            data-oid="uf:p7jq"
                          >
                            {[1, 2].map((j) => (
                              <div
                                key={j}
                                className="flex items-center"
                                data-oid="vm2nx0-"
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                  data-oid="g4_si.-"
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                                  data-oid="k89f25q"
                                ></div>
                              </div>
                            ))}
                          </div>

                          {/* User Review Skeleton */}
                          <div
                            className="bg-gray-100 rounded-lg p-3 mb-3"
                            data-oid="0ucpkc9"
                          >
                            <div
                              className="flex items-center justify-between mb-2"
                              data-oid="3od--gv"
                            >
                              <div
                                className="h-4 bg-gray-200 rounded w-24 animate-pulse"
                                data-oid="ftaoulg"
                              ></div>
                              <div
                                className="flex items-center"
                                data-oid=".mh_a4:"
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"
                                  data-oid="e4.tiiz"
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                                  data-oid="lzkp-.."
                                ></div>
                              </div>
                            </div>
                            <div
                              className="h-4 bg-gray-200 rounded w-full animate-pulse"
                              data-oid=":ut4kip"
                            ></div>
                          </div>

                          {/* Next Location Info Skeleton */}
                          {i < 4 && (
                            <div
                              className="bg-gray-100 rounded-lg px-3 py-2"
                              data-oid="yik7uws"
                            >
                              <div
                                className="flex items-center space-x-2"
                                data-oid="qa6cbkl"
                              >
                                <div
                                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                                  data-oid="eqysuxu"
                                ></div>
                                <div
                                  className="h-4 bg-gray-200 rounded w-48 animate-pulse"
                                  data-oid="x8saaa:"
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
              data-oid="a1iz2_."
            >
              <div
                className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="j-bsp7k"
              ></div>

              {/* Comment Form Skeleton */}
              <div className="mb-6" data-oid="7d8t9g_">
                <div className="flex space-x-3" data-oid="lf4tpx4">
                  <div
                    className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                    data-oid="c-3dkus"
                  ></div>
                  <div className="flex-1" data-oid="oxwmbjv">
                    <div
                      className="h-20 bg-gray-200 rounded-lg mb-2 animate-pulse"
                      data-oid="fyli3tj"
                    ></div>
                    <div className="flex justify-end" data-oid="r_3kh:j">
                      <div
                        className="h-8 bg-gray-200 rounded w-24 animate-pulse"
                        data-oid="sz3z_e6"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List Skeleton */}
              <div className="space-y-4" data-oid="5av3hmf">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-b !border-gray-100 pb-4 last:border-b-0"
                    data-oid="uy588k:"
                  >
                    <div className="flex space-x-3" data-oid="gqn:cnu">
                      <div
                        className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                        data-oid="v_718d-"
                      ></div>
                      <div className="flex-1" data-oid="mbk7cvp">
                        <div
                          className="flex items-center space-x-2 mb-1"
                          data-oid="-p23:j9"
                        >
                          <div
                            className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                            data-oid="5nhw51i"
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded w-12 animate-pulse"
                            data-oid="c:bt4tu"
                          ></div>
                          <div
                            className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                            data-oid="lmb_m6f"
                          ></div>
                        </div>
                        <div
                          className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"
                          data-oid="nydxoq."
                        ></div>
                        <div
                          className="flex items-center space-x-4"
                          data-oid="4n3nswf"
                        >
                          <div className="flex items-center" data-oid="a2hy1:o">
                            <div
                              className="w-3 h-3 bg-gray-200 rounded mr-1 animate-pulse"
                              data-oid="z29v62_"
                            ></div>
                            <div
                              className="h-3 bg-gray-200 rounded w-4 animate-pulse"
                              data-oid="9qufxeh"
                            ></div>
                          </div>
                          <div
                            className="h-3 bg-gray-200 rounded w-8 animate-pulse"
                            data-oid="_zv_l:i"
                          ></div>
                        </div>

                        {/* Reply Skeleton */}
                        {i === 1 && (
                          <div className="mt-3 ml-4" data-oid="o10nw5z">
                            <div className="flex space-x-3" data-oid="1o7v:f:">
                              <div
                                className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"
                                data-oid="d2c6-dn"
                              ></div>
                              <div className="flex-1" data-oid="ggdm-ys">
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                  data-oid="5x4go::"
                                >
                                  <div
                                    className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                                    data-oid="-:d62t:"
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-10 animate-pulse"
                                    data-oid="6jcleqf"
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-12 animate-pulse"
                                    data-oid="hg6gfah"
                                  ></div>
                                </div>
                                <div
                                  className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"
                                  data-oid="px482u6"
                                ></div>
                                <div
                                  className="flex items-center"
                                  data-oid="7goajyd"
                                >
                                  <div
                                    className="w-3 h-3 bg-gray-200 rounded mr-1 animate-pulse"
                                    data-oid="n_7v1f."
                                  ></div>
                                  <div
                                    className="h-3 bg-gray-200 rounded w-4 animate-pulse"
                                    data-oid="j13vo2:"
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
          <div className="space-y-4 sm:space-y-6" data-oid="3737n6r">
            {/* Author Profile Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="5ltaq5c"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="p.3pnf3"
              ></div>
              <div className="text-center" data-oid="r-rs8-3">
                <div
                  className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"
                  data-oid="4w9z_d6"
                ></div>
                <div
                  className="h-5 bg-gray-200 rounded w-24 mx-auto mb-1 animate-pulse"
                  data-oid="p:19v3_"
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-16 mx-auto mb-3 animate-pulse"
                  data-oid="mn.ib.8"
                ></div>
                <div
                  className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"
                  data-oid="b3y.eyu"
                ></div>
                <div className="grid grid-cols-3 gap-4 mb-4" data-oid="_4mf.9g">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center" data-oid="9xc8g6m">
                      <div
                        className="h-5 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"
                        data-oid="insjxvv"
                      ></div>
                      <div
                        className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"
                        data-oid="62ot133"
                      ></div>
                    </div>
                  ))}
                </div>
                <div
                  className="h-8 bg-gray-200 rounded w-full animate-pulse"
                  data-oid="6_fo1it"
                ></div>
              </div>
            </div>

            {/* Post Summary Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="5uw2mp0"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid=".p-7h.5"
              ></div>
              <div className="space-y-3" data-oid="1llca4_">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                    data-oid="epnkx5e"
                  >
                    <div
                      className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                      data-oid="jo_cw6d"
                    ></div>
                    <div
                      className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                      data-oid="5cp2-tu"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="wdr6:zg"
            >
              <div
                className="h-5 bg-gray-200 rounded w-12 mb-4 animate-pulse"
                data-oid="08x_ugs"
              ></div>
              <div className="flex flex-wrap gap-2" data-oid="ualjzlg">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                    data-oid="jbj:qcg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Related Posts Skeleton */}
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="m9eq_m7"
            >
              <div
                className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"
                data-oid="0o9jr9u"
              ></div>
              <div className="space-y-3" data-oid="om0hwxj">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg" data-oid="dbc.uxr">
                    <div
                      className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"
                      data-oid="ygizq-g"
                    ></div>
                    <div
                      className="h-3 bg-gray-200 rounded w-20 animate-pulse"
                      data-oid="yz.m1id"
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
