'use client'
import React, { useState, useEffect} from 'react'
import Link from "next/link"

const page = () => {

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`h-16 bg-green-500 flex fixed top-0 left-0 w-full shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
        <Link href="/" className='w-32 bg-red-500'></Link>
        <div className='flex-1 border border-black flex flex-row-reverse'>
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className='w-36 border border-black w-h-center'>
                    123
                </div>
            ))}
        </div>
    </header>
  )
}

export default page