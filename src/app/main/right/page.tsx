"use client"
import React from "react"
import StatsCard from "./statsCard"
import CurrentSearch from "./currentSearch"
import Live from "./live"
import Quick from "./quick"

const Page = () => {
  return (
    <div className="space-y-6 w-full lg:w-[230px]">
      <StatsCard />
      <Live />
      <CurrentSearch />
      <Quick />
    </div>
  )
}

export default Page
