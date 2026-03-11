"use client"

import Gallery from "./gallery"
import Recommend from "./recommend"
import Board from "./board"
import Popular from "./popular"
import Search from "./search"
import { useIntroModal } from "@/hooks/useIntroModal"

const LeftPanel = () => {
  useIntroModal()

  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Gallery />
      <Recommend />
      <Popular />
      <Board />
    </div>
  )
}

export default LeftPanel
