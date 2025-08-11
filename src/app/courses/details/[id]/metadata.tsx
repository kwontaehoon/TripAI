import { getCourseDetails } from "@/service/supabase"
import type { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug

  const courseDetailsData = await getCourseDetails(Number(slug))

  return {
    title: courseDetailsData?.[0]?.title,
    description: courseDetailsData?.[0]?.description,
  }
}

export default function Page({ params, searchParams }: Props) {}
