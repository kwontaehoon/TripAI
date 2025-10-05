export const google_place_textSearch = (lat: number, lng: number) => {
    return {
      textQuery: "주변 맛집",
      languageCode: "ko",
      locationBias: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: 1000.0,
        },
      },
    }
  }