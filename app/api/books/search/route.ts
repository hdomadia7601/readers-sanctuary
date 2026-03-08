import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ items: [] })
    }

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}&maxResults=10`,
      {
        next: { revalidate: 86400 }
      }
    )

    const data = await res.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error("BOOK SEARCH ERROR:", error)

    return NextResponse.json(
      { items: [] },
      { status: 500 }
    )
  }
}