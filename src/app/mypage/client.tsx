"use client"

import { useState, useEffect } from "react"
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
} from "@/hooks/supabase/dev"
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
        data-oid="1ixaard"
      >
        <div className="text-center" data-oid="yi17rrk">
          <div
            className="w-16 h-16 border-4 !border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            data-oid="jtej_ag"
          ></div>
          <p className="text-gray-600" data-oid="87nb6p4">
            마이페이지를 불러오는 중...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28"
      data-oid="6zs._r1"
    >
      {/* Main Content */}
      <div data-oid="quiruzm">
        <div className="max-w-6xl mx-auto px-4" data-oid="6ks87nv">
          {/* Profile Header */}
          <div
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden mb-8"
            data-oid="s0qvb.."
          >
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative"
              data-oid="-:zlup2"
            >
              <div
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6"
                data-oid="0bl6ohq"
              >
                {/* Avatar */}

                <div className="relative" data-oid="0xj0e4v">
                  <label className="">
                    <div
                      className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center relative"
                      data-oid="tc2.7ke"
                    >
                      <If isTrue={images.length === 0}>
                        {!userInfo.profile_image_url ? (
                          <User
                            className="w-12 h-12 text-white"
                            data-oid="1309xxm"
                          />
                        ) : (
                          <Image
                            src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${userInfo.profile_image_url}`}
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
                      data-oid="6e486nq"
                    >
                      <Camera
                        className="w-4 h-4 text-white"
                        data-oid="u6m4yym"
                      />
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1" data-oid="oasif:2">
                  <div
                    className="flex items-center space-x-3 mb-2"
                    data-oid="oc.v806"
                  >
                    <h1 className="text-2xl font-bold" data-oid="0_s0.0k">
                      {newUserProfile.name}
                    </h1>
                    <div
                      className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full"
                      data-oid="6o-clm3"
                    >
                      <Trophy className="w-4 h-4" data-oid="bb5jjog" />
                      <span className="text-sm" data-oid="o9.nbgx">
                        글로벌 트래블러
                      </span>
                    </div>
                  </div>
                  <p className="text-purple-100 mb-2" data-oid="c59:6o4">
                    {newUserProfile.introduce}
                  </p>
                  <div
                    className="flex items-center space-x-4 text-sm text-purple-100"
                    data-oid="h.hkr:z"
                  >
                    {/* <div
                      className="flex items-center space-x-1"
                      data-oid="2s7j:q5"
                    >
                      <MapPin className="w-4 h-4" data-oid="j6s5x66" />
                      <span data-oid="r7e8ws:">{newUserProfile.location}</span>
                    </div> */}
                    <div
                      className="flex items-center space-x-1"
                      data-oid="dns1c.v"
                    >
                      <Calendar className="w-4 h-4" data-oid="i9t:n-_" />
                      <span data-oid="syi13:x">
                        가입일:{" "}
                        {moment(newUserProfile.created_at).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex space-x-2" data-oid="xtyv381">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                        data-oid="2rtgjj5"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        data-oid="1qqnk3x"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                      data-oid="8dj9qoh"
                    >
                      <Edit3 className="w-4 h-4" data-oid="0ow6845" />
                      <span data-oid="2_23rmp">프로필 편집</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-4 bg-gray-50" data-oid="_ajmsjs">
              <div
                className="grid grid-cols-2 md:grid-cols-6 gap-4"
                data-oid="ahvwccj"
              >
                <div className="text-center" data-oid="bl-l7m2">
                  <div
                    className="text-2xl font-bold text-purple-600"
                    data-oid="km.adg9"
                  >
                    {userInfo.boards.length}
                  </div>
                  <div className="text-sm text-gray-600" data-oid="vpvu9y7">
                    총 여행
                  </div>
                </div>
                <div className="text-center" data-oid="p7:hib0">
                  <div
                    className="text-2xl font-bold text-green-600"
                    data-oid="gxgng_u"
                  >
                    {totalComment()}
                  </div>
                  <div className="text-sm text-gray-600" data-oid="035g50u">
                    리뷰
                  </div>
                </div>
                <div className="text-center" data-oid="i_::v01">
                  <div
                    className="text-2xl font-bold text-yellow-600"
                    data-oid="q36-.ok"
                  >
                    {totalRating()}
                  </div>
                  <div className="text-sm text-gray-600" data-oid="4p:-5mu">
                    평균 평점
                  </div>
                </div>
                <div className="text-center" data-oid="sggrkt2">
                  <div
                    className="text-2xl font-bold text-purple-600"
                    data-oid="96_nw8k"
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600" data-oid="p6egmud">
                    방문 국가
                  </div>
                </div>
                <div className="text-center" data-oid="5m:rrei">
                  <div
                    className="text-2xl font-bold text-red-600"
                    data-oid="1iqi1gy"
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600" data-oid="q6f5l-b">
                    총 거리(km)
                  </div>
                </div>
                <div className="text-center" data-oid="_9a.kyj">
                  <div
                    className="text-2xl font-bold text-indigo-600"
                    data-oid="wpiudgn"
                  >
                    -
                  </div>
                  <div className="text-sm text-gray-600" data-oid="5lk88.y">
                    최애 여행지
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className="bg-white rounded-2xl shadow-lg border !border-gray-200 overflow-hidden"
            data-oid="scg14.l"
          >
            <div className="border-b !border-gray-200" data-oid="84ddjze">
              <nav className="flex space-x-8 px-6" data-oid="ua7g183">
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
                      data-oid="zfxn156"
                    >
                      <Icon className="w-4 h-4" data-oid="sq6djaf" />
                      <span className="font-medium" data-oid="ajwe5mq">
                        {tab.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6" data-oid="du_2vo6">
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
