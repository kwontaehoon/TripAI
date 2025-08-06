"use client"

import Recommend from "./recommend"
import Board from "./board"
import Popular from "./popular"
import Search from "./search"
import { createClient } from "@/service/supabase/client"
import { useEffect } from "react"

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
