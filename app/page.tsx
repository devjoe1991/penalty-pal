import React from 'react';

// I'm using inline SVGs for icons to keep this self-contained.
// In your actual project, you would import these from 'lucide-react'.
const BotIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);
const ShieldCheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" />
  </svg>
);
const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const BarChartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);
const CheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Mock AI Chat Component for Hero Section
const MockAIChat = () => {
  return (
    <div className="mt-12 lg:mt-0 lg:ml-8 w-full max-w-md mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-blue-500/10">
      <div className="p-4 border-b border-slate-700">
        <p className="text-sm font-semibold text-slate-200">AI Appeal Assistant</p>
      </div>
      <div className="p-4 space-y-4 text-sm h-80 overflow-y-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-full"><BotIcon className="w-5 h-5 text-blue-400" /></div>
          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
            <p className="text-slate-300">Hello! I'm here to help you contest your fine. Please tell me the PCN number from your ticket.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-600 rounded-lg p-3 max-w-[80%]">
            <p className="text-white">Hi, it's IX12345678.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-full"><BotIcon className="w-5 h-5 text-blue-400" /></div>
          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
            <p className="text-slate-300">Thank you. Now, in your own words, please tell me what happened. Were the signs unclear? Was there an emergency?</p>
          </div>
        </div>
         <div className="flex justify-end">
          <div className="bg-blue-600 rounded-lg p-3 max-w-[80%]">
            <p className="text-white">The parking bay markings were completely faded and there were no visible signs indicating it was a permit-only zone. It was late at night and visibility was poor.</p>
          </div>
        </div>
      </div>
       <div className="p-4 border-t border-slate-700">
        <div className="w-full bg-slate-800 rounded-lg p-2 animate-pulse text-slate-500">Generating appeal...</div>
      </div>
    </div>
  );
};

// Main Export Component
export default function LandingPage() {
  const features = [
    {
      icon: <BotIcon className="w-8 h-8 text-blue-400" />,
      title: "AI-Powered Appeals",
      description: "Our AI analyzes thousands of successful cases and UK traffic law to craft the strongest possible appeal for your specific situation.",
    },
    {
      icon: <ZapIcon className="w-8 h-8 text-green-400" />,
      title: "Instant Draft Generation",
      description: "No more waiting or writer's block. Go from ticket to a professionally-written appeal draft in under 5 minutes.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-rose-400" />,
      title: "Expert-Level Compliance",
      description: "We focus on the technicalities and procedural errors that get fines cancelled. Contest with the confidence of an expert.",
    },
    {
        icon: <BarChartIcon className="w-8 h-8 text-amber-400" />,
        title: "Track Your Success",
        description: "Your personal dashboard tracks every appeal, its status, and your success rate, all tied to your vehicle registration.",
    }
  ];

  const steps = [
      {
          number: "01",
          title: "Upload Your Ticket",
          description: "Snap a photo of your PCN or just tell our AI the details. We'll grab all the key information."
      },
      {
        number: "02",
        title: "Explain What Happened",
        description: "In a simple chat, tell our AI your side of the story. It will ask the right questions to build your case."
    },
    {
        number: "03",
        title: "Generate & Submit",
        description: "Receive a professionally drafted appeal. We give you the text and a direct link to the authority's appeal portal."
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Stop Paying Unfair Fines.
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              Received a PCN? Don't just pay it. PenaltyPal uses AI to find the winning legal argument and writes the perfect appeal for you. Turn your frustration into a successful challenge.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#pricing" className="bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                Contest My Fine Now
              </a>
              <a href="#features" className="bg-slate-800/50 border border-slate-700 text-slate-300 font-semibold rounded-lg px-8 py-3 hover:bg-slate-700 transition-all">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <MockAIChat />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-24 bg-slate-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">The AI Advantage in Your Corner</h2>
            <p className="mt-4 text-lg text-slate-400">
              PenaltyPal is more than a template generator. It's a smart system designed to maximize your chances of winning.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-slate-700/50 w-14 h-14 rounded-lg flex items-center justify-center">
                    {feature.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Win Your Appeal in 3 Simple Steps</h2>
                <p className="mt-4 text-lg text-slate-400">
                    We've simplified the entire process from start to finish.
                </p>
            </div>
            <div className="mt-16 relative">
                <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-slate-700/50 hidden md:block" aria-hidden="true"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-slate-800 border-2 border-blue-500/50 rounded-full mb-4 text-2xl font-bold text-blue-400">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-slate-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-24 bg-slate-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-400">Choose the plan that's right for you. Start for free, no credit card required.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white">Freemium</h3>
              <p className="mt-2 text-slate-400">For the occasional driver.</p>
              <p className="mt-6 text-5xl font-extrabold text-white">£0</p>
              <ul className="mt-8 space-y-4 text-slate-300 flex-grow">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> 1 Vehicle Registration</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> 5 AI-Powered Appeals</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Dashboard & Tracking</li>
              </ul>
              <a href="#" className="mt-8 w-full text-center bg-slate-700 text-white font-semibold rounded-lg px-6 py-3 hover:bg-slate-600 transition-all">Get Started for Free</a>
            </div>

            {/* Premium Plan */}
            <div className="bg-blue-900/30 p-8 rounded-xl border-2 border-blue-500 flex flex-col shadow-2xl shadow-blue-500/20">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-bold text-white">Premium</h3>
                 <span className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <p className="mt-2 text-blue-300">For daily commuters & enthusiasts.</p>
              <p className="mt-6 text-5xl font-extrabold text-white">£9.99<span className="text-xl font-medium text-slate-400">/month</span></p>
              <ul className="mt-8 space-y-4 text-slate-300 flex-grow">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Up to 5 Vehicles</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Unlimited AI Appeals</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Advanced Tracking & Analytics</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Priority Support</li>
              </ul>
              <a href="#" className="mt-8 w-full text-center bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-500 transition-all">Upgrade Now</a>
            </div>

            {/* Fleet Plan */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white">Fleet</h3>
              <p className="mt-2 text-slate-400">For businesses that operate vehicles.</p>
              <p className="mt-6 text-4xl font-extrabold text-white">Let's Talk</p>
              <ul className="mt-8 space-y-4 text-slate-300 flex-grow">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Unlimited Vehicles</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Unlimited AI Appeals</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Centralized Fleet Dashboard</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-400" /> Dedicated Account Manager</li>
              </ul>
              <a href="#" className="mt-8 w-full text-center bg-slate-700 text-white font-semibold rounded-lg px-6 py-3 hover:bg-slate-600 transition-all">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Ready to Reclaim Your Money?</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              It takes less than 5 minutes to start your first appeal. Join thousands of drivers who are fighting back against unfair fines.
            </p>
             <div className="mt-8">
              <a href="#pricing" className="bg-blue-600 text-white font-semibold rounded-lg px-8 py-4 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 text-lg">
                Start My First Appeal for Free
              </a>
            </div>
         </div>
      </section>
    </div>
  );
}
