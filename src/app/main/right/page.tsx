import React from "react"
import StatsCard from "./StatsCard"
import CurrentSearch from "./currentSearch"
import Live from "./live"
import Quick from "./Quick"

const two = () => {
  return (
    <div className="space-y-6 w-full lg:w-[230px]">
      <StatsCard />
      <Live />
      <CurrentSearch />
      <Quick />
    </div>
  )
}

export default two
