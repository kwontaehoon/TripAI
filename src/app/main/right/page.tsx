"use client"
import React from "react"
import StatsCard from "./statsCard"
import CurrentSearch from "./currentSearch"
import Live from "./live"
import Quick from "./quick"

const Page = ({ boardsData, coursesData }) => {
  return (
    <div className="space-y-6 w-full lg:w-[230px]">
      <StatsCard boardsData={boardsData} coursesData={coursesData} />
      <Live />
      <CurrentSearch />
      <Quick boardsData={boardsData} coursesData={coursesData} />
    </div>
  )
}

export default Page
