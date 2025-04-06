// hooks/useAiResponseText.ts
import { useEffect, useState } from 'react'

export const useAiResponse = () => {
  const [aiResponse, setAiResponse] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('aiList')

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAiResponse(parsed)
      } catch (error) {
        console.error('aiText 파싱 오류:', error)
      }
    }
  }, [])

  return { aiResponse }
}