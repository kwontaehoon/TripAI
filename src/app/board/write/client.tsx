"use client"

import {
  useBoardCreateMutation,
  useUploadImagesToBucketMutation,
} from "@/hooks/supabase/dev"
import { loadingModalAtom } from "@/store/ai"
import { useAtom } from "jotai"
import {
  Camera,
  Clock,
  Eye,
  MapPin,
  Plus,
  Save,
  X,
  Star,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Place {
  id: number
  name: string
  location: string
  stay: string
  description: string
  location_type: string
}

interface FormData {
  title: string
  subtitle: string
  description: string
  duration: string
  participants: string
  total_cost: number
  difficulty: string
  board_tags: string[]
  board_highlights: string[]
  board_places: Place[]
}

export default function BoardWritePage({ userInfo }) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
    duration: "",
    participants: "",
    total_cost: 0,
    difficulty: "쉬움",
    board_tags: [],
    board_highlights: [],
    board_places: [],
    dayTitles: {}, // 일차별 제목
    daySubtitles: {}, // 일차별 서브 제목
    dayNotes: {}, // 일차별 작성자 노트
  })

  const [newTag, setNewTag] = useState("")
  const [newHighlight, setNewHighlight] = useState("")
  const [newPlace, setNewPlace] = useState({
    name: "",
    location: "",
    stay: "",
    description: "",
    location_type: "관광지",
    day: 1,
    review: "", // 후기 추가
    rating_count: 5, // 평점 추가
  })
  const [file, setFile] = useState<File[]>([])
  const [images, setImages] = useState<string[]>([])
  const [_, setLoadingAtom] = useAtom(loadingModalAtom)

  const {
    mutateAsync: uploadImagesToBucket,
    data: uploadImages,
    isSuccess: uploadImagesIsSuccess,
  } = useUploadImagesToBucketMutation()

  const {
    mutateAsync: boardCreate,
    isSuccess: boardCreateIsSuccess,
    data: boardCreateData,
  } = useBoardCreateMutation()

  useEffect(() => {
    if (uploadImagesIsSuccess) {
      boardCreate(Object.assign(formData, { board_images: uploadImages, userInfo: userInfo }))
    }
  }, [uploadImages])

  useEffect(() => {
    if (boardCreateData && !boardCreateData?.success) {
      alert("오류가 발생했습니다. 다시 시도해주세요.")
      setLoadingAtom({ isOpen: false, message: "" })
      return
    }
    if (boardCreateIsSuccess && boardCreateData?.success) {
      setLoadingAtom({ isOpen: false, message: "" })
      alert("게시글이 저장되었습니다!")
      router.push("/board")
    }
  }, [boardCreateIsSuccess])

  const difficultyOptions = ["쉬움", "보통", "어려움"]
  const participantOptions = ["혼자", "커플", "가족", "친구들", "단체"]
  const durationOptions = [
    "당일치기",
    "1박 2일",
    "2박 3일",
    "3박 4일",
    "일주일 이상",
  ]
  const placeTypes = ["관광지", "맛집", "카페", "숙소", "쇼핑", "체험", "교통"]

  // 여행 기간에 따른 일차 옵션 생성
  const getDayOptions = () => {
    const durationMap = {
      당일치기: 1,
      "1박 2일": 2,
      "2박 3일": 3,
      "3박 4일": 4,
      "일주일 이상": 7,
    }
    const maxDays = durationMap[formData.duration] || 1
    return Array.from({ length: maxDays }, (_, i) => i + 1)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 일차별 제목 업데이트
  const handleDayTitleChange = (day: number, title: string) => {
    setFormData((prev) => ({
      ...prev,
      dayTitles: {
        ...prev.dayTitles,
        [day]: title,
      },
    }))
  }

  // 일차별 서브 제목 업데이트
  const handleDaySubtitleChange = (day: number, subtitle: string) => {
    setFormData((prev) => ({
      ...prev,
      daySubtitles: {
        ...prev.daySubtitles,
        [day]: subtitle,
      },
    }))
  }

  // 일차별 작성자 노트 업데이트
  const handleDayNoteChange = (day: number, note: string) => {
    setFormData((prev) => ({
      ...prev,
      dayNotes: {
        ...prev.dayNotes,
        [day]: note,
      },
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.board_tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        board_tags: [...prev.board_tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      board_tags: prev.board_tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addHighlight = () => {
    if (
      newHighlight.trim() &&
      !formData.board_highlights.includes(newHighlight.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        board_highlights: [...prev.board_highlights, newHighlight.trim()],
      }))
      setNewHighlight("")
    }
  }

  const removeHighlight = (highlightToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      board_highlights: prev.board_highlights.filter(
        (highlight) => highlight !== highlightToRemove,
      ),
    }))
  }

  const addPlace = () => {
    if (newPlace.name.trim() && newPlace.location.trim()) {
      setFormData((prev) => ({
        ...prev,
        board_places: [...prev.board_places, { ...newPlace, id: Date.now() }],
      }))
      setNewPlace({
        name: "",
        location: "",
        stay: "",
        description: "",
        location_type: "관광지",
        day: 1,
        review: "",
        rating_count: 5,
      })
    }
  }

  const removePlace = (placeId: number) => {
    setFormData((prev) => ({
      ...prev,
      board_places: prev.board_places.filter((place) => place.id !== placeId),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 게시글 저장 로직
    if (formData.board_places.length === 0) {
      alert("여행 장소를 추가해주세요.")
    } else {
      setLoadingAtom({ isOpen: true, message: "게시글을 저장하고 있습니다..." })
      uploadImagesToBucket({files: file})
    }
  }

  const handlePreview = () => {
    // 미리보기 로직
    alert("미리보기 기능은 준비 중입니다.")
  }

  // 별점 렌더링 함수
  const renderStars = (
    rating: number,
    onRatingChange?: (rating: number) => void,
  ) => {
    return (
      <div className="flex items-center space-x-1" data-oid="uhaeekg">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400 transition-colors`}
            disabled={!onRatingChange}
            data-oid="gfho6ht"
          >
            <Star className="w-5 h-5 fill-current" data-oid="ve6z55f" />
          </button>
        ))}
        <span className="text-sm text-gray-600 ml-2" data-oid="361nry9">
          {rating}/5
        </span>
      </div>
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

    setFile((prev) => [...prev, ...fileArray])
    setImages((prev) => [...prev, ...imageUrls])
  }

  const imgDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setFile((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-28">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              기본 정보
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="여행 코스의 제목을 입력해주세요"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  부제목
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="간단한 설명을 입력해주세요"
                  className="
                  w-full
                  px-3 py-2
                  border !border-gray-300 rounded-lg
                  text-sm
                  sm:px-4 sm:py-3 sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상세 설명 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="여행 코스에 대한 자세한 설명을 작성해주세요"
                  rows={4}
                  className="
                  w-full
                  px-3 py-2
                  border !border-gray-300 rounded-lg
                  text-sm
                  sm:text-base sm:px-4 sm:py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  resize-none"
                  required
                />
              </div>

              {/* Grid for basic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    여행 기간 *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">선택하세요</option>
                    {durationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    동행자 *
                  </label>
                  <select
                    value={formData.participants}
                    onChange={(e) =>
                      handleInputChange("participants", e.target.value)
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">선택하세요</option>
                    {participantOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    총 비용
                  </label>
                  <input
                    type="text"
                    value={formData.total_cost}
                    onChange={(e) =>
                      handleInputChange("total_cost", e.target.value)
                    }
                    placeholder="₩500,000"
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    난이도 *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      handleInputChange("difficulty", e.target.value)
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {formData.duration && (
            <div
              className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
              data-oid="ba72prz"
            >
              <h2
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
                data-oid="bxv:6cq"
              >
                일차별 제목
              </h2>
              <div className="space-y-6" data-oid="jwznphr">
                {getDayOptions().map((day) => (
                  <div
                    key={day}
                    className="bg-gray-50 rounded-lg p-4"
                    data-oid="6.tf88n"
                  >
                    <div className="flex items-center mb-4" data-oid="0dxzndo">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3"
                        data-oid="k0gp1kf"
                      >
                        {day}일차
                      </div>
                      <h3
                        className="text-lg font-medium text-gray-900"
                        data-oid="gsd7n52"
                      >
                        일차별 제목 및 서브 제목
                      </h3>
                    </div>

                    <div className="space-y-4" data-oid="ew0apg1">
                      {/* 메인 제목 */}
                      <div data-oid="y571h22">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid="6.4f7cu"
                        >
                          {day}일차 메인 제목 *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.dayTitles[day] || ""}
                          onChange={(e) =>
                            handleDayTitleChange(day, e.target.value)
                          }
                          placeholder={`${day}일차 여행의 메인 제목을 입력하세요 (예: 서울 시내 관광)`}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          data-oid="sol0rcp"
                        />
                      </div>

                      {/* 서브 제목 */}
                      <div data-oid="knxjnxa">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid=".-mg4-x"
                        >
                          {day}일차 서브 제목
                        </label>
                        <input
                          type="text"
                          value={formData.daySubtitles[day] || ""}
                          onChange={(e) =>
                            handleDaySubtitleChange(day, e.target.value)
                          }
                          placeholder={`${day}일차 여행의 서브 제목을 입력하세요 (예: 경복궁과 북촌 한옥마을 탐방)`}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          data-oid="f.fzi9a"
                        />
                      </div>
                      {/* 작성자 노트 */}
                      <div data-oid="977o47h">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          data-oid="gttm1kr"
                        >
                          {day}일차 작성자 노트
                        </label>
                        <textarea
                          value={formData.dayNotes[day] || ""}
                          onChange={(e) =>
                            handleDayNoteChange(day, e.target.value)
                          }
                          placeholder={`${day}일차에 대한 개인적인 메모나 팁을 작성하세요 (예: 아침 일찍 가는 것을 추천, 주차가 어려우니 대중교통 이용)`}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"
                          data-oid="b_jggy3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              태그
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그를 입력하세요 (예: 가족여행, 맛집투어)"
                  className="flex-1 px-3 sm:px-4 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                />

                <button
                  type="button"
                  onClick={addTag}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.board_tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.board_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              주요 명소
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="주요 명소를 입력하세요 (예: 성산일출봉, 한라산)"
                  className="flex-1 px-3 sm:px-4 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addHighlight())
                  }
                />

                <button
                  type="button"
                  onClick={addHighlight}
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.board_highlights.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.board_highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{highlight}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(highlight)}
                        className="text-green-400 hover:text-green-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Places */}
          <div
            className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200"
            data-oid="lh3.df-"
          >
            <h2
              className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
              data-oid="4ze8c7b"
            >
              여행 장소
            </h2>

            {/* Add Place Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6" data-oid="kzaxmha">
              <h3 className="font-medium text-gray-900 mb-4" data-oid="p5n80s5">
                새 장소 추가
              </h3>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
                data-oid="0ya2j8j"
              >
                <div data-oid="un50ge_">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="vcjg0l6"
                  >
                    장소명 *
                  </label>
                  <input
                    type="text"
                    value={newPlace.name}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="장소 이름을 입력하세요"
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    data-oid="f9onbfy"
                  />
                </div>
                <div data-oid="hnrjgvb">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="tuo4xyf"
                  >
                    유형 *
                  </label>
                  <select
                    value={newPlace.location_type}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        location_type: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    data-oid="iatld9w"
                  >
                    {placeTypes.map((type) => (
                      <option key={type} value={type} data-oid="jhcmm13">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div data-oid="day-select">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="day-label"
                  >
                    일차 *
                  </label>
                  <select
                    value={newPlace.day}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        day: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={!formData.duration}
                    data-oid="day-select-input"
                  >
                    {getDayOptions().map((day) => (
                      <option
                        key={day}
                        value={day}
                        data-oid={`day-option-${day}`}
                      >
                        {day}일차
                      </option>
                    ))}
                  </select>
                  {!formData.duration && (
                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="day-help-text"
                    >
                      먼저 여행 기간을 선택해주세요
                    </p>
                  )}
                </div>
                <div data-oid="y:ya_ej">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="0embyd0"
                  >
                    주소 *
                  </label>
                  <input
                    type="text"
                    value={newPlace.location}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="주소를 입력하세요"
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    data-oid="vxd1-z-"
                  />
                </div>
                <div data-oid="6-n245x">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="p227grh"
                  >
                    체류 시간
                  </label>
                  <input
                    type="text"
                    value={newPlace.stay}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        stay: e.target.value,
                      }))
                    }
                    placeholder="예: 2시간"
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    data-oid="j29lelr"
                  />
                </div>
                <div data-oid="z6q_ydl">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid=".0_uyg6"
                  >
                    평점 *
                  </label>
                  <div className="mt-1" data-oid="m-00zrt">
                    {renderStars(newPlace.rating_count, (rating_count) =>
                      setNewPlace((prev) => ({ ...prev, rating_count })),
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4" data-oid="4flyzh9">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="rg3wrmh"
                >
                  설명
                </label>
                <textarea
                  value={newPlace.description}
                  onChange={(e) =>
                    setNewPlace((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="장소에 대한 설명을 입력하세요"
                  rows={2}
                  className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  data-oid="jzwvjvb"
                />
                <div className="mb-4" data-oid="e:pxh85">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="quowv7."
                  >
                    후기
                  </label>
                  <textarea
                    value={newPlace.review}
                    onChange={(e) =>
                      setNewPlace((prev) => ({
                        ...prev,
                        review: e.target.value,
                      }))
                    }
                    placeholder="이 장소에 대한 솔직한 후기를 작성해주세요"
                    rows={3}
                    className="w-full px-3 py-2 border !border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    data-oid="_6wu6qf"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addPlace}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 text-sm"
                data-oid="62:zooi"
              >
                <Plus className="w-4 h-4" data-oid="8:y0jox" />
                <span data-oid="52hw8ry">장소 추가</span>
              </button>
            </div>

            {/* Places List - Grouped by Day */}
            {formData?.board_places?.length > 0 && (
              <div className="space-y-6" data-oid="_8_gbt8">
                <h3 className="font-medium text-gray-900" data-oid="y2ri0f8">
                  추가된 장소 ({formData?.board_places?.length}개)
                </h3>
                {getDayOptions().map((day) => {
                  const dayPlaces = formData?.board_places?.filter(
                    (place) => place?.day === day,
                  )
                  if (dayPlaces.length === 0) return null

                  return (
                    <div
                      key={day}
                      className="space-y-3"
                      data-oid={`day-group-${day}`}
                    >
                      <div
                        className="flex items-center space-x-2"
                        data-oid={`day-header-${day}`}
                      >
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                          data-oid={`day-badge-${day}`}
                        >
                          {day}일차
                        </div>
                        <span
                          className="text-sm text-gray-500"
                          data-oid={`day-count-${day}`}
                        >
                          {dayPlaces?.length}개 장소
                        </span>
                      </div>
                      <div
                        className="space-y-3 ml-4"
                        data-oid={`day-places-${day}`}
                      >
                        {dayPlaces?.map((place, index) => (
                          <div
                            key={place.id}
                            className="border !border-gray-200 rounded-lg p-4"
                            data-oid="9vsf57n"
                          >
                            <div
                              className="flex items-start justify-between mb-2"
                              data-oid="dqcplyw"
                            >
                              <div
                                className="flex items-center space-x-2"
                                data-oid="zdg5ns3"
                              >
                                <span
                                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
                                  data-oid=".lsxe1h"
                                >
                                  {index + 1}
                                </span>
                                <h4
                                  className="font-medium text-gray-900"
                                  data-oid="pr8xy7p"
                                >
                                  {place?.name}
                                </h4>
                                <span
                                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                                  data-oid="ey6ce:-"
                                >
                                  {place?.location_type}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePlace(place?.id)}
                                className="text-red-500 hover:text-red-700"
                                data-oid="dv4cah7"
                              >
                                <X className="w-4 h-4" data-oid="h4hnveu" />
                              </button>
                            </div>
                            <div
                              className="text-sm text-gray-600 space-y-1"
                              data-oid="4fygrzf"
                            >
                              <div
                                className="flex items-center"
                                data-oid="l:mm5e6"
                              >
                                <MapPin
                                  className="w-3 h-3 mr-1"
                                  data-oid="o8nku_7"
                                />

                                <span data-oid="4bsuz73">
                                  {place?.location}
                                </span>
                              </div>
                              {place?.stay && (
                                <div
                                  className="flex items-center"
                                  data-oid="7a-f_-c"
                                >
                                  <Clock
                                    className="w-3 h-3 mr-1"
                                    data-oid="az9d-3f"
                                  />

                                  <span data-oid="rn4qe31">
                                    체류 시간: {place?.stay}
                                  </span>
                                </div>
                              )}
                              {place?.description && (
                                <p className="mt-2" data-oid="qjk:.jy">
                                  {place?.description}
                                </p>
                              )}
                              <div
                                className="flex items-center"
                                data-oid="f376.q9"
                              >
                                <Star
                                  className="w-3 h-3 mr-1 text-yellow-400 fill-current"
                                  data-oid="circd2:"
                                />

                                <span data-oid="jmbily3">
                                  평점: {place.rating_count}/5
                                </span>
                              </div>
                              {place.description && (
                                <p className="mt-2" data-oid="fz:oh2k">
                                  {place.description}
                                </p>
                              )}
                              {place.review && (
                                <div
                                  className="mt-2 p-3 bg-blue-50 rounded-lg"
                                  data-oid="7a49a4:"
                                >
                                  <div
                                    className="flex items-center mb-1"
                                    data-oid="j0753m2"
                                  >
                                    <MessageSquare
                                      className="w-3 h-3 mr-1 text-blue-600"
                                      data-oid="8ur5jeg"
                                    />

                                    <span
                                      className="text-xs font-medium text-blue-600"
                                      data-oid="5v6ss9s"
                                    >
                                      후기
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm text-gray-700"
                                    data-oid="52r9duk"
                                  >
                                    {place.review}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border !border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              사진 업로드
            </h2>

            <div className="border-2 border-dashed !border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:!border-blue-400 transition-colors">
              <div className="grid grid-cols-3 gap-4 mb-2">
                {images.map((src, idx) => (
                  <div key={idx} className="shadow-md relative">
                    <X
                      className="absolute right-2 top-2 w-4 h-4 cursor-pointer"
                      onClick={() => imgDelete(idx)}
                    />
                    <Image
                      width={300}
                      height={300}
                      src={src}
                      alt="Uploaded"
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>

              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />

              <p className="text-sm sm:text-base text-gray-600 mb-2">
                여행 사진을 업로드해주세요
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                JPG, PNG 파일만 업로드 가능합니다 (최대 10MB)
              </p>
              <label className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <div>파일 선택</div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {/* <button
                type="button"
                className="
                py-2 space-x-2 mx-auto
                flex items-center
                rounded-lg
                text-gray-700 text-sm
                bg-gray-100 px-4 hover:bg-gray-200
                transition-colors"
                onClick={handleUpload}
              >
                <Upload className="w-4 h-4" />
                <span>파일 선택</span>
              </button> */}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="
              py-3
              flex-1
              rounded-lg
              font-medium text-sm
             bg-gray-100 text-gray-700
             hover:bg-gray-200 sm:text-base
             transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="
              py-3
              flex w-h-center flex-1
              rounded-lg text-sm font-medium
             bg-blue-100 text-blue-700 hover:bg-blue-200
              sm:text-base
              transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              미리보기
            </button>
            <button
              type="submit"
              className="
              w-h-center
              py-3
              text-white rounded-lg font-medium text-sm
              flex-1 bg-gradient-to-r from-blue-600 to-purple-600
              sm:text-base
              hover:shadow-lg
              transition-all"
            >
              <Save className="w-4 h-4 mr-2" />
              게시글 저장
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
