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
            icon: <Home className="w-5 h-5" />,
            label: '홈',
            path: '/home2',
            description: '메인 페이지로 이동',
        },
        {
            icon: <Bot className="w-5 h-5" />,
            label: 'AI 추천 코스',
            path: '/courses',
            description: 'AI가 추천하는 맞춤 여행 코스',
        },
        {
            icon: <Search className="w-5 h-5" />,
            label: '검색',
            path: '/search',
            description: '여행 코스 검색하기',
        },
        {
            icon: <Users className="w-5 h-5" />,
            label: '커뮤니티',
            path: '/board',
            description: '여행자들의 생생한 후기',
        },
        {
            icon: <PenTool className="w-5 h-5" />,
            label: '코스 작성',
            path: '/board/write',
            description: '나만의 여행 코스 공유하기',
        },
    ];

    const userMenuItems = isLoggedIn
        ? [
              {
                  icon: <User className="w-5 h-5" />,
                  label: '내 프로필',
                  path: '/profile',
              },
              {
                  icon: <Heart className="w-5 h-5" />,
                  label: '찜한 코스',
                  path: '/favorites',
              },
              {
                  icon: <Bookmark className="w-5 h-5" />,
                  label: '북마크',
                  path: '/bookmarks',
              },
              {
                  icon: <Calendar className="w-5 h-5" />,
                  label: '내 여행 계획',
                  path: '/my-trips',
              },
              {
                  icon: <Bell className="w-5 h-5" />,
                  label: '알림',
                  path: '/notifications',
              },
          ]
        : [
              {
                  icon: <LogIn className="w-5 h-5" />,
                  label: '로그인',
                  path: '/login',
              },
              {
                  icon: <UserPlus className="w-5 h-5" />,
                  label: '회원가입',
                  path: '/signup',
              },
          ];

    const supportMenuItems = [
        {
            icon: <HelpCircle className="w-5 h-5" />,
            label: '고객센터',
            path: '/support',
        },
        {
            icon: <FileText className="w-5 h-5" />,
            label: '이용가이드',
            path: '/guide',
        },
        {
            icon: <Shield className="w-5 h-5" />,
            label: '개인정보처리방침',
            path: '/privacy',
        },
        {
            icon: <Settings className="w-5 h-5" />,
            label: '설정',
            path: '/settings',
        },
    ];

    const quickActions = [
        {
            icon: <MapPin className="w-4 h-4" />,
            label: '제주도',
            path: '/search?q=제주도',
            color: 'bg-blue-500',
        },
        {
            icon: <MapPin className="w-4 h-4" />,
            label: '부산',
            path: '/search?q=부산',
            color: 'bg-green-500',
        },
        {
            icon: <MapPin className="w-4 h-4" />,
            label: '서울',
            path: '/search?q=서울',
            color: 'bg-purple-500',
        },
        {
            icon: <Camera className="w-4 h-4" />,
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
               
            />

            {/* Menu Panel */}
            <div
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50  transform transition-transform duration-300 ease-in-out"
               
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div
                        className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
                       
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                               
                            >
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    TripAI
                                </h2>
                                <p className="text-xs text-blue-100">
                                    AI 여행 추천
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                           
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* User Section */}
                        {isLoggedIn ? (
                            <div
                                className="p-4 bg-gray-50 border-b border-gray-200"
                               
                            >
                                <div
                                    className="flex items-center space-x-3 mb-3"
                                   
                                >
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                                       
                                    >
                                        <span
                                            className="text-white font-semibold"
                                           
                                        >
                                            김
                                        </span>
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold text-gray-900"
                                           
                                        >
                                            김여행님
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Gold 멤버
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="grid grid-cols-3 gap-2 text-center"
                                   
                                >
                                    <div>
                                        <div
                                            className="text-lg font-bold text-blue-600"
                                           
                                        >
                                            12
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            작성한 코스
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="text-lg font-bold text-green-600"
                                           
                                        >
                                            45
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            찜한 코스
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="text-lg font-bold text-purple-600"
                                           
                                        >
                                            4.8
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            평균 평점
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200"
                               
                            >
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3"
                                       
                                    >
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <h3
                                        className="font-semibold text-gray-900 mb-1"
                                       
                                    >
                                        로그인하고
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        더 많은 기능을 이용해보세요
                                    </p>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleNavigation('/login')}
                                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium"
                                           
                                        >
                                            로그인
                                        </button>
                                        <button
                                            onClick={() => handleNavigation('/signup')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium"
                                           
                                        >
                                            회원가입
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="p-4 border-b border-gray-200">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                               
                            >
                                인기 검색어
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(action.path)}
                                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                       
                                    >
                                        <div
                                            className={`w-6 h-6 ${action.color} rounded-md flex items-center justify-center text-white`}
                                           
                                        >
                                            {action.icon}
                                        </div>
                                        <span
                                            className="text-sm font-medium text-gray-700"
                                           
                                        >
                                            {action.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Menu */}
                        <div className="p-4 border-b border-gray-200">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                               
                            >
                                메인 메뉴
                            </h4>
                            <div className="space-y-1">
                                {mainMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                       
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                           
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                               
                                            >
                                                {item.icon}
                                            </div>
                                            <div className="text-left">
                                                <div
                                                    className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                                   
                                                >
                                                    {item.label}
                                                </div>
                                                <div
                                                    className="text-xs text-gray-500"
                                                   
                                                >
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                           
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="p-4 border-b border-gray-200">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                               
                            >
                                {isLoggedIn ? '내 계정' : '계정'}
                            </h4>
                            <div className="space-y-1">
                                {userMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                       
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                           
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                               
                                            >
                                                {item.icon}
                                            </div>
                                            <span
                                                className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                               
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                           
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Support Menu */}
                        <div className="p-4">
                            <h4
                                className="text-sm font-semibold text-gray-900 mb-3"
                               
                            >
                                고객지원
                            </h4>
                            <div className="space-y-1">
                                {supportMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                       
                                    >
                                        <div
                                            className="flex items-center space-x-3"
                                           
                                        >
                                            <div
                                                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                                               
                                            >
                                                {item.icon}
                                            </div>
                                            <span
                                                className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                                               
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                           
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Logout Button (if logged in) */}
                        {isLoggedIn && (
                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(false);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                   
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">
                                        로그아웃
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">
                                TripAI v1.0.0
                            </p>
                            <p className="text-xs text-gray-400">
                                © 2024 TripAI. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
