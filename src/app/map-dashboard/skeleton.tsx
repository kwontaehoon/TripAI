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
           
        >
            {/* Header Skeleton
            <header
                className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
               
            >
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1"
                           
                        >
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"
                               
                            >
                                <Bot
                                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                                   
                                />
                            </div>
                            <div className="min-w-0">
                                <button
                                    onClick={() => router.push('/')}
                                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors truncate"
                                   
                                >
                                    TripAI
                                </button>
                                <p
                                    className="text-xs text-gray-500 hidden sm:block"
                                   
                                >
                                    AI 여행 플래너
                                </p>
                            </div>
                        </div>
                        <div
                            className="hidden md:flex items-center space-x-4 flex-shrink-0"
                           
                        >
                            <button
                                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                               
                            >
                                로그인
                            </button>
                            <button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                               
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </header> */}

            {/* Hero Section Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
                {/* <div
                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
                   
                >
                    <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-600">
                                AI 여행 플래너
                            </span>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                           
                        >
                            나만의 완벽한 여행 코스를
                        </h2>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight"
                           
                        >
                            <span className="text-blue-600">
                                직접 만들어보세요
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-6">
                            지도에서 관광지를 탐색하고, 드래그앤드롭으로 나만의 여행 코스를
                            완성하세요
                        </p>
                    </div> */}

                    {/* Background Pattern */}
                    {/* <div
                        className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full"
                       
                    ></div>
                    <div
                        className="absolute bottom-4 right-8 w-12 h-12 bg-purple-600/10 rounded-full"
                       
                    ></div>
                </div> */}

                {/* Stats Bar Skeleton */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                       
                    >
                        <div
                            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                           
                        >
                            <Map className="w-6 h-6 text-blue-600" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"
                           
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-20 mx-auto"
                           
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                       
                    >
                        <div
                            className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                           
                        >
                            <Route className="w-6 h-6 text-green-600" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2"
                           
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-24 mx-auto"
                           
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                       
                    >
                        <div
                            className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                           
                        >
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"
                           
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-20 mx-auto"
                           
                        ></div>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center animate-pulse"
                       
                    >
                        <div
                            className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"
                           
                        >
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div
                            className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2"
                           
                        ></div>
                        <div
                            className="h-4 bg-gray-200 rounded w-16 mx-auto"
                           
                        ></div>
                    </div>
                </div> */}

                {/* Main Layout Skeleton */}
                <div className="md:grid grid-cols-12 gap-8 min-h-[800px]">
                    {/* Left Side - Map Skeleton */}
                    <div className="col-span-7">
                        <div
                            className="bg-white rounded-3xl shadow-2xl border !border-gray-200 md:h-full h-[400px] overflow-hidden"
                           
                        >
                            <div
                                className="p-6 border-b !border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50"
                               
                            >
                                <div
                                    className="flex items-center justify-between"
                                   
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                                           
                                        >
                                            <Map
                                                className="w-5 h-5 text-white"
                                               
                                            />
                                        </div>
                                        <div>
                                            <h2
                                                className="text-xl font-bold text-gray-900"
                                               
                                            >
                                                인터랙티브 지도
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                관광지를 클릭해서 상세 정보를 확인하세요
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div
                                            className="h-5 bg-gray-200 rounded w-20 mb-1 animate-pulse"
                                           
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                                           
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-full">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-10"
                                   
                                >
                                    <div className="text-center">
                                        <div
                                            className="animate-spin rounded-full h-12 w-12 border-4 !border-blue-600 border-t-transparent mx-auto"
                                           
                                        ></div>
                                        <p
                                            className="mt-4 text-gray-600 font-medium"
                                           
                                        >
                                            지도를 불러오는 중...
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="w-full h-full bg-gray-200 animate-pulse"
                                   
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - List & Dashboard Skeleton */}
                    <div
                        className="col-span-5 flex md:flex-col flex-row md:space-y-6 md:mt-0 mt-8 md:space-x-0 space-x-5"
                       
                    >
                        {/* Tourist Spots List Skeleton */}
                        <div
                            className="bg-white rounded-2xl shadow-lg border !border-gray-200 md:h-[300px] h-[500px] flex flex-col w-1/2 md:w-full"
                           
                        >
                            <div className="p-4 border-b !border-gray-200">
                                <div
                                    className="flex items-center justify-between"
                                   
                                >
                                    <div className="flex items-center space-x-2">
                                        <List
                                            className="w-4 h-4 text-blue-600"
                                           
                                        />

                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                           
                                        >
                                            관광지 목록
                                        </h3>
                                    </div>
                                    <div
                                        className="h-4 bg-gray-200 rounded w-8 animate-pulse"
                                       
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <div
                                    className="grid md:grid-cols-2 grid-cols-1 gap-3"
                                   
                                >
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="h-[100px] bg-gray-100 rounded-lg border !border-gray-200 animate-pulse"
                                           
                                        >
                                            <div
                                                className="p-3 h-full flex flex-col justify-between"
                                               
                                            >
                                                <div className="flex-1 min-h-0">
                                                    <div
                                                        className="h-4 bg-gray-200 rounded w-3/4 mb-2"
                                                       
                                                    ></div>
                                                    <div
                                                        className="h-3 bg-gray-200 rounded w-full mb-1"
                                                       
                                                    ></div>
                                                    <div
                                                        className="h-3 bg-gray-200 rounded w-2/3"
                                                       
                                                    ></div>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between mt-2"
                                                   
                                                >
                                                    <div
                                                        className="flex items-center"
                                                       
                                                    >
                                                        <div
                                                            className="w-3 h-3 bg-gray-200 rounded mr-1"
                                                           
                                                        ></div>
                                                        <div
                                                            className="h-3 bg-gray-200 rounded w-8"
                                                           
                                                        ></div>
                                                    </div>
                                                    <div
                                                        className="h-5 bg-gray-200 rounded w-12"
                                                       
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
                           
                        >
                            <div className="p-4 border-b !border-gray-200">
                                <div
                                    className="flex items-center justify-between mb-3"
                                   
                                >
                                    <div className="flex items-center space-x-2">
                                        <LayoutDashboard
                                            className="w-4 h-4 text-purple-600"
                                           
                                        />

                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                           
                                        >
                                            나의 여행 코스
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-between text-xs"
                                   
                                >
                                    <div
                                        className="h-3 bg-gray-200 rounded w-20 animate-pulse"
                                       
                                    ></div>
                                    <div
                                        className="h-3 bg-gray-200 rounded w-16 animate-pulse"
                                       
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="p-12 text-center text-gray-500">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                       
                                    >
                                        <Route
                                            className="w-8 h-8 text-blue-500"
                                           
                                        />
                                    </div>
                                    <p
                                        className="text-sm font-semibold text-gray-700 mb-2"
                                       
                                    >
                                        여행 코스를 만들어보세요
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        관광지 카드를 드래그해서 여기에 놓거나
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        지도에서 선택해서 추가하세요
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div
                                className="p-4 border-t !border-gray-200 space-y-2"
                               
                            >
                                <div
                                    className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"
                                   
                                ></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div
                                        className="h-8 bg-gray-200 rounded-md animate-pulse"
                                       
                                    ></div>
                                    <div
                                        className="h-8 bg-gray-200 rounded-md animate-pulse"
                                       
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="bg-white border-t !border-gray-200 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-3">
                                <div
                                    className="h-5 bg-gray-200 rounded w-20 animate-pulse"
                                   
                                ></div>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((j) => (
                                        <div
                                            key={j}
                                            className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                                           
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t !border-gray-200 mt-8 pt-8">
                        <div
                            className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"
                           
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
