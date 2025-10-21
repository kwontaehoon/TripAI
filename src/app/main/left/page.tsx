"use client"

import Gallery from "./gallery"
import Recommend from "./recommend"
import Board from "./board"
import Popular from "./popular"
import Search from "./search"

const Page = ({
  galleryList,
  popularLocation,
  boardsInfiniteData,
  coursesInfiniteData,
}) => {
  return (
    <div className="mb-12 w-full lg:w-[700px]">
      <Search />
      <Gallery galleryList={galleryList} />
      <Recommend coursesInfiniteData={coursesInfiniteData} />
      <Popular popularLocation={popularLocation} />
      <Board boardsInfiniteData={boardsInfiniteData} />
    </div>
  )
}

export default Page
