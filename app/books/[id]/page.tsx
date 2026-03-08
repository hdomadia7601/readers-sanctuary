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
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        Loading book...
      </div>
    )
  }

  const info = book.volumeInfo

  const cleanDescription = info.description
    ? info.description.replace(/<[^>]*>?/gm, "")
    : ""

  function saveBook() {

    const stored = localStorage.getItem("books")
    const books = stored ? JSON.parse(stored) : []

    const existingIndex = books.findIndex(
      (b: any) => b.id === book.id
    )

    const newBook = {
      id: book.id,
      title: info.title,
      authors: info.authors,
      thumbnail: info.imageLinks?.thumbnail,
      shelf,
      rating,
      startDate,
      finishDate,
      favourite,
      addedAt: Date.now()
    }

    if (existingIndex !== -1) {

      books[existingIndex] = newBook

    } else {

      books.push(newBook)

    }

    localStorage.setItem("books", JSON.stringify(books))

    window.dispatchEvent(new Event("booksUpdated"))

    router.push("/shelves")

  }

  return (

    <main className="min-h-screen bg-[#f8f6f1] px-12 py-24 text-neutral-800">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE */}

        <div>

          {info.imageLinks?.thumbnail && (
            <img
              src={info.imageLinks.thumbnail}
              alt={info.title}
              className="w-72 rounded-lg shadow-md mb-8"
            />
          )}

          {/* Shelf */}

          <select
            value={shelf}
            onChange={(e) => setShelf(e.target.value)}
            className="w-72 border border-neutral-300 rounded-md px-4 py-3 text-base bg-white text-black mb-6"
          >
            <option value="currently-reading">Currently Reading</option>
            <option value="want-to-read">Want to Read</option>
            <option value="finished">Finished</option>
            <option value="incomplete">Incomplete</option>
          </select>

          {/* Rating */}

          <div className="flex gap-3 mb-8">

            {[1,2,3,4,5].map((star) => (

              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl ${
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

          <div className="flex gap-4 mb-8">

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-neutral-300 rounded-md px-4 py-3"
            />

            <input
              type="date"
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              className="border border-neutral-300 rounded-md px-4 py-3"
            />

          </div>

          {/* Favourite */}

          <button
            onClick={() => setFavourite(!favourite)}
            className="mb-8 text-xl"
          >
            {favourite ? "❤️ Favourite" : "♡ Favourite"}
          </button>

          {/* Save */}

          <button
            onClick={saveBook}
            className="px-8 py-3 bg-black text-white rounded-md"
          >
            Save to Shelf
          </button>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <h1 className="text-4xl font-serif mb-3">
            {info.title}
          </h1>

          <p className="text-lg text-neutral-600 mb-8">
            {info.authors?.join(", ")}
          </p>

          {cleanDescription && (
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {cleanDescription}
            </p>
          )}

        </div>

      </div>

    </main>

  )

}