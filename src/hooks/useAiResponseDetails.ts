import { useEffect, useState } from 'react'
import { useAiResponseText } from './useAiResponseText'
import { useGooglePlaceDetailsQueries } from './dev'

export const useAiResponseDetails = () => {
  const [aiResponseDetails, setAiResponseDetails] = useState<any[]>([])
  const { aiResponseText } = useAiResponseText()

  const placeIds = [...new Set(aiResponseText.map(item => item.id))]

  const detailsQueries = useGooglePlaceDetailsQueries(placeIds)

  const isAllSuccess = detailsQueries.every(q => q.isSuccess)

  useEffect(() => {
    if (aiResponseText.length > 0 && isAllSuccess) {
      const placeDetails = detailsQueries.map(q => q.data?.data).filter(Boolean)
      setAiResponseDetails(placeDetails)
    }
  }, [isAllSuccess])

  return { aiResponseDetails, isAllSuccess }
}
