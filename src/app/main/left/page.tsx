"use client"

import Gallery from "./gallery"
import Recommend from "./recommend"
import Board from "./board"
import Popular from "./popular"
import Search from "./search"

const Page = ({ initialUserInfo }) => {

  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search initialUserInfo={initialUserInfo} />
      <Gallery />
      <Recommend />
      <Popular />
      <Board />
    </div>
  )
}

export default Page
