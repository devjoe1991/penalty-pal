'use client';

import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-amber-400">
            <Bot className="w-7 h-7" />
            <span>PenaltyPal</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-amber-400 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-amber-400 transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-slate-300 hover:text-amber-400 transition-colors">Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-slate-300 font-semibold hover:text-white transition-colors">Log In</a>
            <a href="#pricing" className="bg-amber-500 text-black font-bold rounded-lg px-5 py-2.5 text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
              Get Started
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-amber-400 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-2 pb-4">
            <nav className="flex flex-col gap-4 text-center">
              <Link href="#features" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-amber-400 transition-colors py-2">Features</Link>
              <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-amber-400 transition-colors py-2">How It Works</Link>
              <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-amber-400 transition-colors py-2">Pricing</Link>
              <hr className="border-slate-700 my-2" />
              <div className="flex flex-col gap-4 items-center">
                <a href="#" className="text-slate-300 font-semibold hover:text-white transition-colors w-full py-2">Log In</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="w-full bg-amber-500 text-black font-bold rounded-lg px-5 py-2.5 text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                  Get Started
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 