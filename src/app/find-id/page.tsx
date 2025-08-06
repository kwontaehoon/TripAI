'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Phone, Mail, CheckCircle, AlertCircle, User } from 'lucide-react';

export default function FindIdPage() {
    const router = useRouter();
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [foundId, setFoundId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // 유효성 검사
        if (!name.trim()) {
            setError('이름을 입력해주세요.');
            setIsLoading(false);
            return;
        }

        if (method === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('올바른 이메일 주소를 입력해주세요.');
                setIsLoading(false);
                return;
            }
        } else {
            const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
            if (!phoneRegex.test(phone.replace(/-/g, ''))) {
                setError('올바른 휴대폰 번호를 입력해주세요.');
                setIsLoading(false);
                return;
            }
        }

        // 아이디 찾기 로직 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 더미 데이터로 아이디 찾기 결과 시뮬레이션
        const dummyIds = ['user123@example.com', 'traveler456@gmail.com', 'explorer789@naver.com'];
        const randomId = dummyIds[Math.floor(Math.random() * dummyIds.length)];
        
        setFoundId(randomId);
        setIsLoading(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28">
                
                {/* Success Content */}
                <main className="max-w-md mx-auto px-4 py-8">
                    <div className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">아이디 찾기 완료</h1>
                            <p className="text-green-100">
                                입력하신 정보와 일치하는 아이디를 찾았습니다
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="bg-green-50 rounded-lg p-6 mb-4">
                                    <div className="flex items-center justify-center mb-3">
                                        <User className="w-6 h-6 text-green-600 mr-2" />
                                        <span className="text-sm font-medium text-green-800">찾은 아이디</span>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border !border-green-200">
                                        <p className="text-lg font-bold text-gray-900">{foundId}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        <p className="text-left">위 아이디로 로그인하실 수 있습니다</p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        <p className="text-left">비밀번호를 잊으셨다면 비밀번호 찾기를 이용하세요</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                                >
                                    로그인하러 가기
                                </button>
                                
                                <button
                                    onClick={() => router.push('/forgot-password')}
                                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    비밀번호 찾기
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28">
            
            {/* Main Content */}
            <main className="max-w-md mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">아이디 찾기</h1>
                        <p className="text-purple-100">
                            가입 시 입력한 정보로 아이디를 찾아드립니다
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-6">
                        {/* Method Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                찾기 방법 선택
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMethod('email')}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                        method === 'email'
                                            ? '!border-purple-500 bg-purple-50 text-purple-700'
                                            : '!border-gray-200 hover:!border-gray-300'
                                    }`}
                                >
                                    <Mail className="w-5 h-5 mx-auto mb-1" />
                                    <span className="text-sm font-medium">이메일</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod('phone')}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                        method === 'phone'
                                            ? '!border-purple-500 bg-purple-50 text-purple-700'
                                            : '!border-gray-200 hover:!border-gray-300'
                                    }`}
                                >
                                    <Phone className="w-5 h-5 mx-auto mb-1" />
                                    <span className="text-sm font-medium">휴대폰</span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    이름
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="가입 시 입력한 이름"
                                        className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email or Phone Input */}
                            {method === 'email' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        이메일 주소
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="가입 시 입력한 이메일"
                                            className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        휴대폰 번호
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="010-1234-5678"
                                            className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center space-x-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Info Box */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">
                                    📝 안내사항
                                </h3>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• 가입 시 입력한 정보와 정확히 일치해야 합니다</li>
                                    <li>• 여러 개의 아이디가 있을 경우 모두 표시됩니다</li>
                                    <li>• 정보가 일치하지 않으면 아이디를 찾을 수 없습니다</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !name || (method === 'email' ? !email : !phone)}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        찾는 중...
                                    </div>
                                ) : (
                                    '아이디 찾기'
                                )}
                            </button>
                        </form>

                        {/* Links */}
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-600">
                                아이디가 기억나셨나요?{' '}
                                <button
                                    onClick={() => router.push('/login')}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    로그인하기
                                </button>
                            </p>
                            <p className="text-sm text-gray-600">
                                비밀번호를 잊으셨나요?{' '}
                                <button
                                    onClick={() => router.push('/forgot-password')}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    비밀번호 찾기
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>
                        문제가 지속되면 고객센터로 문의해주세요.
                    </p>
                </div>
            </main>
        </div>
    );
}