'use client';

import Footer from '@/common/footer/page';
import {
    ArrowRight,
    BookOpen,
    Bot,
    CheckCircle,
    HelpCircle,
    Info,
    Play,
    Search,
    Sparkles,
    Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GuidePage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        {
            id: 'getting-started',
            title: '시작하기',
            icon: <Play className="w-5 h-5" data-oid="db:uzqa" />,
        },
        {
            id: 'search-guide',
            title: '검색 가이드',
            icon: <Search className="w-5 h-5" data-oid="ml0jafn" />,
        },
        {
            id: 'ai-features',
            title: 'AI 기능',
            icon: <Bot className="w-5 h-5" data-oid="-d4d670" />,
        },
        {
            id: 'community',
            title: '커뮤니티',
            icon: <Users className="w-5 h-5" data-oid="dqys18s" />,
        },
        {
            id: 'tips',
            title: '활용 팁',
            icon: <Sparkles className="w-5 h-5" data-oid="wfrgwkm" />,
        },
    ];

    const guideContent = {
        'getting-started': {
            title: 'TripAI 시작하기',
            content: [
                {
                    step: '1',
                    title: '회원가입 및 로그인',
                    description: '우상단의 회원가입 버튼을 클릭하여 계정을 생성하세요.',
                    tips: ['소셜 로그인도 지원합니다', '이메일 인증을 완료해주세요'],
                },
                {
                    step: '2',
                    title: '프로필 설정',
                    description: '여행 취향과 관심사를 설정하여 더 정확한 추천을 받으세요.',
                    tips: ['선호하는 여행 스타일을 선택하세요', '관심 지역을 등록해보세요'],
                },
                {
                    step: '3',
                    title: '첫 번째 여행 계획',
                    description: '메인 페이지에서 원하는 여행지를 검색해보세요.',
                    tips: ['구체적인 키워드를 사용하면 더 좋은 결과를 얻을 수 있습니다'],
                },
            ],
        },
        'search-guide': {
            title: '효과적인 검색 방법',
            content: [
                {
                    step: '1',
                    title: '키워드 검색',
                    description: '지역명, 여행 테마, 기간 등을 조합하여 검색하세요.',
                    tips: [
                        '예: "제주도 3박4일 가족여행"',
                        '예: "서울 데이트 코스"',
                        '예: "부산 맛집 투어"',
                    ],
                },
                {
                    step: '2',
                    title: '음성 검색',
                    description: '마이크 버튼을 눌러 음성으로 검색할 수 있습니다.',
                    tips: ['조용한 환경에서 사용하세요', '명확하게 발음해주세요'],
                },
                {
                    step: '3',
                    title: '필터 활용',
                    description: '검색 결과를 세부 조건으로 필터링하여 원하는 코스를 찾으세요.',
                    tips: ['예산, 기간, 테마별로 필터링 가능합니다'],
                },
            ],
        },
        'ai-features': {
            title: 'AI 맞춤 추천 기능',
            content: [
                {
                    step: '1',
                    title: 'AI 맞춤 코스',
                    description: '개인의 취향과 여행 이력을 분석하여 최적의 코스를 추천합니다.',
                    tips: ['더 많은 데이터를 제공할수록 정확한 추천을 받을 수 있습니다'],
                },
                {
                    step: '2',
                    title: '실시간 추천',
                    description: '현재 날씨, 계절, 이벤트 정보를 반영한 실시간 추천을 제공합니다.',
                    tips: ['여행 당일에도 실시간 정보를 확인해보세요'],
                },
                {
                    step: '3',
                    title: '코스 최적화',
                    description: '이동 경로와 시간을 고려하여 효율적인 코스를 제안합니다.',
                    tips: ['교통수단을 선택하면 더 정확한 최적화가 가능합니다'],
                },
            ],
        },
        community: {
            title: '커뮤니티 활용하기',
            content: [
                {
                    step: '1',
                    title: '여행 후기 작성',
                    description: '다녀온 여행의 생생한 후기를 공유해보세요.',
                    tips: ['사진과 함께 올리면 더 많은 관심을 받을 수 있습니다'],
                },
                {
                    step: '2',
                    title: '질문하기',
                    description: '여행 계획 중 궁금한 점을 커뮤니티에 질문해보세요.',
                    tips: ['구체적인 질문일수록 더 좋은 답변을 받을 수 있습니다'],
                },
                {
                    step: '3',
                    title: '다른 여행자와 소통',
                    description: '비슷한 관심사를 가진 여행자들과 정보를 교환하세요.',
                    tips: ['댓글과 좋아요로 활발하게 소통해보세요'],
                },
            ],
        },
        tips: {
            title: '활용 팁 & 노하우',
            content: [
                {
                    step: '1',
                    title: '즐겨찾기 활용',
                    description: '마음에 드는 코스는 즐겨찾기에 저장하여 나중에 쉽게 찾아보세요.',
                    tips: ['카테고리별로 정리하면 더 편리합니다'],
                },
                {
                    step: '2',
                    title: '일정 공유',
                    description: '계획한 여행 일정을 동행자들과 공유할 수 있습니다.',
                    tips: ['링크 공유 기능을 활용해보세요'],
                },
                {
                    step: '3',
                    title: '오프라인 저장',
                    description: '여행지에서 인터넷이 불안정할 때를 대비해 코스를 미리 저장하세요.',
                    tips: ['중요한 정보는 스크린샷으로도 저장해두세요'],
                },
            ],
        },
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
            data-oid="m6o6upg"
        >

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-24" data-oid="3uh8l6k">
                {/* Page Header */}
                <div className="text-center mb-12" data-oid="4z_bpod">
                    <div
                        className="flex items-center justify-center space-x-2 mb-4"
                        data-oid=".57y9_l"
                    >
                        <BookOpen className="w-8 h-8 text-blue-600" data-oid="9yzpojq" />
                        <h1 className="text-3xl font-bold text-gray-900" data-oid="8yge9fb">
                            이용가이드
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="jac5eia">
                        TripAI를 더 효과적으로 활용하는 방법을 알아보세요. 단계별 가이드를 통해
                        완벽한 여행 계획을 세워보세요.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8" data-oid="pqs4q20">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1" data-oid="ga:7ws3">
                        <div
                            className="bg-white rounded-2xl p-6 border !border-gray-200 sticky top-24"
                            data-oid="9hrk304"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4" data-oid="rjou5pw">
                                가이드 목차
                            </h3>
                            <nav className="space-y-2" data-oid="y3klx:l">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                            activeSection === section.id
                                                ? 'bg-blue-50 text-blue-600 border !border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                        data-oid="l77mh0k"
                                    >
                                        {section.icon}
                                        <span className="text-sm font-medium" data-oid="crrck21">
                                            {section.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3" data-oid="f_oso9i">
                        <div
                            className="bg-white rounded-2xl p-8 border !border-gray-200"
                            data-oid="c6lh1zl"
                        >
                            <h2
                                className="text-2xl font-bold text-gray-900 mb-6"
                                data-oid="277jsmm"
                            >
                                {guideContent[activeSection].title}
                            </h2>

                            <div className="space-y-8" data-oid="aeqcmuj">
                                {guideContent[activeSection].content.map((item, index) => (
                                    <div key={index} className="relative" data-oid="a10cgmy">
                                        <div
                                            className="flex items-start space-x-4"
                                            data-oid="w_try1x"
                                        >
                                            <div className="flex-shrink-0" data-oid="-pi55p3">
                                                <div
                                                    className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                    data-oid="wt:1:2d"
                                                >
                                                    {item.step}
                                                </div>
                                            </div>
                                            <div className="flex-1" data-oid="f75dzhy">
                                                <h3
                                                    className="text-lg font-semibold text-gray-900 mb-2"
                                                    data-oid="15.l:3k"
                                                >
                                                    {item.title}
                                                </h3>
                                                <p
                                                    className="text-gray-600 mb-4"
                                                    data-oid="bn.vz-r"
                                                >
                                                    {item.description}
                                                </p>

                                                {item.tips && (
                                                    <div
                                                        className="bg-blue-50 rounded-lg p-4"
                                                        data-oid="8w42lc-"
                                                    >
                                                        <div
                                                            className="flex items-center space-x-2 mb-2"
                                                            data-oid="1skr9s0"
                                                        >
                                                            <Info
                                                                className="w-4 h-4 text-blue-600"
                                                                data-oid="io0o.6u"
                                                            />

                                                            <span
                                                                className="text-sm font-medium text-blue-900"
                                                                data-oid="3tc1x2s"
                                                            >
                                                                유용한 팁
                                                            </span>
                                                        </div>
                                                        <ul
                                                            className="space-y-1"
                                                            data-oid="1u.bp7i"
                                                        >
                                                            {item.tips.map((tip, tipIndex) => (
                                                                <li
                                                                    key={tipIndex}
                                                                    className="text-sm text-blue-800 flex items-start space-x-2"
                                                                    data-oid="mh4q3-y"
                                                                >
                                                                    <CheckCircle
                                                                        className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0"
                                                                        data-oid="dkn3xj:"
                                                                    />

                                                                    <span data-oid=":nvz2as">
                                                                        {tip}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {index < guideContent[activeSection].content.length - 1 && (
                                            <div
                                                className="absolute left-4 top-8 w-px h-8 bg-gray-200"
                                                data-oid="0pkttsn"
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <div
                                className="flex justify-between items-center mt-12 pt-8 border-t !border-gray-200"
                                data-oid="40lvuq_"
                            >
                                <button
                                    onClick={() => {
                                        const currentIndex = sections.findIndex(
                                            (s) => s.id === activeSection,
                                        );
                                        if (currentIndex > 0) {
                                            setActiveSection(sections[currentIndex - 1].id);
                                        }
                                    }}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        sections.findIndex((s) => s.id === activeSection) === 0
                                    }
                                    data-oid="gjv9.51"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" data-oid="5sob3kv" />
                                    <span data-oid="k13aq01">이전</span>
                                </button>

                                <button
                                    onClick={() => {
                                        const currentIndex = sections.findIndex(
                                            (s) => s.id === activeSection,
                                        );
                                        if (currentIndex < sections.length - 1) {
                                            setActiveSection(sections[currentIndex + 1].id);
                                        }
                                    }}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        sections.findIndex((s) => s.id === activeSection) ===
                                        sections.length - 1
                                    }
                                    data-oid="_kd79wh"
                                >
                                    <span data-oid="be_ig4r">다음</span>
                                    <ArrowRight className="w-4 h-4" data-oid="t-:fsm." />
                                </button>
                            </div>
                        </div>

                        {/* Quick Help Section */}
                        <div
                            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
                            data-oid="r5_:lbj"
                        >
                            <div className="flex items-center space-x-3 mb-4" data-oid="k88uqax">
                                <HelpCircle className="w-6 h-6" data-oid="5wb5i2r" />
                                <h3 className="text-lg font-semibold" data-oid=":xcvws7">
                                    추가 도움이 필요하신가요?
                                </h3>
                            </div>
                            <p className="text-blue-100 mb-4" data-oid="ynx2l.y">
                                가이드를 읽어도 해결되지 않는 문제가 있다면 언제든 문의해주세요.
                            </p>
                            <div className="flex flex-wrap gap-3" data-oid="iyjt..4">
                                <button
                                    onClick={() => router.push('/faq')}
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                                    data-oid="36amo8j"
                                >
                                    FAQ 보기
                                </button>
                                <button
                                    onClick={() => router.push('/support')}
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                                    data-oid="i1tn_q5"
                                >
                                    고객센터
                                </button>
                                <button
                                    onClick={() => router.push('/bug-report')}
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                                    data-oid="5vy_3tf"
                                >
                                    버그 신고
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer data-oid="9-fbrfe" />
        </div>
    );
}
