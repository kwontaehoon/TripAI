import Client from "./client"
import { getServerUserInfo } from "@/util/serverUserInfo"

const Page = async () => {
  const userInfo = await getServerUserInfo()

  return <Client userInfo={userInfo} />
}

export default Page
