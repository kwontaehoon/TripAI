'use client'
import React from 'react'
import { MapProvider } from "@/func/map-provider"
import { MapComponent } from "@/func/maps"
import { useAiResponseImage } from '@/hooks/useAiResponseImage'

const page = () => {

  const aiResponse = JSON.parse(localStorage.getItem('aiList') || '')

  const { aiResponseImage } = useAiResponseImage()
 
  return (
    <div className='py-28 flex lg:flex-row flex-col gap-5 px-5'>
      <div className='w-[100%] lg:flex-1 h-[500px]'>
        <MapProvider>
            <MapComponent />
        </MapProvider>
      </div>

      <div className='flex-1 h-[500px] overflow-y-scroll'>
      <div>{aiResponse.title}</div>
      <div>{aiResponse.description}</div>
        {aiResponse?.days?.map((x, index) => {
            return (
              <div key={index}>
                {index === 0 && <div className='flex justify-end text-sm mb-5'>다른 코스 추천</div>}
                <div>{index+1}일차</div>
                <div className='bg-gray-200 mb-5'>
                  {x?.locations?.map((y, index2) => {
                    return (
                      <div className='py-5' key={index2}>
                        <div>{y.name}</div>
                        <div>{y.description}</div>
                        <div>좌표: {y.coordinates[0]}, {y.coordinates[1]}</div>
                        <div>{y?.next?.distance}</div>
                        <div>{y?.next?.driving_time}</div>
                        {aiResponseImage[index2]?.map(photoGroup => {
                            return (
                              <img key={photoGroup} src={`https://places.googleapis.com/v1/${photoGroup}/media?maxHeightPx=400&maxWidthPx=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}`} />
                            )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default page