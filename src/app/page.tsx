'use client'
import Link from "next/link"
import { redirect } from "next/navigation"
import { MapProvider } from "@/func/map-provider"
import { MapComponent } from "@/app/map"
import { useGooglePlaceTextMutation, useGooglePlaceNearbyMutation } from "@/hooks/dev"
import MainPage from '@/app/main/page'

const page = () => {

  const { mutate: tt, data: textData } = useGooglePlaceTextMutation();
  const { mutate: nearby, data: nearbyData } = useGooglePlaceNearbyMutation();
  console.log("textData: ", textData);
  console.log("nearbyData: ", nearbyData);

  return (
    <div>
      {/* <div><Link href={`/blog/${43}`}>Blog로 이동</Link></div>
      <div><Link href="/zod">zod</Link></div>
      <div onClick={()=> {
        setTimeout(() => {
          redirect('/test')
        }, 3000);
      }}>redirect root로 3초 후 이동</div>
      <div onClick={()=>{
        tt({
          "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"
        })
      }}>google Text</div>
      <div onClick={()=>{
        nearby({
          "includedTypes": ["restaurant"],
          "maxResultCount": 10,
          "locationRestriction": {
            "circle": {
              "center": {
                "latitude": 37.7937,
                "longitude": -122.3965},
              "radius": 500.0
            }
          }
        })
      }}>google nearby</div>
      <MapProvider>
          <MapComponent />
      </MapProvider> */}
      <MainPage />
    </div>
  )
}

export default page