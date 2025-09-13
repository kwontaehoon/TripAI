import React from "react"

const profile = ({ userInfo, newUserProfile, setNewUserProfile, isEditing }) => {

  interface UserProfile {
    name: string
    email: string
    introduce: string
  }

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setNewUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6" data-oid="cpw.f2k">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
        data-oid="6z-jong"
      >
        개인 정보
      </h3>

      <div className="grid md:grid-cols-2 gap-6" data-oid="1a19_hb">
        <div data-oid="46yi_s3">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            data-oid="z.38t8d"
          >
            이름
          </label>
          {isEditing ? (
            <input
              type="text"
              value={newUserProfile.name}
              onChange={(e) => handleProfileUpdate("name", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-oid="h8k0hi-"
            />
          ) : (
            <p className="text-gray-900" data-oid="8uo6ixw">
              {newUserProfile.name}
            </p>
          )}
        </div>

        <div data-oid="jcwupu3">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            data-oid="a5szxw0"
          >
            이메일
          </label>
            <p className="text-gray-900" data-oid="geg_aot">
              {userInfo.email}
            </p>
        </div>

        {/* <div data-oid="xqncmgd">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            data-oid="suyo_rs"
          >
            전화번호
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-oid="mb1t.p4"
            />
          ) : (
            <p className="text-gray-900" data-oid="1p09m-1">
              {userInfo.phone ? userInfo.phone : '-'}
            </p>
          )}
        </div> */}

        {/* <div data-oid="gxcam6c">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            data-oid="piagk4s"
          >
            위치
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => handleProfileUpdate("location", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-oid="3a.73jl"
            />
          ) : (
            <p className="text-gray-900" data-oid="t4u2lf4">
              {userProfile.location}
            </p>
          )}
        </div> */}
      </div>

      <div data-oid="6v8sfu1">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          data-oid="ckfk741"
        >
          자기소개
        </label>
        {isEditing ? (
          <textarea
            value={newUserProfile.introduce}
            onChange={(e) => handleProfileUpdate("introduce", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            data-oid="i-sck3v"
          />
        ) : (
          <p className="text-gray-900" data-oid="82h2e4:">
            {newUserProfile.introduce ? newUserProfile.introduce : "-"}
          </p>
        )}
      </div>
    </div>
  )
}

export default profile
