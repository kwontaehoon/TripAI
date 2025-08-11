import { getBoardDetails } from "@/service/supabase"
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

  const boardDetailsData = await getBoardDetails(Number(slug))

  return {
    title: boardDetailsData?.[0]?.title,
    description: boardDetailsData?.[0]?.description,
  }
}

export default function Page({ params, searchParams }: Props) {}
