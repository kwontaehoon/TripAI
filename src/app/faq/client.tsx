"use client"
import Footer from "@/common/footer/page"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  Globe,
  HelpCircle,
  MessageCircle,
  Minus,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import { useState } from "react"
interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
  icon: React.ReactNode
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [openItems, setOpenItems] = useState<number[]>([])
  const categories = [
    {
      name: "전체",
      icon: <BookOpen className="w-5 h-5" data-oid="ux3vncd" />,
      count: 24,
    },
    {
      name: "계정/회원가입",
      icon: <Users className="w-5 h-5" data-oid=":pps6-e" />,
      count: 8,
    },
    {
      name: "여행 코스",
      icon: <Globe className="w-5 h-5" data-oid="3cqnh::" />,
      count: 6,
    },
    {
      name: "결제/환불",
      icon: <CreditCard className="w-5 h-5" data-oid="i0dawhf" />,
      count: 5,
    },
    {
      name: "앱 사용법",
      icon: <Settings className="w-5 h-5" data-oid=":y1gs53" />,
      count: 3,
    },
    {
      name: "보안/개인정보",
      icon: <Shield className="w-5 h-5" data-oid="nlgvb:h" />,
      count: 2,
    },
  ]

  const faqData: FAQItem[] = [
    {
      id: 1,
      category: "계정/회원가입",
      question: "TripAI 회원가입은 어떻게 하나요?",
      answer:
        '홈페이지 우측 상단의 "회원가입" 버튼을 클릭하시거나, 모바일 앱에서 "계정 만들기"를 선택하세요. 이메일 주소와 비밀번호를 입력하시면 간단하게 가입할 수 있습니다. 소셜 로그인(구글, 카카오, 네이버)도 지원합니다.',
      icon: <Users className="w-5 h-5" data-oid="x3nhznp" />,
    },
    {
      id: 2,
      category: "계정/회원가입",
      question: "비밀번호를 잊어버렸어요. 어떻게 재설정하나요?",
      answer:
        '로그인 페이지에서 "비밀번호 찾기"를 클릭하세요. 가입 시 사용한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다. 이메일을 확인하시고 새로운 비밀번호를 설정하세요.',
      icon: <Users className="w-5 h-5" data-oid="m-a08pc" />,
    },
    {
      id: 3,
      category: "여행 코스",
      question: "AI 추천 여행 코스는 어떻게 생성되나요?",
      answer:
        "TripAI는 사용자의 선호도, 여행 기간, 예산, 동행자 정보 등을 분석하여 개인 맞춤형 여행 코스를 생성합니다. 실시간 날씨, 교통 상황, 현지 이벤트 정보도 고려하여 최적의 일정을 제안합니다.",
      icon: <Globe className="w-5 h-5" data-oid="a.x0e0r" />,
    },
    {
      id: 4,
      category: "여행 코스",
      question: "추천받은 여행 코스를 수정할 수 있나요?",
      answer:
        "네, 가능합니다. 추천받은 코스에서 원하지 않는 장소를 삭제하거나, 새로운 장소를 추가할 수 있습니다. 또한 일정 순서를 변경하거나 각 장소에서의 체류 시간도 조정할 수 있습니다.",
      icon: <Globe className="w-5 h-5" data-oid="8sc:-ux" />,
    },
    {
      id: 5,
      category: "결제/환불",
      question: "프리미엄 플랜의 결제 방법은 무엇인가요?",
      answer:
        "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이코) 등 다양한 결제 방법을 지원합니다. 해외 결제의 경우 PayPal과 Stripe를 통해 안전하게 처리됩니다.",
      icon: <CreditCard className="w-5 h-5" data-oid="5d9.u1z" />,
    },
    {
      id: 6,
      category: "결제/환불",
      question: "환불 정책이 어떻게 되나요?",
      answer:
        "프리미엄 플랜 구매 후 7일 이내에는 100% 환불이 가능합니다. 단, 이미 프리미엄 기능을 사용한 경우에는 사용량에 따라 부분 환불될 수 있습니다. 환불 신청은 고객센터를 통해 접수해 주세요.",
      icon: <CreditCard className="w-5 h-5" data-oid="auua1.." />,
    },
    {
      id: 7,
      category: "앱 사용법",
      question: "오프라인에서도 여행 코스를 확인할 수 있나요?",
      answer:
        "네, 가능합니다. 여행 코스를 미리 다운로드하시면 인터넷 연결 없이도 지도와 상세 정보를 확인할 수 있습니다. 단, 실시간 정보(교통, 날씨 등)는 온라인 상태에서만 업데이트됩니다.",
      icon: <Settings className="w-5 h-5" data-oid="2slqi1b" />,
    },
    {
      id: 8,
      category: "보안/개인정보",
      question: "개인정보는 어떻게 보호되나요?",
      answer:
        "TripAI는 개인정보보호법에 따라 사용자의 개인정보를 안전하게 보호합니다. 모든 데이터는 암호화되어 저장되며, 제3자와 공유되지 않습니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.",
      icon: <Shield className="w-5 h-5" data-oid=".hvx.cx" />,
    },
  ]

  const toggleFAQ = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "전체" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  return (
    <div className="min-h-screen bg-gray-50" data-oid="7241_fd">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-36"
        data-oid="c6cprma"
      >
        <div className="max-w-4xl mx-auto text-center px-6" data-oid="hgeazah">
          <HelpCircle
            className="w-16 h-16 mx-auto mb-6 text-blue-200"
            data-oid=":sihw1y"
          />

          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            data-oid="4d85jlv"
          >
            자주 묻는 질문
          </h1>
          <p
            className="text-xl text-blue-100 max-w-2xl mx-auto"
            data-oid="knhn.z4"
          >
            TripAI 사용 중 궁금한 점이 있으시나요? 가장 자주 묻는 질문들에 대한
            답변을 확인해보세요.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white" data-oid="voz_x2x">
        <div className="max-w-4xl mx-auto px-6" data-oid="0fwxz1c">
          <div className="relative" data-oid="j8ul9-p">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              data-oid="aznxp8y"
            />

            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 !border-gray-200 rounded-2xl focus:!border-blue-500 focus:outline-none transition-colors"
              data-oid="o8y:anu"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-gray-100" data-oid="w:nimid">
        <div className="max-w-6xl mx-auto px-6" data-oid="4czzend">
          <div
            className="flex flex-wrap gap-4 justify-center"
            data-oid="w0w4i.i"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                data-oid="ub754qs"
              >
                {category.icon}
                <span data-oid="jdd8esj">{category.name}</span>
                <span
                  className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full"
                  data-oid="m06y2c."
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" data-oid="9dnyu0s">
        <div className="max-w-4xl mx-auto px-6" data-oid="tsk-6zi">
          <div className="space-y-4" data-oid="2b8kddh">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border !border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                data-oid="-y1gyw5"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 rounded-2xl transition-colors"
                  data-oid="lzupfsu"
                >
                  <div className="flex items-center gap-4" data-oid="ydbuwal">
                    <div
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                      data-oid="tt.67d_"
                    >
                      {faq.icon}
                    </div>
                    <div data-oid=":njoen4">
                      <span
                        className="text-sm text-blue-600 font-medium"
                        data-oid="cn17941"
                      >
                        {faq.category}
                      </span>
                      <h3
                        className="text-lg font-semibold text-gray-800 mt-1"
                        data-oid="-av4zd6"
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-shrink-0" data-oid="o3ncv.n">
                    {openItems.includes(faq.id) ? (
                      <Minus
                        className="w-5 h-5 text-gray-500"
                        data-oid="48rzmi4"
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-gray-500"
                        data-oid="bw0x1bm"
                      />
                    )}
                  </div>
                </button>

                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-6" data-oid="f2405ox">
                    <div className="pl-14" data-oid="v9ep0sf">
                      <p
                        className="text-gray-600 leading-relaxed"
                        data-oid="h6jx2ms"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12" data-oid="eb_zt-8">
              <HelpCircle
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                data-oid="-uwyi9."
              />

              <h3
                className="text-xl font-semibold text-gray-600 mb-2"
                data-oid="4b84cj1"
              >
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-500" data-oid="3gqyjkd">
                다른 키워드로 검색해보시거나 고객센터에 문의해주세요.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        data-oid="j39y-4-"
      >
        <div className="max-w-4xl mx-auto text-center px-6" data-oid="53lbv89">
          <MessageCircle
            className="w-12 h-12 mx-auto mb-6 text-blue-200"
            data-oid="swz.zns"
          />

          <h2 className="text-3xl font-bold mb-4" data-oid="hk_ik6y">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-oid="wwcb5gs">
            고객센터를 통해 더 자세한 도움을 받으실 수 있습니다.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-oid="rgwq9u1"
          >
            <button
              onClick={() => (window.location.href = "/support")}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              data-oid="srf:iri"
            >
              고객센터 바로가기
              <ArrowRight className="inline w-5 h-5 ml-2" data-oid="8nx9g4m" />
            </button>
            <button
              onClick={() => (window.location.href = "/support")}
              className="border-2 !border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              data-oid="rpvie5z"
            >
              1:1 문의하기
            </button>
          </div>
        </div>
      </section>

      <Footer data-oid="q2pa2f0" />
    </div>
  )
}
