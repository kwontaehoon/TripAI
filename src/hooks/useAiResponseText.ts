import { useEffect, useState } from 'react'
import { useGooglePlaceTextMutation, useUrlCheckMutation, useUrlRegisterMutation } from './springboot/dev'

export const useAiResponseText = () => {
  const [aiResponseText, setAiResponseText] = useState<any[]>([])
  const aiResponse = JSON.parse(localStorage.getItem('aiList') || '')
  const { mutateAsync: textMutate, isSuccess } = useGooglePlaceTextMutation()
  const { mutateAsync: urlCheckMutate, status } = useUrlCheckMutation()
  // console.log("status: ", status)
  const { mutateAsync: urlRegisterMutate } = useUrlRegisterMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (aiResponse && aiResponse.days?.length > 0) {
        const allLocations = aiResponse.days.flatMap((day: any) => day.locations)
        let results = []

        results = await Promise.all(
          allLocations.map(async (loc:object[]) => {
            const check = await urlCheckMutate({ location: loc.name });
            try {
              if (!!check) {
                console.log("이미있어", check);
                return { id: check.textId };
              } else {
                console.log("새로 요청");
                const res = await textMutate(loc.name);
                await urlRegisterMutate({
                  location: loc.name,
                  textId: res.id,
                });
                return res;
              }
            } catch (e) {
              console.error("textMutate 실패:", e);
              return null;
            }
          })
        )
        setAiResponseText(results)
      }
    }
    fetchData()
  }, [])

  return { aiResponseText, isSuccess }
}
