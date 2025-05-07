import React, { useEffect, useState } from 'react'
import One from './one'
import Two from './two'
import { useGeminiAiMutation, useGooglePlaceCombineQuery, useNextJSQuery, useSelectTestQuery, useTestPageNationQuery, useTestQuery } from '@/hooks/dev'
import { useSession, signIn, signOut } from 'next-auth/react'

const page = () => {

  // const { data: pageNationData, isLoading, isFetching } = useTestPageNationQuery(state)

  // useEffect(() => {
  //   console.log("isLoading: ", isLoading, isFetching)
  // }, [pageNationData])

  const { data: session } = useSession()
  console.log(session)
  
  // return (
  //   <div className='py-28'>
  //     <button onClick={()=>setState(0)}>버튼1</button>
  //     <br />
  //     <button onClick={()=>setState(1)}>버튼2</button>
  //     <div className='w-20 border'>{pageNationData}</div>
  //     <div></div>

  //     {/* <img src="https://places.googleapis.com/v1/places/ChIJgf4OJaelfDURmDvA_sHyPUM/photos/AeeoHcJNA-6eT9vbTn5sGycdy3eaLOvgWdfSxyuXp_GbjCXJJjPumLo9zj35oncBIfckcf9ShIR8V0ukx07eElGDGgoPGezixauFIcBlQ137tpAA_dRUOVU6dUPLmJrZtXweXA1OERe6ydUnDlUVo8ckeKZGUHAD0CzWLYf5wtE0dnbuFPfpBWw7xeOxXEZ7HogwpisTWDaZ3kwZhqDiE6MbUOPETAsQhkDa6eS9ItyJ3aWz1v1VylXH6aB4zpUx5nV9nV9OoUjLYsu3uKQYpaMRkLOyA2G1emIfnu_dRH6P8S-NG48YxYumMV271bnRg6HtQihE4vaZuVchXC0w3n_RrT3l7DZWQMTx-ZH0siYkBRFO60W02rkFve4A3etrrkhFuLYXjdMPCVZ5T-SqnL3bAnEuUxdF9oLXwkltjf0wW6W6C_0NSI0eBDNzQ-CQFekp/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAd5eykb8oqog1aavul7E0IhBfyID9mWWg"/> */}
  //       <One />
  //       <Two />
  //   </div>
  // )
  if (session) {
    return (
      <div className='py-28'>
        <p>{session.user?.name} 님 환영합니다!</p>
        <div>123</div>
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    );
  }

  return (
    <div className='py-28'>
      <button onClick={() => signIn("kakao", { callbackUrl: "/"})}>로그인</button>
    </div>
  );

}

export default page