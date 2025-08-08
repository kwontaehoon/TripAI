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
  User
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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

  const signInWithKakao = async() => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
  }
  const signInWithGoogle = async() => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
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
    if(error){
      setValidationLogin(true)
    }else {
      router.push("/")
    }
    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인은 준비 중입니다.`)
  }

  return (
    
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="mhostj3"
    >
      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8" data-oid="9o95ikd">
        <div
          className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden"
          data-oid="omuz-w_"
        >
          {/* Header Section */}
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center"
            data-oid="q:z4pj."
          >
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              data-oid="1-ja65r"
            >
              <User className="w-8 h-8" data-oid="aid--y9" />
            </div>
            <h1 className="text-2xl font-bold mb-2" data-oid="kb-yxea">
              로그인
            </h1>
            <p className="text-blue-100" data-oid=".k3_top">
              TripAI와 함께 완벽한 여행을 계획해보세요
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6" data-oid="50.b_65">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-oid="251bk5d"
            >
              {/* Email */}
              <div data-oid="ags60ul">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid=".4gn_oh"
                >
                  이메일
                </label>
                <div className="relative" data-oid=".-cj126">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="sd_p91a"
                  >
                    <Mail
                      className="w-5 h-5 text-gray-400"
                      data-oid="0y.ru8u"
                    />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    data-oid="9yp7hip"
                  />
                </div>
              </div>

              {/* Password */}
              <div data-oid="n._uo.c">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="3tj5e1x"
                >
                  비밀번호
                </label>
                <div className="relative" data-oid="fo_6p4f">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="7.v.q:y"
                  >
                    <Lock
                      className="w-5 h-5 text-gray-400"
                      data-oid="4mrmfk."
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
                    data-oid="jhxj2_9"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    data-oid="6ma-syq"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid="bdwa8-3"
                      />
                    ) : (
                      <Eye
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid=":2mp.n-"
                      />
                    )}
                  </button>
                </div>
                {validationLogin && <div className="mt-2 text-sm text-red-500">이메일 또는 비밀번호를 다시 확인해주세요.</div>}
              </div>
              
              {/* Remember & Forgot */}
              <div
                className="flex items-center justify-between"
                data-oid="4tzi7eo"
              >
                <label className="flex items-center" data-oid="qcr5tha">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 !border-gray-300 rounded focus:ring-blue-500"
                    data-oid="fvmd_w_"
                  />

                  <span
                    className="ml-2 text-sm text-gray-600"
                    data-oid="8wdb_9g"
                  >
                    로그인 상태 유지
                  </span>
                </label>
                <button
                  type="button"
                  onClick={()=>router.push("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  data-oid="d8jnawz"
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                data-oid="80:kxfi"
              >
                {isLoading ? (
                  <div
                    className="flex items-center justify-center"
                    data-oid="35fbjdw"
                  >
                    <div
                      className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"
                      data-oid="jcsi3:8"
                    ></div>
                    로그인 중...
                  </div>
                ) : (
                  "로그인"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6" data-oid="x.com:_">
              <div className="relative" data-oid="kj4x_.9">
                <div
                  className="absolute inset-0 flex items-center"
                  data-oid="0m-8q53"
                >
                  <div
                    className="w-full border-t !border-gray-300"
                    data-oid="zo3.4xs"
                  ></div>
                </div>
                <div
                  className="relative flex justify-center text-sm"
                  data-oid="xkrih._"
                >
                  <span
                    className="px-2 bg-white text-gray-500"
                    data-oid="8:d5r5c"
                  >
                    또는
                  </span>
                </div>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3" data-oid="lszbd-j">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="xew9kql"
              >
                <Chrome
                  className="w-5 h-5 text-red-500 mr-3"
                  data-oid="jn-c3gk"
                />
                <span className="text-gray-700 font-medium" data-oid="14ejvrq">
                  Google로 로그인
                </span>
              </button>

              <button
                onClick={signInWithKakao}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="c7pplo-"
              >
                <Github
                  className="w-5 h-5 text-gray-900 mr-3"
                  data-oid="6h:wpmm"
                />
                <span className="text-gray-700 font-medium" data-oid="uwsfaxt">
                  Kakao로 로그인
                </span>
              </button>

              <button
                onClick={() => handleSocialLogin("Apple")}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="92nzfei"
              >
                <Apple
                  className="w-5 h-5 text-gray-900 mr-3"
                  data-oid="crx9wo4"
                />
                <span className="text-gray-700 font-medium" data-oid="-6z1-aa">
                  Apple로 로그인
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center" data-oid="mgg.nea">
              <p className="text-sm text-gray-600" data-oid="xuhvlg:">
                아직 계정이 없으신가요?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  data-oid="qy2kwsa"
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
          data-oid="7pdrbeu"
        >
          <p data-oid="acvdj7x">
            로그인하시면 TripAI의 서비스 약관 및 개인정보 처리방침에 동의하는
            것으로 간주됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
