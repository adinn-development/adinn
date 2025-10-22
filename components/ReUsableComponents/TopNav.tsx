"use client"; 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdinnLogo, AdinnLogoBlack } from './Icons/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopNav = () => {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    // Handle scroll to show/hide button
    useEffect(() => {
        const handleScroll = () => {
            // Show button when scrolled past navbar (adjust threshold as needed)
            setShowScrollTop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
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
        { name: 'About us', link: '/about-us' },
        { name: 'Services', link: '/service' },
        { name: 'Projects', link: '/projects' },
        // { name: 'Contact Us', link: '/contact' }
    ];

    const isActive = (path: string) => pathname === path;
    
    // Determine hamburger icon color based on page
    const getHamburgerColor = () => {
        if (isMenuOpen) return 'text-white'; 
        if (isContactPage) return 'text-black';
        return 'text-white'; 
    };
    
    return (
        <>
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
                                    <Link href='/contact'>
                                        <button className="w-[160px] h-[48px] rounded-[26px] px-4 py-2 cursor-pointer 
                                            bg-[#CF1E00] text-white hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                            Contact us
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Book a Call Button (Desktop) */}
                <div className='hidden lg:flex items-center'>
                    <Link href='/contact'>
                        <button className={`w-[121px] h-[42px] rounded-[26px] px-4 py-2 cursor-pointer transition-all
                            ${isContactPage 
                                ? 'bg-black border border-black text-white hover:bg-black hover:text-white' 
                                : 'bg-[#444444] border border-[#989898] text-[#FFFCFC] hover:bg-[#333333]'
                            }`}>
                            Contact us
                        </button>
                    </Link>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#CF1E00] text-white 
                            flex items-center justify-center shadow-lg hover:bg-[#a51800] 
                            hover:scale-110 transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default TopNav;