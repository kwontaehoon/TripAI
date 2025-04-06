// hooks/useAiResponseText.ts
import { useEffect, useState } from 'react'
import { useAiResponseDetails } from './useAiResponseDetails'

export const useAiResponseImage = () => {
  const [aiResponseImage, setAiResponseImage] = useState<any[]>([])

  const { aiResponseDetails } = useAiResponseDetails()

  useEffect(() => {
    if(aiResponseDetails.length > 0){
        const arr = []

       aiResponseDetails.map(x => x.photos.map(y => {
            arr.push(y.name)
        }))
        setAiResponseImage(arr)
    }
    
  }, [aiResponseDetails])

  return { aiResponseImage }
}