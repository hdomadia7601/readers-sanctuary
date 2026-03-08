"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ShelvesPage() {

  const [books, setBooks] = useState<any[]>([])

  const shelves = [
    { key: "currently-reading", label: "Currently Reading" },
    { key: "want-to-read", label: "Want to Read" },
    { key: "finished", label: "Finished" },
    { key: "incomplete", label: "Incomplete" }
  ]

  function loadBooks() {

    const stored = localStorage.getItem("books")
    const parsed = stored ? JSON.parse(stored) : []

    const sorted = parsed.sort(
      (a: any, b: any) => b.addedAt - a.addedAt
    )

    setBooks(sorted)

  }

  useEffect(() => {

    loadBooks()

    window.addEventListener("booksUpdated", loadBooks)

    return () => {
      window.removeEventListener("booksUpdated", loadBooks)
    }

  }, [])

  return (

    <main className="min-h-screen bg-[#f8f6f1] text-neutral-800 px-8 py-24">

      {/* Title */}

      <section className="text-center mb-20">

        <h1 className="text-5xl font-serif mb-4">
          Your Shelves
        </h1>

        <p className="text-neutral-600">
          Organize your reading life.
        </p>

      </section>

      {/* Shelves */}

      <div className="max-w-5xl mx-auto space-y-16">

        {shelves.map((shelf) => {

          const shelfBooks = books.filter(
            (book) => book.shelf === shelf.key
          )

          return (

            <div key={shelf.key}>

              {/* Shelf label */}

              <h2 className="text-xl font-semibold mb-6">
                {shelf.label}
              </h2>

              {/* Books row */}

              <div className="flex gap-6 overflow-x-auto pb-6">

                {shelfBooks.length === 0 && (

                  <div className="w-28 h-40 bg-neutral-200 rounded-md shadow"></div>

                )}

                {shelfBooks.map((book) => (

                  <Link key={book.id} href={`/books/${book.id}`}>

                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-28 h-40 object-cover rounded-md shadow hover:scale-105 transition cursor-pointer"
                    />

                  </Link>

                ))}

              </div>

              {/* Shelf bar */}

              <div className="h-2 bg-neutral-300 rounded-full"></div>

            </div>

          )

        })}

      </div>

      {/* Back Home */}

      <div className="text-center mt-24">

        <Link href="/">
          <button className="hover:underline text-neutral-700">
            ← Back Home
          </button>
        </Link>

      </div>

    </main>

  )

}