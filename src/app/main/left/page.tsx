import React from "react"
import Search from "./search"
import Recommend from "./Recommend"
import Popular from "./popular"
import Board from "./board"

const one = () => {
  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Recommend />
      <Popular />
      <Board />
    </div>
  )
}

export default one
