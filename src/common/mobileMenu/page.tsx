'use client';

import {
    Bell,
    Bookmark,
    Bot,
    Calendar,
    Camera,
    ChevronRight,
    FileText,
    Heart,
    HelpCircle,
    Home,
    LogIn,
    LogOut,
    MapPin,
    PenTool,
    Search,
    Settings,
    Shield,
    User,
    UserPlus,
    Users,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 실제로는 auth state에서 가져와야 함

    // 메뉴가 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    const mainMenuItems = [
        {
            icon: <Home className="w-5 h-5" data-oid="31kgmhi" />,
            label: '홈',
            path: '/home2',
            description: '메인 페이지로 이동',
        },
        {
            icon: <Bot className="w-5 h-5" data-oid="tjw-n9h" />,
            label: 'AI 추천 코스',
            path: '/courses',
            description: 'AI가 추천하는 맞춤 여행 코스',
        },
        {
            icon: <Search className="w-5 h-5" data-oid="d8vy340" />,
            label: '검색',
            path: '/search',
            description: '여행 코스 검색하기',
        },
        {
            icon: <Users className="w-5 h-5" data-oid="eqb_lzr" />,
            label: '커뮤니티',
            path: '/board',
            description: '여행자들의 생생한 후기',
        },
        {
            icon: <PenTool className="w-5 h-5" data-oid="af..pn8" />,
            label: '코스 작성',
            path: '/board/write',
            description: '나만의 여행 코스 공유하기',
        },
    ];

    const userMenuItems = isLoggedIn
        ? [
              {
                  icon: <User className="w-5 h-5" data-oid="vm5pxrz" />,
                  label: '내 프로필',
                  path: '/profile',
              },
              {
                  icon: <Heart className="w-5 h-5" data-oid="yuwbq39" />,
                  label: '찜한 코스',
                  path: '/favorites',
              },
              {
                  icon: <Bookmark className="w-5 h-5" data-oid="y82ro5:" />,
                  label: '북마크',
                  path: '/bookmarks',
              },
              {
                  icon: <Calendar className="w-5 h-5" data-oid="g2fg5_5" />,
                  label: '내 여행 계획',
                  path: '/my-trips',
              },
              {
                  icon: <Bell className="w-5 h-5" data-oid="vx9iotj" />,
                  label: '알림',
                  path: '/notifications',
              },
          ]
        : [
              {
                  icon: <LogIn className="w-5 h-5" data-oid="ls4nv20" />,
                  label: '로그인',
                  path: '/login',
              },
              {
                  icon: <UserPlus className="w-5 h-5" data-oid="936s2.s" />,
                  label: '회원가입',
                  path: '/signup',
              },
          ];

    const supportMenuItems = [
        {
            icon: <HelpCircle className="w-5 h-5" data-oid="8n2wdf3" />,
            label: '고객센터',
            path: '/support',
        },
        {
            icon: <FileText className="w-5 h-5" data-oid="198w4rb" />,
            label: '이용가이드',
            path: '/guide',
        },
        {
            icon: <Shield className="w-5 h-5" data-oid="jcl745." />,
            label: '개인정보처리방침',
            path: '/privacy',
        },
        {
            icon: <Settings className="w-5 h-5" data-oid="9hciymv" />,
            label: '설정',
            path: '/settings',
        },
    ];

    const quickActions = [
        {
            icon: <MapPin className="w-4 h-4" data-oid="fvz.ylk" />,
            label: '제주도',
            path: '/search?q=제주도',
            color: 'bg-blue-500',
        },
        {
            icon: <MapPin className="w-4 h-4" data-oid="pw4j-9t" />,
            label: '부산',
            path: '/search?q=부산',
            color: 'bg-green-500',
        },
        {
            icon: <MapPin className="w-4 h-4" data-oid="ups24a1" />,
            label: '서울',
            path: '/search?q=서울',
            color: 'bg-purple-500',
        },
        {
            icon: <Camera className="w-4 h-4" data-oid="x:tqnrk" />,
            label: '포토스팟',
            path: '/search?q=포토스팟',
            color: 'bg-pink-500',
        },
    ];

    if (isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
                data-oid="jon7awx"
            />

            {/* Menu Panel */}
            <div
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50  transform transition-transform duration-300 ease-in-out"
                data-oid="v6wkktq"
            >
                <div className="flex flex-col h-full" data-oid="tqa:vkw">
                    {/* Header */}
                    <div
                        className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
                        data-oid="zb36929"
                    >
                        <div className="flex items-center space-x-3" data-oid="6gqrfm6">
                            <div
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                                data-oid="y-20uhd"
                            >
                                <Bot className="w-5 h-5 text-white" data-oid="vlnpp_-" />
                            </div>
                            <div data-oid="thqs308">
                                <h2 className="text-lg font-bold text-white" data-oid="5lhtfuu">
                                    TripAI
                                </h2>
                                <p className="text-xs text-blue-100" data-oid="iui6j18">
                                    AI 여행 추천
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                            data-oid="oy2p0_v"
                        >
                            <X className="w-5 h-5 text-white" data-oid="kfv5z7b" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto" data-oid="o.l2:wm">
                        {/* User Section */}
                        {isLoggedIn ? (
                            <div
                                className="p-4 bg-gray-50 border-b border-gray-200"
                                data-oid="liztbhq"
                            >
                                <div
                                    className="flex items-center space-x-3 mb-3"
                                    data-oid="dfnlf6u"
                                >
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                                        data-oid="s0f5_2g"
                                    >
                                        <span
                                            className="text-white font-semibold"
                                            data-oid="xn0779u"
                                        >
                                            김
                                        </span>
                                    </div>
                                    <div data-oid="n9guxi9">
                                        <h3
                                            className="font-semibold text-gray-900"
                                            data-oid="psmihuf"
                                        >
                                            김여행님
                                        </h3>
                                        <p className="text-sm text-gray-500" data-oid="q3ghawe">
                                            Gold 멤버
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="grid grid-cols-3 gap-2 text-center"
                                    data-oid="zot6dql"
                                >
                                    <div data-oid="j44uygp">
                                        <div
                                            className="text-lg font-bold text-blue-600"
                                            data-oid="xh06qy0"
                                        >
                                            12
                                        </div>
                                        <div className="text-xs text-gray-500" data-oid="e5vng84">
                                            작성한 코스
                                        </div>
                                    </div>
                                    <div data-oid="ygz5zmp">
                                        <div
                                            className="text-lg font-bold text-green-600"
                                            data-oid="4sr7lf_"
                                        >
                                            45
                                        </div>
                                        <div className="text-xs text-gray-500" data-oid="g5ch0hb">
                                            찜한 코스
                                        </div>
                                    </div>
                                    <div data-oid="hxlbfzf">
                                        <div
                                            className="text-lg font-bold text-purple-600"
                                            data-oid="10iix9p"
                                        >
                                            4.8
                                        </div>
                                        <div className="text-xs text-gray-500" data-oid="9dzg7v3">
                                            평균 평점
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200"
                                data-oid="8q.-vc4"
                            >
                                <div className="text-center" data-oid="qb65jvw">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3"
                                        data-oid="aarzss8"
                                    >
                                        <User className="w-8 h-8 text-white" data-oid="9tx3-a6" />
                                    </div>
                                    <h3
                                        className="font-semibold text-gray-900 mb-1"
                                        data-oid="cn04-_c"
                                    >
                                        로그인하고
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3" data-oid="779ava4">
                                        더 많은 기능을 이용해보세요
                                    </p>
                                    <div className="flex space-x-2" data-oid="zen4tg1">
                                        <button
                                            onClick={() => handleNavigation('/login')}
                                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium"
                                            data-oid="zn-s7nh"
                                        >
                                            로그인
                                        </button>
                                        <button
                                            onClick={() => handleNavigation('/signup')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium"
                                            data-oid="f00mo9-"
                                        >
                                            회원가입
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="p-4 border-b border-gray-200" data-oid="dne9qve">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                                data-oid="ftzall-"
                            >
                                인기 검색어
                            </h4>
                            <div className="grid grid-cols-2 gap-2" data-oid="is_mnt8">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(action.path)}
                                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                        data-oid=".ce28l-"
                                    >
                                        <div
                                            className={`w-6 h-6 ${action.color} rounded-md flex items-center justify-center text-white`}
                                            data-oid="j7c3e_g"
                                        >
                                            {action.icon}
                                        </div>
                                        <span
                                            className="text-sm font-medium text-gray-700"
                                            data-oid="1yncm07"
                                        >
                                            {action.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Menu */}
                        <div className="p-4 border-b border-gray-200" data-oid="2j6jou4">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                                data-oid="ezl6yw6"
                            >
                                메인 메뉴
                            </h4>
                            <div className="space-y-1" data-oid="13pnoj2">
                                {mainMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        data-oid="8rdc7e:"
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                            data-oid="potn24n"
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                                data-oid="-70pd:0"
                                            >
                                                {item.icon}
                                            </div>
                                            <div className="text-left" data-oid="3c4pbp_">
                                                <div
                                                    className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                                    data-oid="m2q_.tu"
                                                >
                                                    {item.label}
                                                </div>
                                                <div
                                                    className="text-xs text-gray-500"
                                                    data-oid=":nsg-aq"
                                                >
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                            data-oid="ar_qn.i"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="p-4 border-b border-gray-200" data-oid="qs8c26i">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                                data-oid="cwz6t5m"
                            >
                                {isLoggedIn ? '내 계정' : '계정'}
                            </h4>
                            <div className="space-y-1" data-oid=".09oe0s">
                                {userMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        data-oid="qrt_y--"
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                            data-oid="ddb8y0d"
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                                data-oid="nm9bmfa"
                                            >
                                                {item.icon}
                                            </div>
                                            <span
                                                className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                                data-oid="w6vh1ol"
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                            data-oid="x.x_tgi"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Support Menu */}
                        <div className="p-4" data-oid="rxhhqac">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                                data-oid="mznof88"
                            >
                                고객지원
                            </h4>
                            <div className="space-y-1" data-oid="04-zhhy">
                                {supportMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        data-oid="l:9o.5y"
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                            data-oid="0:aliyk"
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                                data-oid="pa3x_4a"
                                            >
                                                {item.icon}
                                            </div>
                                            <span
                                                className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                                data-oid="dm90lxn"
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                            data-oid="42mnmog"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Logout Button (if logged in) */}
                        {isLoggedIn && (
                            <div className="p-4 border-t border-gray-200" data-oid="l5z.d9w">
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(false);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                    data-oid="1.rx3fu"
                                >
                                    <LogOut className="w-4 h-4" data-oid="ux6p0-7" />
                                    <span className="font-medium" data-oid=".o63w34">
                                        로그아웃
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50" data-oid="gpft005">
                        <div className="text-center" data-oid="ojx5-_y">
                            <p className="text-xs text-gray-500 mb-1" data-oid="3h.ltyi">
                                TripAI v1.0.0
                            </p>
                            <p className="text-xs text-gray-400" data-oid="3w4yhja">
                                © 2024 TripAI. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
