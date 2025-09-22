"use client"

import { useState } from "react"
import { X, Eye, EyeOff, Lock, Check } from "lucide-react"
import { useAtom, useSetAtom } from "jotai"
import { passwordChangeAtom } from "@/store/ai"
import { createClient } from "@/service/supabase/client"

export default function PasswordChangeModal() {
  const [passwordChangeModal, setPasswordChangeModal] =
    useAtom(passwordChangeAtom)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      minLength,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasLowerCase && hasNumbers && hasSpecialChar,
    }
  }

  const passwordValidation = validatePassword(newPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = await createClient()
    setErrors({})

    if (!passwordValidation.isValid) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "비밀번호 조건을 만족해주세요.",
      }))
      return
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "새 비밀번호가 일치하지 않습니다.",
      }))
      return
    }

    setIsLoading(true)

    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 성공 처리
      await supabase.auth.updateUser({ password: newPassword })
      alert("비밀번호가 성공적으로 변경되었습니다.")
      handleClose()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setNewPassword("")
    setConfirmPassword("")
    setErrors({})
    setPasswordChangeModal(false)
  }

  if (!passwordChangeModal) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      data-oid="rklw:e8"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        data-oid="_9p.a0t"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
          data-oid="ucqtcub"
        >
          <div className="flex items-center space-x-3" data-oid="i..6ble">
            <div
              className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
              data-oid="v_pxywd"
            >
              <Lock className="w-5 h-5 text-blue-600" data-oid="srl6su0" />
            </div>
            <h2
              className="text-xl font-semibold text-gray-900"
              data-oid="ebp3k:a"
            >
              비밀번호 변경
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            data-oid=":eymfqx"
          >
            <X className="w-5 h-5 text-gray-500" data-oid="aub5-85" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
          data-oid="mwqpmmh"
        >
          {/* New Password */}
          <div data-oid="owfj7ba">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="v8e2v7o"
            >
              새 비밀번호
            </label>
            <div className="relative" data-oid="qxmlz8j">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                  errors.newPassword ? "!border-red-300" : "!border-gray-300"
                }`}
                placeholder="새 비밀번호를 입력하세요"
                data-oid="4xs4cib"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                data-oid="0fm-7cg"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" data-oid="v84br0h" />
                ) : (
                  <Eye className="w-5 h-5" data-oid="a0hlrng" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600" data-oid="mw7-3bo">
                {errors.newPassword}
              </p>
            )}

            {/* Password Requirements */}
            {newPassword && (
              <div className="mt-3 space-y-2" data-oid="b64f.c8">
                <p
                  className="text-sm font-medium text-gray-700"
                  data-oid="2tmocrm"
                >
                  비밀번호 조건:
                </p>
                <div className="space-y-1" data-oid="jey7-61">
                  {[
                    { key: "minLength", text: "8자 이상" },
                    { key: "hasLowerCase", text: "소문자 포함" },
                    { key: "hasNumbers", text: "숫자 포함" },
                    { key: "hasSpecialChar", text: "특수문자 포함" },
                  ].map(({ key, text }) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2"
                      data-oid="zh3_6j6"
                    >
                      <Check
                        className={`w-4 h-4 ${
                          passwordValidation[
                            key as keyof typeof passwordValidation
                          ]
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                        data-oid=":3lktdw"
                      />

                      <span
                        className={`text-sm ${
                          passwordValidation[
                            key as keyof typeof passwordValidation
                          ]
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                        data-oid="kblbb_2"
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div data-oid="kx9hasj">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="xqa4w:."
            >
              새 비밀번호 확인
            </label>
            <div className="relative" data-oid="rx3prfh">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                  errors.confirmPassword
                    ? "!border-red-300"
                    : "!border-gray-300"
                }`}
                placeholder="새 비밀번호를 다시 입력하세요"
                data-oid=".ee4z5p"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                data-oid="xettmib"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" data-oid="7cqilnb" />
                ) : (
                  <Eye className="w-5 h-5" data-oid="h:g:5ec" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600" data-oid="7_6-5ss">
                {errors.confirmPassword}
              </p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p
                className="mt-1 text-sm text-green-600 flex items-center space-x-1"
                data-oid="1hd6_t8"
              >
                <Check className="w-4 h-4" data-oid="010:1xm" />
                <span data-oid="nx:s8f9">비밀번호가 일치합니다</span>
              </p>
            )}
          </div>

          {errors.submit && (
            <div
              className="p-3 bg-red-50 border !border-red-200 rounded-lg"
              data-oid="krorx.3"
            >
              <p className="text-sm text-red-600" data-oid="4r_.r3s">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4" data-oid="tba0.ah">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border !border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-oid="562_kh8"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={
                isLoading ||
                !passwordValidation.isValid ||
                newPassword !== confirmPassword
              }
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              data-oid="2tce2mg"
            >
              {isLoading ? (
                <div
                  className="flex items-center justify-center space-x-2"
                  data-oid="z27aibz"
                >
                  <div
                    className="w-4 h-4 border-2 !border-white border-t-transparent rounded-full animate-spin"
                    data-oid="pe:cypa"
                  ></div>
                  <span data-oid="8e-h-l7">변경 중...</span>
                </div>
              ) : (
                "비밀번호 변경"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
