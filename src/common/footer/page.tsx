'use client';

import { useRouter } from 'next/navigation';
import {
    Bot,
    MapPin,
    Mail,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Github,
    ArrowUp,
    Heart,
    Globe,
    Shield,
    HelpCircle,
    FileText,
    Users,
    Zap,
    Star,
} from 'lucide-react';

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
                icon: <Bot className="w-4 h-4" data-oid="shkq_ha" />,
            },
            {
                name: '여행 코스 검색',
                href: '/search',
                icon: <MapPin className="w-4 h-4" data-oid="958:m99" />,
            },
            {
                name: '커뮤니티',
                href: '/board',
                icon: <Users className="w-4 h-4" data-oid="wkmuiou" />,
            },
            {
                name: '코스 작성',
                href: '/board/write',
                icon: <FileText className="w-4 h-4" data-oid="dfmgz1k" />,
            },
        ],

        company: [
            { name: '프로젝트 소개', href: '/about' }
        ],

        support: [
            { name: '고객센터', href: '/support' },
            { name: 'FAQ', href: '/faq' },
            { name: '이용가이드', href: '/guide' },
            { name: '버그 신고', href: '/bug-report' }
        ],

        legal: [
            { name: '이용약관', href: '/terms' },
            { name: '개인정보처리방침', href: '/privacy' }
        ],
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" data-oid="o19zu5e" />,
            href: 'https://facebook.com',
        },
        {
            name: 'Twitter',
            icon: <Twitter className="w-5 h-5" data-oid="sz9y9l5" />,
            href: 'https://twitter.com',
        },
        {
            name: 'Instagram',
            icon: <Instagram className="w-5 h-5" data-oid="2-6bec9" />,
            href: 'https://instagram.com',
        },
        {
            name: 'Youtube',
            icon: <Youtube className="w-5 h-5" data-oid="yu-f4yp" />,
            href: 'https://youtube.com',
        },
        {
            name: 'Github',
            icon: <Github className="w-5 h-5" data-oid="_4c0gqv" />,
            href: 'https://github.com',
        },
    ];

    const stats = [
        {
            label: 'AI 추천 코스',
            value: '10,000+',
            icon: <Bot className="w-5 h-5" data-oid=".qke779" />,
        },
        {
            label: '사용자 코스',
            value: '25,000+',
            icon: <Users className="w-5 h-5" data-oid="e-or9b4" />,
        },
        { label: '만족도', value: '4.9/5', icon: <Star className="w-5 h-5" data-oid="7o_cap0" /> },
        {
            label: '월 활성 사용자',
            value: '100K+',
            icon: <Zap className="w-5 h-5" data-oid="_00593z" />,
        },
    ];

    return (
        <footer className="bg-gray-900 text-white relative" data-oid="0:5tmmz">
            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="맨 위로 이동"
                data-oid="rdn1x3p"
            >
                <ArrowUp className="w-5 h-5" data-oid="ygygvno" />
            </button>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8" data-oid="rm4s70i">
                {/* Top Section */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
                    data-oid="4a7c66d"
                >
                    {/* Brand Section */}
                    <div className="lg:col-span-1" data-oid="oly.4hz">
                        <div className="flex items-center space-x-3 mb-6" data-oid="vl5-huy">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                                data-oid="zao44s_"
                            >
                                <Bot className="w-6 h-6 text-white" data-oid="1wwwyil" />
                            </div>
                            <div data-oid=".10rlkh">
                                <h3 className="text-2xl font-bold" data-oid="jkffbqk">
                                    TripAI
                                </h3>
                                <p className="text-sm text-gray-400" data-oid=":8j8:yn">
                                    AI 여행 추천 서비스
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed" data-oid="u_3xiyj">
                            AI 기술로 당신만의 완벽한 여행 코스를 추천해드립니다. 개인 맞춤형 여행
                            계획부터 실제 여행자들의 생생한 후기까지, 모든 여행 정보를 한 곳에서
                            만나보세요.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3" data-oid="c8rabmf">
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                                data-oid="i3n45:a"
                            >
                                <Mail className="w-4 h-4 text-blue-400" data-oid="nej9w6f" />
                                <span data-oid="2c.0:_5">contact@tripai.com</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                                data-oid="9s.frjm"
                            >
                                <Phone className="w-4 h-4 text-blue-400" data-oid="5uiynz2" />
                                <span data-oid="rbv57ll">1588-1234</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 text-sm text-gray-300"
                                data-oid="._rmsfx"
                            >
                                <MapPin className="w-4 h-4 text-blue-400" data-oid="2fpixhs" />
                                <span data-oid="kwciub0">서울특별시 강남구 테헤란로 123</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-3" data-oid="o8foik1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-oid="_bz8zpo">
                            {/* Services */}
                            <div data-oid="yub8caq">
                                <h4
                                    className="text-lg font-semibold mb-4 text-blue-400"
                                    data-oid="..gsfxq"
                                >
                                    서비스
                                </h4>
                                <ul className="space-y-3" data-oid="kwpish6">
                                    {footerLinks.services.map((link, index) => (
                                        <li key={index} data-oid="1:1mjjh">
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                                                data-oid="jowta6j"
                                            >
                                                <span
                                                    className="text-blue-400 group-hover:text-blue-300 transition-colors"
                                                    data-oid="9:yy8_e"
                                                >
                                                    {link.icon}
                                                </span>
                                                <span className="text-sm" data-oid="vo5nqkc">
                                                    {link.name}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div data-oid="utgove8">
                                <h4
                                    className="text-lg font-semibold mb-4 text-green-400"
                                    data-oid=".c-kqwc"
                                >
                                    프로젝트
                                </h4>
                                <ul className="space-y-3" data-oid="1qofhgq">
                                    {footerLinks.company.map((link, index) => (
                                        <li key={index} data-oid="v6z0gdd">
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                                data-oid="nvhg316"
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div data-oid="w3a3mp-">
                                <h4
                                    className="text-lg font-semibold mb-4 text-yellow-400"
                                    data-oid="46t3q1z"
                                >
                                    고객지원
                                </h4>
                                <ul className="space-y-3" data-oid="k:qdvpo">
                                    {footerLinks.support.map((link, index) => (
                                        <li key={index} data-oid="rk355.c">
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                                data-oid="i5qmw_f"
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div data-oid="yni07re">
                                <h4
                                    className="text-lg font-semibold mb-4 text-purple-400"
                                    data-oid="3b0vchf"
                                >
                                    법적 고지
                                </h4>
                                <ul className="space-y-3" data-oid="diix4y.">
                                    {footerLinks.legal.map((link, index) => (
                                        <li key={index} data-oid="tofpqot">
                                            <button
                                                onClick={() => router.push(link.href)}
                                                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                                data-oid="fr8h01l"
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
                <div className="border-t !border-gray-800 pt-8 mb-8" data-oid="-3vu43u">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid=":po_w7q">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center" data-oid="1r9g1d_">
                                <div
                                    className="flex items-center justify-center mb-2"
                                    data-oid="z85jke0"
                                >
                                    <div className="text-blue-400" data-oid=".:xy7ye">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div
                                    className="text-2xl font-bold text-white mb-1"
                                    data-oid="ic3oaff"
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400" data-oid="-0af4en">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t !border-gray-800 pt-8 mb-8" data-oid="mi-m208">
                    <div className="max-w-md mx-auto text-center" data-oid="d.rsyw_">
                        <h4 className="text-lg font-semibold mb-2" data-oid="pvw3grj">
                            뉴스레터 구독
                        </h4>
                        <p className="text-gray-400 text-sm mb-4" data-oid="ltcig9g">
                            최신 여행 정보와 특별 혜택을 가장 먼저 받아보세요
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3" data-oid="z1ls73b">
                            <input
                                type="email"
                                placeholder="이메일 주소를 입력하세요"
                                className="flex-1 px-4 py-2 bg-gray-800 border !border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                data-oid="lw:52q3"
                            />

                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                                data-oid=".zlyqbd"
                            >
                                구독하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links & Bottom Section */}
                <div className="border-t !border-gray-800 pt-8" data-oid="_uoj9m7">
                    <div
                        className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                        data-oid="pnzgg6b"
                    >
                        {/* Social Links */}
                        <div className="flex items-center space-x-4" data-oid="v.368pl">
                            <span className="text-sm text-gray-400 mr-2" data-oid="h7orfel">
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
                                    data-oid="b5.r_76"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Language & Region */}
                        <div className="flex items-center space-x-4" data-oid="qr9c634">
                            <button
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                                data-oid="kw4w:dk"
                            >
                                <Globe className="w-4 h-4" data-oid="xzebeqj" />
                                <span className="text-sm" data-oid="ojhb4x0">
                                    한국어
                                </span>
                            </button>
                            <div className="w-px h-4 bg-gray-700" data-oid="95696fc"></div>
                            <button
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                                data-oid="jda0vx4"
                            >
                                <Shield className="w-4 h-4" data-oid="5eqveun" />
                                <span className="text-sm" data-oid="40i9onq">
                                    보안
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div
                        className="mt-8 pt-8 border-t !border-gray-800 text-center"
                        data-oid="8n.cf3t"
                    >
                        <div
                            className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"
                            data-oid="oqzk-51"
                        >
                            <p className="text-sm text-gray-400" data-oid="9b6:kdt">
                                © {currentYear} TripAI. All rights reserved.
                            </p>
                            <div
                                className="flex items-center space-x-1 text-sm text-gray-400"
                                data-oid="n.3517m"
                            >
                                <span data-oid="fgmi4y9">Made with</span>
                                <Heart className="w-4 h-4 text-red-500" data-oid="6ig0y3j" />
                                <span data-oid="1-1z0p1">in Seoul, Korea</span>
                            </div>
                        </div>

                        {/* Additional Legal Info */}
                        <div className="mt-4 text-xs text-gray-500 space-y-1" data-oid="cyyseff">
                            <p data-oid="of0ff-7">
                                사업자등록번호: 123-45-67890 | 통신판매업신고번호:
                                2024-서울강남-1234
                            </p>
                            <p data-oid="ez_6tm8">
                                대표이사: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123, 456호
                            </p>
                            <p data-oid=":xax1i7">
                                고객센터: 1588-1234 (평일 09:00~18:00, 주말 및 공휴일 휴무)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile-specific bottom padding */}
            <div className="h-4 md:h-0" data-oid="e8m1wt."></div>
        </footer>
    );
}
