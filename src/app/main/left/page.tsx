import React from "react"
import Search from "./search"
import Recommend from "./Recommend"
import Popular from "./popular"

const one = () => {
  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Recommend />
      <Popular />
    </div>
  )
}

export default one
