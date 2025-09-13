import Image from "next/image"
import { useState } from "react"

interface PostImagesProps {
  medias: string[]
  onSelectImage: (img: string) => void
}

export function PostImages({ medias, onSelectImage }: PostImagesProps) {
  if (!medias || medias.length === 0) return null
  return (
    <div className="mb-4">
      {medias.length === 1 ? (
        <Image
          src={medias[0] || "/placeholder.svg"}
          alt="Post image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full rounded-lg max-h-96 object-cover cursor-pointer"
          onClick={() => onSelectImage(medias[0])}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {medias.map((image, index) => (
            <Image
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Post image ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
              onClick={() => onSelectImage(image)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
