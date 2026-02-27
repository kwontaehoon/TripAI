import { getBoards, getCourses } from "@/service/supabase"
import Client from "./client"

const page = async () => {
  const [boardsData, coursesData] = await Promise.all([
    getCourses(),
    getBoards(),
  ])
  return <Client boardsData={boardsData} coursesData={coursesData} />
}

export default page
