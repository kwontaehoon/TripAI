"use client"

import { createClient } from "@/service/supabase/client"
import {
  Apple,
  Chrome,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import KakaoSVG from "../../../public/svg/kakao.svg"
import GoogleSVG from "../../../public/svg/google.svg"
import AppleSVG from "../../../public/svg/apple.svg"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 로그인 실패시 경고문
  const [validationLogin, setValidationLogin] = useState(false)
  const redirectToUrl = process.env.NEXT_PUBLIC_SITE_URL

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: redirectToUrl,
      },
    })
  }
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectToUrl,
      },
    })
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 로그인 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (error) {
      setValidationLogin(true)
    } else {
      window.location.replace('/');
    }
    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인은 준비 중입니다.`)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div
          className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden"
         
        >
          {/* Header Section */}
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center"
           
          >
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
             
            >
              <User className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              로그인
            </h1>
            <p className="text-blue-100">
              TripAI와 함께 완벽한 여행을 계획해보세요
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
             
            >
              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                 
                >
                  이메일
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                   
                  >
                    <Mail
                      className="w-5 h-5 text-gray-400"
                     
                    />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                   
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                 
                >
                  비밀번호
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                   
                  >
                    <Lock
                      className="w-5 h-5 text-gray-400"
                     
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-10 pr-12 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                   
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                   
                  >
                    {showPassword ? (
                      <EyeOff
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                       
                      />
                    ) : (
                      <Eye
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                       
                      />
                    )}
                  </button>
                </div>
                {validationLogin && (
                  <div className="mt-2 text-sm text-red-500">
                    이메일 또는 비밀번호를 다시 확인해주세요.
                  </div>
                )}
              </div>

              {/* Remember & Forgot */}
              <div
                className="flex items-center justify-between"
               
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 !border-gray-300 rounded focus:ring-blue-500"
                   
                  />

                  <span
                    className="ml-2 text-sm text-gray-600"
                   
                  >
                    로그인 상태 유지
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                 
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
               
              >
                {isLoading ? (
                  <div
                    className="flex items-center justify-center"
                   
                  >
                    <div
                      className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"
                     
                    ></div>
                    로그인 중...
                  </div>
                ) : (
                  "로그인"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                 
                >
                  <div
                    className="w-full border-t !border-gray-300"
                   
                  ></div>
                </div>
                <div
                  className="relative flex justify-center text-sm"
                 
                >
                  <span
                    className="px-2 bg-white text-gray-500"
                   
                  >
                    또는
                  </span>
                </div>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
               
              >
                <Image
                  src={GoogleSVG}
                  alt="kakao login svg"
                  className="w-5 h-5 mr-3"
                />
                <span className="text-gray-700 font-medium">
                  Google로 로그인
                </span>
              </button>

              <button
                onClick={signInWithKakao}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
               
              >
                <Image
                  src={KakaoSVG}
                  alt="kakao login svg"
                  className="w-5 h-5 mr-3"
                />
                <span className="text-gray-700 font-medium">
                  Kakao로 로그인
                </span>
              </button>

              <button
                onClick={() => handleSocialLogin("Apple")}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
               
              >
                <Image
                  src={AppleSVG}
                  alt="kakao login svg"
                  className="w-5 h-5 mr-3"
                />
                <span className="text-gray-700 font-medium">
                  Apple로 로그인
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                아직 계정이 없으신가요?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                 
                >
                  회원가입
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 text-center text-xs text-gray-500"
         
        >
          <p>
            로그인하시면 TripAI의 서비스 약관 및 개인정보 처리방침에 동의하는
            것으로 간주됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
