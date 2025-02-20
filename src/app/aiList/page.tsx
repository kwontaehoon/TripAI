import React from 'react'
import { MapProvider } from "@/func/map-provider"
import { MapComponent } from "@/app/maps/page"
import { useGooglePlaceTextMutation, useGooglePlaceNearbyMutation } from "@/hooks/dev"
import MainPage from '@/app/main/page'

const page = () => {

  const arr = [
    { id: 1, title: "1. 강릉 커피 거리", subTitle: "다양한 카페가 모여있는 거리" },
    { id: 2, title: "2. 강릉 커피 거리", subTitle: "다양한 카페가 모여있는 거리" },
  ]
  return (
    <div className='py-16'>
      <div className='h-[500px]'>
        <MapProvider>
            <MapComponent />
        </MapProvider>
      </div>
      <div className='p-5'>
        {/* <div className='flex justify-end'>다른 코스 추천</div> */}
        {arr.map(x => {
            return (
              <div key={x.id}>
                {x.id === 1 && <div className='flex justify-end text-sm'>다른 코스 추천</div>}
                <div>{x.title}</div>
                <div>{x.subTitle}</div>
                <div className='h-20 bg-gray-600 mb-5'>
                  
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default page