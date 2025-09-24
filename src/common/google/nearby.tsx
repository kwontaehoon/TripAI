export const google_place_nearby = (lat:number, lng:number) => {
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
        radius: 5000.0,
      },
    },
  }
}
