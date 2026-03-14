import React from "react"
import { Download, ChevronRight } from "lucide-react"
import { useAtom } from "jotai"
import { accountDeleteAtom, passwordChangeAtom } from "@/store/ai"

const settings = ({ getUserData }) => {
  const [passwordChangeModal, setPasswordChangeModal] =
    useAtom(passwordChangeAtom)
  const [accountDeleteModal, setAccountDeleteModal] = useAtom(accountDeleteAtom)

  return (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
       
      >
        계정 설정
      </h3>

      {/* <div className="space-y-4">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
         
        >
          <div>
            <h4 className="font-medium text-gray-900">
              알림 설정
            </h4>
            <p className="text-sm text-gray-600">
              새로운 여행 추천 및 업데이트 알림
            </p>
          </div>
          <button
            className="w-12 h-6 bg-purple-600 rounded-full relative"
           
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"
             
            ></div>
          </button>
        </div>

        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
         
        >
          <div>
            <h4 className="font-medium text-gray-900">
              이메일 구독
            </h4>
            <p className="text-sm text-gray-600">
              주간 여행 뉴스레터 받기
            </p>
          </div>
          <button
            className="w-12 h-6 bg-gray-300 rounded-full relative"
           
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"
             
            ></div>
          </button>
        </div>

        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
         
        >
          <div>
            <h4 className="font-medium text-gray-900">
              프로필 공개
            </h4>
            <p className="text-sm text-gray-600">
              다른 사용자에게 프로필 공개
            </p>
          </div>
          <button
            className="w-12 h-6 bg-purple-600 rounded-full relative"
           
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"
             
            ></div>
          </button>
        </div>
      </div> */}

      <div className="border-t !border-gray-200 pt-6">
        <h4 className="font-medium text-gray-900 mb-4">
          계정 관리
        </h4>
        <div className="space-y-3">
          <button
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
           
          >
            <div
              className="flex items-center justify-between"
              onClick={() => setPasswordChangeModal(true)}
             
            >
              <span className="text-gray-700">
                비밀번호 변경
              </span>
              <ChevronRight
                className="w-4 h-4 text-gray-400"
               
              />
            </div>
          </button>
          {/* <button
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
           
          >
            <div
              className="flex items-center justify-between"
             
            >
              <span className="text-gray-700">
                데이터 다운로드
              </span>
              <Download className="w-4 h-4 text-gray-400" />
            </div>
          </button> */}
          <button
            className="w-full text-left p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
           
          >
            <div
              className="flex items-center justify-between"
              onClick={() =>
                setAccountDeleteModal({
                  isOpen: true,
                  uid: getUserData.id,
                  email: getUserData.email,
                })
              }
             
            >
              <span>계정 삭제</span>
              <ChevronRight
                className="w-4 h-4 text-red-400"
               
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default settings
