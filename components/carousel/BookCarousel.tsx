"use client"

import { motion } from "framer-motion"
import BookCard from "@/components/book/BookCard"

const demoBooks = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
}))

export default function BookCarousel() {
    return (
        <div className="relative overflow-hidden py-12 space-y-10">
          {/* Row 1 */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...demoBooks, ...demoBooks].map((book, index) => (
              <BookCard key={`row1-${index}`} />
            ))}
          </motion.div>
      
          {/* Row 2 */}
          <motion.div
            className="flex gap-6 w-max mt-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...demoBooks, ...demoBooks].map((book, index) => (
              <BookCard key={`row2-${index}`} />
            ))}
          </motion.div>
      
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f8f6f1] to-transparent" />
      
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f8f6f1] to-transparent" />
        </div>
      )
}