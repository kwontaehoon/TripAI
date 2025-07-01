export const ai_courseText = [
    {
        id: 1,
        title: "김포 당일치기 코스: 역사와 자연을 만끽하다.",
        subtitle: "김포의 아름다운 풍경과 유적지를 둘러보는 알찬 여정",
        description: "조선시대 역사 유적지와 아름다운 자연을 함께 즐실 수 있는 김포 당일치기 코스입니다. 애기봉전망대에서 한강과 북한을 조망하고, 김포대곶생태숲에서 자연의 아름다움을 느껴보세요. 마지막으로 김포 장릉에서 조선 왕릉의 위엄을 감상하며 여정을 마무리합니다.", 
        author: "김포시 관광협회",
        author_type: "기관",
        duration: "3박 4일",
        estimated_time: 8,
        rating: 4.5,
        views: 1200,
        likes: 500,
        participants: "2-6명",
        difficulty: 2,
        total_cost: 50000,
        total_locations: 4,
        total_comments: 20,
        total_distance: "30km",
        created_at: "2025.07.01",
        tags: ["김포", "당일치기", "역사", "자연", "가족여행", "데이트"],
        highlights: ["애기봉전망대", "김포대곶생태숲", "김포 장릉"],
        images: [],
        reliability: 4,
        bookmark: 0,
        badges: ["인기 코스", "가족 친화", "자연 체험"],
        days: [{
            date: "2024-01-01",
            title: "김포 당일치기",
            subTitle: "역사와 자연 체험",
            locations: [{
                name: "애기봉전망대",
                description: "한강과 북한을 조망할 수 있는 전망대",
                locations: "애기봉",
                distance: "5km",
                driving_time: "15분",
                stay: "1시간",
                recommend_reason: "탁 트인 전망이 매력적입니다.",
                tip: ["망원경 이용 추천", "날씨 확인 필수"],
                rating_count: 4,
                review_count: 1,
                next: [{
                    distance: "10km",
                    driving_time: "20분"
                }]
            },
            {
                name: "김포대곶생태숲",
                description: "다양한 식물과 동물을 관찰할 수 있는 생태숲",
                locations: "대곶면",
                distance: "10km",
                driving_time: "20분",
                stay: "2시간",
                recommend_reason: "자연 속에서 휴식을 취할 수 있는 공간",
                tip: ["편안한 신발 착용 추천", "돗자리 준비"],
                rating_count: 4.5,
                review_count: 5,
                next: [{
                    distance: "15km",
                    driving_time: "30분"
                }]
            },
            {
                name: "김포 장릉",
                description: "조선 왕릉 중 하나",
                locations: "사우동",
                distance: "15km",
                driving_time: "30분",
                stay: "1시간",
                recommend_reason: "조선 왕조의 역사를 느낄 수 있습니다.",
                tip: ["역사에 대한 사전 지식 습득 추천"],
                rating_count: 4,
                review_count: 3,
                next: [{
                    distance: "0km",
                    driving_time: "0분"
                }]
            }]
        }],
    }
]

// id
// title - 여행 제목
// subtitle - 여행 서브 제목
// author - 작성자 이름
// author_type - 작성자가 ai인지 사람인지 구분값
// duration - 총 기간(ex 3박 4일)
// estimated_time - 예상 시간
// rating - 평점
// likes - 좋아요 수
// total_comments - 댓글
// views - 조회수
// participants - 참가자
// difficulty - 난이도
// total_cost - 총 비용
// total_locations - 총 장소 갯수
// total_comments - 총 댓글 갯수
// total_distance - 총 거리
// description - 여행 설명
// created_at - 생성일
// tags - 태그
// highlights - 주요 명소
// images - 대표 이미지
// reliability - ai 신뢰도
// bookmark - 북마크
// badges - ai 분석 뱃지


// export const ai_courseText = [{ id: 1, title: '', subtitle: '', author: '', author_type: '', duration: "x박 x일", estimated_time: 12, rating: 1, views: 6, likes: 1, participants: '1-x명', difficulty: 1, total_cost: 1, total_locations: 1, total_comments: 1, total_distance: '1km', description: '', created_at: '2025.07.01', tags: [], highlights: [], images: [], reliability: 1, bookmark: 1, badges: [], days: [{ date: '', title: '', subTitle: '', locations: [{ name: '', description: '', locations: '', distance: '', driving_time: '', stay: '', recommend_reason: '', tip: [], rating_count: 1, review_count: 1, next: [{ distance: '', driving_time: '' }] }] }] }];
