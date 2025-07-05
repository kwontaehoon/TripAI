'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    Bot,
    Zap,
    Users,
    Globe,
    ChevronDown,
    ArrowRight,
    Sparkles,
    Target,
    Heart,
    Lightbulb,
    Rocket,
} from 'lucide-react';
import Footer from '@/common/footer/page';
import { useRouter } from 'next/navigation';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function AboutPage() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Hero section animations
            const tl = gsap.timeline();

            // Animated background gradient
            gsap.to(heroRef.current, {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });

            // Title animation with typewriter effect
            tl.from(titleRef.current, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out',
            })
                .to(
                    titleRef.current,
                    {
                        text: 'TripAI: 당신의 여행을 혁신하다',
                        duration: 2,
                        ease: 'none',
                    },
                    '-=0.5',
                )
                .from(
                    subtitleRef.current,
                    {
                        opacity: 0,
                        y: 50,
                        duration: 0.8,
                        ease: 'power2.out',
                    },
                    '-=0.5',
                );

            // Features section animation
            ScrollTrigger.create({
                trigger: featuresRef.current,
                start: 'top 80%',
                onEnter: () => {
                    const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
                    if (featureCards) {
                        gsap.fromTo(
                            featureCards,
                            {
                                opacity: 0,
                                y: 0,
                                rotation: 2,
                                scale: 0.8,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                rotation: 0,
                                scale: 1,
                                duration: 0.8,
                                stagger: 0.2,
                                ease: 'back.out(1.7)',
                            },
                        );
                    }
                },
            });

            // Stats counter animation
            ScrollTrigger.create({
                trigger: statsRef.current,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from('.stat-number', {
                        textContent: 0,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        stagger: 0.3,
                    });

                    gsap.from('.stat-card', {
                        scale: 0,
                        rotation: 180,
                        duration: 1,
                        stagger: 0.2,
                        ease: 'back.out(1.7)',
                    });
                },
            });

            // Team section animation
            ScrollTrigger.create({
                trigger: teamRef.current,
                start: 'top 80%',
                onEnter: () => {
                    const teamMembers = teamRef.current?.querySelectorAll('.team-member');
                    if (teamMembers) {
                        gsap.fromTo(
                            teamMembers,
                            {
                                opacity: 0,
                                scale: 0.5,
                                rotation: 180,
                                y: 50,
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                rotation: 0,
                                y: 0,
                                duration: 0.2,
                                stagger: 0.2,
                                ease: 'elastic.out(1, 0.5)',
                            },
                        );
                    }
                },
            });

            // Vision section animation
            ScrollTrigger.create({
                trigger: visionRef.current,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from('.vision-item', {
                        opacity: 0,
                        x: -100,
                        duration: 1,
                        stagger: 0.3,
                        ease: 'power3.out',
                    });
                },
            });

            // Floating elements animation
            gsap.to('.floating-element', {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                stagger: 0.5,
            });

            // Parallax effect for background elements
            gsap.to('.parallax-bg', {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: <Bot className="w-8 h-8" data-oid="_nzr32p" />,
            title: 'AI 기반 추천',
            description: '머신러닝 알고리즘으로 개인 맞춤형 여행 코스를 제안합니다.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <Zap className="w-8 h-8" data-oid="q8eurie" />,
            title: '실시간 최적화',
            description: '실시간 데이터를 활용해 최적의 여행 경로를 계산합니다.',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: <Users className="w-8 h-8" data-oid="y0neurw" />,
            title: '커뮤니티 기반',
            description: '실제 여행자들의 경험과 리뷰를 바탕으로 한 추천 시스템입니다.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: <Globe className="w-8 h-8" data-oid="kj7vlx." />,
            title: '글로벌 서비스',
            description: '전 세계 어디든 여행 계획을 세울 수 있는 글로벌 플랫폼입니다.',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const stats = [
        { number: 50000, label: 'AI 추천 코스', suffix: '+' },
        { number: 100000, label: '만족한 사용자', suffix: '+' },
        { number: 4.9, label: '평균 만족도', suffix: '/5' },
        { number: 200, label: '지원 도시', suffix: '+' },
    ];

    const team = [
        { name: '김AI', role: 'AI 엔지니어', icon: <Bot className="w-6 h-6" data-oid="khkmpzi" /> },
        {
            name: '박여행',
            role: '여행 전문가',
            icon: <Globe className="w-6 h-6" data-oid="tuf_94h" />,
        },
        {
            name: '이개발',
            role: '풀스택 개발자',
            icon: <Zap className="w-6 h-6" data-oid="-jkc9.." />,
        },
        {
            name: '최디자인',
            role: 'UX/UI 디자이너',
            icon: <Sparkles className="w-6 h-6" data-oid="27zu86j" />,
        },
    ];

    const visionItems = [
        {
            icon: <Target className="w-8 h-8" data-oid="7q:e5ii" />,
            title: '미션',
            description: 'AI 기술로 모든 사람이 완벽한 여행을 경험할 수 있도록 돕습니다.',
        },
        {
            icon: <Lightbulb className="w-8 h-8" data-oid="11p3kiy" />,
            title: '비전',
            description: '여행 계획의 새로운 패러다임을 제시하는 글로벌 리더가 되겠습니다.',
        },
        {
            icon: <Heart className="w-8 h-8" data-oid="nn9y17j" />,
            title: '가치',
            description: '사용자 중심의 혁신적인 서비스로 여행의 즐거움을 극대화합니다.',
        },
    ];

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-gray-50 overflow-hidden"
            data-oid="ml.4sw_"
        >
            {/* Parallax Background Elements */}
            <div className="parallax-bg fixed inset-0 opacity-10" data-oid="q_qoa4.">
                <div
                    className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"
                    data-oid="la_3_fe"
                ></div>
                <div
                    className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"
                    data-oid="w3r30w0"
                ></div>
                <div
                    className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-500 rounded-full blur-3xl"
                    data-oid=".mqxpee"
                ></div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden"
                data-oid="u3vzzo_"
            >
                <div className="absolute inset-0 bg-black/20" data-oid="fw9xu9c"></div>

                {/* Floating Elements */}
                <div
                    className="floating-element absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
                    data-oid="dyzfvcw"
                ></div>
                <div
                    className="floating-element absolute top-40 right-32 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"
                    data-oid="i8h2-xr"
                ></div>
                <div
                    className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
                    data-oid="mzaw0.6"
                ></div>

                <div
                    className="relative z-10 text-center max-w-4xl mx-auto px-6"
                    data-oid="zz58a4c"
                >
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                        data-oid="dewc3u8"
                    ></h1>
                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed"
                        data-oid="_xq:yz_"
                    >
                        인공지능과 빅데이터 기술로 당신만의 완벽한 여행 경험을 만들어갑니다
                    </p>
                    <button
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        onClick={() => router.push('/')}
                        data-oid="zywxtpr"
                    >
                        여행 시작하기{' '}
                        <ArrowRight className="inline w-5 h-5 ml-2" data-oid="csi16dw" />
                    </button>
                </div>
                {/* Scroll Hint */}
                <div
                    ref={scrollHintRef}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                    data-oid="yh7pnn8"
                >
                    <div className="flex flex-col items-center space-y-4" data-oid="ztq9-us">
                        <p className="text-white/80 text-sm font-medium" data-oid="08xita1">
                            아래로 스크롤하여 더 알아보기
                        </p>

                        {/* Animated Mouse */}
                        <div className="mouse-scroll" data-oid="4tpbyf7">
                            <div
                                className="w-6 h-10 border-2 !border-white/60 rounded-full relative"
                                data-oid="2.5-2dq"
                            >
                                <div
                                    className="w-1 h-2 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 scroll-dot"
                                    data-oid="az4k6oe"
                                ></div>
                            </div>
                        </div>

                        {/* Animated Arrows */}
                        <div className="flex flex-col items-center" data-oid="1jdjzgq">
                            <div className="scroll-arrow" data-oid="4u:1ghu">
                                <ChevronDown className="w-6 h-6 text-white/80" data-oid="vsi:xuv" />
                            </div>
                            <div className="scroll-arrow" data-oid="izaufor">
                                <ChevronDown
                                    className="w-4 h-4 text-white/60 -mt-3"
                                    data-oid=".hoenl7"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-20 bg-white" data-oid="czrju89">
                <div className="max-w-7xl mx-auto px-6" data-oid="e5m6ojz">
                    <div className="text-center mb-16" data-oid="d99u9ze">
                        <h2
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                            data-oid=":-1975g"
                        >
                            혁신적인 기술력
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="1v3f4zc">
                            최첨단 AI 기술과 사용자 경험을 결합한 차세대 여행 플랫폼
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="vo0i1c7"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card p-8 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                                data-oid=":sojr0d"
                            >
                                <div
                                    className="mb-4 p-3 bg-white/20 rounded-full w-fit"
                                    data-oid="0vjms:1"
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3" data-oid="5-ug2uc">
                                    {feature.title}
                                </h3>
                                <p className="text-white/90 leading-relaxed" data-oid="g7hv3du">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 bg-gray-900 text-white" data-oid="8l92wk7">
                <div className="max-w-7xl mx-auto px-6" data-oid="vfj4pvi">
                    <div className="text-center mb-16" data-oid="jarmoay">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" data-oid="3z7gklc">
                            숫자로 보는 TripAI
                        </h2>
                        <p className="text-xl text-gray-300" data-oid="p.:avxp">
                            우리의 성과와 사용자들의 신뢰를 보여주는 지표들
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="v422vt."
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card text-center p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl"
                                data-oid="m-swvjd"
                            >
                                <div
                                    className="stat-number text-4xl md:text-5xl font-bold mb-2 text-white"
                                    data-oid="ich_rr4"
                                >
                                    {stat.number}
                                    {stat.suffix}
                                </div>
                                <div className="text-blue-100 text-lg" data-oid="3s_dgay">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={teamRef}
                className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
                data-oid="eiht59r"
            >
                <div className="max-w-7xl mx-auto px-6" data-oid="b:mr20:">
                    <div className="text-center mb-16" data-oid="1_ghpti">
                        <h2
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                            data-oid="axspbrc"
                        >
                            우리 팀
                        </h2>
                        <p className="text-xl text-gray-600" data-oid="9uyn5jj">
                            열정적인 전문가들이 만들어가는 혁신
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="ki19f:p"
                    >
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="team-member text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                data-oid="wh4ky-i"
                            >
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-4"
                                    data-oid="a7ncvbq"
                                >
                                    {member.icon}
                                </div>
                                <h3
                                    className="text-xl font-bold text-gray-800 mb-2"
                                    data-oid="5c74h.2"
                                >
                                    {member.name}
                                </h3>
                                <p className="text-gray-600" data-oid="ohuf1.d">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section ref={visionRef} className="py-20 bg-white" data-oid="7na7odk">
                <div className="max-w-7xl mx-auto px-6" data-oid="_o1gxlu">
                    <div className="text-center mb-16" data-oid="ufl7uei">
                        <h2
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                            data-oid="kwmytca"
                        >
                            우리의 철학
                        </h2>
                        <p className="text-xl text-gray-600" data-oid="1-298s6">
                            TripAI가 추구하는 가치와 미래 비전
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="k8b68fd">
                        {visionItems.map((item, index) => (
                            <div
                                key={index}
                                className="vision-item p-8 text-center"
                                data-oid="90.hkd9"
                            >
                                <div
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6"
                                    data-oid="d7t5nyj"
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    className="text-2xl font-bold text-gray-800 mb-4"
                                    data-oid="zk_9.._"
                                >
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed" data-oid="zi8kga2">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                data-oid="kuy.fdu"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="u-wjat_">
                    <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-200" data-oid="_y1jjhu" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" data-oid="0d1fy0.">
                        함께 여행의 미래를 만들어가요
                    </h2>
                    <p className="text-xl mb-8 text-blue-100" data-oid="s3qw8r7">
                        TripAI와 함께 새로운 여행 경험을 시작하세요
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        data-oid="d9rmjie"
                    >
                        <button
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                            data-oid="azk.cye"
                        >
                            지금 시작하기
                        </button>
                        <button
                            className="border-2 !border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                            data-oid="svg45_7"
                        >
                            더 알아보기
                        </button>
                    </div>
                </div>
            </section>
            <Footer data-oid="q5h-rjh" />
        </div>
    );
}
