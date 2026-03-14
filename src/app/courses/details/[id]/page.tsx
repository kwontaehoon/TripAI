import { getServerUserInfo } from "@/util/serverUserInfo"
import Client from "./client"

export { generateMetadata } from "./metadata"

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const userInfo = await getServerUserInfo()

  return <Client params={params} userInfo={userInfo} />
}

export default Page
