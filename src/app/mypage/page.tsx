import React from 'react'
import Client from './client'
import { createClient } from '@/service/supabase/server'
import { getBoards, getUserInfo } from '@/service/supabase'
import moment from 'moment'

const page = async() => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

   const userInfo = !session ? null : await getUserInfo(session?.user.email)

   // 활동 분석
   const analyticsData = Array.from({ length: 12 }, (_, index) => ({
    month: `${index + 1}월`,
    trips: 0,
    photos: 0,
    reviews: 0,
  }))

  userInfo.boards.map((board) => {
    if (moment(board.created_at).year() === moment().year()) {
      // months 값
      analyticsData[moment(board.created_at).month()].trips += 1
      // photos 값
      analyticsData[moment(board.created_at).month()].photos +=
        board.board_images.length
    }
  })

  return (
    <Client userInfo={userInfo} analyticsData={analyticsData}/>
  )
}

export default page