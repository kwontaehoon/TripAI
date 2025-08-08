"use client"

import {
  useEmailCheckMutation,
  useEmailCheckQuery,
  useSignupMutation,
} from "@/hooks/supabase/dev"
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
import { useEffect, useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })
  // 이메일 중복시 경고문
  const [validationEmail, setValidationEmail] = useState(false)

  const { mutateAsync: emailCheck } = useEmailCheckMutation(
    formData.email,
  )
  const { mutate: signup } = useSignupMutation(formData)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.trim(),
    }))
  }

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.")
      return
    }

    if(formData.password.length < 6) {
      alert("비밀번호를 확인해주세요.")
      return
    }

    setIsLoading(true)

    // 회원가입 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // emailRedirectTo: 'https://example.com/welcome',
        data: {
          display_name: formData.name,
        },
      },
    })
    const emailCheckFlag = await emailCheck()
    if (emailCheckFlag) {
      setValidationEmail(true)
    } else {
      signup()
      alert("회원가입이 완료되었습니다!")
      router.push("/login")
    }
    setIsLoading(false)
    // router.push("/login")
  }

  const handleSocialSignup = (provider: string) => {
    alert(`${provider} 회원가입은 준비 중입니다.`)
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    agreements.terms &&
    agreements.privacy

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="3p_j6uq"
    >
      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8" data-oid="n-ubj9l">
        <div
          className="bg-white rounded-2xl shadow-xl border !border-gray-200 overflow-hidden"
          data-oid="v:s80ij"
        >
          {/* Header Section */}
          <div
            className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 text-white text-center"
            data-oid="yb-txva"
          >
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              data-oid="38g__07"
            >
              <User className="w-8 h-8" data-oid="ya2fl7w" />
            </div>
            <h1 className="text-2xl font-bold mb-2" data-oid="ou26vw_">
              회원가입
            </h1>
            <p className="text-green-100" data-oid="k2zuyjn">
              TripAI와 함께 특별한 여행을 시작해보세요
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6" data-oid="m9y4:lo">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-oid="1aelhtd"
            >
              {/* Name */}
              <div data-oid="b9vtzow">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="3o5d5:-"
                >
                  이름 *
                </label>
                <div className="relative" data-oid="cpkpf8r">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="7ovy.pn"
                  >
                    <User
                      className="w-5 h-5 text-gray-400"
                      data-oid="__s.e-q"
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:!border-transparent"
                    required
                    data-oid="svneqbo"
                  />
                </div>
              </div>

              {/* Email */}
              <div data-oid="zem3648">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="zmvipa."
                >
                  이메일 *
                </label>
                <div className="relative" data-oid="9iyqksf">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="l7x---8"
                  >
                    <Mail
                      className="w-5 h-5 text-gray-400"
                      data-oid="abig:uh"
                    />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => { handleInputChange("email", e.target.value); setValidationEmail(false)}}
                    placeholder="이메일을 입력하세요"
                    className="w-full pl-10 pr-4 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:!border-transparent"
                    required
                    data-oid="b-lmb0w"
                  />
                </div>
                {validationEmail && <div className="mt-2 text-sm text-red-500">이미 사용 중인 이메일입니다.</div>}
              </div>

              {/* Password */}
              <div data-oid="z4vkd8n">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="bxek:gl"
                >
                  비밀번호 *
                </label>
                <div className="relative" data-oid="l83xtz:">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="ix_y9pi"
                  >
                    <Lock
                      className="w-5 h-5 text-gray-400"
                      data-oid="bpv5og."
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-10 pr-12 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:!border-transparent"
                    required
                    data-oid="nk17a:r"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    data-oid="e58ms6s"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid="09atqb5"
                      />
                    ) : (
                      <Eye
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid="hp1co84"
                      />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500" data-oid="1gccjkm">
                  6자 이상, 영문, 숫자, 특수문자 포함
                </p>
              </div>

              {/* Confirm Password */}
              <div data-oid="yzat3va">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="_85a224"
                >
                  비밀번호 확인 *
                </label>
                <div className="relative" data-oid="xi0j5um">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    data-oid="u211jz6"
                  >
                    <Lock
                      className="w-5 h-5 text-gray-400"
                      data-oid="-jbyk5t"
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="비밀번호를 다시 입력하세요"
                    className="w-full pl-10 pr-12 py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:!border-transparent"
                    required
                    data-oid="8cice:w"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    data-oid="o:1v1an"
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid="6tdme02"
                      />
                    ) : (
                      <Eye
                        className="w-5 h-5 text-gray-400 hover:text-gray-600"
                        data-oid="gl589n1"
                      />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 mt-2" data-oid=".-pp83e">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
              </div>

              {/* Agreements */}
              <div className="space-y-3" data-oid="ipscg7d">
                <div className="flex items-center" data-oid=":jy0jru">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreements.terms}
                    onChange={(e) =>
                      handleAgreementChange("terms", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 !border-gray-300 rounded focus:ring-blue-500"
                    data-oid="1wrr2_1"
                  />

                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-700"
                    data-oid="5moxl64"
                  >
                    <span className="text-red-500" data-oid="3592lkl">
                      *
                    </span>{" "}
                    서비스 이용약관에 동의합니다
                  </label>
                </div>

                <div className="flex items-center" data-oid="t47zr33">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreements.privacy}
                    onChange={(e) =>
                      handleAgreementChange("privacy", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 !border-gray-300 rounded focus:ring-blue-500"
                    data-oid="9ikhfvf"
                  />

                  <label
                    htmlFor="privacy"
                    className="ml-2 text-sm text-gray-700"
                    data-oid="q-7juyo"
                  >
                    <span className="text-red-500" data-oid="t-5o:ig">
                      *
                    </span>{" "}
                    개인정보 처리방침에 동의합니다
                  </label>
                </div>

                <div className="flex items-center" data-oid="89x9z_1">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={agreements.marketing}
                    onChange={(e) =>
                      handleAgreementChange("marketing", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 !border-gray-300 rounded focus:ring-blue-500"
                    data-oid="erl5p35"
                  />

                  <label
                    htmlFor="marketing"
                    className="ml-2 text-sm text-gray-700"
                    data-oid="x2uj8gf"
                  >
                    마케팅 정보 수신에 동의합니다 (선택)
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                data-oid="9fo:h4e"
              >
                {isLoading ? (
                  <div
                    className="flex items-center justify-center"
                    data-oid=".wca-q_"
                  >
                    <div
                      className="w-5 h-5 border-2 !border-white border-t-transparent rounded-full animate-spin mr-2"
                      data-oid="-p1rfrz"
                    ></div>
                    회원가입 중...
                  </div>
                ) : (
                  "회원가입"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6" data-oid="76c61bz">
              <div className="relative" data-oid="3cnga1m">
                <div
                  className="absolute inset-0 flex items-center"
                  data-oid="5z0q7dh"
                >
                  <div
                    className="w-full border-t !border-gray-300"
                    data-oid="sygy.gu"
                  ></div>
                </div>
                <div
                  className="relative flex justify-center text-sm"
                  data-oid="59b3k4l"
                >
                  <span
                    className="px-2 bg-white text-gray-500"
                    data-oid="gjjlmy-"
                  >
                    또는
                  </span>
                </div>
              </div>
            </div>

            {/* Social Signup */}
            <div className="space-y-3" data-oid="9ja2mez">
              <button
                onClick={() => handleSocialSignup("Google")}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="m6ubwv5"
              >
                <Chrome
                  className="w-5 h-5 text-red-500 mr-3"
                  data-oid="8-78sax"
                />
                <span className="text-gray-700 font-medium" data-oid="ziz2eto">
                  Google로 회원가입
                </span>
              </button>

              <button
                onClick={() => handleSocialSignup("GitHub")}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="nals0pz"
              >
                <Github
                  className="w-5 h-5 text-gray-900 mr-3"
                  data-oid="cafij9x"
                />
                <span className="text-gray-700 font-medium" data-oid="9c.qkm9">
                  GitHub로 회원가입
                </span>
              </button>

              <button
                onClick={() => handleSocialSignup("Apple")}
                className="w-full flex items-center justify-center px-4 py-3 border !border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-oid="ejj_65j"
              >
                <Apple
                  className="w-5 h-5 text-gray-900 mr-3"
                  data-oid="2lv5jpc"
                />
                <span className="text-gray-700 font-medium" data-oid="e2u3rn5">
                  Apple로 회원가입
                </span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center" data-oid="j1fjyj3">
              <p className="text-sm text-gray-600" data-oid="fs8f61:">
                이미 계정이 있으신가요?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  data-oid="xxo2ojp"
                >
                  로그인
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 text-center text-xs text-gray-500"
          data-oid="w93fiz4"
        >
          <p data-oid="dg6osqc">
            회원가입하시면 TripAI의 서비스 약관 및 개인정보 처리방침에 동의하는
            것으로 간주됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
