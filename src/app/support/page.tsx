'use client';

import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Clock,
    Globe,
    Headphones,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Shield,
    Star,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                category: '',
                subject: '',
                message: '',
            });

            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 2000);
    };

    const contactMethods = [
        {
            icon: <Phone className="w-8 h-8" data-oid="pvani-a" />,
            title: '전화 상담',
            description: '즉시 전문 상담원과 연결',
            contact: '1588-1234',
            action: '전화걸기',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: <Mail className="w-8 h-8" data-oid="llkgj5h" />,
            title: '이메일 문의',
            description: '24시간 언제든지 문의',
            contact: 'support@tripai.com',
            action: '이메일 보내기',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <MessageCircle className="w-8 h-8" data-oid="-pht4kj" />,
            title: '실시간 채팅',
            description: '빠른 답변과 즉시 해결',
            contact: '평일 09:00-18:00',
            action: '채팅 시작',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const supportFeatures = [
        {
            icon: <Zap className="w-6 h-6" data-oid="ia:fuii" />,
            title: '빠른 응답',
            description: '평균 2시간 이내 답변',
        },
        {
            icon: <Shield className="w-6 h-6" data-oid="i25di59" />,
            title: '안전한 상담',
            description: '개인정보 완벽 보호',
        },
        {
            icon: <Globe className="w-6 h-6" data-oid="1wkfd77" />,
            title: '다국어 지원',
            description: '한국어, 영어, 일본어',
        },
        {
            icon: <Heart className="w-6 h-6" data-oid="btpu7o7" />,
            title: '친절한 서비스',
            description: '고객 만족도 98%',
        },
    ];

    const categories = [
        '계정/로그인 문제',
        '여행 코스 관련',
        '결제/환불 문의',
        '앱 사용법',
        '기술적 문제',
        '제휴/협력 문의',
        '기타',
    ];

    return (
        <div className="min-h-screen bg-gray-50" data-oid="vaz15ff">
            {/* Hero Section */}
            <section
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-36"
                data-oid="86lfxqb"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="olwjk::">
                    <Headphones
                        className="w-16 h-16 mx-auto mb-6 text-blue-200"
                        data-oid="b.9o078"
                    />

                    <h1 className="text-5xl md:text-6xl font-bold mb-6" data-oid="uiogzzj">
                        고객센터
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto" data-oid="v0akj6q">
                        TripAI 사용 중 도움이 필요하시나요? 전문 상담원이 친절하고 신속하게
                        도와드리겠습니다.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 bg-white" data-oid="f7-i0m:">
                <div className="max-w-6xl mx-auto px-6" data-oid="tb8stws">
                    <div className="text-center mb-12" data-oid="9y17a.1">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4" data-oid="8lw.zi2">
                            문의 방법 선택
                        </h2>
                        <p className="text-xl text-gray-600" data-oid="qk6.78-">
                            가장 편리한 방법으로 문의해주세요
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="6_teziw">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl bg-gradient-to-br ${method.color} text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                                data-oid="c53:s7_"
                            >
                                <div
                                    className="mb-6 p-3 bg-white/20 rounded-full w-fit"
                                    data-oid="jbbh03p"
                                >
                                    {method.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3" data-oid="j-tmru0">
                                    {method.title}
                                </h3>
                                <p className="text-white/90 mb-4" data-oid="yo18qw9">
                                    {method.description}
                                </p>
                                <div className="text-lg font-semibold mb-6" data-oid="l_wut1h">
                                    {method.contact}
                                </div>
                                <button
                                    className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
                                    data-oid="qj0b-0f"
                                >
                                    {method.action}
                                    <ArrowRight
                                        className="inline w-4 h-4 ml-2"
                                        data-oid="031y_4."
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Hours */}
            <section className="py-16 bg-gray-100" data-oid="3u.mqzw">
                <div className="max-w-6xl mx-auto px-6" data-oid="gjg5.cu">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-oid="_5qy6w9">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8" data-oid="-4fnlwv">
                            <div className="mb-8" data-oid="ljm2hv2">
                                <h3
                                    className="text-2xl font-bold text-gray-800 mb-2"
                                    data-oid=":89ju11"
                                >
                                    1:1 문의하기
                                </h3>
                                <p className="text-gray-600" data-oid="17vkmeg">
                                    자세한 문의사항을 남겨주시면 빠르게 답변드리겠습니다.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" data-oid="qmx7fqx">
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    data-oid="ypvj8ll"
                                >
                                    <div data-oid="vfgy2of">
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                            data-oid="ze6wi05"
                                        >
                                            이름 *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="홍길동"
                                            data-oid="9keujhg"
                                        />
                                    </div>
                                    <div data-oid="izczp_k">
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                            data-oid="xekydci"
                                        >
                                            이메일 *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="example@email.com"
                                            data-oid="q4-o-pk"
                                        />
                                    </div>
                                </div>

                                <div data-oid="gmqui:b">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        data-oid="8389ci:"
                                    >
                                        문의 유형 *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        data-oid="b_09_cu"
                                    >
                                        <option value="" data-oid="9g1:q:g">
                                            문의 유형을 선택해주세요
                                        </option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category} data-oid="ylrtfcj">
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div data-oid="m6xg8:2">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        data-oid=".99d0nk"
                                    >
                                        제목 *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="문의 제목을 입력해주세요"
                                        data-oid="3jhq6lb"
                                    />
                                </div>

                                <div data-oid="zc:zo25">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        data-oid="2x2lz8z"
                                    >
                                        문의 내용 *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="문의하실 내용을 자세히 작성해주세요"
                                        data-oid=":bx.-tx"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : submitStatus === 'success'
                                              ? 'bg-green-500 hover:bg-green-600'
                                              : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                    data-oid="-jkni.."
                                >
                                    {isSubmitting ? (
                                        <div
                                            className="flex items-center justify-center"
                                            data-oid="8a2s7ns"
                                        >
                                            <div
                                                className="animate-spin rounded-full h-5 w-5 border-b-2 !border-white mr-2"
                                                data-oid="ukb9jpy"
                                            ></div>
                                            전송 중...
                                        </div>
                                    ) : submitStatus === 'success' ? (
                                        <div
                                            className="flex items-center justify-center"
                                            data-oid="_e20g0e"
                                        >
                                            <CheckCircle
                                                className="w-5 h-5 mr-2"
                                                data-oid=".59psvl"
                                            />
                                            전송 완료!
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-center justify-center"
                                            data-oid="b1eo.--"
                                        >
                                            <Send className="w-5 h-5 mr-2" data-oid="32-8_r." />
                                            문의하기
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Support Hours & Info */}
                        <div className="space-y-8" data-oid="nfnc7_o">
                            {/* Operating Hours */}
                            <div className="bg-white rounded-2xl shadow-lg p-8" data-oid="hz-onee">
                                <div className="flex items-center mb-6" data-oid="bu:6h-y">
                                    <Clock
                                        className="w-8 h-8 text-blue-600 mr-3"
                                        data-oid="ya.p_o-"
                                    />

                                    <h3
                                        className="text-2xl font-bold text-gray-800"
                                        data-oid="bb6slr9"
                                    >
                                        운영 시간
                                    </h3>
                                </div>
                                <div className="space-y-4" data-oid="wbezr45">
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                        data-oid="d0b8xi4"
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                            data-oid="pqljokp"
                                        >
                                            평일
                                        </span>
                                        <span className="text-gray-600" data-oid="hyt:alw">
                                            09:00 - 18:00
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                        data-oid="tps1370"
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                            data-oid="odzuom3"
                                        >
                                            토요일
                                        </span>
                                        <span className="text-gray-600" data-oid="mpwv5ac">
                                            09:00 - 13:00
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                        data-oid="7evxwh3"
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                            data-oid="ax9afe7"
                                        >
                                            일요일/공휴일
                                        </span>
                                        <span className="text-red-500" data-oid=".l1wajf">
                                            휴무
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg" data-oid="y7u5j7e">
                                    <div className="flex items-center" data-oid="nr0yede">
                                        <AlertCircle
                                            className="w-5 h-5 text-blue-600 mr-2"
                                            data-oid="231rotk"
                                        />

                                        <span
                                            className="text-sm text-blue-800 font-medium"
                                            data-oid="3vl_xmx"
                                        >
                                            이메일 문의는 24시간 접수 가능합니다
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white rounded-2xl shadow-lg p-8" data-oid="a3zih-i">
                                <div className="flex items-center mb-6" data-oid="nh8z6qz">
                                    <MapPin
                                        className="w-8 h-8 text-blue-600 mr-3"
                                        data-oid="ou6ya_y"
                                    />

                                    <h3
                                        className="text-2xl font-bold text-gray-800"
                                        data-oid=".c3uqkh"
                                    >
                                        오시는 길
                                    </h3>
                                </div>
                                <div className="space-y-3" data-oid="ya5afka">
                                    <p className="text-gray-700" data-oid="3u-ak.:">
                                        <strong data-oid="92twf:7">주소:</strong> 서울특별시 강남구
                                        테헤란로 123
                                    </p>
                                    <p className="text-gray-700" data-oid="4slt.w_">
                                        <strong data-oid="mw1yucx">지하철:</strong> 2호선 강남역 3번
                                        출구 도보 5분
                                    </p>
                                    <p className="text-gray-700" data-oid="w29i6zw">
                                        <strong data-oid="gtwrvkj">버스:</strong> 146, 740, 341번
                                        강남역 하차
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Features */}
            <section className="py-16 bg-white" data-oid="vgxswdd">
                <div className="max-w-6xl mx-auto px-6" data-oid="jizp4l4">
                    <div className="text-center mb-12" data-oid=":36vorn">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4" data-oid="y.g84.q">
                            TripAI 고객센터의 특별함
                        </h2>
                        <p className="text-xl text-gray-600" data-oid="lyffyw6">
                            고객 만족을 위한 최고의 서비스를 제공합니다
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="a8f2z3u"
                    >
                        {supportFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                                data-oid="m9yyn4j"
                            >
                                <div
                                    className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid="ez-3r6_"
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    className="text-lg font-bold text-gray-800 mb-2"
                                    data-oid="m5ct8d8"
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600" data-oid="_87x.rc">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section
                className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                data-oid="z:f_ik0"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="6z928:o">
                    <Star className="w-12 h-12 mx-auto mb-6 text-yellow-300" data-oid="f-cak8v" />
                    <h2 className="text-3xl font-bold mb-4" data-oid="hrkwh5_">
                        고객 만족도 98%
                    </h2>
                    <p className="text-xl text-blue-100 mb-8" data-oid="91avkdx">
                        "친절하고 빠른 응답으로 문제를 해결해주셔서 감사합니다!"
                    </p>
                    <div className="flex justify-center space-x-1 mb-6" data-oid="rbumag4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-6 h-6 text-yellow-300 fill-current"
                                data-oid="no6uq5w"
                            />
                        ))}
                    </div>
                    <p className="text-blue-200" data-oid=":m1wcxx">
                        - 실제 고객 후기 중 -
                    </p>
                </div>
            </section>
        </div>
    );
}
