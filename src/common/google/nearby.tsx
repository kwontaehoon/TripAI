// 관광지
export const google_place_nearby = (lat: number, lng: number) => {
  return {
    includedTypes: ["tourist_attraction"],
    maxResultCount: 20,
    languageCode: "ko",
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng,
        },
        radius: 2000.0,
      },
    },
  }
}

// 맛집
export const google_place_nearby_restaurant = (lat: number, lng: number) => {
  return {
    includedTypes: ["restaurant"],
    maxResultCount: 20,
    languageCode: "ko",
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng,
        },
        radius: 5000.0,
      },
    },
  }
}
