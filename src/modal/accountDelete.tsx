"use client"

import { useState } from "react"
import { X, AlertTriangle, Trash2, Shield } from "lucide-react"
import { accountDeleteAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { createAdminClient } from "@/service/supabase/admin"
import { useDeleteUserMutation } from "@/hooks/supabase/dev"
import { createClient } from "@/service/supabase/client"

export default function AccountDeleteModal() {
  const [accountDeleteModal, setAccountDeleteModal] = useAtom(accountDeleteAtom)
  const [step, setStep] = useState(1) // 1: 경고, 2: 확인, 3: 최종 확인
  const [confirmText, setConfirmText] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const CONFIRM_TEXT = "계정을 삭제합니다"

  const { mutateAsync: userDelete } = useDeleteUserMutation()

  const handleClose = () => {
    setStep(1)
    setConfirmText("")
    setPassword("")
    setErrors({})
    setAccountDeleteModal({ isOpen: false, uid: null })
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleFinalDelete = async () => {
    const supabaseAdmin = createAdminClient()
    const supabaseClient = createClient()
    setErrors({})
    setIsLoading(true)

    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // 성공 처리
      alert("계정이 성공적으로 삭제되었습니다. 그동안 이용해주셔서 감사합니다.")
      // 로그아웃 및 홈페이지로 리다이렉트
      supabaseAdmin.auth.admin.deleteUser(accountDeleteModal.uid)
      const { error } = await supabaseClient.auth.signOut()

      await userDelete(accountDeleteModal.email)

      window.location.href = "/"
    } catch (error) {
      setErrors({ submit: "계정 삭제에 실패했습니다. 다시 시도해주세요." })
    } finally {
      setIsLoading(false)
    }
  }

  if (!accountDeleteModal) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      data-oid="91bxrrw"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        data-oid="mu0edu3"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b !border-gray-200"
          data-oid="qou:g6v"
        >
          <div className="flex items-center space-x-3" data-oid="_c4nafr">
            <div
              className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
              data-oid="wvt0.:c"
            >
              <Trash2 className="w-5 h-5 text-red-600" data-oid="e:dn3p1" />
            </div>
            <h2
              className="text-xl font-semibold text-gray-900"
              data-oid="-h32_02"
            >
              계정 삭제
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            data-oid="yhuz8_3"
          >
            <X className="w-5 h-5 text-gray-500" data-oid="ba1m_zv" />
          </button>
        </div>
        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-gray-50" data-oid="migrgsy">
          <div className="flex items-center justify-between" data-oid="7x0s3ox">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex items-center"
                data-oid="u2-vz9q"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  data-oid="_8d.v3a"
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? "bg-red-600" : "bg-gray-200"
                    }`}
                    data-oid=":uf5rgf"
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className="flex justify-between mt-2 text-xs text-gray-600"
            data-oid="ca:mjwv"
          >
            <span data-oid="hx-0utv">경고</span>
            <span data-oid="jsj.b0s">확인</span>
            <span data-oid="_2be5dk">삭제</span>
          </div>
        </div>
        <div className="max-h-[50vh] overflow-y-scroll">
          {/* Content */}
          <div className="p-6" data-oid="y8mhu:a">
            {step === 1 && (
              <div className="space-y-6" data-oid="__vtq6j">
                <div className="text-center" data-oid="v2zn-s_">
                  <div
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    data-oid=":svu03s"
                  >
                    <AlertTriangle
                      className="w-8 h-8 text-red-600"
                      data-oid="ekdtds1"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-oid="wu7yj82"
                  >
                    정말로 계정을 삭제하시겠습니까?
                  </h3>
                  <p className="text-gray-600" data-oid="4iqz-jb">
                    이 작업은 되돌릴 수 없습니다.
                  </p>
                </div>

                <div
                  className="bg-red-50 border !border-red-200 rounded-lg p-4"
                  data-oid="xk7xnw9"
                >
                  <h4
                    className="font-medium text-red-800 mb-2"
                    data-oid="_i20_rl"
                  >
                    삭제될 데이터:
                  </h4>
                  <ul
                    className="text-sm text-red-700 space-y-1"
                    data-oid="1i8uu:l"
                  >
                    <li data-oid="y3z4ana">• 프로필 정보 및 개인 설정</li>
                    <li data-oid="rsf2uwv">• 작성한 모든 리뷰 및 댓글</li>
                    <li data-oid="s7g0s2j">• 즐겨찾기 및 북마크</li>
                    <li data-oid="6d.6g4k">• 여행 기록 및 통계</li>
                    <li data-oid="o:u8w_l">• 계정과 연결된 모든 데이터</li>
                  </ul>
                </div>

                <div
                  className="bg-blue-50 border !border-blue-200 rounded-lg p-4"
                  data-oid="8szd1i."
                >
                  <h4
                    className="font-medium text-blue-800 mb-2"
                    data-oid="7v59haf"
                  >
                    대안 옵션:
                  </h4>
                  <ul
                    className="text-sm text-blue-700 space-y-1"
                    data-oid="28nawdp"
                  >
                    <li data-oid="4n5_ivr">• 계정을 일시적으로 비활성화</li>
                    <li data-oid="ppvii62">• 개인정보만 삭제하고 계정 유지</li>
                    <li data-oid="eoa-xth">• 고객지원팀에 문의</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6" data-oid=":ume.r3">
                <div className="text-center" data-oid="vpfip23">
                  <div
                    className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    data-oid="p9uwzm2"
                  >
                    <Shield
                      className="w-8 h-8 text-orange-600"
                      data-oid="2ui5vin"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-oid="wzphan5"
                  >
                    마지막 확인
                  </h3>
                  <p className="text-gray-600" data-oid="uxdbk82">
                    계정 삭제를 위해 추가 확인이 필요합니다.
                  </p>
                </div>

                <div className="space-y-4" data-oid="wao-xxw">
                  <div data-oid="z-q3aet">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      data-oid="ia5::k_"
                    >
                      다음 문구를 정확히 입력해주세요:
                    </label>
                    <div
                      className="bg-gray-100 p-3 rounded-lg mb-2"
                      data-oid="j3uxvou"
                    >
                      <code
                        className="text-sm font-mono text-gray-800"
                        data-oid="gwbqw-4"
                      >
                        {CONFIRM_TEXT}
                      </code>
                    </div>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.confirmText
                          ? "!border-red-300"
                          : "!border-gray-300"
                      }`}
                      placeholder="위 문구를 입력하세요"
                      data-oid="4k5gkrs"
                    />

                    {errors.confirmText && (
                      <p
                        className="mt-1 text-sm text-red-600"
                        data-oid="f527kpn"
                      >
                        {errors.confirmText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6" data-oid="17adwv5">
                <div className="text-center" data-oid="e:52rfy">
                  <div
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    data-oid="y1jj8q."
                  >
                    <Trash2
                      className="w-8 h-8 text-red-600"
                      data-oid="j7k0mw8"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-red-900 mb-2"
                    data-oid="roudi_b"
                  >
                    계정을 영구적으로 삭제합니다
                  </h3>
                  <p className="text-red-600" data-oid="v30jlgu">
                    이 작업은 즉시 실행되며 되돌릴 수 없습니다.
                  </p>
                </div>

                <div
                  className="bg-red-50 border-2 !border-red-200 rounded-lg p-4"
                  data-oid="_fjxyir"
                >
                  <div
                    className="flex items-start space-x-3"
                    data-oid="4vgz_j1"
                  >
                    <AlertTriangle
                      className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                      data-oid="586ckls"
                    />

                    <div data-oid="y8ot_je">
                      <h4
                        className="font-medium text-red-800 mb-1"
                        data-oid="i3no2v_"
                      >
                        최종 경고
                      </h4>
                      <p className="text-sm text-red-700" data-oid="-wvc_4a">
                        계정 삭제 후에는 동일한 이메일로 재가입이 30일간
                        제한됩니다. 모든 데이터는 즉시 삭제되며 복구할 수
                        없습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div
                    className="p-3 bg-red-50 border !border-red-200 rounded-lg"
                    data-oid="u2a7jf5"
                  >
                    <p className="text-sm text-red-600" data-oid=":-yj6gw">
                      {errors.submit}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {step === 1 && (
          <div className="flex space-x-3 p-6" data-oid="f310u07">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 border !border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-oid=":q57cn7"
            >
              취소
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              data-oid="opu8g7e"
            >
              계속 진행
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex space-x-3 p-6" data-oid="m6jtdfq">
            <button
              onClick={handlePrevStep}
              className="flex-1 px-4 py-3 border !border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-oid="gxwu8.g"
            >
              이전
            </button>
            <button
              onClick={handleNextStep}
              disabled={confirmText !== CONFIRM_TEXT}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              data-oid="dz1m3vm"
            >
              최종 확인
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="flex space-x-3 p-6" data-oid="xh-s70s">
            <button
              onClick={handlePrevStep}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border !border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
              data-oid="hd3uoxd"
            >
              이전
            </button>
            <button
              onClick={handleFinalDelete}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors font-medium"
              data-oid="jgjc1lq"
            >
              {isLoading ? (
                <div
                  className="flex items-center justify-center space-x-2"
                  data-oid="auzagwh"
                >
                  <div
                    className="w-4 h-4 border-2 !border-white border-t-transparent rounded-full animate-spin"
                    data-oid="2ly089o"
                  ></div>
                  <span data-oid="g9mhs:r">삭제 중...</span>
                </div>
              ) : (
                "계정 삭제"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
