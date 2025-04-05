"use client";
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  const redirectToGithub = () => {
    window.location.href = "https://github.com/Programmer60";
  };

  return (
    <main className="bg-purple-100 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 md:py-24 min-h-[70vh] items-center">
          {/* Left text content */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <h1 className={`text-4xl md:text-5xl font-bold text-purple-900 leading-tight ${poppins.className}`}>
              The best URL shortener in the Market
            </h1>
            
            <p className="text-lg text-gray-700 max-w-xl">
              We are the most straightforward URL Shortener in the world. Most of the url shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener.
            </p>
            
            <div className="flex gap-4 mt-4">
              <Link href="/shorten">
                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg px-6 py-3 font-bold text-white cursor-pointer transition-colors duration-300">
                  Try Now
                </button>
              </Link>
              
              <button 
                onClick={redirectToGithub} 
                className="bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg px-6 py-3 font-bold text-white cursor-pointer transition-colors duration-300"
              >
                GitHub
              </button>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full order-1 md:order-2 overflow-hidden rounded-2xl shadow-xl">
            <Image 
              src="/vector.jpg" 
              alt="URL shortener illustration" 
              fill={true}
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              className="hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent"></div>
          </div>
        </div>
      </section>
    </main>
  );
}