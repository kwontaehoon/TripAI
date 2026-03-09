// map-dashboard page (좌표 값 o)
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

// spot-selector page (좌표 값 x)
export const google_place_selector_textSearch = (spot: string) => {
  return {
    textQuery: spot,
    languageCode: "ko"
  }
}
