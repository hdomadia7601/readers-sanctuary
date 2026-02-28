"use client"

import { motion } from "framer-motion"

type BookCardProps = {
  coverUrl?: string
}

export default function BookCard({ coverUrl }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative w-44 aspect-[2/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-neutral-200"
    >
      {coverUrl ? (
        <img
          src={coverUrl}
          alt="Book cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-neutral-500 text-sm">
          Book
        </div>
      )}
    </motion.div>
  )
}