"use client"

import { motion } from "framer-motion"
import BookCard from "@/components/book/BookCard"

const rowOne = [
  "pride-and-prejudice.jpg",
  "to-kill-a-mockingbird.jpg",
  "the-silent-patient.jpg",
  "girl-on-the-train.jpg",
  "3-mistakes-of-my-life.jpg",
  "5-am-club.jpg",
  "psychology-of-money.jpg",
  "subtle-art-of-not-giving-a-fuck.jpg",
  "ikigai.jpg",
  "power-of-your-subconscious-mind.jpg",
  "love-hypothesis.jpg",
  "spanish-love-deception.jpg",
  "icebreaker.jpg",
  "twisted-love.jpg",
  "the-hating-game.jpg",
]

const rowTwo = [
  "better-than-the-movies.jpg",
  "love-and-other-words.jpg",
  "book-lovers.jpg",
  "beach-read.jpg",
  "unhoneymooners.jpg",
  "red-white-and-royal-blue.jpg",
  "notebook.jpg",
  "it-happened-one-summer.jpg",
  "people-we-meet-on-vacation.jpg",
  "the-deal.jpg",
  "it-ends-with-us.jpg",
  "fault-in-our-stars.jpg",
  "a-court-of-thorns-and-roses.jpg",
  "hunger-games.jpg",
  "the-martian.jpg",
]

export default function BookCarousel() {
  return (
    <div className="relative overflow-hidden py-12 space-y-10">
      {/* Row 1 (slightly faster) */}
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
      >
        {[...rowOne, ...rowOne].map((cover, index) => (
          <BookCard
            key={`row1-${index}`}
            coverUrl={`/covers/${cover}`}
          />
        ))}
      </motion.div>

      {/* Row 2 (slower for depth) */}
      <motion.div
        className="flex gap-6 w-max mt-6"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 34, ease: "linear" }}
      >
        {[...rowTwo, ...rowTwo].map((cover, index) => (
          <BookCard
            key={`row2-${index}`}
            coverUrl={`/covers/${cover}`}
          />
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#f8f6f1] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#f8f6f1] to-transparent" />
    </div>
  )
}