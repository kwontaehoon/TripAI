import React from "react"
import PC from "./pc"
import Mobile from "./mobile"

const page = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <PC />
      </div>

      <div className="block lg:hidden">
        <Mobile />
      </div>
    </div>
  )
}

export default page
