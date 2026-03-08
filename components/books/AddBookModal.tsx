"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

type Props = {
  isOpen: boolean
  onClose: () => void
}

type Book = {
  id: string
  title: string
  authors: string[]
  thumbnail?: string
}

export default function AddBookModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounce typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  // Search books when debounce finishes
  useEffect(() => {
    async function searchBooks() {
      if (debouncedQuery.length < 3) {
        setResults([])
        return
      }

      setLoading(true)

      try {
        const res = await fetch(
          `/api/books/search?q=${encodeURIComponent(debouncedQuery)}`
        )

        const data = await res.json()

        const books: Book[] =
          data.items?.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ["Unknown"],
            thumbnail: item.volumeInfo.imageLinks?.thumbnail
          })) || []

        const uniqueBooks = books.filter(
            (book, index, self) =>
              index === self.findIndex((b) => b.id === book.id)
          )
          
          setResults(uniqueBooks)
        setHighlightedIndex(0) // reset selection
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    searchBooks()
  }, [debouncedQuery])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!results.length) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : prev
        )
      }

      if (e.key === "Enter") {
        const book = results[highlightedIndex]

        if (book) {
          handleClose()
          router.push(`/books/${book.id}`)
        }
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [results, highlightedIndex])

  if (!isOpen) return null

  function handleClose() {
    setQuery("")
    setDebouncedQuery("")
    setResults([])
    setLoading(false)
    onClose()
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-8 w-[600px] max-h-[80vh] overflow-y-auto shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add a Book</h2>

          <button
            onClick={handleClose}
            className="text-neutral-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none mb-6"
        />

        {/* Loading */}
        {loading && (
          <p className="text-sm text-neutral-500 mb-4">
            Searching...
          </p>
        )}

        {/* Results */}
        <div className="space-y-4">
        {results.map((book, index) => (
  <div
    key={`${book.id}-${index}`}
    onClick={() => {
      handleClose()
      router.push(`/books/${book.id}`)
    }}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${
                highlightedIndex === index
                  ? "bg-neutral-200"
                  : "hover:bg-neutral-100"
              }`}
            >
              {/* Cover */}
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded"
                />
              )}

              {/* Info */}
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-neutral-600">
                  {book.authors.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}