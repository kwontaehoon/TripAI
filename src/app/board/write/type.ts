export interface Place {
    id: number
    name: string
    location: string
    stay: string
    description: string
    location_type: string
  }
  
  export interface FormData {
    title: string
    subtitle: string
    description: string
    duration: string
    participants: string
    total_cost: number
    difficulty: string
    board_tags: string[]
    board_highlights: string[]
    board_places: Place[],
    dayTitles: object,
    daySubtitles: object,
    dayNotes: object
  }