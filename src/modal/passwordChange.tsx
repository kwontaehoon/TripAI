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
     
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
       
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
         
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
             
            >
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h2
              className="text-xl font-semibold text-gray-900"
             
            >
              비밀번호 변경
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
           
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
         
        >
          {/* New Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
             
            >
              새 비밀번호
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                  errors.newPassword ? "!border-red-300" : "!border-gray-300"
                }`}
                placeholder="새 비밀번호를 입력하세요"
               
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
               
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newPassword}
              </p>
            )}

            {/* Password Requirements */}
            {newPassword && (
              <div className="mt-3 space-y-2">
                <p
                  className="text-sm font-medium text-gray-700"
                 
                >
                  비밀번호 조건:
                </p>
                <div className="space-y-1">
                  {[
                    { key: "minLength", text: "8자 이상" },
                    { key: "hasLowerCase", text: "소문자 포함" },
                    { key: "hasNumbers", text: "숫자 포함" },
                    { key: "hasSpecialChar", text: "특수문자 포함" },
                  ].map(({ key, text }) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2"
                     
                    >
                      <Check
                        className={`w-4 h-4 ${
                          passwordValidation[
                            key as keyof typeof passwordValidation
                          ]
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                       
                      />

                      <span
                        className={`text-sm ${
                          passwordValidation[
                            key as keyof typeof passwordValidation
                          ]
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                       
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
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
             
            >
              새 비밀번호 확인
            </label>
            <div className="relative">
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
               
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
               
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p
                className="mt-1 text-sm text-green-600 flex items-center space-x-1"
               
              >
                <Check className="w-4 h-4" />
                <span>비밀번호가 일치합니다</span>
              </p>
            )}
          </div>

          {errors.submit && (
            <div
              className="p-3 bg-red-50 border !border-red-200 rounded-lg"
             
            >
              <p className="text-sm text-red-600">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border !border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
             
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
             
            >
              {isLoading ? (
                <div
                  className="flex items-center justify-center space-x-2"
                 
                >
                  <div
                    className="w-4 h-4 border-2 !border-white border-t-transparent rounded-full animate-spin"
                   
                  ></div>
                  <span>변경 중...</span>
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
