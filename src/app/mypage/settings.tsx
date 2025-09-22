import React from "react"
import { Download, ChevronRight } from "lucide-react"
import { useAtom } from "jotai"
import { accountDeleteAtom, passwordChangeAtom } from "@/store/ai"

const settings = ({ getUserData }) => {
  const [passwordChangeModal, setPasswordChangeModal] =
    useAtom(passwordChangeAtom)
  const [accountDeleteModal, setAccountDeleteModal] = useAtom(accountDeleteAtom)

  return (
    <div className="space-y-6" data-oid="r3cgl-3">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
        data-oid="sw.m4zw"
      >
        계정 설정
      </h3>

      {/* <div className="space-y-4" data-oid="tdjconp">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          data-oid="282hk82"
        >
          <div data-oid="3waza_e">
            <h4 className="font-medium text-gray-900" data-oid="h:3n43v">
              알림 설정
            </h4>
            <p className="text-sm text-gray-600" data-oid="gxym96h">
              새로운 여행 추천 및 업데이트 알림
            </p>
          </div>
          <button
            className="w-12 h-6 bg-purple-600 rounded-full relative"
            data-oid="ltnpjfg"
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"
              data-oid="t1fk80x"
            ></div>
          </button>
        </div>

        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          data-oid="z5kvny2"
        >
          <div data-oid=":g8a-08">
            <h4 className="font-medium text-gray-900" data-oid="-icif_4">
              이메일 구독
            </h4>
            <p className="text-sm text-gray-600" data-oid="--.ak9y">
              주간 여행 뉴스레터 받기
            </p>
          </div>
          <button
            className="w-12 h-6 bg-gray-300 rounded-full relative"
            data-oid="dq17:vk"
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"
              data-oid="bpv.dvw"
            ></div>
          </button>
        </div>

        <div
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          data-oid="s7c92xe"
        >
          <div data-oid=".stnuhg">
            <h4 className="font-medium text-gray-900" data-oid="ywyfhl3">
              프로필 공개
            </h4>
            <p className="text-sm text-gray-600" data-oid="j70tz61">
              다른 사용자에게 프로필 공개
            </p>
          </div>
          <button
            className="w-12 h-6 bg-purple-600 rounded-full relative"
            data-oid=":o0-97t"
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"
              data-oid="kqegv-j"
            ></div>
          </button>
        </div>
      </div> */}

      <div className="border-t !border-gray-200 pt-6" data-oid="no766m7">
        <h4 className="font-medium text-gray-900 mb-4" data-oid="p8ki-b_">
          계정 관리
        </h4>
        <div className="space-y-3" data-oid="sfmogbw">
          <button
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            data-oid="sjsa0oj"
          >
            <div
              className="flex items-center justify-between"
              onClick={() => setPasswordChangeModal(true)}
              data-oid="a.dd0kb"
            >
              <span className="text-gray-700" data-oid="mx9ve9p">
                비밀번호 변경
              </span>
              <ChevronRight
                className="w-4 h-4 text-gray-400"
                data-oid="8pfje2t"
              />
            </div>
          </button>
          {/* <button
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            data-oid="jkna7j8"
          >
            <div
              className="flex items-center justify-between"
              data-oid="gkfj1if"
            >
              <span className="text-gray-700" data-oid="bq8aseb">
                데이터 다운로드
              </span>
              <Download className="w-4 h-4 text-gray-400" data-oid="vt26hz0" />
            </div>
          </button> */}
          <button
            className="w-full text-left p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
            data-oid="m34:w3n"
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
              data-oid="_5_td.2"
            >
              <span data-oid="a3wewg5">계정 삭제</span>
              <ChevronRight
                className="w-4 h-4 text-red-400"
                data-oid="eaoz362"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default settings
