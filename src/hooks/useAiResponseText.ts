import { useEffect, useState } from 'react'
import { useAiResponse } from './useAiResponse'
import { useGooglePlaceTextMutation } from './dev'

export const useAiResponseText = () => {
  const [aiResponseText, setAiResponseText] = useState<any[]>([])
  const { aiResponse } = useAiResponse()
  const { mutateAsync: textMutate, isSuccess } = useGooglePlaceTextMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (aiResponse && aiResponse.days?.length > 0) {
        const allLocations = aiResponse.days.flatMap((day: any) => day.locations)
        const results = []

        for (const loc of allLocations) {
          try {
            const res = await textMutate(loc.name)
            results.push(res)
          } catch (e) {
            console.error('textMutate 실패:', e)
          }
        }

        setAiResponseText(results)
      }
    }
    fetchData()
  }, [aiResponse])

  return { aiResponseText, isSuccess }
}
