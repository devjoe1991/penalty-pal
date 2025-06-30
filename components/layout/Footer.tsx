import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-amber-400">
                <Bot className="w-6 h-6" />
                <span>PenaltyPal</span>
            </Link>
            <p className="text-slate-400 mt-3 text-sm">
              Stop paying unfair fines. AI-powered appeals to fight for you.
            </p>
          </div>
          
          {/* Links */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-white">Explore</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="#features" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Features</Link></li>
                <li><Link href="#how-it-works" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">How It Works</Link></li>
                <li><Link href="#pricing" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PenaltyPal. A project for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 