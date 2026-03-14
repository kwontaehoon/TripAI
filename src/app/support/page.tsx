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
            icon: <Phone className="w-8 h-8" />,
            title: '전화 상담',
            description: '즉시 전문 상담원과 연결',
            contact: '1588-1234',
            action: '전화걸기',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: <Mail className="w-8 h-8" />,
            title: '이메일 문의',
            description: '24시간 언제든지 문의',
            contact: 'support@tripai.com',
            action: '이메일 보내기',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: '실시간 채팅',
            description: '빠른 답변과 즉시 해결',
            contact: '평일 09:00-18:00',
            action: '채팅 시작',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const supportFeatures = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: '빠른 응답',
            description: '평균 2시간 이내 답변',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: '안전한 상담',
            description: '개인정보 완벽 보호',
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: '다국어 지원',
            description: '한국어, 영어, 일본어',
        },
        {
            icon: <Heart className="w-6 h-6" />,
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-36"
               
            >
                <div className="max-w-4xl mx-auto text-center px-6">
                    <Headphones
                        className="w-16 h-16 mx-auto mb-6 text-blue-200"
                       
                    />

                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        고객센터
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        TripAI 사용 중 도움이 필요하시나요? 전문 상담원이 친절하고 신속하게
                        도와드리겠습니다.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            문의 방법 선택
                        </h2>
                        <p className="text-xl text-gray-600">
                            가장 편리한 방법으로 문의해주세요
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl bg-gradient-to-br ${method.color} text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                               
                            >
                                <div
                                    className="mb-6 p-3 bg-white/20 rounded-full w-fit"
                                   
                                >
                                    {method.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">
                                    {method.title}
                                </h3>
                                <p className="text-white/90 mb-4">
                                    {method.description}
                                </p>
                                <div className="text-lg font-semibold mb-6">
                                    {method.contact}
                                </div>
                                <button
                                    className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
                                   
                                >
                                    {method.action}
                                    <ArrowRight
                                        className="inline w-4 h-4 ml-2"
                                       
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Hours */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="mb-8">
                                <h3
                                    className="text-2xl font-bold text-gray-800 mb-2"
                                   
                                >
                                    1:1 문의하기
                                </h3>
                                <p className="text-gray-600">
                                    자세한 문의사항을 남겨주시면 빠르게 답변드리겠습니다.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                   
                                >
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                           
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
                                           
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                           
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
                                           
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                       
                                    >
                                        문의 유형 *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border !border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                       
                                    >
                                        <option value="">
                                            문의 유형을 선택해주세요
                                        </option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                       
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
                                       
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                       
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
                                   
                                >
                                    {isSubmitting ? (
                                        <div
                                            className="flex items-center justify-center"
                                           
                                        >
                                            <div
                                                className="animate-spin rounded-full h-5 w-5 border-b-2 !border-white mr-2"
                                               
                                            ></div>
                                            전송 중...
                                        </div>
                                    ) : submitStatus === 'success' ? (
                                        <div
                                            className="flex items-center justify-center"
                                           
                                        >
                                            <CheckCircle
                                                className="w-5 h-5 mr-2"
                                               
                                            />
                                            전송 완료!
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-center justify-center"
                                           
                                        >
                                            <Send className="w-5 h-5 mr-2" />
                                            문의하기
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Support Hours & Info */}
                        <div className="space-y-8">
                            {/* Operating Hours */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center mb-6">
                                    <Clock
                                        className="w-8 h-8 text-blue-600 mr-3"
                                       
                                    />

                                    <h3
                                        className="text-2xl font-bold text-gray-800"
                                       
                                    >
                                        운영 시간
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                       
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                           
                                        >
                                            평일
                                        </span>
                                        <span className="text-gray-600">
                                            09:00 - 18:00
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                       
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                           
                                        >
                                            토요일
                                        </span>
                                        <span className="text-gray-600">
                                            09:00 - 13:00
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b !border-gray-100"
                                       
                                    >
                                        <span
                                            className="font-medium text-gray-700"
                                           
                                        >
                                            일요일/공휴일
                                        </span>
                                        <span className="text-red-500">
                                            휴무
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center">
                                        <AlertCircle
                                            className="w-5 h-5 text-blue-600 mr-2"
                                           
                                        />

                                        <span
                                            className="text-sm text-blue-800 font-medium"
                                           
                                        >
                                            이메일 문의는 24시간 접수 가능합니다
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center mb-6">
                                    <MapPin
                                        className="w-8 h-8 text-blue-600 mr-3"
                                       
                                    />

                                    <h3
                                        className="text-2xl font-bold text-gray-800"
                                       
                                    >
                                        오시는 길
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-gray-700">
                                        <strong>주소:</strong> 서울특별시 강남구
                                        테헤란로 123
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>지하철:</strong> 2호선 강남역 3번
                                        출구 도보 5분
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>버스:</strong> 146, 740, 341번
                                        강남역 하차
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Features */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            TripAI 고객센터의 특별함
                        </h2>
                        <p className="text-xl text-gray-600">
                            고객 만족을 위한 최고의 서비스를 제공합니다
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                       
                    >
                        {supportFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                               
                            >
                                <div
                                    className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                                   
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    className="text-lg font-bold text-gray-800 mb-2"
                                   
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
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
               
            >
                <div className="max-w-4xl mx-auto text-center px-6">
                    <Star className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
                    <h2 className="text-3xl font-bold mb-4">
                        고객 만족도 98%
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        "친절하고 빠른 응답으로 문제를 해결해주셔서 감사합니다!"
                    </p>
                    <div className="flex justify-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-6 h-6 text-yellow-300 fill-current"
                               
                            />
                        ))}
                    </div>
                    <p className="text-blue-200">
                        - 실제 고객 후기 중 -
                    </p>
                </div>
            </section>
        </div>
    );
}
