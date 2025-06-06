"use client";
import React from "react";
import Script from "next/script";

export default function Footer() {
  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      
      <footer className="bg-purple-100 mt-20 py-8">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Three-section layout with icons and text */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left social icon */}
            <div className="flex justify-center md:justify-start w-full md:w-1/3">
              <a
                href="mailto:mishrashivam7465@gmail.com"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 flex flex-col items-center"
                title="Email"
                aria-label="Send email to Shivam Mishra"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/tkgyrmwc.json"
                  trigger="hover"
                  colors="primary:#7c3aed,secondary:#7c3aed"
                  style={{ width: "32px", height: "32px" }}
                ></lord-icon>
                <span className="text-xs mt-1 font-medium">Email</span>
              </a>
            </div>
            
            {/* Center text with heart animation */}
            <div className="w-full md:w-1/3 text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-700 font-medium">Made with</p>
                <lord-icon
                  src="https://cdn.lordicon.com/hqrgkqvs.json"
                  trigger="hover"
                  colors="primary:#e83a30,secondary:#ee66aa"
                  style={{ width: "28px", height: "28px" }}
                ></lord-icon>
                <p className="text-gray-700 font-medium">by</p>
              </div>
              <p className="text-purple-600 font-bold text-lg mt-1">Shivam Mishra</p>
            </div>
            
            {/* Right social icons */}
            <div className="flex justify-center md:justify-end gap-8 w-full md:w-1/3">
              <a
                href="https://github.com/Programmer60"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 flex flex-col items-center"
                title="GitHub"
                aria-label="Visit Shivam's GitHub profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-xs mt-1 font-medium">GitHub</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/shivam-mishra-813986313/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 flex flex-col items-center"
                title="LinkedIn"
                aria-label="Visit Shivam's LinkedIn profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-current">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-xs mt-1 font-medium">LinkedIn</span>
              </a>
            </div>
            
          </div>
          
          {/* Copyright text */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} • URL Shortener
            </p>
          </div>
          
        </div>
      </footer>
    </>
  );
}