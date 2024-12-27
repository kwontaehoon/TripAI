'use client'
import Link from "next/link"
import { redirect } from "next/navigation";

const page = () => {

  return (
    <div>
      <div>page</div>
      <Link href={`/blog/${43}`}>Link</Link>
      <div>useRouter - /blog</div>
      <div onClick={()=> {
        setTimeout(() => {
          redirect('/test')
        }, 3000);
      }}>redirect root로 3초 후 이동</div>
    </div>
  )
}

export default page