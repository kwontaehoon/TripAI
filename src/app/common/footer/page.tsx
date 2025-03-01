import React from 'react'
import Image from 'next/image'
import FigmaLogo from '../../../../public/svg/Figma.svg'
import LinkedInLogo from '../../../../public/svg/LinkedIn.svg'
import XLogo from '../../../../public/svg/X.svg'
import YouTubeLogo from '../../../../public/svg/YouTube.svg'
import Instagram from '../../../../public/svg/Instagram.svg'

const page = () => {
  return (
    <div className='bg-blue-500 w-h-center py-5'>
        <div className='flex w-[900px]'>
            <div className='mr-40 lg:block hidden'>
              <Image src={FigmaLogo} alt="Figma Logo" />
              <div className='flex mt-5 space-x-3'>
                <Image src={LinkedInLogo} alt="LinkedIn Logo" />
                <Image src={XLogo} alt="X Logo" />
                <Image src={YouTubeLogo} alt="YouTube Logo" />
                <Image src={Instagram} alt="Instagram Logo" />
              </div>
            </div>
            <div className='flex-1 lg:flex hidden'>
                <div className='flex-1 space-y-5'>
                    <div>Use Cases</div>
                    <div>UI Design</div>
                    <div>UX Design</div>
                    <div>Wireframing</div>
                    <div>Diagramming</div>
                    <div>Brainstorming</div>
                    <div>Online Whiteboard</div>
                    <div>Team Collaboration</div>
                </div>
                <div className='flex-1 space-y-5'>
                  <div>Explore</div>
                  <div>Design</div>
                  <div>Prototyping</div>
                  <div>Development Features</div>
                  <div>Design Systems</div>
                  <div>Collaboration Features</div>
                  <div>Design Process</div>
                  <div>FigJam</div>
                </div>
                <div className='flex-1 space-y-5'>
                  <div>Resources</div>
                  <div>Blog</div>
                  <div>Best Practices</div>
                  <div>Colors</div>
                  <div>Color Wheel</div>
                  <div>Support</div>
                  <div>Developers</div>
                  <div>Resource Library</div>
                </div>
            </div>
            <div className='lg:hidden w-full flex-col w-h-center space-y-5'>
              <div className=''>화살표</div>
              <div>Contrary</div>
              <div>Lorem us</div>
              <div>Contacts</div>
              <div>Blog</div>
              <div className='flex'>
                <div>기호</div>
                <div>기호</div>
                <div>기호</div>
              </div>
              <div>@2025 Where Works etc</div>
              <div className='flex text-sm whitespace-nowrap'>
                <div className='flex-1 mr-3'>Privacy & terms</div>
                <div className='flex-1'>Samples</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default page