import { useEffect, useState } from 'react'
import { useAiResponse } from './useAiResponse'
import { useGooglePlaceTextMutation, useUrlCheckMutation, useUrlRegisterMutation } from './dev'

export const useAiResponseText = () => {
  const [aiResponseText, setAiResponseText] = useState<any[]>([])
  const { aiResponse } = useAiResponse()
  const { mutateAsync: textMutate, isSuccess } = useGooglePlaceTextMutation()
  const { mutateAsync: urlCheckMutate } = useUrlCheckMutation()
  const { mutateAsync: urlRegisterMutate } = useUrlRegisterMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (aiResponse && aiResponse.days?.length > 0) {
        const allLocations = aiResponse.days.flatMap((day: any) => day.locations)
        const results = []

        for(let i=0; i<allLocations.length; i++){
          const check = await urlCheckMutate({location: allLocations[i].name});
          try {
            if(!!check){
              console.log("이미있어", check);
              results.push({
                id: check.textId
              })
            }else{
              console.log("새로 요청")
              const res = await textMutate(allLocations[i].name)
              results.push(res)
              await urlRegisterMutate({
                location: allLocations[i].name,
                textId: res.id
              })
            }
            
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
