const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/trip-ai`

export const getStorageUrl = (path: string) => `${STORAGE_BASE}/${path}`
