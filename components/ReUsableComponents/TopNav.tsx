"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdinnLogo, AdinnLogoBlack } from './Icons/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopNav = () => {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.menu-button')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);
    
    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'About Us', link: '/about-us' },
        { name: 'Service', link: '/service' },
        { name: 'Project', link: '/projects' },
        { name: 'Contact Us', link: '/contact' }
    ];

    const isActive = (path: string) => pathname === path;
    
    // Determine hamburger icon color based on page
    const getHamburgerColor = () => {
        if (isMenuOpen) return 'text-white'; 
        if (isContactPage) return 'text-black';
        return 'text-white'; 
    };
    
    return (
        <div className='flex justify-between w-full items-center p-6 lg:p-10 relative z-50'>
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
                {navItems.map((item, index) => (
                    <Link 
                        key={index} 
                        href={item.link} 
                        className={`text-[16px] transition-all
                            ${isActive(item.link) 
                                ? 'font-bold text-[#CF1E00]' 
                                : `font-medium ${isContactPage ? 'text-black' : 'text-white'} hover:text-[#CF1E00] hover:font-bold`
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className='lg:hidden flex items-center'>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className={`menu-button z-50 relative ${getHamburgerColor()} cursor-pointer hover:text-[#CF1E00] transition-all duration-300`}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className='mobile-menu-container fixed top-0 left-0 w-full h-full bg-black/95 text-white flex flex-col justify-center items-center z-40 lg:hidden'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className='flex flex-col items-center space-y-8'
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 }
                                    }}
                                >
                                    <Link 
                                        href={item.link} 
                                        className={`text-[24px] transition-all duration-300 block py-2 px-4 relative group
                                            ${isActive(item.link) 
                                                ? 'font-bold text-[#CF1E00]' 
                                                : 'font-medium hover:text-[#CF1E00] hover:font-bold'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                className="mt-8"
                            >
                                <button className="w-[160px] h-[48px] rounded-[26px] px-4 py-2 cursor-pointer 
                                    bg-[#CF1E00] text-white hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                    Book a Call
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Book a Call Button (Desktop) */}
            <div className='hidden lg:flex items-center'>
                <button className={`w-[121px] h-[42px] rounded-[26px] px-4 py-2 cursor-pointer transition-all
                    ${isContactPage 
                        ? 'bg-black border border-black text-white hover:bg-black hover:text-white' 
                        : 'bg-[#444444] border border-[#989898] text-[#FFFCFC] hover:bg-[#333333]'
                    }`}>
                    Book a Call
                </button>
            </div>
        </div>
    );
};

export default TopNav;