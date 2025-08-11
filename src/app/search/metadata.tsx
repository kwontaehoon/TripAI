import { Metadata } from "next"

type Props = {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const searchQuery = searchParams.q || "여행"
  const title = `"${searchQuery}" 검색 결과 | TripAI`
  const description = `${searchQuery}에 대한 AI 여행 코스 검색 결과입니다.`

  return {
    title: title,
    description: description,
  }
}

export default function SearchPage({ searchParams }: Props) {}
