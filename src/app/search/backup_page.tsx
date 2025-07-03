'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Search,
    MapPin,
    Clock,
    Star,
    Users,
    ArrowRight,
    Bot,
    Calendar,
    Car,
    Filter,
    SlidersHorizontal,
    Heart,
    Share2,
    MessageCircle,
    Eye,
    Mic,
    Send,
    TrendingUp,
    Award,
    ThumbsUp,
    Sparkles,
    X,
} from 'lucide-react';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [isListening, setIsListening] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [sortBy, setSortBy] = useState('관련도순');
    const [searchType, setSearchType] = useState('전체');

    const filters = [
        '전체',
        'AI 추천',
        '사용자 코스',
        '가족여행',
        '커플여행',
        '친구여행',
        '혼자여행',
        '당일치기',
    ];

    const sortOptions = ['관련도순', '최신순', '인기순', '평점순'];
    const searchTypes = ['전체', 'AI 추천 코스', '사용자 코스', '여행지'];

    // 검색 결과 데이터 (AI 추천 코스 + 사용자 게시글)
    const searchResults = [
        // AI 추천 코스
        {
            id: 1,
            type: 'ai-course',
            title: '제주도 3박 4일 완벽 가족여행',
            subtitle: 'AI가 맞춤 제작한 가족 친화적 제주도 코스',
            description:
                '아이들과 함께 즐길 수 있는 체험활동과 안전한 관광지를 중심으로 구성된 AI 추천 코스입니다.',
            duration: '3박 4일',
            rating: 4.9,
            participants: '가족 4명',
            totalCost: '₩1,200,000',
            difficulty: '쉬움',
            tags: ['AI추천', '가족여행', '제주도', '체험활동'],
            highlights: ['성산일출봉', '한라산', '협재해수욕장', '동문시장', '테디베어뮤지엄'],
            places: 12,
            aiGenerated: true,
            views: 2847,
            likes: 234,
            createdAt: '2024-03-15',
        },
        {
            id: 2,
            type: 'ai-course',
            title: '부산 2박 3일 맛집 투어',
            subtitle: 'AI가 분석한 부산 최고의 맛집 코스',
            description:
                '현지인들이 인정하는 진짜 맛집들을 AI가 분석하여 최적의 동선으로 구성한 맛집 투어 코스입니다.',
            duration: '2박 3일',
            rating: 4.8,
            participants: '커플',
            totalCost: '₩450,000',
            difficulty: '쉬움',
            tags: ['AI추천', '맛집투어', '부산', '해산물'],
            highlights: ['자갈치시장', '광안리', '해운대', '남포동', '서면'],
            places: 8,
            aiGenerated: true,
            views: 1923,
            likes: 189,
            createdAt: '2024-03-14',
        },
        // 사용자 게시글
        {
            id: 3,
            type: 'user-post',
            title: '제주도 3박 4일 완벽 가족여행 후기 (아이들과 함께)',
            subtitle: '5살, 8살 아이들과 함께한 제주도 여행 코스 공유합니다',
            description:
                '아이들과 함께 제주도를 여행하면서 정말 좋았던 코스들을 정리해봤어요. 특히 아이들이 좋아할만한 체험활동들을 중심으로 구성했습니다.',
            author: {
                name: '여행러버맘',
                avatar: '👩‍👧‍👦',
                level: 'Gold',
                posts: 23,
            },
            duration: '3박 4일',
            rating: 4.8,
            likes: 156,
            comments: 34,
            views: 1247,
            participants: '가족 4명',
            tags: ['가족여행', '제주도', '아이동반', '체험활동'],
            difficulty: '쉬움',
            totalCost: '₩1,200,000',
            highlights: ['성산일출봉', '한라산', '협재해수욕장', '동문시장', '테디베어뮤지엄'],
            places: 12,
            featured: true,
            createdAt: '2024-03-15',
        },
        {
            id: 4,
            type: 'user-post',
            title: '부산 2박 3일 맛집 투어 완전 정복',
            subtitle: '현지인이 추천하는 진짜 부산 맛집들만 골라서',
            description:
                '부산에서 30년 살면서 정말 맛있다고 생각하는 맛집들만 엄선해서 코스로 만들었어요. 관광지 맛집이 아닌 진짜 맛집들입니다.',
            author: {
                name: '부산토박이',
                avatar: '🍜',
                level: 'Platinum',
                posts: 45,
            },
            duration: '2박 3일',
            rating: 4.9,
            likes: 203,
            comments: 67,
            views: 2156,
            participants: '커플',
            tags: ['맛집투어', '부산', '현지맛집', '해산물'],
            difficulty: '쉬움',
            totalCost: '₩450,000',
            highlights: ['자갈치시장', '광안리', '해운대', '남포동', '서면'],
            places: 8,
            featured: false,
            createdAt: '2024-03-14',
        },
        {
            id: 5,
            type: 'ai-course',
            title: '서울 당일치기 데이트 코스',
            subtitle: 'AI가 추천하는 완벽한 서울 데이트 코스',
            description:
                '20대 커플들의 데이트 패턴을 분석하여 AI가 제안하는 서울 최고의 당일치기 데이트 코스입니다.',
            duration: '당일치기',
            rating: 4.7,
            participants: '커플',
            totalCost: '₩150,000',
            difficulty: '쉬움',
            tags: ['AI추천', '데이트', '서울', '당일치기'],
            highlights: ['홍대', '명동', '남산타워', '한강공원', '이태원'],
            places: 5,
            aiGenerated: true,
            views: 3421,
            likes: 298,
            createdAt: '2024-03-13',
        },
    ];

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleResultClick = (result: any) => {
        if (result.type === 'ai-course') {
            router.push(`/courses/details/${result.id}`);
        } else {
            router.push(`/board/details/${result.id}`);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '쉬움':
                return 'bg-green-100 text-green-700';
            case '보통':
                return 'bg-yellow-100 text-yellow-700';
            case '어려움':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Platinum':
                return 'bg-purple-100 text-purple-700';
            case 'Gold':
                return 'bg-yellow-100 text-yellow-700';
            case 'Silver':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };

    const filteredResults = searchResults.filter((result) => {
        if (selectedFilter === '전체') return true;
        if (selectedFilter === 'AI 추천' && result.type === 'ai-course') return true;
        if (selectedFilter === '사용자 코스' && result.type === 'user-post') return true;
        return result.tags.includes(selectedFilter);
    });

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
            data-oid="hl4bmwd"
        >
            
            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8" data-oid="1t5gz7d">
                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" data-oid="tizxp16">
                    {/* Left Column - Search Results */}
                    <div className="lg:col-span-2" data-oid="hvt7eb5">
                        {/* Search Section */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200 mb-4 sm:mb-6"
                            data-oid="vxhkvn4"
                        >
                            <div className="flex items-center space-x-2 mb-4" data-oid="dx5655-">
                                <Search
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                                    data-oid="tgczjcf"
                                />

                                <h1
                                    className="text-lg sm:text-xl font-bold text-gray-900"
                                    data-oid="i-jh9v8"
                                >
                                    검색 결과
                                </h1>
                            </div>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mb-4" data-oid="od3sam2">
                                <div
                                    className="flex items-center bg-gray-50 rounded-2xl border !border-gray-200 p-2"
                                    data-oid="k3ev88z"
                                >
                                    <div
                                        className="flex-1 flex items-center space-x-3 px-2 sm:px-4"
                                        data-oid="_v00o.-"
                                    >
                                        <Search
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                            data-oid="9-1oby4"
                                        />

                                        <input
                                            type="text"
                                            placeholder="여행 코스를 검색해보세요"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base bg-transparent"
                                            data-oid="ux5jtjg"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid=".ji0t2i">
                                        <button
                                            type="button"
                                            className={`p-2 rounded-xl transition-colors ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setIsListening(!isListening)}
                                            data-oid="fsbumet"
                                        >
                                            <Mic
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                data-oid="og6uyxt"
                                            />
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                                            data-oid="ug2i_uk"
                                        >
                                            <Send
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                data-oid="vit99o7"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Search Info */}
                            {searchQuery && (
                                <div className="text-sm text-gray-600" data-oid="53ot0fm">
                                    '
                                    <span className="font-medium text-gray-900" data-oid="dx3umcr">
                                        {searchQuery}
                                    </span>
                                    ' 검색 결과 {filteredResults.length}개
                                </div>
                            )}
                        </div>

                        {/* Filters */}
                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
                            data-oid="vj8621b"
                        >
                            <div className="flex items-center space-x-2" data-oid=".rjbu.k">
                                <Filter
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                                    data-oid="yk7h0k:"
                                />

                                <div className="flex flex-wrap gap-2" data-oid="l8vomso">
                                    {filters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedFilter(filter)}
                                            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                                selectedFilter === filter
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border !border-gray-200'
                                            }`}
                                            data-oid="9_p:04."
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2" data-oid="cyj1lwl">
                                <SlidersHorizontal
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                                    data-oid="4nd3i22"
                                />

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border !border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="ug64wm:"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option} value={option} data-oid="ljk5xpm">
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="space-y-4 sm:space-y-6" data-oid="ep:hvv:">
                            {filteredResults.map((result) => (
                                <div
                                    key={result.id}
                                    onClick={() => handleResultClick(result)}
                                    className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                                    data-oid="nl279as"
                                >
                                    {/* Type Badge */}
                                    <div
                                        className={`px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium flex items-center ${
                                            result.type === 'ai-course'
                                                ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white'
                                                : 'bg-gradient-to-r from-green-400 to-blue-400 text-white'
                                        }`}
                                        data-oid="7g-pgh4"
                                    >
                                        {result.type === 'ai-course' ? (
                                            <>
                                                <Sparkles
                                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                    data-oid="w9sr2ud"
                                                />
                                                AI 추천 코스
                                            </>
                                        ) : (
                                            <>
                                                <MessageCircle
                                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                    data-oid="op6c_vk"
                                                />
                                                사용자 코스
                                            </>
                                        )}
                                    </div>

                                    <div className="p-4 sm:p-6" data-oid="5m0nh56">
                                        <div
                                            className="flex items-start justify-between mb-3 gap-2"
                                            data-oid="ca4fh.:"
                                        >
                                            <div className="flex-1 min-w-0" data-oid="g_lpo.s">
                                                <h3
                                                    className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2"
                                                    data-oid="sqy7p9w"
                                                >
                                                    {result.title}
                                                </h3>
                                                <p
                                                    className="text-sm sm:text-base text-gray-600 line-clamp-2"
                                                    data-oid="r-lzkpu"
                                                >
                                                    {result.subtitle}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)} flex-shrink-0`}
                                                data-oid="evuv02x"
                                            >
                                                {result.difficulty}
                                            </span>
                                        </div>

                                        {/* Author Info (for user posts) */}
                                        {result.type === 'user-post' && result.author && (
                                            <div
                                                className="flex items-center space-x-2 mb-3"
                                                data-oid="3rdmb_1"
                                            >
                                                <span
                                                    className="text-lg sm:text-xl"
                                                    data-oid="313ycoo"
                                                >
                                                    {result.author.avatar}
                                                </span>
                                                <div className="min-w-0" data-oid="n8nfu_h">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        data-oid="g54yjel"
                                                    >
                                                        <span
                                                            className="text-sm font-medium text-gray-900"
                                                            data-oid="ua88r2t"
                                                        >
                                                            {result.author.name}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(result.author.level)}`}
                                                            data-oid="l_anzot"
                                                        >
                                                            {result.author.level}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-500"
                                                        data-oid="i.:.ldz"
                                                    >
                                                        게시글 {result.author.posts}개 •{' '}
                                                        {result.createdAt}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <p
                                            className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2"
                                            data-oid="3er5t85"
                                        >
                                            {result.description}
                                        </p>

                                        {/* Course Info */}
                                        <div
                                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm"
                                            data-oid="8minhm-"
                                        >
                                            <div
                                                className="flex items-center text-gray-600"
                                                data-oid="np9:h2c"
                                            >
                                                <Calendar
                                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                    data-oid="46ri4tl"
                                                />

                                                <span data-oid="0c5sdt6">{result.duration}</span>
                                            </div>
                                            <div
                                                className="flex items-center text-gray-600"
                                                data-oid="b.gi-y1"
                                            >
                                                <Users
                                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                    data-oid="5cdjr62"
                                                />

                                                <span data-oid="l55jz2-">
                                                    {result.participants}
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center text-gray-600"
                                                data-oid="mvo6pm5"
                                            >
                                                <MapPin
                                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                    data-oid="itzu917"
                                                />

                                                <span data-oid="itd7fcq">
                                                    {result.places}개 장소
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center text-gray-600"
                                                data-oid="ot8z_z4"
                                            >
                                                <span
                                                    className="font-bold text-blue-600"
                                                    data-oid="z.mlotg"
                                                >
                                                    {result.totalCost}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div
                                            className="flex flex-wrap gap-1 sm:gap-2 mb-4"
                                            data-oid="aac976m"
                                        >
                                            {result.tags.slice(0, 4).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 rounded-md text-xs ${
                                                        result.type === 'ai-course'
                                                            ? 'bg-purple-50 text-purple-600'
                                                            : 'bg-blue-50 text-blue-600'
                                                    }`}
                                                    data-oid="w_ac:5a"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {result.tags.length > 4 && (
                                                <span
                                                    className="text-xs text-gray-500"
                                                    data-oid="pab0hzw"
                                                >
                                                    +{result.tags.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Highlights */}
                                        <div className="mb-4" data-oid="p.1n9hi">
                                            <h4
                                                className="text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                                                data-oid="lno9tu_"
                                            >
                                                주요 명소
                                            </h4>
                                            <div
                                                className="flex flex-wrap gap-1"
                                                data-oid="_4:h-pz"
                                            >
                                                {result.highlights
                                                    .slice(0, 3)
                                                    .map((highlight, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs text-gray-600"
                                                            data-oid="5p51l3-"
                                                        >
                                                            {highlight}
                                                            {index <
                                                                Math.min(
                                                                    result.highlights.length,
                                                                    3,
                                                                ) -
                                                                    1 && ' • '}
                                                        </span>
                                                    ))}
                                                {result.highlights.length > 3 && (
                                                    <span
                                                        className="text-xs text-gray-500"
                                                        data-oid="0qlm2we"
                                                    >
                                                        외 {result.highlights.length - 3}곳
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Info */}
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="f827i2g"
                                        >
                                            <div
                                                className="flex items-center space-x-3 sm:space-x-4"
                                                data-oid="yc2luhg"
                                            >
                                                <div
                                                    className="flex items-center"
                                                    data-oid="aamz2th"
                                                >
                                                    <Star
                                                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                                                        data-oid="n-a:6xi"
                                                    />

                                                    <span
                                                        className="text-xs sm:text-sm font-semibold"
                                                        data-oid="ydg-90s"
                                                    >
                                                        {result.rating}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center text-xs sm:text-sm text-gray-500"
                                                    data-oid="gc6.wry"
                                                >
                                                    <Eye
                                                        className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                        data-oid="pwacq2i"
                                                    />

                                                    <span data-oid="ioc:s9o">
                                                        {result.views || result.likes}
                                                    </span>
                                                </div>
                                                {result.type === 'user-post' && (
                                                    <>
                                                        <div
                                                            className="flex items-center text-xs sm:text-sm text-gray-500"
                                                            data-oid="acmwz.5"
                                                        >
                                                            <ThumbsUp
                                                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                                data-oid="k6zjhsm"
                                                            />

                                                            <span data-oid="2.nvh3c">
                                                                {result.likes}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="flex items-center text-xs sm:text-sm text-gray-500"
                                                            data-oid=".71o5mk"
                                                        >
                                                            <MessageCircle
                                                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                                                                data-oid="7ppvft_"
                                                            />

                                                            <span data-oid="betu9wv">
                                                                {result.comments}
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <button
                                                className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs sm:text-sm"
                                                data-oid="ufdl2r5"
                                            >
                                                상세보기
                                                <ArrowRight
                                                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                                                    data-oid="4_90s0p"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredResults.length === 0 && searchQuery && (
                            <div
                                className="bg-white rounded-2xl p-8 text-center border !border-gray-200"
                                data-oid="l8l2px-"
                            >
                                <Search
                                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                                    data-oid="b69idox"
                                />

                                <h3
                                    className="text-lg font-semibold text-gray-900 mb-2"
                                    data-oid="6exf0:t"
                                >
                                    검색 결과가 없습니다
                                </h3>
                                <p className="text-gray-600 mb-4" data-oid="v..-ugo">
                                    다른 키워드로 검색해보시거나 필터를 조정해보세요.
                                </p>
                                <button
                                    onClick={() => setSelectedFilter('전체')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="r5cfql4"
                                >
                                    필터 초기화
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-4 sm:space-y-6" data-oid="j:izj1l">
                        {/* Search Stats */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="gkcpyyp"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4" data-oid="n4enh0.">
                                검색 통계
                            </h3>
                            <div className="space-y-3 sm:space-y-4" data-oid="o8ib-bi">
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="5q_:a8k"
                                >
                                    <span className="text-sm text-gray-600" data-oid="qift9ny">
                                        총 결과
                                    </span>
                                    <span className="font-bold text-blue-600" data-oid="hh14d8c">
                                        {filteredResults.length}개
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="tox0dw9"
                                >
                                    <span className="text-sm text-gray-600" data-oid="v8xua8y">
                                        AI 추천
                                    </span>
                                    <span className="font-bold text-purple-600" data-oid="c54e00s">
                                        {
                                            filteredResults.filter((r) => r.type === 'ai-course')
                                                .length
                                        }
                                        개
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="e50spgs"
                                >
                                    <span className="text-sm text-gray-600" data-oid="dser80c">
                                        사용자 코스
                                    </span>
                                    <span className="font-bold text-green-600" data-oid="xb033n8">
                                        {
                                            filteredResults.filter((r) => r.type === 'user-post')
                                                .length
                                        }
                                        개
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="5gm69gm"
                                >
                                    <span className="text-sm text-gray-600" data-oid="9:zf.i7">
                                        평균 평점
                                    </span>
                                    <span className="font-bold text-yellow-600" data-oid="162b6rf">
                                        {(
                                            filteredResults.reduce((acc, r) => acc + r.rating, 0) /
                                                filteredResults.length || 0
                                        ).toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Popular Searches */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="pt3-joo"
                        >
                            <h3
                                className="font-semibold text-gray-900 mb-4 flex items-center"
                                data-oid="6hurexh"
                            >
                                <TrendingUp
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2"
                                    data-oid="k3elz0v"
                                />
                                인기 검색어
                            </h3>
                            <div className="space-y-2" data-oid="stvzkd2">
                                {[
                                    '제주도',
                                    '부산',
                                    '서울',
                                    '강릉',
                                    '경주',
                                    '전주',
                                    '여수',
                                    '속초',
                                ].map((keyword, index) => (
                                    <button
                                        key={keyword}
                                        onClick={() => {
                                            setSearchQuery(keyword);
                                            router.push(`/search?q=${encodeURIComponent(keyword)}`);
                                        }}
                                        className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-between"
                                        data-oid="7u2sek:"
                                    >
                                        <span data-oid="nxop8wk">{keyword}</span>
                                        <span className="text-xs text-gray-400" data-oid="1k-m8ak">
                                            {index + 1}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div
                            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
                            data-oid="8l_st6r"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4" data-oid="g5f0d4u">
                                빠른 액션
                            </h3>
                            <div className="space-y-2" data-oid="b9dr_z0">
                                <button
                                    onClick={() => router.push('/courses')}
                                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    data-oid="pynbc4e"
                                >
                                    🤖 AI 추천 코스 보기
                                </button>
                                <button
                                    onClick={() => router.push('/board')}
                                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    data-oid="eruh04q"
                                >
                                    👥 사용자 코스 보기
                                </button>
                                <button
                                    onClick={() => router.push('/board/write')}
                                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    data-oid="3b8zadq"
                                >
                                    ✍️ 내 코스 작성하기
                                </button>
                                <button
                                    onClick={() => router.push('/home2')}
                                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    data-oid="747-.:_"
                                >
                                    🏠 홈으로 돌아가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
