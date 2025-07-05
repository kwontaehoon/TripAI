
type infoType = {
  date: string,
  transportation: string,
  budget: number
}

export const ai_response_func = (info:infoType) => {

  return {
    "contents": [
      {
        "parts":[
          {
            "text": `한국어로 title, 그리고 ${info.transportation}로 예산은 ${info.budget}이상 description object, 여기서부터는 days라는 배열에 ${info.date}은 date, 간단한 설명은 theme, locations 배열 안에 특정 김포 관광지 이름을 name, 좌표를 coordinates, 간단한 설명은 description, 특별 행사 정보가 있다면 event, next 배열안에 (여기서 next는 name 마다 있어야함) 다음 관광지 이름을 name, 다음 관광지까지 거리를 distance, 다음 관광지까지 시간을 driving_time 으로 만들어진 김포 코스를 json으로 추천해주는데 json 말고 다른 내용은 없이 응답해줘`
          }
        ]
      }
    ]
  }
}