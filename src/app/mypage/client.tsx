"use client"

import { useState, useEffect } from "react"
import { getStorageUrl } from "@/util/supabaseStorage"
import { useRouter } from "next/navigation"
import {
  User,
  Settings,
  Heart,
  Calendar,
  Edit3,
  Camera,
  Trophy,
  Clock,
} from "lucide-react"
import {
  useMypageEditMutation,
  useMypageUpdateProfileMutation,
  useUploadImagesToBucketMutation,
} from "@/hooks/supabase/queries"
import Profile from "./profile"
import Activity from "./activity"
import Analytics from "./analytics"
import Favorites from "./favorites"
import Setting from "./settings"
import moment from "moment"
import Image from "next/image"
import { If } from "react-haiku"

export default function MyPage({ userInfo, analyticsData, getUserData }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [file, setFile] = useState<File[]>([])
  const [images, setImages] = useState<string[]>([])
  const [newUserProfile, setNewUserProfile] = useState({ ...userInfo })

  const {
    mutateAsync: uploadImagesToBucket,
    data: uploadImages,
    isSuccess: uploadImagesIsSuccess,
  } = useUploadImagesToBucketMutation()

  const {
    mutateAsync: mypageUpdateProfile,
    isSuccess: mypageUpdateProfileIsSuccess,
    data: mypageUpdateProfileData,
  } = useMypageUpdateProfileMutation()

  const {
    mutateAsync: mypageEdit,
    data: oldProfileImage,
    isSuccess: mypageEditIsSuccess,
  } = useMypageEditMutation()

  // 총 여행 수
  const totalComment = () => {
    const comments = userInfo.commentsItem
    return comments.comments.length + comments.comments_replies.length
  }

  // 평균 점수
  const totalRating = () => {
    if (userInfo.boards.length === 0) {
      return 0
    } else
      return (
        userInfo.boards.reduce((sum, board) => sum + board.rating, 0) /
        userInfo.boards.length
      )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (file.length > 4) {
      alert("이미지는 5개까지 등록 가능합니다.")
      return
    }
    if (!files) return

    const fileArray = Array.from(files)
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file))

    setFile(fileArray)
    setImages(imageUrls)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setImages([])
    setNewUserProfile({ ...userInfo })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // upload bucket 완료 후 users 테이블의 profile update 실행
  useEffect(() => {
    if (uploadImagesIsSuccess) {
      mypageUpdateProfile(
        Object.assign({
          profile_image_url: uploadImages,
          email: userInfo.email,
        }),
      )
    }
  }, [uploadImages])

  useEffect(() => {
    const updateImageBucketFunc = async () => {
      if (mypageEditIsSuccess && oldProfileImage !== undefined) {
        await uploadImagesToBucket(
          Object.assign({
            files: file,
            oldProfileImage: oldProfileImage,
          }),
        )
      }
    }
    updateImageBucketFunc()
  }, [mypageEditIsSuccess])

  useEffect(() => {
    if (isEditing && mypageUpdateProfileIsSuccess && images.length !== 0) {
      setIsEditing(false)
      alert("프로필이 성공적으로 업데이트되었습니다!")
      window.location.reload()
    }
  }, [mypageUpdateProfileData])

  const handleSaveProfile = async () => {
    // Here you would typically save to your backend
    await mypageEdit(newUserProfile)
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"
       
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 !border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
           
          ></div>
          <p className="text-gray-600">
            마이페이지를 불러오는 중...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
     
    >
      {/* Main Content */}
      <div>
        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header */}
          <div
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden mb-8"
           
          >
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative"
             
            >
              <div
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6"
               
              >
                {/* Avatar */}

                <div className="relative">
                  <label className="">
                    <div
                      className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center relative"
                     
                    >
                      <If isTrue={images.length === 0}>
                        {!userInfo.profile_image_url ? (
                          <User
                            className="w-12 h-12 text-white"
                           
                          />
                        ) : (
                          <Image
                            src={getStorageUrl(userInfo.profile_image_url)}
                            alt={userInfo.name}
                            className="rounded-full overflow-hidden"
                            fill
                            priority={true}
                            sizes="24w"
                          />
                        )}
                      </If>
                      <If isTrue={isEditing && images.length !== 0}>
                        <Image
                          src={images[0]}
                          alt={`preview-img-${file[0]?.name}`}
                          className="rounded-full overflow-hidden"
                          fill
                          priority={true}
                          sizes="24w"
                        />
                      </If>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={!isEditing}
                    />
                  </label>
                  {isEditing && (
                    <button
                      className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                     
                    >
                      <Camera
                        className="w-4 h-4 text-white"
                       
                      />
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div
                    className="flex items-center space-x-3 mb-2"
                   
                  >
                    <h1 className="text-2xl font-bold">
                      {newUserProfile.name}
                    </h1>
                    <div
                      className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full"
                     
                    >
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">
                        글로벌 트래블러
                      </span>
                    </div>
                  </div>
                  <p className="text-purple-100 mb-2">
                    {newUserProfile.introduce}
                  </p>
                  <div
                    className="flex items-center space-x-4 text-sm text-purple-100"
                   
                  >
                    {/* <div
                      className="flex items-center space-x-1"
                     
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{newUserProfile.location}</span>
                    </div> */}
                    <div
                      className="flex items-center space-x-1"
                     
                    >
                      <Calendar className="w-4 h-4" />
                      <span>
                        가입일:{" "}
                        {moment(newUserProfile.created_at).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                       
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                       
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setActiveTab("profile")
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                     
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>프로필 편집</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-4 bg-gray-50">
              <div
                className="grid grid-cols-2 md:grid-cols-6 gap-4"
               
              >
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-purple-600"
                   
                  >
                    {userInfo.boards.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    총 여행
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-green-600"
                   
                  >
                    {totalComment()}
                  </div>
                  <div className="text-sm text-gray-600">
                    리뷰
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-yellow-600"
                   
                  >
                    {totalRating()}
                  </div>
                  <div className="text-sm text-gray-600">
                    평균 평점
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-purple-600"
                   
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600">
                    방문 국가
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-red-600"
                   
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600">
                    총 거리(km)
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-indigo-600"
                   
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600">
                    최애 여행지
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
           
          >
            <div className="border-b !border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "profile", label: "프로필 정보", icon: User },
                  // { id: "activity", label: "최근 활동", icon: Clock },
                  { id: "analytics", label: "분석", icon: Clock },
                  { id: "favorites", label: "내가 좋아한 글", icon: Heart },
                  { id: "settings", label: "설정", icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "!border-blue-600 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                     
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">
                        {tab.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && (
                <Profile
                  userInfo={userInfo}
                  newUserProfile={newUserProfile}
                  setNewUserProfile={setNewUserProfile}
                  isEditing={isEditing}
                />
              )}

              {activeTab === "activity" && <Activity />}

              {activeTab === "analytics" && (
                <Analytics userInfo={userInfo} analyticsData={analyticsData} />
              )}

              {activeTab === "favorites" && <Favorites userInfo={userInfo} />}

              {activeTab === "settings" && (
                <Setting getUserData={getUserData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
