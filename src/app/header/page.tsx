'use client'
import React, { useState, useEffect} from 'react'
import Link from "next/link"
import Image from 'next/image'
import HamburgetMenu from '../../../public/svg/HamburgerMenu.svg'
import Search from '../../../public/svg/Search.svg'

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
    <div>
    <header
      className={`h-16 bg-green-500 z-10 lg:flex hidden fixed top-0 left-0 w-full shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
        <Link href="/" className='w-32 bg-red-500'></Link>
        <div className='flex-1 border flex flex-row-reverse'>
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className='w-36 w-h-center border'>
                    123
                </div>
            ))}
        </div>
    </header>

    <header>
      <div className={`h-16 bg-white z-10 shadow-md lg:hidden fixed top-0 left-0 w-full flex items-center`}>
        <div>Logo</div>
        <div className='flex-1 flex justify-end items-center'>
          <Image src={Search} alt="Search" className='mr-1 w-8 h-8' />
          <Image src={HamburgetMenu} alt="Hamburger Menu" />
        </div>
      </div>
    </header>
    </div>
  )
}

export default page