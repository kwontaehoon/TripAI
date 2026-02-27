"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import {
  Bot,
  Zap,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  Database,
  Cloud,
  MapPin,
  Code,
  User,
  Mail,
  Star,
  Users,
  Globe,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function AboutPage({ boardsData, coursesData }) {
  const router = useRouter()
  const [totalRatingSum, setTotalRatingSum] = useState(0)
  const [totalReliabilitySum, setTotalReliabilitySum] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  const boards = Array.isArray(boardsData) ? boardsData : []
  const courses = Array.isArray(coursesData) ? coursesData : []

  useEffect(() => {
    let ratingSum = 0
    let reliabilitySum = 0

    if (boardsData && coursesData) {
      for (const board of boards) {
        ratingSum += board.rating
        if (!board.reliability) {
          continue
        }
        reliabilitySum += Number(board.reliability.replace("%", ""))
      }
      for (const course of courses) {
        ratingSum += course.rating
        if (!course.reliability) {
          continue
        }
        reliabilitySum += Number(course.reliability.replace("%", ""))
      }

      const totalLength = boards.length + courses.length

      if (totalLength > 0) {
        const avgRating = ratingSum / totalLength
        const avgReliability = reliabilitySum / totalLength

        setTotalRatingSum(avgRating)
        setTotalReliabilitySum(avgReliability)
      } else {
        setTotalRatingSum(5)
        setTotalReliabilitySum(5)
      }
    }
  }, [boardsData, coursesData, boards, courses])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline()

      // Animated background gradient
      gsap.to(heroRef.current, {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Title animation with typewriter effect
      tl.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          {
            text: "TripAI: 당신의 여행을 혁신하다",
            duration: 2,
            ease: "none",
          },
          "-=0.5",
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )

      // Features section animation
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          const featureCards =
            featuresRef.current?.querySelectorAll(".feature-card")
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
                ease: "back.out(1.7)",
              },
            )
          }
        },
      })

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(".stat-number", {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.3,
          })

          gsap.from(".stat-card", {
            scale: 0,
            rotation: 180,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          })
        },
      })

      // Team section animation
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top 80%",
        onEnter: () => {
          const teamMembers = teamRef.current?.querySelectorAll(".team-member")
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
                ease: "elastic.out(1, 0.5)",
              },
            )
          }
        },
      })

      // Vision section animation
      ScrollTrigger.create({
        trigger: visionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(".vision-item", {
            opacity: 0,
            x: -100,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          })
        },
      })

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      })

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: <Bot className="w-8 h-8" data-oid="vwjp7od" />,
      title: "Gemini AI 기반 추천",
      description:
        "Google의 최신 Gemini AI 모델을 활용하여 개인 맞춤형 여행 코스를 제안합니다.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" data-oid="ebb5lwb" />,
      title: "Next.js 최적화",
      description:
        "Next.js의 SSR과 최적화 기능으로 빠르고 효율적인 사용자 경험을 제공합니다.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Database className="w-8 h-8" data-oid="lqgj1p:" />,
      title: "Supabase 백엔드",
      description:
        "안전한 인증 시스템과 PostgreSQL 기반의 데이터베이스로 빠르고 간결한 데이터 처리를 보장합니다.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Cloud className="w-8 h-8" data-oid="uoi8agm" />,
      title: "Vercel & CDN",
      description:
        "Vercel의 글로벌 CDN을 통해 전 세계 어디서나 빠른 로딩 속도를 제공합니다.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <MapPin className="w-8 h-8" data-oid="mappin1" />,
      title: "Google Places API",
      description:
        "Google Places API를 통해 정확하고 실시간 장소 정보를 제공합니다.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: <Mail className="w-8 h-8" data-oid="xvwfb-:" />,
      title: "AWS SES 이메일 서비스",
      description:
        "AWS SES를 이메일 서버로 활용하여 비밀번호 찾기 등의 안정적인 이메일 전송 시스템을 제공합니다.",
      color: "from-fuchsia-500 to-indigo-500",
    },
  ]

  const stats = [
    {
      number: 50000,
      label: "AI 추천 코스",
      suffix: "+",
      formattedNumber: "50,000",
    },
    {
      number: 100000,
      label: "만족한 사용자",
      suffix: "+",
      formattedNumber: "100,000",
    },
    {
      number: totalRatingSum,
      label: "평균 만족도",
      suffix: "/5",
      formattedNumber: "4.9",
    },
    { number: 200, label: "지원 도시", suffix: "+", formattedNumber: "200" },
  ]

  const team = [
    {
      name: "권태훈",
      role: "풀스택 개발자 & 창립자",
      icon: <User className="w-6 h-6" data-oid="7q_miz7" />,
      description: "TripAI의 모든 기술적 측면을 담당하고 있습니다.",
    },
  ]

  const visionItems = [
    {
      icon: <Target className="w-8 h-8" data-oid="sn97nko" />,
      title: "미션",
      description:
        "AI 기술로 모든 사람이 완벽한 여행을 경험할 수 있도록 돕습니다.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" data-oid="mtcbqx." />,
      title: "비전",
      description:
        "여행 계획의 새로운 패러다임을 제시하는 글로벌 리더가 되겠습니다.",
    },
    {
      icon: <Heart className="w-8 h-8" data-oid="77n46_7" />,
      title: "가치",
      description:
        "사용자 중심의 혁신적인 서비스로 여행의 즐거움을 극대화합니다.",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 overflow-hidden"
      data-oid="2bbsz-j"
    >
      {/* Parallax Background Elements */}
      <div className="parallax-bg fixed inset-0 opacity-10" data-oid="po2zatm">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"
          data-oid="ja58ppz"
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"
          data-oid="tu3qdoa"
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-500 rounded-full blur-3xl"
          data-oid="d0pd1ne"
        ></div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden"
        data-oid="vxcni9."
      >
        <div className="absolute inset-0 bg-black/20" data-oid="gj2daom"></div>

        {/* Floating Elements */}
        <div
          className="floating-element absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
          data-oid=":y7vmkl"
        ></div>
        <div
          className="floating-element absolute top-40 right-32 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"
          data-oid="o92iqqf"
        ></div>
        <div
          className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
          data-oid="g49cgm2"
        ></div>

        <div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          data-oid="8vv8jw2"
        >
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            data-oid="8c_kn:5"
          ></h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed"
            data-oid="wtpx508"
          >
            인공지능과 빅데이터 기술로 당신만의 완벽한 여행 경험을 만들어갑니다
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            onClick={() => router.push("/")}
            data-oid="8u9qcob"
          >
            여행 시작하기{" "}
            <ArrowRight className="inline w-5 h-5 ml-2" data-oid="8y5-mck" />
          </button>
        </div>
        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          data-oid="4ow_pwx"
        >
          <div
            className="flex flex-col items-center space-y-4"
            data-oid=":gft:5e"
          >
            <p className="text-white/80 text-sm font-medium" data-oid="4m41n3f">
              아래로 스크롤하여 더 알아보기
            </p>

            {/* Animated Mouse */}
            <div className="mouse-scroll" data-oid="mmgg2fz">
              <div
                className="w-6 h-10 border-2 !border-white/60 rounded-full relative"
                data-oid="6nwdwvh"
              >
                <div
                  className="w-1 h-2 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 scroll-dot"
                  data-oid="0cjig1q"
                ></div>
              </div>
            </div>

            {/* Animated Arrows */}
            <div className="flex flex-col items-center" data-oid="51gue75">
              <div className="scroll-arrow" data-oid="6yq:s_3">
                <ChevronDown
                  className="w-6 h-6 text-white/80"
                  data-oid="1:_r5mr"
                />
              </div>
              <div className="scroll-arrow" data-oid="324kcxa">
                <ChevronDown
                  className="w-4 h-4 text-white/60 -mt-3"
                  data-oid="d_sq..z"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white" data-oid="611:jcs">
        <div className="max-w-7xl mx-auto px-6" data-oid="ywz.ld2">
          <div className="text-center mb-16" data-oid="vw08ryb">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              data-oid="z6e9hx:"
            >
              핵심 기술 스택
            </h2>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              data-oid="y4pjhyt"
            >
              최신 기술과 안정적인 인프라로 구축된 차세대 여행 플랫폼
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-oid=".f2fc-k"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card p-8 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                data-oid="53xq0sc"
              >
                <div
                  className="mb-4 p-3 bg-white/20 rounded-full w-fit"
                  data-oid="3t.8d4s"
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" data-oid="79zxoke">
                  {feature.title}
                </h3>
                <p className="text-white/90 leading-relaxed" data-oid="shv4nk1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              숫자로 보는 TripAI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              전 세계 사용자들이 만들어낸 놀라운 성과와 신뢰의 지표들을
              확인해보세요
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card group relative">
                {/* Card Background with Enhanced Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-3xl backdrop-blur-lg border !border-white/30 group-hover:!border-white/50 transition-all duration-500 group-hover:scale-105 shadow-2xl group-hover:shadow-3xl"></div>

                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-pulse delay-700"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Enhanced Icon with Ring */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {index === 0 && <Bot className="w-8 h-8 text-white" />}
                      {index === 1 && <Users className="w-8 h-8 text-white" />}
                      {index === 2 && <Star className="w-8 h-8 text-white" />}
                      {index === 3 && <Globe className="w-8 h-8 text-white" />}
                    </div>
                    {/* Animated Ring */}
                    <div className="absolute inset-0 w-16 h-16 mx-auto border-2 !border-white/20 rounded-full animate-spin-slow group-hover:!border-white/40 transition-colors duration-300"></div>
                  </div>

                  {/* Enhanced Number with Comma Formatting */}
                  <div className="stat-number text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
                    {stat.formattedNumber}
                    <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  </div>

                  {/* Enhanced Label */}
                  <div className="text-gray-200 text-lg font-semibold tracking-wide">
                    {stat.label}
                  </div>

                  {/* Enhanced Progress Bar with Animation */}
                  <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 delay-300 shadow-lg"></div>
                  </div>

                  {/* New Achievement Badge */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border !border-white/20">
                      <Sparkles className="w-3 h-3 text-yellow-400 mr-1" />

                      <span className="text-xs text-gray-300 font-medium">
                        검증된 성과
                      </span>
                    </div>
                  </div>
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
        data-oid="wrjj-1g"
      >
        <div className="max-w-7xl mx-auto px-6" data-oid="kph-d3-">
          <div className="text-center mb-16" data-oid="88py7q9">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              data-oid="c:pml.z"
            >
              개발자 소개
            </h2>
            <p className="text-xl text-gray-600" data-oid="v6swv3r">
              혁신적인 아이디어를 현실로 만드는 1인 개발자
            </p>
          </div>

          <div className="flex justify-center" data-oid="f839f3x">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-member text-center p-12 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-md"
                data-oid="kfq8p9l"
              >
                <div
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6"
                  data-oid="l41s:tg"
                >
                  {member.icon}
                </div>
                <h3
                  className="text-2xl font-bold text-gray-800 mb-2"
                  data-oid="-..-wi9"
                >
                  {member.name}
                </h3>
                <p
                  className="text-lg text-blue-600 font-semibold mb-4"
                  data-oid="4r-xthz"
                >
                  {member.role}
                </p>
                <p
                  className="text-gray-600 leading-relaxed"
                  data-oid="member-desc"
                >
                  {member.description}
                </p>
                <div
                  className="mt-6 flex justify-center space-x-4"
                  data-oid="3mlzyby"
                >
                  <div
                    className="flex items-center space-x-2 text-sm text-gray-500"
                    data-oid="3v64eqh"
                  >
                    <Code className="w-4 h-4" data-oid="_p._ruo" />
                    <span data-oid="6w.:mcg">Full-Stack Development</span>
                  </div>
                </div>
                <div
                  className="mt-4 flex justify-center space-x-4"
                  data-oid="l2k0iu:"
                >
                  <div
                    className="flex items-center space-x-2 text-sm text-gray-500"
                    data-oid="i4g.1xy"
                  >
                    <Bot className="w-4 h-4" data-oid="dq9rtnv" />
                    <span data-oid="cds18d0">AI Integration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="py-20 bg-white" data-oid="59bfppd">
        <div className="max-w-7xl mx-auto px-6" data-oid="npizva9">
          <div className="text-center mb-16" data-oid="imzlivq">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              data-oid="wcppd_o"
            >
              우리의 철학
            </h2>
            <p className="text-xl text-gray-600" data-oid="gbw7lim">
              TripAI가 추구하는 가치와 미래 비전
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="qog0f9s"
          >
            {visionItems.map((item, index) => (
              <div
                key={index}
                className="vision-item p-8 text-center"
                data-oid="dca9jnv"
              >
                <div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6"
                  data-oid="2xgcmx."
                >
                  {item.icon}
                </div>
                <h3
                  className="text-2xl font-bold text-gray-800 mb-4"
                  data-oid="90t42x_"
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid=":h74n8z">
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
        data-oid="doi6d9m"
      >
        <div className="max-w-4xl mx-auto text-center px-6" data-oid="9zw:7dr">
          <Rocket
            className="w-16 h-16 mx-auto mb-6 text-blue-200"
            data-oid=":3hyaut"
          />
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            data-oid="pbkib9y"
          >
            함께 여행의 미래를 만들어가요
          </h2>
          <p className="text-xl mb-8 text-blue-100" data-oid=":3g7a:4">
            TripAI와 함께 새로운 여행 경험을 시작하세요
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-oid="y-wsez2"
          >
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              data-oid="9c9vkc:"
            >
              지금 시작하기
            </button>
            <button
              className="border-2 !border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              data-oid="2xh.:w5"
            >
              더 알아보기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
