'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    MapPin,
    Star,
    Plus,
    X,
    Navigation,
    List,
    Map,
    LayoutDashboard,
    Route,
    Sparkles,
    ArrowRight,
    Clock,
    Users,
    Calendar,
    Bot,
} from 'lucide-react';

export default function WWSkeletonPage() {
    const router = useRouter();

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
            data-oid="skeleton-ww-main"
        >
            {/* Header Skeleton
            <header
                className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
                data-oid="skeleton-header"
            >
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4" data-oid="zdguvjc">
                    <div className="flex items-center justify-between" data-oid="lscxeu9">
                        <div
                            className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1"
                            data-oid="yl:exm4"
                        >
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"
                                data-oid="s0ydt.7"
                            >
                                <Bot
                                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                                    data-oid="c5qti.q"
                                />
                            </div>
                            <div className="min-w-0" data-oid="n09hqxq">
                                <button
                                    onClick={() => router.push('/')}
                                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors truncate"
                                    data-oid="bcsull6"
                                >
                                    TripAI
                                </button>
                                <p
                                    className="text-xs text-gray-500 hidden sm:block"
                                    data-oid="6e67y.a"
                                >
                                    AI 여행 플래너
                                </p>
                            </div>
                        </div>
                        <div
                            className="hidden md:flex items-center space-x-4 flex-shrink-0"
                            data-oid="bq4.v13"
                        >
                            <button
                                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                                data-oid="ia.gxzc"
                            >
                                로그인
                            </button>
                            <button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                                data-oid="twt83k5"
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </header> */}

            {/* Hero Section Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28" data-oid="aupa.c-">
                {/* <div
                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
                    data-oid="n1mn6ld"
                >
                    <div className="relative z-10" data-oid="zrfap5i">
                        <div className="flex items-center space-x-2 mb-4" data-oid="_kb17t9">
                            <Sparkles className="w-6 h-6 text-blue-600" data-oid="-lqdl-q" />
                            <span className="text-sm font-medium text-gray-600" data-oid="-f.1cjp">
                                AI 여행 플래너
                            </span>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                            data-oid="t39dia-"
                        >
                            나만의 완벽한 여행 코스를
                        </h2>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight"
                            data-oid="k4_i42e"
                        >
                            <span className="text-blue-600" data-oid="6qf25ri">
                                직접 만들어보세요
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-6" data-oid="vxz-6aw">
                            지도에서 관광지를 탐색하고, 드래그앤드롭으로 나만의 여행 코스를
                            완성하세요
                        </p>
                    </div> */}

                    {/* Background Pattern */}
                    {/* <div
                        className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
                        data-oid="bf3cvg7"
                    ></div>
                    <div
                        className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
                        data-oid="dmiy1.m"
                    ></div>
                </div> */}

                {/* Stats Bar Skeleton */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" data-oid="-f-7qd7">
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                        data-oid="y7b10qu"
                    >
                        <div
                            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                            data-oid="zg944:-"
                        >
                            <Map className="w-6 h-6 text-blue-600" data-oid="ss1up6j" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"
                            data-oid="cd-m-ua"
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-20 mx-auto"
                            data-oid=".h3z2rk"
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                        data-oid="7rxljc3"
                    >
                        <div
                            className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                            data-oid="073rapu"
                        >
                            <Route className="w-6 h-6 text-green-600" data-oid="xe.ksgi" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2"
                            data-oid="54a8:.."
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-24 mx-auto"
                            data-oid="tqf-0k1"
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                        data-oid="pkr2e3-"
                    >
                        <div
                            className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                            data-oid="zwb8mrb"
                        >
                            <Clock className="w-6 h-6 text-purple-600" data-oid="wfagt5x" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"
                            data-oid="hhkb15y"
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-20 mx-auto"
                            data-oid="p8g7bs-"
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                        data-oid="hr.1fg5"
                    >
                        <div
                            className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"
                            data-oid="rxd:gvt"
                        >
                            <Star className="w-6 h-6 text-yellow-600" data-oid=".28c10k" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2"
                            data-oid="b7dpod:"
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-16 mx-auto"
                            data-oid="enrd5rs"
                        ></div>
                    </div>
                </div> */}

                {/* Main Layout Skeleton */}
                <div className="md:grid grid-cols-12 gap-8 min-h-[800px]" data-oid="u.v15ng">
                    {/* Left Side - Map Skeleton */}
                    <div className="col-span-7" data-oid="whu.lh4">
                        <div
                            className="bg-white rounded-3xl shadow-2xl border !border-gray-200 md:h-full h-[400px] overflow-hidden"
                            data-oid="8z4b:60"
                        >
                            <div
                                className="p-6 border-b !border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50"
                                data-oid="o2hsuci"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    data-oid=".:m9rxx"
                                >
                                    <div className="flex items-center space-x-3" data-oid="xyuzxlg">
                                        <div
                                            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                                            data-oid="vh58ugd"
                                        >
                                            <Map
                                                className="w-5 h-5 text-white"
                                                data-oid="eilffi0"
                                            />
                                        </div>
                                        <div data-oid="1cl6ba2">
                                            <h2
                                                className="text-xl font-bold text-gray-900"
                                                data-oid="r7tp0ri"
                                            >
                                                인터랙티브 지도
                                            </h2>
                                            <p className="text-sm text-gray-600" data-oid="9.n3y0s">
                                                관광지를 클릭해서 상세 정보를 확인하세요
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right" data-oid="c_pvk8q">
                                        <div
                                            className="h-5 bg-gray-200 rounded w-20 mb-1 animate-pulse"
                                            data-oid="f:07dvy"
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                                            data-oid="rwhl3up"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-full" data-oid="69doaz6">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-10"
                                    data-oid="b3n7emn"
                                >
                                    <div className="text-center" data-oid="k5dei2-">
                                        <div
                                            className="animate-spin rounded-full h-12 w-12 border-4 !border-blue-600 border-t-transparent mx-auto"
                                            data-oid="b67r-4m"
                                        ></div>
                                        <p
                                            className="mt-4 text-gray-600 font-medium"
                                            data-oid="fpvnxxo"
                                        >
                                            지도를 불러오는 중...
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="w-full h-full bg-gray-200 animate-pulse"
                                    data-oid="nbsoojz"
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - List & Dashboard Skeleton */}
                    <div
                        className="col-span-5 flex md:flex-col flex-row md:space-y-6 md:mt-0 mt-8 md:space-x-0 space-x-5"
                        data-oid="6inp:h3"
                    >
                        {/* Tourist Spots List Skeleton */}
                        <div
                            className="bg-white rounded-2xl shadow-lg border !border-gray-200 md:h-[300px] h-[500px] flex flex-col w-1/2 md:w-full"
                            data-oid="11oo:y-"
                        >
                            <div className="p-4 border-b !border-gray-200" data-oid="chy5suj">
                                <div
                                    className="flex items-center justify-between"
                                    data-oid="hytdn0m"
                                >
                                    <div className="flex items-center space-x-2" data-oid="mm360:2">
                                        <List
                                            className="w-4 h-4 text-blue-600"
                                            data-oid=".1ayfz9"
                                        />

                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                            data-oid="dv9rm3x"
                                        >
                                            관광지 목록
                                        </h3>
                                    </div>
                                    <div
                                        className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                                        data-oid="3pv_lsj"
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4" data-oid="zh2x-8g">
                                <div
                                    className="grid md:grid-cols-2 grid-cols-1 gap-3"
                                    data-oid="3itlqek"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="h-[100px] bg-gray-100 rounded-lg border !border-gray-200 animate-pulse"
                                            data-oid="genajtk"
                                        >
                                            <div
                                                className="p-3 h-full flex flex-col justify-between"
                                                data-oid="5ohyaj2"
                                            >
                                                <div className="flex-1 min-h-0" data-oid="dfa8twz">
                                                    <div
                                                        className="h-4 bg-gray-200 rounded w-3/4 mb-2"
                                                        data-oid="sjj8y24"
                                                    ></div>
                                                    <div
                                                        className="h-3 bg-gray-200 rounded w-full mb-1"
                                                        data-oid="3bqgsi6"
                                                    ></div>
                                                    <div
                                                        className="h-3 bg-gray-200 rounded w-2/3"
                                                        data-oid="dbi0y4i"
                                                    ></div>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between mt-2"
                                                    data-oid="-80-os_"
                                                >
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="cc19-pn"
                                                    >
                                                        <div
                                                            className="w-3 h-3 bg-gray-200 rounded mr-1"
                                                            data-oid="waxc_1u"
                                                        ></div>
                                                        <div
                                                            className="h-3 bg-gray-200 rounded w-8"
                                                            data-oid="au7um7r"
                                                        ></div>
                                                    </div>
                                                    <div
                                                        className="h-5 bg-gray-200 rounded w-12"
                                                        data-oid="yjg-dx3"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Playlist Dashboard Skeleton */}
                        <div
                            className="bg-white rounded-2xl shadow-lg border !border-gray-200 h-[500px] flex flex-col w-1/2 md:w-full"
                            data-oid="7tdh_e3"
                        >
                            <div className="p-4 border-b !border-gray-200" data-oid="3-w_c6q">
                                <div
                                    className="flex items-center justify-between mb-3"
                                    data-oid="-wyhgw0"
                                >
                                    <div className="flex items-center space-x-2" data-oid="qe9b643">
                                        <LayoutDashboard
                                            className="w-4 h-4 text-purple-600"
                                            data-oid="9d:bkpp"
                                        />

                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                            data-oid="rvock0j"
                                        >
                                            나의 여행 코스
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-between text-xs"
                                    data-oid="l3gunuz"
                                >
                                    <div
                                        className="h-3 bg-gray-200 rounded w-20 animate-pulse"
                                        data-oid="7c5ntsu"
                                    ></div>
                                    <div
                                        className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                                        data-oid="3bhvw:y"
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto" data-oid="b6czlfe">
                                <div className="p-12 text-center text-gray-500" data-oid="iohd:4b">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                        data-oid="2xfl53h"
                                    >
                                        <Route
                                            className="w-8 h-8 text-blue-500"
                                            data-oid="kaonmmt"
                                        />
                                    </div>
                                    <p
                                        className="text-sm font-semibold text-gray-700 mb-2"
                                        data-oid="c.8oo4a"
                                    >
                                        여행 코스를 만들어보세요
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1" data-oid="zs1xynv">
                                        관광지 카드를 드래그해서 여기에 놓거나
                                    </p>
                                    <p className="text-xs text-gray-500" data-oid="f:wmtpd">
                                        지도에서 선택해서 추가하세요
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div
                                className="p-4 border-t !border-gray-200 space-y-2"
                                data-oid="q9h-6l5"
                            >
                                <div
                                    className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
                                    data-oid="3ihg07g"
                                ></div>
                                <div className="grid grid-cols-2 gap-2" data-oid="fzy65ou">
                                    <div
                                        className="h-8 bg-gray-200 rounded-md animate-pulse"
                                        data-oid="mif:6eh"
                                    ></div>
                                    <div
                                        className="h-8 bg-gray-200 rounded-md animate-pulse"
                                        data-oid="564odji"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="bg-white border-t !border-gray-200 mt-12" data-oid="9:_p1vw">
                <div className="max-w-6xl mx-auto px-4 py-8" data-oid="ox0y0h9">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="snh8hb_">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-3" data-oid="lhi_z._">
                                <div
                                    className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                                    data-oid=".00szz8"
                                ></div>
                                <div className="space-y-2" data-oid="wfa9t1p">
                                    {[1, 2, 3].map((j) => (
                                        <div
                                            key={j}
                                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                                            data-oid="_pxf2v:"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t !border-gray-200 mt-8 pt-8" data-oid="05ud7a.">
                        <div
                            className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
                            data-oid="dhg5org"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
