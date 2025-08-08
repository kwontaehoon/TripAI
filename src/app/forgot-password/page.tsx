'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@/service/supabase/client';

export default function ForgotPasswordPage() {
    const supabase = createClient()
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('올바른 이메일 주소를 입력해주세요.');
            setIsLoading(false);
            return;
        }

        // 비밀번호 재설정 로직 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setIsSuccess(true);
    };

      const signInWithEmail = async() => {
        await supabase.auth.resetPasswordForEmail('gju04195@google.com', {
            redirectTo: 'http://localhost:3000/reset-password',
          })
      }

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
                            <h1 className="text-2xl font-bold mb-2">이메일 전송 완료</h1>
                            <p className="text-green-100">
                                비밀번호 재설정 링크를 보내드렸습니다
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="bg-green-50 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-green-800 font-medium mb-2">
                                        📧 이메일을 확인해주세요
                                    </p>
                                    <p className="text-xs text-green-700">
                                        <strong>{email}</strong>로 비밀번호 재설정 링크를 보내드렸습니다.
                                    </p>
                                </div>
                                
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        <p className="text-left">이메일이 도착하지 않았다면 스팸함을 확인해주세요</p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        <p className="text-left">링크는 24시간 동안 유효합니다</p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        <p className="text-left">링크를 클릭하여 새 비밀번호를 설정하세요</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
                                >
                                    이메일 다시 보내기
                                </button>
                                
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    로그인 페이지로 돌아가기
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
                {/* <div onClick={signInWithEmail}>비밀번호 찾기</div> */}
            {/* Main Content */}
            <main className="max-w-md mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-8 text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">비밀번호 찾기</h1>
                        <p className="text-orange-100">
                            가입하신 이메일로 재설정 링크를 보내드립니다
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
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
                                        placeholder="가입하신 이메일을 입력하세요"
                                        className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="mt-2 flex items-center space-x-2 text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">
                                    📝 안내사항
                                </h3>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• 가입하신 이메일 주소를 정확히 입력해주세요</li>
                                    <li>• 비밀번호 재설정 링크가 이메일로 전송됩니다</li>
                                    <li>• 링크는 24시간 동안 유효합니다</li>
                                    <li>• 이메일이 오지 않으면 스팸함을 확인해주세요</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        전송 중...
                                    </div>
                                ) : (
                                    '비밀번호 재설정 링크 보내기'
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                비밀번호가 기억나셨나요?{' '}
                                <button
                                    onClick={() => router.push('/login')}
                                    className="text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    로그인하기
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