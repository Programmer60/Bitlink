"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const redirectToGithub = () => {
    window.location.href = "https://github.com/Programmer60";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-purple-700 text-white shadow-md'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Desktop and Mobile Nav Container */}
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className="logo font-bold text-2xl">
            <Link href="/">BitLinks</Link>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className='hidden md:flex items-center space-x-6'>
            <Link href="/" className='hover:text-purple-200 transition duration-300'>Home</Link>
            <Link href="/about" className='hover:text-purple-200 transition duration-300'>About</Link>
            <Link href="/shorten" className='hover:text-purple-200 transition duration-300'>Shorten</Link>
            
            <div className='flex gap-3 ml-2'>
              <Link href="/shorten">
                <button className='bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md px-4 py-2 font-bold cursor-pointer transition duration-300'>
                  Try Now
                </button>
              </Link>
              <button
                onClick={redirectToGithub}
                className='bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md px-4 py-2 font-bold cursor-pointer transition duration-300'
              >
                GitHub
              </button>
            </div>
          </div>

          {/* Mobile Menu Button - Visible only on Mobile */}
          <div className='md:hidden flex items-center'>
            <button
              className='outline-none mobile-menu-button'
              onClick={toggleMenu}
              aria-label='Toggle Menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMenuOpen ? (
                  <path d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Conditionally Rendered */}
      {isMenuOpen && (
        <div className='md:hidden bg-purple-800'>
          <div className='px-2 pt-2 pb-4 space-y-3'>
            <Link 
              href="/" 
              className='block px-3 py-2 rounded hover:bg-purple-600 transition duration-300'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className='block px-3 py-2 rounded hover:bg-purple-600 transition duration-300'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/shorten" 
              className='block px-3 py-2 rounded hover:bg-purple-600 transition duration-300'
              onClick={() => setIsMenuOpen(false)}
            >
              Shorten
            </Link>
            <div className='flex flex-col gap-2 pt-2'>
              <Link 
                href="/shorten" 
                onClick={() => setIsMenuOpen(false)}
              >
                <button className='w-full bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md px-4 py-2 font-bold cursor-pointer transition duration-300'>
                  Try Now
                </button>
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  redirectToGithub();
                }}
                className='w-full bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md px-4 py-2 font-bold cursor-pointer transition duration-300'
              >
                GitHub
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;