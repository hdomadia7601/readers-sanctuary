import Link from "next/link"

export default function ShelvesPage() {

  const shelves = [
    "Currently Reading",
    "Want to Read",
    "Finished",
    "Incomplete",
    "Favourites"
  ]

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

      {/* Bookshelf */}
      <div className="max-w-5xl mx-auto space-y-16">

        {shelves.map((shelf) => (
          <div key={shelf}>

            {/* Shelf label */}
            <h2 className="text-xl font-semibold mb-6">
              {shelf}
            </h2>

            {/* Books row */}
            <div className="flex gap-6 overflow-x-auto pb-6">

              {[1,2,3,4,5].map((book) => (
                <div
                  key={book}
                  className="w-28 h-40 bg-neutral-200 rounded-md shadow hover:scale-105 transition cursor-pointer"
                />
              ))}

            </div>

            {/* Shelf bar */}
            <div className="h-2 bg-neutral-300 rounded-full"></div>

          </div>
        ))}

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