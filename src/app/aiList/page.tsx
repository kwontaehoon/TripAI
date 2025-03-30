'use client'
import React, { useState, useEffect } from 'react'
import { MapProvider } from "@/func/map-provider"
import { MapComponent } from "@/app/maps/page"
import { useGooglePlaceTextMutation, useGooglePlaceNearbyMutation } from "@/hooks/dev"

const page = () => {

  type aiResponseType = {
    title: string,

  }
  const [aiResponse, setAiResponse] = useState<object[]>({})
  console.log("aiResponse: ", aiResponse)

  useEffect(() => {
    setAiResponse(JSON.parse(localStorage.getItem("aiList") || ""))
  }, [])


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
                        <div>{y?.next[0]?.distance}</div>
                        <div>{y?.next[0]?.driving_time}</div>
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