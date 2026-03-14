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
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold text-gray-900 mb-4"
       
      >
        개인 정보
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
           
          >
            이름
          </label>
          {isEditing ? (
            <input
              type="text"
              value={newUserProfile.name}
              onChange={(e) => handleProfileUpdate("name", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
             
            />
          ) : (
            <p className="text-gray-900">
              {newUserProfile.name}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
           
          >
            이메일
          </label>
            <p className="text-gray-900">
              {userInfo.email}
            </p>
        </div>

        {/* <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
           
          >
            전화번호
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
             
            />
          ) : (
            <p className="text-gray-900">
              {userInfo.phone ? userInfo.phone : '-'}
            </p>
          )}
        </div> */}

        {/* <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
           
          >
            위치
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => handleProfileUpdate("location", e.target.value)}
              className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
             
            />
          ) : (
            <p className="text-gray-900">
              {userProfile.location}
            </p>
          )}
        </div> */}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
         
        >
          자기소개
        </label>
        {isEditing ? (
          <textarea
            value={newUserProfile.introduce}
            onChange={(e) => handleProfileUpdate("introduce", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
           
          />
        ) : (
          <p className="text-gray-900">
            {newUserProfile.introduce ? newUserProfile.introduce : "-"}
          </p>
        )}
      </div>
    </div>
  )
}

export default profile
