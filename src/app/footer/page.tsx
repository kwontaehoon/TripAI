import React from 'react'
import Image from 'next/image'
import FigmaLogo from '../../../public/svg/Figma.svg'
import LinkedInLogo from '../../../public/svg/LinkedIn.svg'
import XLogo from '../../../public/svg/X.svg'
import YouTubeLogo from '../../../public/svg/YouTube.svg'
import Instagram from '../../../public/svg/Instagram.svg'

const page = () => {
  return (
    <div className='w-full bg-blue-500 w-h-center p-5'>
        <div className='flex'>
            <div className='mr-40'>
              <Image src={FigmaLogo} alt="Figma Logo" />
              <div className='flex mt-5 space-x-3'>
                <Image src={LinkedInLogo} alt="LinkedIn Logo" />
                <Image src={XLogo} alt="X Logo" />
                <Image src={YouTubeLogo} alt="YouTube Logo" />
                <Image src={Instagram} alt="Instagram Logo" />
              </div>
            </div>
            <div className='flex'>
                <div className='mr-40 space-y-5'>
                    <div>Use Cases</div>
                    <div>UI Design</div>
                    <div>UX Design</div>
                    <div>Wireframing</div>
                    <div>Diagramming</div>
                    <div>Brainstorming</div>
                    <div>Online Whiteboard</div>
                    <div>Team Collaboration</div>
                </div>
                <div className='mr-40 space-y-5'>
                  <div>Explore</div>
                  <div>Design</div>
                  <div>Prototyping</div>
                  <div>Development Features</div>
                  <div>Design Systems</div>
                  <div>Collaboration Features</div>
                  <div>Design Process</div>
                  <div>FigJam</div>
                </div>
                <div className='space-y-5'>
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
        </div>
    </div>
  )
}

export default page