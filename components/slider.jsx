"use client";
import Image from "next/image";
import { useState } from "react";

export default function Slider() {
  const images = [
    "/homeCarousel/1.jpg",
    "/homeCarousel/2.jpg",
    "/homeCarousel/3.jpg",
    "/homeCarousel/4.jpg",
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className="w-full mt-0">
      {/* Image + Gradient + Content */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={images[index]}
          alt={`Slide ${index + 1}`}
          fill
          className="object-cover"
          priority
        />
    
      <div className="absolute inset-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] flex items-center px-3 sm:px-5">
        <div className="text-white space-y-4 sm:space-y-6 md:space-y-7 w-full sm:w-2/3 md:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug">
            Affordable Price For Car Servicing
          </h2>
          <p className="text-sm sm:text-base md:text-lg">
            There are many variation of passage of available but the
            majority have suffered alteration in some form
          </p>
          <div>
            <button className="bg-amber-600 text-black px-3 sm:px-4 py-2 rounded-xl font-medium mr-3">
              Discover More
            </button>
            <button className="bg-amber-600 text-black px-3 sm:px-4 py-2 rounded-xl font-medium">
              Latest Project
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Navigation Buttons */ }
  <div className="flex justify-center gap-3 mt-4">
    <button
      onClick={() => setIndex((index - 1 + 4) % 4)}
      className="px-3 sm:px-4 py-2 bg-gray-800 text-white rounded"
    >
      Prev
    </button>

    <button
      onClick={() => setIndex((index + 1) % 4)}
      className="px-3 sm:px-4 py-2 bg-gray-800 text-white rounded"
    >
      Next
    </button>
  </div>
    </div >
  );
}
