'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    X,
    Sparkles,
    MapPin,
    Bot,
    Zap,
    Star,
    ArrowRight,
    Plane,
    Globe,
    Heart,
    Camera,
} from 'lucide-react';
import { introModalAtom } from '@/store/ai';
import { useAtom } from 'jotai';

export default function TripAIIntroModal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const decorationsRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [introModal, setIntroModal] = useAtom(introModalAtom)

    useEffect(() => {
        if (introModal && containerRef.current) {
            // 스크롤 방지
            document.body.style.overflow = 'hidden';

            // 초기 상태 설정
            gsap.set(containerRef.current, { opacity: 0 });
            gsap.set(backgroundRef.current, { scale: 1.2, opacity: 0 });
            gsap.set(heroRef.current, { scale: 0.8, opacity: 0, y: 100 });
            gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current], {
                opacity: 0,
                y: 50,
            });
            gsap.set(featuresRef.current?.children || [], { opacity: 0, x: -50, rotationY: -15 });
            gsap.set(statsRef.current?.children || [], { opacity: 0, scale: 0.5 });
            gsap.set(buttonsRef.current, { opacity: 0, y: 30 });
            gsap.set(decorationsRef.current?.children || [], {
                opacity: 0,
                scale: 0,
                rotation: 180,
            });
            gsap.set(particlesRef.current?.children || [], { opacity: 0, scale: 0 });

            // 메인 애니메이션 타임라인
            const mainTl = gsap.timeline();

            // 컨테이너와 배경 애니메이션
            mainTl
                .to(containerRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                })
                .to(
                    backgroundRef.current,
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                    },
                    '-=0.2',
                )

                // 히어로 섹션 애니메이션
                .to(
                    heroRef.current,
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'back.out(1.4)',
                    },
                    '-=0.8',
                )

                // 타이틀 애니메이션
                .to(
                    titleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )

                // 서브타이틀 애니메이션
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )

                // 설명 애니메이션
                .to(
                    descriptionRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.2',
                )

                // 기능 카드들 애니메이션
                .to(
                    featuresRef.current?.children || [],
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'back.out(1.2)',
                    },
                    '-=0.3',
                )

                // 통계 애니메이션
                .to(
                    statsRef.current?.children || [],
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'elastic.out(1, 0.5)',
                    },
                    '-=0.4',
                )

                // 버튼 애니메이션
                .to(
                    buttonsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )

                // 장식 요소들 애니메이션
                .to(
                    decorationsRef.current?.children || [],
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'elastic.out(1, 0.3)',
                    },
                    '-=0.8',
                )

                // 파티클 애니메이션
                .to(
                    particlesRef.current?.children || [],
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'power2.out',
                    },
                    '-=0.6',
                );

            // 지속적인 애니메이션들
            // 장식 요소들 플로팅 애니메이션
            gsap.to(decorationsRef.current?.children || [], {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                stagger: 0.3,
                delay: 2,
            });

            // 파티클 플로팅 애니메이션
            gsap.to(particlesRef.current?.children || [], {
                y: -15,
                x: 10,
                rotation: 360,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                stagger: 0.2,
                delay: 2.5,
            });

            // 배경 그라데이션 애니메이션
            gsap.to(backgroundRef.current, {
                backgroundPosition: '200% 200%',
                duration: 20,
                repeat: -1,
                ease: 'none',
            });
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [introModal]);

    const handleClose = () => {
        if (containerRef.current) {
            const exitTl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = 'unset';
                    setIntroModal(false);
                },
            });

            exitTl
                .to(featuresRef.current?.children || [], {
                    opacity: 0,
                    x: -100,
                    rotationY: -90,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.in',
                })
                .to(
                    [statsRef.current?.children || [], buttonsRef.current],
                    {
                        opacity: 0,
                        scale: 0.8,
                        y: 50,
                        duration: 0.3,
                        ease: 'power2.in',
                    },
                    '-=0.2',
                )
                .to(
                    [titleRef.current, subtitleRef.current, descriptionRef.current],
                    {
                        opacity: 0,
                        y: -50,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.in',
                    },
                    '-=0.2',
                )
                .to(
                    heroRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        y: 100,
                        duration: 0.4,
                        ease: 'power2.in',
                    },
                    '-=0.1',
                )
                .to(
                    containerRef.current,
                    {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                    },
                    '-=0.2',
                );
        }
    };

  // 하루 동안 보지 않기
  const handleDontShowTripAIIntro = () => {
    const now = new Date().getTime()
    localStorage.setItem("tripai-intro-last-shown", now.toString())
    setIntroModal(false)

  }

    const handleDontShowAgain = () => {
        handleDontShowTripAIIntro();
        handleClose();
    };

    if (!introModal) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden">
            {/* 동적 배경 */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"
                style={{
                    backgroundSize: '400% 400%',
                    backgroundPosition: '0% 0%',
                }}
               
            >
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/20" />

                {/* 그리드 패턴 */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                            backgroundSize: '50px 50px',
                        }}
                       
                    />
                </div>
            </div>

            {/* 파티클 효과 */}
            <div
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none"
               
            >
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                       
                    />
                ))}
            </div>

            {/* 닫기 버튼 */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
               
            >
                <X
                    className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
                   
                />
            </button>

            {/* 메인 컨텐츠 */}
            <div
                className="relative h-full flex items-center justify-center p-4 md:p-8"
               
            >
                <div className="w-full max-w-6xl mx-auto">
                    {/* 히어로 섹션 */}
                    <div
                        ref={heroRef}
                        className="text-center mb-8 md:mb-12 hidden md:block"
                       
                    >
                        <h1
                            ref={titleRef}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4"
                           
                        >
                            안녕하세요! 👋
                        </h1>
                        <h2
                            ref={subtitleRef}
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-4 md:mb-6 flex items-center justify-center gap-4 md:gap-6"
                           
                        >
                            저는
                            <div
                                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-2xl"
                               
                            >
                                <Bot
                                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                                   
                                />
                            </div>
                            <span
                                className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
                               
                            >
                                Trip AI
                            </span>
                            입니다
                        </h2>

                        <p
                            ref={descriptionRef}
                            className="text-sm md:text-md lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
                           
                        >
                            AI가 당신만을 위한 완벽한 여행 코스를 추천해드립니다.
                            <br />
                            개인 취향과 예산에 맞춘 맞춤형 여행 계획을 경험해보세요!
                        </p>
                    </div>

                    {/* 기능 카드들 */}
                    <div
                        ref={featuresRef}
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-12"
                       
                    >
                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                           
                        >
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4"
                               
                            >
                                <Sparkles className="w-8 h-8 text-blue-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                AI 맞춤 추천
                            </h3>
                            <p className="text-white/70">
                                취향과 예산에 맞는 완벽한 코스
                            </p>
                        </div>

                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                           
                        >
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4"
                               
                            >
                                <Globe className="w-8 h-8 text-purple-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                실시간 정보
                            </h3>
                            <p className="text-white/70">
                                최신 여행지 정보와 리뷰
                            </p>
                        </div>

                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                           
                        >
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4"
                               
                            >
                                <Zap className="w-8 h-8 text-green-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                빠른 계획
                            </h3>
                            <p className="text-white/70">
                                몇 분 만에 완성되는 여행 계획
                            </p>
                        </div>

                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                           
                        >
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-2xl mb-4"
                               
                            >
                                <Heart className="w-8 h-8 text-orange-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                검증된 코스
                            </h3>
                            <p className="text-white/70">
                                실제 여행자들의 후기 기반
                            </p>
                        </div>
                    </div>

                    {/* 통계 섹션 */}
                    {/* <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-2xl mx-auto "
           
            >
            <div className="text-center">
            <div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
           
            >
            17,547
            </div>
            <div className="text-white/70 text-sm md:text-base">
            생성된 코스
            </div>
            </div>
            <div className="text-center">
            <div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-300 mb-2"
           
            >
            4.9
            </div>
            <div className="text-white/70 text-sm md:text-base">
            평균 평점
            </div>
            </div>
            <div className="text-center">
            <div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-300 mb-2"
           
            >
            98%
            </div>
            <div className="text-white/70 text-sm md:text-base">
            만족도
            </div>
            </div>
            </div> */}

                    {/* 버튼 섹션 */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
                       
                    >
                        <button
                            onClick={handleClose}
                            className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
                           
                        >
                            <span>Trip AI 시작하기</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleDontShowAgain}
                            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                           
                        >
                            하루 동안 보지 않기
                        </button>
                    </div>
                </div>
            </div>

            {/* 장식 요소들 */}
            <div
                ref={decorationsRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
               
            >
                <div
                    className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"
                   
                />

                <div
                    className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-red-500/30 rounded-full blur-xl"
                   
                />

                <div
                    className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-green-400/30 to-teal-500/30 rounded-full blur-xl"
                   
                />

                <div
                    className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-xl"
                   
                />

                {/* 아이콘 장식들 */}
                <Plane
                    className="absolute top-32 left-1/4 w-8 h-8 text-white/20 transform rotate-45"
                   
                />

                <Camera
                    className="absolute bottom-40 right-1/4 w-6 h-6 text-white/20"
                   
                />

                <MapPin
                    className="absolute top-1/2 left-16 w-7 h-7 text-white/20"
                   
                />

                <Star
                    className="absolute top-1/3 right-16 w-5 h-5 text-white/20"
                   
                />
            </div>
        </div>
    );
}
