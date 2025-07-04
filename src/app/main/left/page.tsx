"use client"
import React from "react"
import Search from "./search"
import Recommend from "./Recommend"
import Popular from "./popular"
import Board from "./board"
import { PageProps } from "../type"

const Page: React.FC<PageProps> = ({ boardsData, coursesData }) => {
  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Recommend coursesData={coursesData} />
      <Popular />
      <Board boardsData={boardsData} />
    </div>
  )
}

export default Page
