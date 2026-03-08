"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function BookPage() {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState<any>(null)
  const [shelf, setShelf] = useState("want-to-read")
  const [rating, setRating] = useState(0)
  const [startDate, setStartDate] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [favourite, setFavourite] = useState(false)

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      )

      const data = await res.json()
      setBook(data)
    }

    fetchBook()
  }, [id])

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading book...
      </div>
    )
  }

  const info = book.volumeInfo

  function saveBook() {
    const stored = localStorage.getItem("books")
    const books = stored ? JSON.parse(stored) : []

    books.push({
      id: book.id,
      title: info.title,
      authors: info.authors,
      thumbnail: info.imageLinks?.thumbnail,
      shelf,
      rating,
      startDate,
      finishDate,
      favourite
    })

    localStorage.setItem("books", JSON.stringify(books))

    router.push("/shelves")
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-8 py-20 text-neutral-800">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Cover */}
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-60 rounded shadow"
          />
        )}

        {/* Details */}
        <div>

          <h1 className="text-3xl font-serif mb-2">
            {info.title}
          </h1>

          <p className="text-neutral-600 mb-6">
            {info.authors?.join(", ")}
          </p>

          {info.description && (
            <p className="text-sm text-neutral-700 mb-8">
              {info.description}
            </p>
          )}

          {/* Shelf */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Shelf</label>

            <select
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="currently-reading">Currently Reading</option>
              <option value="want-to-read">Want to Read</option>
              <option value="finished">Finished</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex gap-2 mb-4">
            {[1,2,3,4,5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-xl ${
                  star <= rating
                    ? "text-yellow-500"
                    : "text-neutral-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2"
            />

            <input
              type="date"
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              className="border rounded px-3 py-2"
            />

          </div>

          {/* Favourite */}
          <button
            onClick={() => setFavourite(!favourite)}
            className="mb-6 text-xl"
          >
            {favourite ? "❤️ Favourite" : "♡ Favourite"}
          </button>

          {/* Save */}
          <div>
            <button
              onClick={saveBook}
              className="px-6 py-3 bg-black text-white rounded-lg"
            >
              Save to Shelf
            </button>
          </div>

        </div>

      </div>

    </main>
  )
}