"use client";
import React from 'react'
import Image from 'next/image'
import { AdinnLogo } from './Icons/Icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {AdinnLogoBlack} from './Icons/Icons'

const TopNav = () => {
    const pathname = usePathname()
    console.log('Current pathname:', pathname)
    
    const isContactPage = pathname === '/contact'
    
    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'About Us', link: '/about-us' },
        { name: 'Service', link: '/service' },
        { name: 'Project', link: '/projects' },
        { name: 'Contact Us', link: '/contact' }
    ]

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') {
            return true
        }
        return pathname?.includes(path.toLowerCase()) && path !== '/'
    }

    return (
        <div className='flex justify-between w-full items-center p-10'>
            {/* Logo */}
            <div className='flex items-center'>
                <Link href="/">
                    <Image 
                        src={isContactPage ? AdinnLogoBlack : AdinnLogo} 
                        alt='Adinn Logo' 
                        width={100} 
                        height={100} 
                    />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
                {navItems.map((item, index) => (
                    <Link 
                        key={index} 
                        href={item.link} 
                        className={`text-[16px] font-bold hover:text-[#CF1E00] transition-all
                            ${isActive(item.link) ? 'text-[#CF1E00]' : isContactPage ? 'text-black' : 'text-white'}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Book a Call Button */}
            <div className='flex items-center '>
                <button className={`w-[121px] h-[42px] rounded-[26px] px-4 py-2 cursor-pointer transition-all
                    ${isContactPage 
                        ? 'bg-black border border-black text-white hover:bg-black hover:text-white' 
                        : 'bg-[#444444] border border-[#989898] text-[#FFFCFC] hover:bg-[#333333]'
                    }`}>
                    Book a Call
                </button>
            </div>
        </div>
    )
}

export default TopNav
