"use client"
import Recommend from "./Recommend"
import Board from "./board"
import Popular from "./popular"
import Search from "./search"

const Page = () => {
  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Recommend />
      <Popular />
      <Board />
    </div>
  )
}

export default Page
