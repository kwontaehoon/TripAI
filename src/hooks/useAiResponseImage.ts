import { useEffect, useState } from 'react'
import { useAiResponseDetails } from './useAiResponseDetails'

export const useAiResponseImage = () => {
  const [aiResponseImage, setAiResponseImage] = useState<any[]>([])

  const { aiResponseDetails } = useAiResponseDetails()

  useEffect(() => {
    if(aiResponseDetails.length > 0){
        const arr = []

        aiResponseDetails.forEach(x => {
          const photoNames = x.photos.slice(0, 2).map(y => y.name);
          arr.push(photoNames);
        });
        setAiResponseImage(arr)
    }
    
  }, [aiResponseDetails])

  return { aiResponseImage }
}