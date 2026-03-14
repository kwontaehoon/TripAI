'use client';

import {
    ArrowUp,
    Bot,
    Facebook,
    FileText,
    Github,
    Globe,
    Heart,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Shield,
    Star,
    Twitter,
    Users,
    Youtube,
    Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        services: [
            {
                name: 'AI 여행 추천',
                href: '/courses',
                icon: <Bot className="w-4 h-4" />,
            },
            {
                name: '여행 코스 검색',
                href: '/search',
                icon: <MapPin className="w-4 h-4" />,
            },
            {
                name: '커뮤니티',
                href: '/board',
                icon: <Users className="w-4 h-4" />,
            },
            {
                name: '코스 작성',
                href: '/board/write',
                icon: <FileText className="w-4 h-4" />,
            },
        ],

        company: [
            { name: '프로젝트 소개', href: '/about' }
        ],

        support: [
            { name: '고객센터', href: '/support' },
            { name: 'FAQ', href: '/faq' },
            { name: '이용가이드', href: '/guide' },
            // { name: '버그 신고', href: '/bug-report' }
        ],

        legal: [
            { name: '이용약관', href: '/terms' },
            { name: '개인정보처리방침', href: '/privacy' }
        ],
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            href: 'https://facebook.com',
        },
        {
            name: 'Twitter',
            icon: <Twitter className="w-5 h-5" />,
            href: 'https://twitter.com',
        },
        {
            name: 'Instagram',
            icon: <Instagram className="w-5 h-5" />,
            href: 'https://instagram.com',
        },
        {
            name: 'Youtube',
            icon: <Youtube className="w-5 h-5" />,
            href: 'https://youtube.com',
        },
        {
            name: 'Github',
            icon: <Github className="w-5 h-5" />,
            href: 'https://github.com',
        },
    ];

    const stats = [
        {
            label: 'AI 추천 코스',
            value: '10,000+',
            icon: <Bot className="w-5 h-5" />,
        },
        {
            label: '사용자 코스',
            value: '25,000+',
            icon: <Users className="w-5 h-5" />,
        },
        { label: '만족도', value: '4.9/5', icon: <Star className="w-5 h-5" /> },
        {
            label: '월 활성 사용자',
            value: '100K+',
            icon: <Zap className="w-5 h-5" />,
        },
    ];

    return (
        <footer className="bg-gray-900 text-white relative">
            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="맨 위로 이동"
               
            >
                <ArrowUp className="w-5 h-5" />
            </button>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Top Section */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
                   
                >
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                               
                            >
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">
                                    TripAI
                                </h3>
                                <p className="text-sm text-gray-400">
                                    AI 여행 추천 서비스
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            AI 기술로 당신만의 완벽한 여행 코스를 추천해드립니다. 개인 맞춤형 여행
                            계획부터 실제 여행자들의 생생한 후기까지, 모든 여행 정보를 한 곳에서
                            만나보세요.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                               
                            >
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>gju04195@gmail.com</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                               
                            >
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>1588-1234</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                               
                            >
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>서울특별시 강남구 테헤란로 123</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {/* Services */}
                            <div>
                                <h4
                                    className="text-lg font-semibold mb-4 text-blue-400"
                                   
                                >
                                    서비스
                                </h4>
                                <ul className="space-y-3">
                                    {footerLinks.services.map((link, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                                               
                                            >
                                                <span
                                                    className="text-blue-400 group-hover:text-blue-300 transition-colors"
                                                   
                                                >
                                                    {link.icon}
                                                </span>
                                                <span className="text-sm">
                                                    {link.name}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h4
                                    className="text-lg font-semibold mb-4 text-green-400"
                                   
                                >
                                    프로젝트
                                </h4>
                                <ul className="space-y-3">
                                    {footerLinks.company.map((link, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                               
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4
                                    className="text-lg font-semibold mb-4 text-yellow-400"
                                   
                                >
                                    고객지원
                                </h4>
                                <ul className="space-y-3">
                                    {footerLinks.support.map((link, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                               
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4
                                    className="text-lg font-semibold mb-4 text-purple-400"
                                   
                                >
                                    법적 고지
                                </h4>
                                <ul className="space-y-3">
                                    {footerLinks.legal.map((link, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                               
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="border-t !border-gray-800 pt-8 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className="flex items-center justify-center mb-2"
                                   
                                >
                                    <div className="text-blue-400">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div
                                    className="text-2xl font-bold text-white mb-1"
                                   
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t !border-gray-800 pt-8 mb-8">
                    <div className="max-w-md mx-auto text-center">
                        <h4 className="text-lg font-semibold mb-2">
                            뉴스레터 구독
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            최신 여행 정보와 특별 혜택을 가장 먼저 받아보세요
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="이메일 주소를 입력하세요"
                                className="flex-1 px-4 py-2 bg-gray-800 border !border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                               
                            />

                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                               
                            >
                                구독하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links & Bottom Section */}
                <div className="border-t !border-gray-800 pt-8">
                    <div
                        className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                       
                    >
                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-400 mr-2">
                                팔로우하기:
                            </span>
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                                    aria-label={social.name}
                                   
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Language & Region */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                               
                            >
                                <Globe className="w-4 h-4" />
                                <span className="text-sm">
                                    한국어
                                </span>
                            </button>
                            <div className="w-px h-4 bg-gray-700"></div>
                            <button
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                               
                            >
                                <Shield className="w-4 h-4" />
                                <span className="text-sm">
                                    보안
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div
                        className="mt-8 pt-8 border-t !border-gray-800 text-center"
                       
                    >
                        <div
                            className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"
                           
                        >
                            <p className="text-sm text-gray-400">
                                © {currentYear} TripAI. All rights reserved.
                            </p>
                            <div
                                className="flex items-center space-x-1 text-sm text-gray-400"
                               
                            >
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500" />
                                <span>in Seoul, Korea</span>
                            </div>
                        </div>

                        {/* Additional Legal Info */}
                        <div className="mt-4 text-xs text-gray-500 space-y-1">
                            <p>
                                사업자등록번호: 123-45-67890 | 통신판매업신고번호:
                                2024-서울강남-1234
                            </p>
                            <p>
                                대표이사: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123, 456호
                            </p>
                            <p>
                                고객센터: 1588-1234 (평일 09:00~18:00, 주말 및 공휴일 휴무)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile-specific bottom padding */}
            <div className="h-4 md:h-0"></div>
        </footer>
    );
}
