"use client"

import { useState } from "react"
import Link from "next/link"
import BookCarousel from "@/components/carousel/BookCarousel"
import AddBookModal from "@/components/books/AddBookModal"

export default function Home() {

  const [openModal, setOpenModal] = useState(false)

  return (

    <main className="min-h-screen bg-[#f8f6f1] text-neutral-800">

      {/* Hero Section */}

      <section className="px-8 pt-24 pb-16 text-center">

        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Your personal reading sanctuary
        </h1>

        <p className="text-neutral-600 max-w-xl mx-auto mb-8">
          A quiet place to track what you read — at your own pace.
        </p>

        {/* Buttons */}

        <div className="flex justify-center gap-4">

          <button
            onClick={() => setOpenModal(true)}
            className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition"
          >
            + Add a Book
          </button>

          <Link href="/shelves">

            <button className="px-6 py-3 rounded-full border border-neutral-900 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 transition">
              View Shelves
            </button>

          </Link>

        </div>

      </section>

      {/* Carousel */}

      <section className="pb-16">

        <BookCarousel />

      </section>

      {/* Monthly Cue */}

      <section className="text-center py-16">

        <p className="text-neutral-600 text-lg">
          One book at a time is enough.
        </p>

      </section>

      {/* View Shelves */}

      <section className="text-center pb-20">

        <Link href="/shelves">

          <button className="text-neutral-700 hover:underline">
            View all shelves →
          </button>

        </Link>

      </section>

      {/* Add Book Modal */}

      <AddBookModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

    </main>

  )

}