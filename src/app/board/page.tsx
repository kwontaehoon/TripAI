import { getServerUserInfo } from "@/util/serverUserInfo"
import Client from "./client"

const Page = async () => {
  const userInfo = await getServerUserInfo()

  return <Client userInfo={userInfo} />
}

export default Page
