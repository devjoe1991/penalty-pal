import React from 'react';
import { Bot } from 'lucide-react';

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20" />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-amber-500/10 animate-pulse" />
      
      {/* Logo Pattern Grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="grid grid-cols-6 gap-12 p-12 h-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <Bot 
                className="h-20 w-20 text-amber-400 transform rotate-12 animate-pulse" 
                style={{
                  animationDuration: `${4 + (i % 3)}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating Logos with Blur */}
      <div className="absolute inset-0">
        {/* Large background logos */}
        <Bot className="absolute top-[10%] left-[15%] h-32 w-32 text-amber-500/[0.03] transform rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <Bot className="absolute top-[20%] right-[10%] h-40 w-40 text-amber-500/[0.02] transform -rotate-12 animate-pulse" style={{ animationDuration: '8s' }} />
        <Bot className="absolute bottom-[15%] left-[10%] h-36 w-36 text-amber-500/[0.03] transform rotate-90 animate-bounce" style={{ animationDuration: '6s' }} />
        <Bot className="absolute bottom-[25%] right-[20%] h-28 w-28 text-amber-500/[0.02] transform -rotate-45 animate-pulse" style={{ animationDuration: '10s' }} />
        <Bot className="absolute top-[50%] left-[5%] h-24 w-24 text-amber-500/[0.03] transform rotate-180 animate-spin" style={{ animationDuration: '15s' }} />
        <Bot className="absolute top-[60%] right-[5%] h-44 w-44 text-amber-500/[0.015] transform rotate-12 animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
      
      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
} 