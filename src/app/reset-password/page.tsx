'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Eye, EyeOff, Lock, Shield, Key } from 'lucide-react';
import { createClient } from '@/service/supabase/client';

export default function PasswordChangePage() {
    const supabase = createClient()
    const router = useRouter();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // 새 비밀번호 강도 체크
        if (field === 'newPassword') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1:
                return { text: '매우 약함', color: 'text-red-500' };
            case 2:
                return { text: '약함', color: 'text-orange-500' };
            case 3:
                return { text: '보통', color: 'text-yellow-500' };
            case 4:
                return { text: '강함', color: 'text-green-500' };
            case 5:
                return { text: '매우 강함', color: 'text-green-600' };
            default:
                return { text: '', color: '' };
        }
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        // if (passwordStrength < 3) {
        //     alert('보안을 위해 더 강한 비밀번호를 사용해주세요.');
        //     return;
        // }

        setIsLoading(true);

        // 비밀번호 변경 로직 시뮬레이션
       await supabase.auth.updateUser({ password: formData.newPassword })

        alert('비밀번호가 성공적으로 변경되었습니다!');
        setIsLoading(false);
        router.push('/');
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
            data-oid="jqgfpep"
        >
           
            {/* Main Content */}
            <main className="max-w-md mx-auto px-4 py-8" data-oid="ma1vp9q">
                <div
                    className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden"
                    data-oid="31u6.w9"
                >
                    {/* Header Section */}
                    <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center"
                        data-oid="cuan5wa"
                    >
                        <div
                            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            data-oid="r6a6553"
                        >
                            <Shield className="w-8 h-8" data-oid="smcek8b" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2" data-oid="j26j_w-">
                            비밀번호 변경
                        </h1>
                        <p className="text-blue-100" data-oid="tjmt9u0">
                            계정 보안을 위해 정기적으로 비밀번호를 변경하세요
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-6" data-oid="rf2ls1i">
                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="_3shsrs">
                            {/* New Password */}
                            <div data-oid="new-password">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    data-oid="new-password-label"
                                >
                                    새 비밀번호
                                </label>
                                <div className="relative" data-oid="new-password-input">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                        data-oid="new-password-icon"
                                    >
                                        <Key
                                            className="w-5 h-5 text-gray-400"
                                            data-oid="new-password-icon-svg"
                                        />
                                    </div>
                                    <input
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            handleInputChange('newPassword', e.target.value)
                                        }
                                        placeholder="새 비밀번호를 입력하세요"
                                        className="w-full pl-10 pr-12 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        data-oid="new-password-field"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('new')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        data-oid="new-password-toggle"
                                    >
                                        {showPasswords.new ? (
                                            <EyeOff
                                                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                                                data-oid="0ubmug4"
                                            />
                                        ) : (
                                            <Eye
                                                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                                                data-oid="a4jz2bo"
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {formData.newPassword && (
                                    <div className="mt-2" data-oid="password-strength">
                                        <div
                                            className="flex items-center justify-between mb-1"
                                            data-oid="fd1mq2j"
                                        >
                                            <span
                                                className="text-xs text-gray-500"
                                                data-oid="_u.a7ag"
                                            >
                                                비밀번호 강도
                                            </span>
                                            <span
                                                className={`text-xs font-medium ${getPasswordStrengthText().color}`}
                                                data-oid="eaekoaj"
                                            >
                                                {getPasswordStrengthText().text}
                                            </span>
                                        </div>
                                        <div
                                            className="w-full bg-gray-200 rounded-full h-2"
                                            data-oid="vlddq5c"
                                        >
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    passwordStrength <= 1
                                                        ? 'bg-red-500'
                                                        : passwordStrength === 2
                                                          ? 'bg-orange-500'
                                                          : passwordStrength === 3
                                                            ? 'bg-yellow-500'
                                                            : passwordStrength === 4
                                                              ? 'bg-green-500'
                                                              : 'bg-green-600'
                                                }`}
                                                style={{
                                                    width: `${(passwordStrength / 5) * 100}%`,
                                                }}
                                                data-oid="57shy01"
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div data-oid="confirm-password">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    data-oid="confirm-password-label"
                                >
                                    새 비밀번호 확인
                                </label>
                                <div className="relative" data-oid="confirm-password-input">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                        data-oid="confirm-password-icon"
                                    >
                                        <Lock
                                            className="w-5 h-5 text-gray-400"
                                            data-oid="confirm-password-icon-svg"
                                        />
                                    </div>
                                    <input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            handleInputChange('confirmPassword', e.target.value)
                                        }
                                        placeholder="새 비밀번호를 다시 입력하세요"
                                        className="w-full pl-10 pr-12 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        data-oid="confirm-password-field"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        data-oid="confirm-password-toggle"
                                    >
                                        {showPasswords.confirm ? (
                                            <EyeOff
                                                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                                                data-oid="yqzdcjp"
                                            />
                                        ) : (
                                            <Eye
                                                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                                                data-oid="hzwhno:"
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Password Match Indicator */}
                                {formData.confirmPassword && (
                                    <div className="mt-2" data-oid="password-match">
                                        {formData.newPassword === formData.confirmPassword ? (
                                            <p
                                                className="text-xs text-green-600 flex items-center"
                                                data-oid="b453wwc"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    data-oid="u4ben7."
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                        data-oid="r3rjeoa"
                                                    />
                                                </svg>
                                                비밀번호가 일치합니다
                                            </p>
                                        ) : (
                                            <p
                                                className="text-xs text-red-600 flex items-center"
                                                data-oid="y:j.15v"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    data-oid="68zp:gv"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                        data-oid="nuoshqr"
                                                    />
                                                </svg>
                                                비밀번호가 일치하지 않습니다
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    formData.newPassword !== formData.confirmPassword ||
                                    passwordStrength < 2
                                }
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                data-oid="submit-button"
                            >
                                {isLoading ? (
                                    <div
                                        className="flex items-center justify-center"
                                        data-oid="loading-state"
                                    >
                                        <div
                                            className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"
                                            data-oid="loading-spinner"
                                        ></div>
                                        변경 중...
                                    </div>
                                ) : (
                                    '비밀번호 변경'
                                )}
                            </button>
                        </form>

                        {/* Password Requirements */}
                        <div
                            className="mt-6 p-4 bg-blue-50 border !border-blue-200 rounded-lg"
                            data-oid="password-requirements"
                        >
                            <h3
                                className="text-sm font-medium text-blue-800 mb-2"
                                data-oid="requirements-title"
                            >
                                비밀번호 권장사항
                            </h3>
                            <ul
                                className="text-xs text-blue-700 space-y-1"
                                data-oid="requirements-list"
                            >
                                <li className="flex items-center" data-oid="req-length">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${formData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}
                                        data-oid="oo.-xwt"
                                    ></span>
                                    최소 6자 이상
                                </li>
                                <li className="flex items-center" data-oid="req-uppercase">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}
                                        data-oid="rz0mrfj"
                                    ></span>
                                    대문자 포함
                                </li>
                                <li className="flex items-center" data-oid="req-lowercase">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}
                                        data-oid="le5o5ux"
                                    ></span>
                                    소문자 포함
                                </li>
                                <li className="flex items-center" data-oid="req-number">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}
                                        data-oid="y4c6t-l"
                                    ></span>
                                    숫자 포함
                                </li>
                                <li className="flex items-center" data-oid="req-special">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}
                                        data-oid="expd:k:"
                                    ></span>
                                    특수문자 포함
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-500" data-oid="footer">
                    <p data-oid="footer-text">
                        비밀번호 변경 후 모든 기기에서 다시 로그인해야 할 수 있습니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
