'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Star,
    Users,
    Calendar,
    Car,
    Bot,
    Sparkles,
    Navigation,
    Camera,
    Utensils,
    Mountain,
    Download,
    Share2,
    Heart,
    RefreshCw,
    Eye,
    ThumbsUp,
    Bookmark,
    ExternalLink,
    Route,
    Zap,
} from 'lucide-react';

export default function CourseDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);

    // AI 추천 코스 상세 데이터
    const courseDetails = {
        id: params.id,
        title: '제주도 3박 4일 완벽 가족여행',
        subtitle: 'AI가 맞춤 제작한 가족 친화적 제주도 코스',
        description:
            '아이들과 함께 즐길 수 있는 체험활동과 안전한 관광지를 중심으로 구성된 AI 추천 코스입니다. 제주도의 대표적인 명소들을 효율적인 동선으로 연결하여 가족 모두가 만족할 수 있는 여행을 제공합니다.',
        aiConfidence: 95,
        rating: 4.9,
        totalViews: 2847,
        totalLikes: 234,
        totalBookmarks: 89,
        duration: '3박 4일',
        participants: '가족 4명',
        totalCost: '₩1,200,000',
        difficulty: '쉬움',
        tags: ['AI추천', '가족여행', '제주도', '체험활동', '자연관광'],
        highlights: ['성산일출봉', '한라산', '협재해수욕장', '동문시장', '테디베어뮤지엄'],
        totalDistance: '245km',
        estimatedTime: '약 12시간',
        bestSeason: '봄, 가을',
        transportation: '렌터카',
        createdAt: '2024-03-15',
        lastUpdated: '2024-03-15',
        aiAnalysis: {
            weatherOptimized: true,
            budgetEfficient: true,
            familyFriendly: true,
            timeOptimized: true,
        },
        days: [
            {
                day: 1,
                title: '제주 동부 탐방',
                subtitle: '성산일출봉과 섭지코지 중심',
                places: [
                    {
                        id: 1,
                        name: '제주공항',
                        type: '출발지',
                        address: '제주특별자치도 제주시 공항로 2',
                        duration: '30분',
                        description: '여행의 시작점, 렌터카 픽업',
                        icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5" data-oid="hqnvgru" />,
                        nextDistance: '42km',
                        nextTime: '50분',
                        aiReason: '가족 여행에 최적화된 렌터카 픽업 위치입니다.',
                        tips: ['렌터카 예약 확인', '아이 카시트 준비', '여행 일정 최종 점검'],
                        photos: ['airport1.jpg', 'airport2.jpg'],
                        rating: 4.5,
                        reviews: 128,
                    },
                    {
                        id: 2,
                        name: '성산일출봉',
                        type: '관광지',
                        address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
                        duration: '2시간',
                        description: '제주도 대표 관광지, 일출 명소',
                        icon: <Mountain className="w-4 h-4 sm:w-5 sm:h-5" data-oid="mxrb7vq" />,
                        nextDistance: '8km',
                        nextTime: '15분',
                        aiReason: '가족 단위 방문객이 많고 아이들도 쉽게 오를 수 있는 코스입니다.',
                        tips: ['편한 신발 착용', '물과 간식 준비', '일출 시간 확인'],
                        photos: ['seongsan1.jpg', 'seongsan2.jpg', 'seongsan3.jpg'],
                        rating: 4.8,
                        reviews: 2456,
                        openTime: '05:00 - 20:00',
                        entryFee: '성인 5,000원, 어린이 2,500원',
                    },
                    {
                        id: 3,
                        name: '섭지코지',
                        type: '관광지',
                        address: '제주특별자치도 서귀포시 성산읍 섭지코지로 107',
                        duration: '1시간 30분',
                        description: '아름다운 해안 절벽과 등대',
                        icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" data-oid="rq68scu" />,
                        nextDistance: '15km',
                        nextTime: '25분',
                        aiReason: '인생샷 명소로 가족 사진 촬영에 완벽한 장소입니다.',
                        tips: ['바람이 강할 수 있음', '사진 촬영 포인트 다수', '해안가 안전 주의'],
                        photos: ['seopjikoji1.jpg', 'seopjikoji2.jpg'],
                        rating: 4.7,
                        reviews: 1834,
                        openTime: '24시간',
                        entryFee: '무료',
                    },
                    {
                        id: 4,
                        name: '제주 동문시장',
                        type: '맛집',
                        address: '제주특별자치도 제주시 관덕로14길 20',
                        duration: '1시간 30분',
                        description: '제주 전통 시장, 현지 음식 체험',
                        icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5" data-oid="vva_w7q" />,
                        nextDistance: '5km',
                        nextTime: '15분',
                        aiReason: '아이들이 좋아하는 다양한 간식과 제주 특산품을 맛볼 수 있습니다.',
                        tips: ['현금 준비', '아이들 간식 구매', '제주 특산품 쇼핑'],
                        photos: ['dongmun1.jpg', 'dongmun2.jpg'],
                        rating: 4.6,
                        reviews: 892,
                        openTime: '06:00 - 21:00',
                        entryFee: '무료',
                    },
                ],

                totalDistance: '70km',
                totalTime: '5시간 30분',
                estimatedCost: '₩180,000',
            },
            {
                day: 2,
                title: '제주 서부 자연 탐방',
                subtitle: '한라산과 협재해수욕장',
                places: [
                    {
                        id: 5,
                        name: '한라산 어리목 탐방로',
                        type: '자연관광',
                        address: '제주특별자치도 제주시 1100로 2070-61',
                        duration: '3시간',
                        description: '제주도 최고봉, 가족 트레킹 코스',
                        icon: <Mountain className="w-4 h-4 sm:w-5 sm:h-5" data-oid="dy.93.5" />,
                        nextDistance: '25km',
                        nextTime: '35분',
                        aiReason: '가족 단위로 안전하게 즐길 수 있는 트레킹 코스입니다.',
                        tips: ['트레킹화 필수', '충분한 물 준비', '날씨 확인'],
                        photos: ['hallasan1.jpg', 'hallasan2.jpg'],
                        rating: 4.9,
                        reviews: 3421,
                        openTime: '05:30 - 12:30',
                        entryFee: '무료',
                    },
                    {
                        id: 6,
                        name: '협재해수욕장',
                        type: '해변',
                        address: '제주특별자치도 제주시 한림읍 협재리',
                        duration: '2시간',
                        description: '에메랄드빛 바다와 하얀 모래사장',
                        icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" data-oid="ha3_aap" />,
                        nextDistance: '10km',
                        nextTime: '15분',
                        aiReason: '아이들이 안전하게 물놀이할 수 있는 얕은 해변입니다.',
                        tips: ['수영복과 타올 준비', '자외선 차단제', '물놀이 용품'],
                        photos: ['hyeopjae1.jpg', 'hyeopjae2.jpg'],
                        rating: 4.8,
                        reviews: 2156,
                        openTime: '24시간',
                        entryFee: '무료',
                    },
                ],

                totalDistance: '35km',
                totalTime: '5시간',
                estimatedCost: '₩120,000',
            },
            {
                day: 3,
                title: '제주 중부 체험 활동',
                subtitle: '테마파크와 박물관 투어',
                places: [
                    {
                        id: 7,
                        name: '테디베어뮤지엄',
                        type: '체험',
                        address: '제주특별자치도 서귀포시 중문관광로110번길 31',
                        duration: '1시간 30분',
                        description: '아이들이 좋아하는 테디베어 전시관',
                        icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" data-oid="nz::3rg" />,
                        nextDistance: '5km',
                        nextTime: '10분',
                        aiReason: '아이들의 연령대에 완벽하게 맞는 체험 공간입니다.',
                        tips: ['사진 촬영 가능', '기념품샵 이용', '아이들 체험 프로그램'],
                        photos: ['teddy1.jpg', 'teddy2.jpg'],
                        rating: 4.5,
                        reviews: 1567,
                        openTime: '09:00 - 19:00',
                        entryFee: '성인 11,000원, 어린이 8,000원',
                    },
                ],

                totalDistance: '5km',
                totalTime: '1시간 30분',
                estimatedCost: '₩50,000',
            },
        ],
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
    };

    const handleDownload = () => {
        alert('코스 다운로드 기능은 준비 중입니다.');
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
            data-oid="u-qd:ag"
        >
            

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8" data-oid="8mf8_wm">
                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" data-oid="1hm7qzr">
                    {/* Left Column - Course Details */}
                    <div className="lg:col-span-2" data-oid="zftf_be">
                        {/* AI Course Header */}
                        <div
                            className="
                            relative overflow-hidden
                            p-4 mb-4
                            rounded-2xl
                            bg-gradient-to-br from-purple-100 to-blue-100
                            sm:rounded-3xl  sm:p-6 lg:p-8 sm:mb-6 lg:mb-8"
                            data-oid="ob7xy.s"
                        >
                            <div className="relative z-10" data-oid="1mdxbf2">
                                <div
                                    className="flex items-center space-x-2 mb-3 sm:mb-4"
                                    data-oid="1bsezv:"
                                >
                                    <Sparkles
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                                        data-oid="pmuy3vj"
                                    />
                                    <span
                                        className="text-xs sm:text-sm font-medium text-purple-600"
                                        data-oid="d.hx6we"
                                    >
                                        AI 신뢰도 {courseDetails.aiConfidence}%
                                    </span>
                                </div>

                                <h2
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                                    data-oid="ruzhgcp"
                                >
                                    {courseDetails.title}
                                </h2>

                                <p
                                    className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6"
                                    data-oid="m.pxaq2"
                                >
                                    {courseDetails.subtitle}
                                </p>

                                <p
                                    className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6"
                                    data-oid="eytz6u-"
                                >
                                    {courseDetails.description}
                                </p>

                                {/* AI Analysis Badges */}
                                <div
                                    className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                                    data-oid="3wb-n1w"
                                >
                                    {courseDetails.aiAnalysis.weatherOptimized && (
                                        <span
                                            className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                            data-oid=":31r4z:"
                                        >
                                            🌤️ 날씨 최적화
                                        </span>
                                    )}
                                    {courseDetails.aiAnalysis.budgetEfficient && (
                                        <span
                                            className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                            data-oid="-jjobgm"
                                        >
                                            💰 예산 효율적
                                        </span>
                                    )}
                                    {courseDetails.aiAnalysis.familyFriendly && (
                                        <span
                                            className="bg-pink-100 text-pink-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                            data-oid="1p69-pb"
                                        >
                                            👨‍👩‍👧‍👦 가족 친화적
                                        </span>
                                    )}
                                    {courseDetails.aiAnalysis.timeOptimized && (
                                        <span
                                            className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                            data-oid="infpwgh"
                                        >
                                            ⏰ 시간 최적화
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2 sm:gap-3" data-oid="eolj5g_">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                                            isLiked
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                        data-oid="1x35gks"
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                                            data-oid="0v-kjcb"
                                        />

                                        <span className="hidden sm:inline" data-oid="zmgv42v">
                                            {isLiked ? '좋아요 취소' : '좋아요'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="
                                        flex items-center
                                        space-x-1 px-3 py-2
                                        rounded-lg
                                        text-sm text-blue-600
                                        bg-white
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                                        data-oid="w1od31_"
                                    >
                                        <Download className="w-4 h-4" data-oid="m9npxt-" />
                                        <span className="hidden sm:inline" data-oid="v9qf8fk">
                                            다운로드
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.push(`/map?courseId=${courseDetails.id}`)
                                        }
                                        className="
                                        flex items-center 
                                        px-3 py-2 space-x-1
                                        rounded-lg
                                        text-sm text-green-600
                                        bg-white  
                                        sm:px-4 sm:space-x-2 hover:bg-gray-50"
                                        data-oid="fisp5uj"
                                    >
                                        <MapPin className="w-4 h-4" data-oid="o:-alxo" />
                                        <span className="hidden sm:inline" data-oid="jvp0t.v">
                                            지도보기
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Background Pattern */}
                            <div
                                className="absolute top-4 right-4 w-16 h-16 bg-purple-600/10 rounded-full"
                                data-oid="k0mza.5"
                            ></div>
                            <div
                                className="absolute bottom-4 right-8 w-10 h-10 bg-blue-600/10 rounded-full"
                                data-oid="fnfbcjy"
                            ></div>
                        </div>

                        {/* Day Selector */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                            data-oid="a-72::-"
                        >
                            <h3
                                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                                data-oid="17g825i"
                            >
                                일정 선택
                            </h3>
                            <div className="flex gap-2 overflow-x-auto" data-oid="v3wb7y:">
                                {courseDetails.days.map((day) => (
                                    <button
                                        key={day.day}
                                        onClick={() => setSelectedDay(day.day)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            selectedDay === day.day
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        data-oid="zxs1wkb"
                                    >
                                        Day {day.day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Day Details */}
                        {courseDetails.days.map(
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
                                                    {day.subtitle}
                                                </p>
                                            </div>
                                            <div
                                                className="text-right text-sm text-gray-500"
                                                data-oid="z-hksd8"
                                            >
                                                <div data-oid="x329twq">{day.totalDistance}</div>
                                                <div data-oid="9.q2an-">{day.totalTime}</div>
                                            </div>
                                        </div>

                                        {/* Places Timeline */}
                                        <div className="space-y-6" data-oid="ixfy:al">
                                            {day.places.map((place, index) => (
                                                <div
                                                    key={place.id}
                                                    className="relative"
                                                    data-oid="_lo9t8o"
                                                >
                                                    {/* Timeline Line */}
                                                    {index < day.places.length - 1 && (
                                                        <div
                                                            className="absolute left-5 top-12 w-0.5 h-20 bg-gray-200"
                                                            data-oid="tbielp2"
                                                        ></div>
                                                    )}

                                                    <div
                                                        className="flex space-x-4"
                                                        data-oid="sc.fx_l"
                                                    >
                                                        {/* Icon */}
                                                        <div
                                                            className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
                                                            data-oid="p9vfdn-"
                                                        >
                                                            {place.icon}
                                                        </div>

                                                        {/* Content */}
                                                        <div
                                                            className="flex-1 min-w-0"
                                                            data-oid="j40foyt"
                                                        >
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
                                                                    {place.type}
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
                                                                    <span
                                                                        className="truncate"
                                                                        data-oid="ar1rvfv"
                                                                    >
                                                                        {place.address}
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
                                                                        체류 시간: {place.duration}
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
                                                                            운영시간:{' '}
                                                                            {place.openTime}
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
                                                                    {place.aiReason}
                                                                </p>
                                                            </div>

                                                            {/* Tips */}
                                                            {place.tips &&
                                                                place.tips.length > 0 && (
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
                                                                            {place.tips.map(
                                                                                (tip, tipIndex) => (
                                                                                    <li
                                                                                        key={
                                                                                            tipIndex
                                                                                        }
                                                                                        className="flex items-start"
                                                                                        data-oid="j:e.i6s"
                                                                                    >
                                                                                        <span
                                                                                            className="mr-2"
                                                                                            data-oid="zwck3b-"
                                                                                        >
                                                                                            •
                                                                                        </span>
                                                                                        <span data-oid="kze6t-q">
                                                                                            {tip}
                                                                                        </span>
                                                                                    </li>
                                                                                ),
                                                                            )}
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
                                                                        {place.rating}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className="text-sm text-gray-500"
                                                                    data-oid="-bx8fv:"
                                                                >
                                                                    리뷰 {place.reviews}개
                                                                </div>
                                                            </div>

                                                            {/* Next Location Info */}
                                                            {place.nextDistance && (
                                                                <div
                                                                    className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2"
                                                                    data-oid="b-rmbq:"
                                                                >
                                                                    <Car
                                                                        className="w-4 h-4 flex-shrink-0"
                                                                        data-oid="sj30h20"
                                                                    />
                                                                    <span data-oid="0asui.y">
                                                                        다음 장소까지{' '}
                                                                        {place.nextDistance} •
                                                                        소요시간 {place.nextTime}
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

                    {/* Right Column - Summary & Info */}
                    <div className="space-y-4 sm:space-y-6" data-oid="ewuh0o6">
                        {/* Course Summary */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="tna1sky"
                        >
                            <h3
                                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                                data-oid="rdvocr7"
                            >
                                코스 요약
                            </h3>
                            <div className="space-y-3 sm:space-y-4" data-oid="nf9galu">
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="ag10olx"
                                >
                                    <span className="text-sm text-gray-600" data-oid="1of1j_7">
                                        총 기간
                                    </span>
                                    <span className="font-medium" data-oid="twxnk95">
                                        {courseDetails.duration}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="oxu16ck"
                                >
                                    <span className="text-sm text-gray-600" data-oid="mjoff3j">
                                        참가자
                                    </span>
                                    <span className="font-medium" data-oid="e2kx:v0">
                                        {courseDetails.participants}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid=".-1lift"
                                >
                                    <span className="text-sm text-gray-600" data-oid="uo.yb0u">
                                        총 비용
                                    </span>
                                    <span className="font-bold text-blue-600" data-oid="bklu7ia">
                                        {courseDetails.totalCost}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="coe9d:y"
                                >
                                    <span className="text-sm text-gray-600" data-oid="dsfse28">
                                        난이도
                                    </span>
                                    <span className="font-medium" data-oid="_lh.l0u">
                                        {courseDetails.difficulty}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="w-wtkzl"
                                >
                                    <span className="text-sm text-gray-600" data-oid="-wk5e7s">
                                        총 거리
                                    </span>
                                    <span className="font-medium" data-oid="_zvyg4z">
                                        {courseDetails.totalDistance}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="i4s:9.p"
                                >
                                    <span className="text-sm text-gray-600" data-oid="u3b9zkj">
                                        예상 시간
                                    </span>
                                    <span className="font-medium" data-oid="3.ak_.u">
                                        {courseDetails.estimatedTime}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="qilu6y."
                                >
                                    <span className="text-sm text-gray-600" data-oid="eyr615d">
                                        AI 신뢰도
                                    </span>
                                    <div className="flex items-center" data-oid="_.uz4_1">
                                        <Star
                                            className="w-4 h-4 text-yellow-400 mr-1"
                                            data-oid="kfvz_7i"
                                        />
                                        <span className="font-medium" data-oid="47w8v3e">
                                            {courseDetails.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="fe0d1ur"
                        >
                            <h3
                                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                                data-oid="dr.yxqk"
                            >
                                통계
                            </h3>
                            <div className="space-y-3 sm:space-y-4" data-oid="6ntr7vf">
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="1xtm:vg"
                                >
                                    <span className="text-sm text-gray-600" data-oid="g5xy6s4">
                                        조회수
                                    </span>
                                    <span className="font-medium" data-oid="imtq.hz">
                                        {courseDetails.totalViews.toLocaleString()}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="pm:xq42"
                                >
                                    <span className="text-sm text-gray-600" data-oid="4nkr:va">
                                        좋아요
                                    </span>
                                    <span className="font-medium" data-oid="l4fynrq">
                                        {courseDetails.totalLikes}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="s.jz36n"
                                >
                                    <span className="text-sm text-gray-600" data-oid="5o6qq7t">
                                        북마크
                                    </span>
                                    <span className="font-medium" data-oid="yrygku0">
                                        {courseDetails.totalBookmarks}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="_j5xuju"
                                >
                                    <span className="text-sm text-gray-600" data-oid="_7l4hn8">
                                        생성일
                                    </span>
                                    <span className="font-medium" data-oid="-cpwzj3">
                                        {courseDetails.createdAt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="buk3bth"
                        >
                            <h3
                                className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                                data-oid="eth-uml"
                            >
                                태그
                            </h3>
                            <div className="flex flex-wrap gap-2" data-oid="upko3y8">
                                {courseDetails.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm"
                                        data-oid="ffv9vhz"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3" data-oid="57_rw86">
                            <button
                                onClick={() => router.push(`/map?courseId=${courseDetails.id}`)}
                                className="
                                w-full
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-sm font-medium text-white
                                bg-blue-600
                                hover:bg-blue-700"
                                data-oid="4anf-sy"
                            >
                                <MapPin className="w-4 h-4 mr-2" data-oid="35rd-7_" />
                                지도에서 보기
                            </button>
                            <button
                                onClick={handleDownload}
                                className="
                                w-full 
                                flex items-center justify-center
                                py-3
                                rounded-lg
                                text-gray-700 text-sm font-medium
                                bg-gray-100
                                hover:bg-gray-200"
                                data-oid="g:qkrct"
                            >
                                <Download className="w-4 h-4 mr-2" data-oid="kn4f757" />
                                코스 다운로드
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
