import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeRoute, setActiveRoute] = useState('#/home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewFrame, setPreviewFrame] = useState('mobile');
  
  // Interactive Sandbox Simulator State
  const [sandboxState, setSandboxState] = useState({
    restaurantTitle: 'The Daily Grind',
    promoText: 'WEEKEND BRUNCH SPECIALS',
    coffeePrice: 4.50,
    toastPrice: 12.00,
    isHappyHour: false,
    isCoffeeSoldOut: false
  });
  
  // Custom dialog notifications
  const [toastNotification, setToastNotification] = useState({ visible: false, message: '' });
  const [modal, setModal] = useState({ open: false, heading: '', details: '', isNotifyOnly: false });
  const [successModal, setSuccessModal] = useState({ open: false, heading: '', body: '' });
  const [savingsYears, setSavingsYears] = useState(1);

  useEffect(() => {
    // Dynamically inject Google Fonts & FontAwesome icons safely
    const linkFonts = document.createElement('link');
    linkFonts.rel = 'stylesheet';
    linkFonts.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(linkFonts);

    const linkFA = document.createElement('link');
    linkFA.rel = 'stylesheet';
    linkFA.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(linkFA);

    // Sync state configuration with client localStorage
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme === 'light') {
      setTheme('light');
    }

    // Set initial route from hash location
    const handleHashChange = () => {
      const hash = window.location.hash || '#/home';
      setActiveRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      document.head.removeChild(linkFonts);
      document.head.removeChild(linkFA);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Sync theme selection to DOM node
  useEffect(() => {
    const rootClass = document.documentElement.classList;
    if (theme === 'light') {
      rootClass.add('light-theme');
      localStorage.setItem('theme-preference', 'light');
    } else {
      rootClass.remove('light-theme');
      localStorage.setItem('theme-preference', 'dark');
    }
  }, [theme]);

  // Toast simulation triggers
  const triggerPhoneToast = (msg) => {
    setToastNotification({ visible: true, message: msg });
    setTimeout(() => {
      setToastNotification({ visible: false, message: '' });
    }, 2800);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updatePrice = (item, val) => {
    const parsed = parseFloat(val) || 0;
    setSandboxState(prev => ({
      ...prev,
      [item === 'coffee' ? 'coffeePrice' : 'toastPrice']: parsed
    }));
  };

  const triggerHappyHour = () => {
    setSandboxState(prev => {
      const nextHappyHour = !prev.isHappyHour;
      triggerPhoneToast(nextHappyHour ? "10% Happy Hour promotion activated." : "Happy Hour pricing cleared.");
      return { ...prev, isHappyHour: nextHappyHour };
    });
  };

  const triggerSoldOut = () => {
    setSandboxState(prev => {
      const nextSoldOut = !prev.isCoffeeSoldOut;
      triggerPhoneToast(nextSoldOut ? "Flat White espresso set to Sold Out." : "Flat White espresso is back in stock.");
      return { ...prev, isCoffeeSoldOut: nextSoldOut };
    });
  };

  const resetSimulator = () => {
    setSandboxState({
      restaurantTitle: 'The Daily Grind',
      promoText: 'WEEKEND BRUNCH SPECIALS',
      coffeePrice: 4.50,
      toastPrice: 12.00,
      isHappyHour: false,
      isCoffeeSoldOut: false
    });
    triggerPhoneToast("Simulator variables reset.");
  };

  const handlePurchase = (tier, price) => {
    setModal({
      open: true,
      heading: "Book Your Setup Call",
      details: `Onboarding selected: ${tier} configuration pack for ${price} (One-time installation payment).`,
      isNotifyOnly: false
    });
  };

  const handleGeneralConsultation = () => {
    setModal({
      open: true,
      heading: "Book a Free Consultation",
      details: "Schedule a consultation session to review your current dining assets with zero subscription parameters.",
      isNotifyOnly: false
    });
  };

  const handleNotify = () => {
    setSuccessModal({
      open: true,
      heading: "Joined Waiting List Successfully",
      body: "We've registered your email address to the update queue. We will reach out once Enterprise features launch."
    });
  };

  const submitDemoForm = (e) => {
    e.preventDefault();
    setModal(prev => ({ ...prev, open: false }));
    setSuccessModal({
      open: true,
      heading: "Inquiry Filed Successfully",
      body: "Our design team will contact you within 24 hours to organize your menu asset configuration checklist."
    });
  };

  // Savings dynamic variables
  const saasTotal = 150 * savingsYears * 12;
  const vibeSetup = 999;
  const totalSaved = saasTotal - vibeSetup;

  return (
    <div 
      className="antialiased min-h-screen relative font-sans selection:bg-amber-200 selection:text-stone-900 transition-colors duration-500"
      style={{
        backgroundColor: theme === 'light' ? '#fbf9f6' : '#0c0a09',
        color: theme === 'light' ? '#383530' : '#d6d3d1',
      }}
    >
      {/* Premium CSS Keyframes and tokens embedded directly */}
      <style>{`
        :root {
          --accent-gold: ${theme === 'light' ? '#a07332' : '#c49b55'};
          --text-title: ${theme === 'light' ? '#1a1816' : '#ffffff'};
          --border-color: ${theme === 'light' ? 'rgba(160, 115, 50, 0.22)' : 'rgba(196, 155, 85, 0.15)'};
          --card-bg: ${theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 14, 12, 0.4)'};
          --panel-bg: ${theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(18, 14, 12, 0.75)'};
        }
        
        .text-theme-title { color: var(--text-title); }
        .text-theme-gold { color: var(--accent-gold); }
        .border-theme { border-color: var(--border-color); }
        .panel-theme {
          background-color: var(--panel-bg);
          border-color: var(--border-color);
        }
        .card-theme {
          background-color: var(--card-bg);
          border-color: var(--border-color);
        }

        /* Subtle noise texture overlay */
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015;
          pointer-events: none;
        }

        /* High-fidelity elegant card animations */
        .fancy-card-animate {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .fancy-card-animate:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px ${theme === 'light' ? 'rgba(160, 115, 50, 0.08)' : 'rgba(196, 155, 85, 0.12)'};
          border-color: var(--accent-gold) !important;
        }
        .fancy-card-animate::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 9999px 9999px 0 0;
        }
        .fancy-card-animate:hover::before {
          opacity: 1;
        }
      `}</style>

      {/* Subtle texture overlay */}
      <div className="fixed inset-0 bg-grain z-40"></div>

      <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 panel-theme border-b backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#/home" className="flex items-center gap-3" onClick={() => setActiveRoute('#/home')}>
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(196,155,85,0.3)] bg-black transition-transform duration-300 hover:rotate-12 shrink-0">
              <img src="images/VT_logo_transparent_bg.png" alt="VibeTable Logo" className="w-full h-full object-cover rounded-full" onError={(e) => e.target.src='https://placehold.co/100x100/c49b55/ffffff?text=VT'} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-theme-title leading-none">VibeTable</span>
              <span className="text-[8px] font-sans uppercase tracking-widest text-theme-gold font-bold mt-1">Digital Sites</span>
            </div>
          </a>
          
          {/* Desktop Links with Active State Tracking */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#/home" className={`transition-colors duration-200 ${activeRoute === '#/home' ? 'text-theme-gold font-bold' : 'hover:text-theme-gold'}`}>Home</a>
            <a href="#/why-vibetable" className={`transition-colors duration-200 ${activeRoute === '#/why-vibetable' ? 'text-theme-gold font-bold' : 'hover:text-theme-gold'}`}>Why VibeTable</a>
            <a href="#/demo" className={`transition-colors duration-200 flex items-center gap-1.5 ${activeRoute === '#/demo' ? 'text-theme-gold font-bold' : 'hover:text-theme-gold'}`}>
              Live Demo 
              <span className="px-1.5 py-0.5 bg-amber-500/10 text-theme-gold text-[9px] rounded border border-theme font-bold uppercase tracking-wider animate-pulse">Interactive</span>
            </a>
            <a href="#/features" className={`transition-colors duration-200 ${activeRoute === '#/features' ? 'text-theme-gold font-bold' : 'hover:text-theme-gold'}`}>Features & FAQ</a>
            <a href="#/pricing" className={`transition-colors duration-200 ${activeRoute === '#/pricing' ? 'text-theme-gold font-bold' : 'hover:text-theme-gold'}`}>Packages</a>
          </div>

          {/* Action Row & Theme Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-500/10 border border-theme hover:bg-amber-500/10 text-theme-gold transition-all" aria-label="Toggle Theme Preference">
              <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>

            <a href="#/pricing" className="hidden sm:inline-flex text-xs uppercase font-semibold tracking-wider text-theme-gold hover:opacity-80 transition-opacity duration-200 mr-1">
              Savings Tool
            </a>
            
            <a href="#/pricing" className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-full hover:bg-stone-950 hover:text-white transition-all duration-300 shadow-md">
              View Packages
            </a>
            
            {/* Mobile Hamburg Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-stone-500/10 border border-theme text-theme-gold focus:outline-none hover:text-theme-title transition-colors" aria-label="Toggle Navigation Drawer">
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu Links (Touch Optimized) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-theme panel-theme backdrop-blur-xl px-5 py-6 space-y-3 transition-all duration-300 text-left">
            <a href="#/home" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-base py-2.5 px-3 rounded-lg hover:bg-stone-500/10 font-medium transition-colors"><i className="fa-solid fa-house mr-3 text-theme-gold"></i>Home</a>
            <a href="#/why-vibetable" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-base py-2.5 px-3 rounded-lg hover:bg-stone-500/10 font-medium transition-colors"><i className="fa-solid fa-circle-question mr-3 text-theme-gold"></i>Why VibeTable</a>
            <a href="#/demo" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-base py-2.5 px-3 rounded-lg hover:bg-stone-500/10 font-medium transition-colors">
              <span><i className="fa-solid fa-laptop mr-3 text-theme-gold"></i>Live Demo</span>
              <span className="px-2 py-0.5 bg-stone-500/10 text-theme-gold text-[10px] rounded border border-theme font-bold uppercase tracking-wider">Interactive</span>
            </a>
            <a href="#/features" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-base py-2.5 px-3 rounded-lg hover:bg-stone-500/10 font-medium transition-colors"><i className="fa-solid fa-star mr-3 text-theme-gold"></i>Features & FAQ</a>
            <a href="#/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-base py-2.5 px-3 rounded-lg hover:bg-stone-500/10 font-medium transition-colors"><i className="fa-solid fa-receipt mr-3 text-theme-gold"></i>Packages & Pricing</a>
            
            <div className="pt-3 border-t border-theme">
              <a href="#/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-center text-xs uppercase font-extrabold tracking-widest text-theme-gold py-3 bg-amber-500/10 rounded-xl border border-theme">Cost Savings Calculator</a>
            </div>
          </div>
        )}
      </nav>

      {activeRoute === '#/home' && (
        <main className="relative pt-24 pb-12 md:pt-36 md:pb-24 min-h-[85vh] animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none animate-pulse"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="text-center max-w-4xl mx-auto">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full card-theme border text-xs font-semibold text-theme-gold mb-6 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-sans uppercase tracking-wider text-[9px] sm:text-[10px] font-bold">Zero Monthly Platform Fees • Direct Dashboard Control</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight text-theme-title mb-6 leading-[1.15] md:leading-[1.08]">
                Modern Restaurant Websites with <br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600">Built-In Menu Management</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-stone-500 dark:text-stone-400 font-sans max-w-2xl mx-auto mb-8 leading-relaxed px-1">
                Trade restrictive monthly software subscriptions for a custom, fast-loading restaurant website. Seamlessly update prices, categories, and ingredients through your private dashboard. No commission fees, ever.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 max-w-sm sm:max-w-none mx-auto px-2">
                <a href="#/pricing" className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 text-stone-950 rounded-full font-bold text-sm hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(196,155,85,0.25)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                  View Packages <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
                <a href="#/demo" className="w-full sm:w-auto px-7 py-3.5 bg-stone-500/10 border border-theme text-theme-title rounded-full font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                  See Live Demo
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto pb-6 border-b border-theme px-1 text-xs">
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">One-Time Payment</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">No Subscription Fees</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">Mobile-Optimized</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">QR Code Ready</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">Admin Dashboard</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">Unlimited Menu display</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">Fast Edge Loading</span></div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-theme-gold"></i> <span className="font-medium text-theme-title">Instant Updates</span></div>
              </div>
            </div>

            {/* Split Hero Visual */}
            <div className="relative mt-10 max-w-5xl mx-auto rounded-2xl border border-theme p-4 shadow-xl panel-theme transition-all duration-300 fancy-card-animate">
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                
                <div className="lg:col-span-7 space-y-4 text-left px-1">
                  <span className="inline-block px-2.5 py-0.5 bg-amber-500/10 border border-theme text-theme-gold text-[10px] font-bold uppercase rounded">Aesthetics & Speed</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-theme-title font-light leading-tight">Fast delivery interfaces that drive customer ticket values.</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
                    No complex apps to download or sluggish PDFs to open. Our mobile menu platforms deliver instant loading speeds (under 0.2s) even on weak venue receptions, guiding diners to high-margin dishes dynamically.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 card-theme border rounded-xl flex items-start gap-2.5 fancy-card-animate">
                      <i className="fa-solid fa-bolt text-theme-gold mt-0.5 shrink-0"></i>
                      <div>
                        <div className="text-theme-title font-bold text-xs">Edge Network Speed</div>
                        <div className="text-[10px] text-stone-400">Optimized performance</div>
                      </div>
                    </div>
                    <div className="p-3 card-theme border rounded-xl flex items-start gap-2.5 fancy-card-animate">
                      <i className="fa-solid fa-qrcode text-theme-gold mt-0.5 shrink-0"></i>
                      <div>
                        <div className="text-theme-title font-bold text-xs">Tabletop scan codes</div>
                        <div className="text-[10px] text-stone-400">Zero ordering friction</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Simulated Phone Representation */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[280px] sm:max-w-[320px] h-[520px] sm:h-[620px] rounded-[36px] border-[6px] border-stone-800 bg-stone-900 overflow-hidden shadow-2xl relative flex flex-col">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-stone-800 rounded-b-xl z-20 flex items-center justify-center">
                      <div className="w-8 h-1 bg-black rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto flex flex-col text-xs pt-6 pb-3 scrollbar-none bg-stone-950">
                      <div className="p-3 flex items-center justify-between border-b border-stone-800 bg-stone-900 sticky top-0 z-10">
                        <span className="font-serif font-bold text-white text-sm">Lumina Café</span>
                        <div className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[9px] rounded-full flex items-center gap-1 border border-amber-500/20">
                          <i className="fa-solid fa-star text-[8px]"></i> 4.9 Reviews
                        </div>
                      </div>
                      <div className="p-2.5">
                        <div className="w-full h-24 bg-stone-900 rounded-lg overflow-hidden relative flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400" alt="Espresso" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                          <div className="absolute bottom-1.5 left-2 text-left">
                            <span className="bg-amber-500 text-stone-950 font-extrabold text-[8px] px-1 py-0.5 rounded tracking-wide mr-1 uppercase">Best Seller</span>
                            <p className="text-white font-serif font-bold text-xs leading-none">Morning Espresso</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1.5 px-2.5 pb-2 overflow-x-auto text-[9px] scrollbar-none">
                        <span className="px-2 py-0.5 bg-amber-500 text-stone-950 font-bold rounded-full shrink-0">Coffee Bar</span>
                        <span className="px-2 py-0.5 bg-stone-800 text-stone-300 font-medium rounded-full shrink-0">Bakeries</span>
                        <span className="px-2 py-0.5 bg-stone-800 text-stone-300 font-medium rounded-full shrink-0">Elixirs</span>
                      </div>
                      
                      <div className="p-2.5 space-y-2.5 flex-1 text-left">
                        <div className="flex items-center justify-between p-2.5 bg-stone-900/40 rounded-xl border border-stone-800">
                          <div className="max-w-[70%]">
                            <div className="font-serif font-bold text-stone-100 text-xs">Flat White</div>
                            <div className="text-[9px] text-stone-500 mt-0.5 line-clamp-1">Velvety steamed microfoam, espresso</div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif font-bold text-amber-400 text-xs">$4.50</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-stone-900/40 rounded-xl border border-stone-800">
                          <div className="max-w-[70%]">
                            <div className="font-serif font-bold text-stone-100 text-xs">Pistachio Latte</div>
                            <div className="text-[9px] text-stone-500 mt-0.5 line-clamp-1">Premium pistachio syrup, raw honey</div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif font-bold text-amber-400 text-xs">$5.25</div>
                          </div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 border-t border-stone-800 text-center">
                        <p className="text-[8px] text-stone-600 font-mono">Powered by VibeTable Platform</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeRoute === '#/why-vibetable' && (
        <main className="relative pt-24 pb-12 md:pt-36 md:pb-24 min-h-[85vh] animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="absolute -left-48 top-1/4 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">The Ownership Model</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-theme-title tracking-tight leading-tight">Stop renting. Claim your digital properties.</h2>
              <p className="text-stone-500 dark:text-stone-400 mt-3 text-xs sm:text-sm">
                SaaS providers lease restrictive templates with perpetual monthly fees. VibeTable delivers complete digital asset ownership, preventing monthly overhead leakages.
              </p>
            </div>

            {/* Core Issues Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/30 transition-all duration-300 group fancy-card-animate text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                  <i className="fa-solid fa-ban text-sm"></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-theme-title mb-2">No Pinch-to-Zoom PDFs</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  PDF menus damage your diner's browsing flow. Our interfaces scale dynamically to standard cellular displays, optimizing organic visual discovery.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/30 transition-all duration-300 group fancy-card-animate text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                  <i className="fa-solid fa-file-invoice-dollar text-sm"></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-theme-title mb-2">Eliminate monthly SaaS fees</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Rent platforms cost thousands of dollars over multiple years. With our private asset model, you invest once and pay zero monthly hosting bills.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/30 transition-all duration-300 group fancy-card-animate text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                  <i className="fa-solid fa-print text-sm"></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-theme-title mb-2">Reduce Printed Overhead</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Instantly publish dynamic adjustments, season-based ingredients, or run-out flags on your dishes without ordering expensive paper reprints.
                </p>
              </div>
            </div>

            {/* Testimonials Segment */}
            <div className="mt-20">
              <div className="text-center mb-8">
                <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">Real Operators, Real Results</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-theme-title tracking-tight leading-tight">Trusted by Culinary Innovators</h3>
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-xs sm:text-sm max-w-xl mx-auto">
                  See how restaurants, coffee shops, bistros, bakeries, and mobile food trucks upgraded to high-performance, commission-free direct menu management.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 text-left">
                
                {/* Testimonial 1 */}
                <div className="p-4 rounded-xl bg-stone-500/5 border border-theme flex flex-col justify-between fancy-card-animate">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-theme-gold text-[10px]">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed italic">
                      "We cut our third-party digital menu SaaS contract, saving over $1,800 every year. Diners love the loading speeds, especially down in our lower stone dining tavern."
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme/40 mt-4">
                    <div className="font-serif font-bold text-theme-title text-[11px]">Chef Marcella D.</div>
                    <div className="text-[9px] text-theme-gold font-medium uppercase tracking-wider">La Piazza Trattoria</div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="p-4 rounded-xl bg-stone-500/5 border border-theme flex flex-col justify-between fancy-card-animate">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-theme-gold text-[10px]">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed italic">
                      "Highlighting our high-margin vintage wine pairs directly next to target plates boosted average table ticket sizes by 18% during our initial month."
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme/40 mt-4">
                    <div className="font-serif font-bold text-theme-title text-[11px]">Clara Sterling</div>
                    <div className="text-[9px] text-theme-gold font-medium uppercase tracking-wider">Gilded Thistle Bistro</div>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="p-4 rounded-xl bg-stone-500/5 border border-theme flex flex-col justify-between fancy-card-animate">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-theme-gold text-[10px]">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed italic">
                      "Updating morning pastry stock states from my phone while managing sourdough prep prevents morning line bottlenecks completely."
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme/40 mt-4">
                    <div className="font-serif font-bold text-theme-title text-[11px]">Liam O'Connor</div>
                    <div className="text-[9px] text-theme-gold font-medium uppercase tracking-wider">Solas Café & Bakery</div>
                  </div>
                </div>

                {/* Testimonial 4 */}
                <div className="p-4 rounded-xl bg-stone-500/5 border border-theme flex flex-col justify-between fancy-card-animate">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-theme-gold text-[10px]">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed italic">
                      "Pinch-zoom PDFs were a huge hurdle for our older morning crowd. VibeTable's mobile architecture displays beautifully and matches our clean aesthetic."
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme/40 mt-4">
                    <div className="font-serif font-bold text-theme-title text-[11px]">Jada Jenkins</div>
                    <div className="text-[9px] text-theme-gold font-medium uppercase tracking-wider">Roast & Co. Coffee</div>
                  </div>
                </div>

                {/* Testimonial 5 */}
                <div className="p-4 rounded-xl bg-stone-500/5 border border-theme flex flex-col justify-between fancy-card-animate">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-theme-gold text-[10px]">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed italic">
                      "Cellular dropouts at outdoor parks are normal. VibeTable's ultralight codebase keeps loading for customers even with only one signal bar."
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme/40 mt-4">
                    <div className="font-serif font-bold text-theme-title text-[11px]">Kenji Chen</div>
                    <div className="text-[9px] text-theme-gold font-medium uppercase tracking-wider">Bao On The Run</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Performance Financial Grid */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-serif text-theme-title text-center mb-6">Subscription SaaS vs. VibeTable Ownership</h3>
              
              <div className="flex items-center justify-center gap-1.5 text-theme-gold text-[10px] uppercase tracking-wider font-bold mb-3 md:hidden">
                <i className="fa-solid fa-left-right animate-pulse"></i> Swipe horizontally to view full metrics
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-theme bg-stone-500/5 backdrop-blur shadow-lg">
                <table className="w-full text-left border-collapse min-w-[580px] text-xs">
                  <thead>
                    <tr className="border-b border-theme bg-stone-500/10">
                      <th className="p-4 font-semibold text-theme-title">Core Metrics</th>
                      <th className="p-4 font-semibold text-stone-500">SaaS Platform Rental</th>
                      <th className="p-4 font-semibold text-theme-gold">VibeTable Direct Asset</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-500/10 text-stone-600 dark:text-stone-300">
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Monthly software fee</td>
                      <td className="p-4">$150.00 / month</td>
                      <td className="p-4 text-theme-gold font-bold">$0.00 forever</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Menu updates control</td>
                      <td className="p-4">Basic portal template</td>
                      <td className="p-4 text-theme-gold font-bold">In-house admin dashboard</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Brand and asset rights</td>
                      <td className="p-4">None (leased template)</td>
                      <td className="p-4 text-theme-gold font-bold">100% proprietary code owner</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeRoute === '#/demo' && (
        <main className="relative pt-24 pb-12 md:pt-36 md:pb-24 min-h-[85vh] animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">Interactive sandbox</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-theme-title leading-tight">Live administrative portal simulation</h2>
              <p className="text-stone-500 dark:text-stone-400 mt-3 text-xs sm:text-sm">
                Make real-time changes using the back-of-house (BOH) controls on the left, and see how the visitor experience adjusts instantaneously inside the client preview device on the right.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-12">
              
              {/* BOH Settings Panel */}
              <div className="lg:col-span-7 rounded-2xl border border-theme bg-stone-500/5 p-4 sm:p-6 flex flex-col justify-between fancy-card-animate">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500/10 flex items-center justify-center text-[8px] text-theme-gold border border-theme"><i className="fa-solid fa-lock"></i></span>
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">portal.vibetable.com/settings</span>
                  </div>
                  
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-theme-gold uppercase tracking-widest block">Restaurant name</label>
                    <input 
                      type="text" 
                      value={sandboxState.restaurantTitle} 
                      className="w-full bg-stone-500/10 border border-theme rounded-lg px-3 py-2 text-xs text-theme-title focus:outline-none focus:border-amber-500 transition-colors"
                      onChange={(e) => setSandboxState(prev => ({ ...prev, restaurantTitle: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-theme-gold uppercase tracking-widest block">Announcement headline</label>
                    <input 
                      type="text" 
                      value={sandboxState.promoText} 
                      className="w-full bg-stone-500/10 border border-theme rounded-lg px-3 py-2 text-xs text-theme-title focus:outline-none focus:border-amber-500 transition-colors"
                      onChange={(e) => setSandboxState(prev => ({ ...prev, promoText: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-theme-gold uppercase tracking-widest block">In-house live pricing adjustments</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-stone-500/5 p-2.5 rounded-xl border border-theme">
                        <span className="text-[9px] text-stone-500 block">Flat White Espresso</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs text-theme-gold font-bold">$</span>
                          <input 
                            type="number" 
                            step="0.25" 
                            value={sandboxState.coffeePrice} 
                            className="w-full bg-transparent text-xs text-theme-title focus:outline-none font-bold"
                            onChange={(e) => updatePrice('coffee', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="bg-stone-500/5 p-2.5 rounded-xl border border-theme">
                        <span className="text-[9px] text-stone-500 block">Smashed Avocado Toast</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs text-theme-gold font-bold">$</span>
                          <input 
                            type="number" 
                            step="0.50" 
                            value={sandboxState.toastPrice} 
                            className="w-full bg-transparent text-xs text-theme-title focus:outline-none font-bold"
                            onChange={(e) => updatePrice('toast', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 text-left">
                    <label className="text-[10px] font-bold text-theme-gold uppercase tracking-widest block">Simulated Event Rules</label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={triggerHappyHour} className="px-3 py-1.5 bg-amber-500/10 border border-theme text-theme-gold hover:bg-amber-500 hover:text-stone-950 text-[10px] font-bold rounded transition-all uppercase">
                        Happy hour (10% Off)
                      </button>
                      <button onClick={triggerSoldOut} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-bold rounded transition-all uppercase">
                        Toggle Sold Out
                      </button>
                      <button onClick={resetSimulator} className="px-3 py-1.5 bg-amber-500/10 border border-theme text-stone-500 hover:bg-amber-500 hover:text-stone-950 text-[10px] font-bold rounded transition-all uppercase ml-auto">
                        Reset Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Preview Handset representation */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div 
                  className={`w-full max-w-[280px] sm:max-w-[320px] h-[520px] sm:h-[620px] rounded-[36px] border-[6px] transition-all duration-500 relative flex flex-col overflow-hidden shadow-2xl ${
                    theme === 'light' ? 'border-stone-300 bg-[#fbf9f6]' : 'border-stone-850 bg-[#0c0a09]'
                  }`}
                >
                  {/* Dynamic Notification Popup Inside Simulator */}
                  <div 
                    className={`absolute top-10 left-3.5 right-3.5 border text-[9px] px-2.5 py-1.5 rounded-lg shadow-xl z-40 transform transition-all duration-300 flex items-center gap-1.5 ${
                      toastNotification.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16 pointer-events-none'
                    } ${theme === 'light' ? 'bg-white border-stone-200 text-stone-800' : 'bg-stone-950 border-amber-500/30 text-stone-100'}`}
                  >
                    <i className="fa-solid fa-bell text-amber-500 animate-bounce"></i>
                    <span className="font-sans leading-none">{toastNotification.message}</span>
                  </div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-800 rounded-b-xl z-20 flex items-center justify-center">
                    <div className="w-8 h-1 bg-black rounded-full"></div>
                  </div>

                  <div className="flex-1 overflow-y-auto flex flex-col text-xs pt-6 pb-3 scrollbar-none text-left">
                    <div className={`p-3 border-b flex items-center justify-between sticky top-0 z-10 transition-colors duration-300 ${
                      theme === 'light' ? 'border-stone-200 bg-white' : 'border-stone-800 bg-stone-950'
                    }`}>
                      <span className={`font-serif font-bold transition-colors duration-300 ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>{sandboxState.restaurantTitle}</span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 uppercase font-bold">Open</span>
                    </div>

                    <div className={`border-b text-[8px] py-1.5 px-2 tracking-wider text-center uppercase transition-colors duration-300 font-bold ${
                      theme === 'light' ? 'bg-stone-100 text-[#a07332] border-stone-200' : 'bg-stone-900 text-amber-400 border-stone-800'
                    }`}>
                      {sandboxState.promoText}
                    </div>

                    <div className="p-3 space-y-3 flex-1">
                      {/* Coffee Card */}
                      <div className={`p-2 rounded-xl border transition-all ${sandboxState.isCoffeeSoldOut ? 'opacity-40' : ''} ${
                        theme === 'light' ? 'bg-white border-stone-200 shadow-sm' : 'bg-stone-900/50 border-stone-800'
                      }`}>
                        <div className="flex gap-2.5">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-800">
                            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200" alt="Flat White" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className={`font-serif font-bold text-[11px] transition-colors duration-300 ${theme === 'light' ? 'text-stone-900' : 'text-stone-100'}`}>Flat White</span>
                              {sandboxState.isHappyHour && (
                                <span className="bg-amber-500/20 text-theme-gold text-[7px] font-bold px-1 rounded uppercase border border-amber-500/30">Happy Hour</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-serif font-black text-theme-gold text-[11px]">
                                ${sandboxState.isHappyHour ? (sandboxState.coffeePrice * 0.9).toFixed(2) : sandboxState.coffeePrice.toFixed(2)}
                              </span>
                              <span className={`text-[8px] font-bold ${sandboxState.isCoffeeSoldOut ? 'text-red-400 bg-red-950/40 border border-red-500/20 px-1 rounded' : 'text-stone-400'}`}>
                                {sandboxState.isCoffeeSoldOut ? "Sold Out" : "In Stock"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Toast Card */}
                      <div className={`p-2 rounded-xl border transition-all ${
                        theme === 'light' ? 'bg-white border-stone-200 shadow-sm' : 'bg-stone-900/50 border-stone-800'
                      }`}>
                        <div className="flex gap-2.5">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-800">
                            <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=200" alt="Toast" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className={`font-serif font-bold text-[11px] transition-colors duration-300 ${theme === 'light' ? 'text-stone-900' : 'text-stone-100'}`}>Smashed Avocado</span>
                              {sandboxState.isHappyHour && (
                                <span className="bg-amber-500/20 text-theme-gold text-[7px] font-bold px-1 rounded uppercase border border-amber-500/30">Happy Hour</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-serif font-black text-theme-gold text-[11px]">
                                ${sandboxState.isHappyHour ? (sandboxState.toastPrice * 0.9).toFixed(2) : sandboxState.toastPrice.toFixed(2)}
                              </span>
                              <span className="text-[8px] font-bold text-stone-400">In Stock</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`px-2.5 py-1 border-t text-center ${theme === 'light' ? 'border-stone-200' : 'border-stone-800'}`}>
                      <p className="text-[8px] text-stone-600 font-mono">Powered by VibeTable Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Multi-device Viewport */}
            <div className="border-t border-theme pt-12">
              <div className="text-center mb-6 max-w-2xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-serif text-theme-title">Live multi-device client experience</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-2">
                  Explore how a real active menu renders natively on mobile or desktop viewport profiles.
                </p>
              </div>

              {/* Viewport Toggles */}
              <div className="flex justify-center items-center gap-2 mb-8 bg-stone-500/10 p-1 rounded-full border border-theme max-w-xs mx-auto">
                <button 
                  onClick={() => setPreviewFrame('mobile')} 
                  className={`flex-1 py-2 font-bold text-xs rounded-full uppercase transition-all ${
                    previewFrame === 'mobile' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-transparent text-stone-400'
                  }`}
                >
                  Mobile
                </button>
                <button 
                  onClick={() => setPreviewFrame('desktop')} 
                  className={`flex-1 py-2 font-bold text-xs rounded-full uppercase transition-all ${
                    previewFrame === 'desktop' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-transparent text-stone-400'
                  }`}
                >
                  Desktop
                </button>
              </div>

              <div className="flex justify-center items-center">
                {previewFrame === 'mobile' ? (
                  <div className="w-full max-w-[280px] sm:max-w-[320px] h-[520px] sm:h-[620px] rounded-[40px] border-[8px] border-stone-800 overflow-hidden shadow-2xl relative transition-all duration-300 bg-stone-950">
                    <iframe src="https://coffee-shop-menu-sepia.vercel.app/" className="w-full h-full pt-4 bg-stone-950 border-none" title="VibeTable Live Mobile Preview"></iframe>
                  </div>
                ) : (
                  <div className="w-full max-w-4xl h-[420px] sm:h-[500px] rounded-2xl border-[6px] border-stone-800 overflow-hidden shadow-2xl relative transition-all duration-300 bg-stone-950">
                    <iframe src="https://coffee-shop-menu-sepia.vercel.app/" className="w-full h-full bg-stone-950 border-none" title="VibeTable Live Desktop Preview"></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {activeRoute === '#/features' && (
        <main className="relative pt-24 pb-12 md:pt-36 md:pb-24 min-h-[85vh] animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">The Technology Stack</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-theme-title">Engineered for absolute direct control</h2>
              <p className="text-stone-500 dark:text-stone-400 mt-3 text-xs sm:text-sm">
                No software bloating, no complex server steps. High-performance culinary code optimized to scale your visibility across localized dynamic search.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 text-left">
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-gauge-high text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">0.2s Global rendering</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Instant load performance bypasses weak basement signals or poor local cells, preserving diner attention.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-qrcode text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">Tabletop vector QR assets</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Custom print-ready high-definition QR assets designed to match luxury linen, brass, wood, or acrylic stands.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-wine-glass text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">Chef's highlights module</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Visually focus customer eyes on high-margin appetizers, premium side pairings, or signature plates dynamically.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-toggle-on text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">Live ingredients toggles</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Flag items out-of-stock or sold-out instantly during peak services to guarantee clean communication with guests.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-chart-pie text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">In-house click analytics</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Understand which drinks, seasonal filters, or pairing plates get browsed most, with 100% GDPR-compliant client metrics.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 fancy-card-animate">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4">
                  <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </div>
                <h3 className="text-base font-bold text-theme-title mb-2">Localized SEO Schema</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  Built-in structured metadata index your menu items directly on search engines, optimizing organic local visibility.
                </p>
              </div>
            </div>

            {/* Custom Interactive Accordion FAQ */}
            <div className="border-t border-theme pt-12 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">Direct Answers</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-theme-title">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3.5 text-left">
                <FaqItem question="Is VibeTable a monthly subscription?" answer="No. VibeTable functions on an absolute ownership model. You invest once to configure and deploy your custom restaurant website and digital menu system. There are no ongoing software rentals or platform fee cycles." />
                <FaqItem question="Can I perform menu modifications myself?" answer="Yes. Every tier includes access to an administrative dashboard layout, permitting you to adjust plate pricing, descriptions, stock availability, and image properties securely on any mobile device." />
                <FaqItem question="How do diners interact with the QR codes?" answer="Your venue receives print-ready, high-resolution vector tabletop QR assets. Diners simply scan the QR frame with their mobile devices to instantly launch your elegant web menu page. No browser warnings, no manual application downloads." />
                <FaqItem question="Can I configure my existing web domain name?" answer="Yes. We can link your proprietary domain directly or guide you in registering new address parameters for your dining business brand." />
                <FaqItem question="Can I upgrade my package selection later?" answer="Absolutely. You can transition to a higher plan level at any point, simply covering the price difference between your active tier and the new selected system tier." />
              </div>
            </div>
          </div>
        </main>
      )}

      {activeRoute === '#/pricing' && (
        <main className="relative pt-24 pb-12 md:pt-36 md:pb-24 min-h-[85vh] animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-theme-gold text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-theme px-3 py-1.5 rounded-full mb-3 inline-block">Integration Tiers</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-theme-title tracking-tight leading-tight">One direct investment. Zero platform overhead.</h2>
              <p className="text-stone-500 dark:text-stone-400 mt-3 text-xs sm:text-sm">
                Reclaim control over your marketing channels. Select the ideal system parameters for your venue with clear, upfront launch pricing.
              </p>
            </div>

            {/* Savings Interactive Calculator Tool */}
            <div className="max-w-3xl mx-auto panel-theme border rounded-2xl p-5 mb-12 text-center shadow-md fancy-card-animate">
              <h4 className="text-sm font-serif font-bold text-theme-title mb-4">Calculate Your Financial Savings (vs. Standard $150/mo SaaS rentals)</h4>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4 max-w-xs mx-auto">
                <button onClick={() => setSavingsYears(1)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${savingsYears === 1 ? 'bg-amber-500 text-stone-950' : 'bg-stone-500/10 text-stone-400 border border-theme'}`}>1 Year</button>
                <button onClick={() => setSavingsYears(3)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${savingsYears === 3 ? 'bg-amber-500 text-stone-950' : 'bg-stone-500/10 text-stone-400 border border-theme'}`}>3 Years</button>
                <button onClick={() => setSavingsYears(5)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${savingsYears === 5 ? 'bg-amber-500 text-stone-950' : 'bg-stone-500/10 text-stone-400 border border-theme'}`}>5 Years</button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-theme text-center text-xs">
                <div className="p-2 card-theme border rounded-lg">
                  <span className="text-[9px] text-stone-500 block uppercase font-bold">Standard SaaS Fees</span>
                  <span className="text-sm sm:text-base font-bold text-red-500">${saasTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="p-2 card-theme border rounded-lg">
                  <span className="text-[9px] text-stone-500 block uppercase font-bold">VibeTable Growth Setup</span>
                  <span className="text-sm sm:text-base font-bold text-theme-title">${vibeSetup.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="p-2 bg-amber-500/10 border border-theme rounded-lg">
                  <span className="text-[9px] text-theme-gold block uppercase font-bold">Total Saved</span>
                  <span className="text-sm sm:text-base font-black text-theme-gold">${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Package Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto mb-12 text-left">
              
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between relative fancy-card-animate">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-stone-500/10 border border-theme text-[9px] font-bold rounded uppercase text-stone-400">Starter</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-theme-gold text-[8px] font-bold rounded uppercase">Launch Discount</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-theme-title">Essential</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-[10px] mt-1">Sleek menu system for boutique bakeries or specialty coffee roasters.</p>
                  </div>
                  <div className="py-2">
                    <div className="text-[10px] text-stone-500 line-through">USD $1,000</div>
                    <div className="text-2xl font-serif font-bold text-theme-title">USD $799</div>
                    <span className="text-[8px] text-theme-gold uppercase font-bold">One-time installation</span>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-theme text-[10px]">
                    <div>
                      <span className="font-bold text-theme-title uppercase block text-[9px]">Website Pages</span>
                      <p className="text-stone-500 dark:text-stone-400">1 Custom Branded Responsive Layout Page, QR Code Menu integrations.</p>
                    </div>
                    <div>
                      <span className="font-bold text-theme-title uppercase block text-[9px]">Administrative Controls</span>
                      <p className="text-stone-500 dark:text-stone-400">Modify pricing structure, change menu titles, edit active category items, and toggle display states.</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => handlePurchase('Essential Plan', 'USD $799')} className="w-full py-2.5 mt-6 rounded-lg bg-stone-500/10 border border-theme text-theme-title hover:bg-stone-800 hover:text-white transition-colors text-xs font-bold uppercase">
                  Choose Essential
                </button>
              </div>

              {/* Card 2 (Most Popular Highlighted) */}
              <div className="p-5 rounded-2xl border-2 border-amber-500 bg-amber-500/5 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative transform lg:scale-105 z-10 fancy-card-animate">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full z-20">
                  Most Popular
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mt-1">
                    <span className="px-2 py-0.5 bg-stone-500/10 border border-theme text-[9px] font-bold rounded uppercase text-theme-gold">Growth</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-theme-gold text-[8px] font-bold rounded uppercase">Launch Discount</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-theme-title">Growth</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-[10px] mt-1">Complete system for active bistros and local dining bars.</p>
                  </div>
                  <div className="py-2">
                    <div className="text-[10px] text-stone-500 line-through">USD $1,300</div>
                    <div className="text-2xl font-serif font-bold text-theme-title">USD $999</div>
                    <span className="text-[8px] text-theme-gold uppercase font-bold">One-time installation</span>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-theme text-[10px]">
                    <div>
                      <span className="font-bold text-theme-gold uppercase block text-[9px]">Everything in Essential Plus</span>
                      <span className="font-bold text-theme-title uppercase block text-[9px] mt-1.5">Extended Pages</span>
                      <p className="text-stone-500 dark:text-stone-400">Up to 3 Custom Web Pages (Menu catalog, Brand history, Contact portals).</p>
                    </div>
                    <div>
                      <span className="font-bold text-theme-title uppercase block text-[9px]">Enhanced BOH Admin</span>
                      <p className="text-stone-500 dark:text-stone-400">Add new dishes, manage Corkboards, moderate customer reviews, upload ambient vibe photos.</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => handlePurchase('Growth Plan', 'USD $999')} className="w-full py-2.5 mt-6 rounded-lg bg-amber-500 text-stone-950 hover:opacity-90 text-xs font-black uppercase transition-all shadow">
                  Choose Growth
                </button>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between relative fancy-card-animate">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-stone-500/10 border border-theme text-[9px] font-bold rounded uppercase text-stone-400">Premium</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-theme-gold text-[8px] font-bold rounded uppercase">Launch Discount</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-theme-title">Premium</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-[10px] mt-1">High-end solution with reservation, catering, and smart pre-order systems.</p>
                  </div>
                  <div className="py-2">
                    <div className="text-[10px] text-stone-500 line-through">USD $1,500</div>
                    <div className="text-2xl font-serif font-bold text-theme-title">USD $1,199</div>
                    <span className="text-[8px] text-theme-gold uppercase font-bold">One-time installation</span>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-theme text-[10px]">
                    <div>
                      <span className="font-bold text-theme-title uppercase block text-[9px]">Everything in Growth Plus</span>
                      <span className="font-bold text-theme-title uppercase block text-[9px] mt-1.5">Complete Site Stack</span>
                      <p className="text-stone-500 dark:text-stone-400">Up to 5 Fully Branded Web Pages, Reservations structure, Catering inquiry filters, Newsletter setup.</p>
                    </div>
                    <div>
                      <span className="font-bold text-theme-title uppercase block text-[9px]">Pre-Order & Upsell</span>
                      <p className="text-stone-500 dark:text-stone-400">Interactive order bag, dynamic recommendations (&quot;Add a beverage?&quot;, &quot;Pair with dessert&quot;).</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => handlePurchase('Premium Plan', 'USD $1,199')} className="w-full py-2.5 mt-6 rounded-lg bg-stone-500/10 border border-theme text-theme-title hover:bg-stone-800 hover:text-white transition-colors text-xs font-bold uppercase">
                  Choose Premium
                </button>
              </div>

              {/* Card 4 (REPAIRED CORNER RIBBON VISIBILITY - Absolute positioning optimization) */}
              <div className="p-5 rounded-2xl bg-stone-500/5 border border-theme/50 opacity-85 flex flex-col justify-between relative overflow-hidden fancy-card-animate">
                {/* Repositioned Ribbon securely inside card structure with dynamic visibility */}
                <div className="absolute top-4 -right-10 bg-amber-500 text-stone-950 text-[8px] font-black uppercase tracking-widest py-1 w-28 text-center rotate-45 shadow-md z-20 border-b border-amber-400">
                  Soon
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-stone-500/10 border border-theme text-[9px] font-bold rounded uppercase text-stone-400">Business</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-stone-400 text-[8px] font-bold rounded uppercase">Launch List</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-theme-title opacity-65">Business</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-[10px] mt-1">Multi-branch commerce stack with full database capabilities.</p>
                  </div>
                  <div className="py-2">
                    <div className="text-[10px] text-stone-600 line-through">USD $1,900</div>
                    <div className="text-2xl font-serif font-bold text-stone-400">USD $1,399</div>
                    <span className="text-[8px] text-stone-400 uppercase font-bold">Planned release</span>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-theme/30 text-[9px] text-stone-400">
                    <p className="font-bold text-theme-title uppercase opacity-85">AIO Release Roadmap</p>
                    <ul className="space-y-1">
                      <li>• Customer Loyalty Accounts</li>
                      <li>• Dynamic Seat Layout Managers</li>
                      <li>• Online Transaction Processing</li>
                      <li>• Multi-Location Operations Panels</li>
                    </ul>
                  </div>
                </div>
                <button onClick={handleNotify} className="w-full py-2.5 mt-6 rounded-lg bg-stone-500/10 border border-theme/40 text-stone-400 hover:text-theme-title transition-colors text-xs font-bold uppercase">
                  Notify Me
                </button>
              </div>

            </div>

            {/* Metrics Comparison Table */}
            <div className="border-t border-theme pt-12">
              <h3 className="text-xl sm:text-2xl font-serif text-theme-title text-center mb-4">Granular metrics comparison</h3>
              
              <div className="flex items-center justify-center gap-1.5 text-theme-gold text-[10px] uppercase tracking-wider font-bold mb-3 lg:hidden">
                <i className="fa-solid fa-left-right animate-pulse"></i> Slide horizontally to view features comparison
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-theme bg-stone-500/5 backdrop-blur shadow-xl mb-12">
                <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                  <thead>
                    <tr className="border-b border-theme bg-stone-500/10 text-[10px] uppercase tracking-wider text-stone-500">
                      <th className="p-4">Platform Capabilities</th>
                      <th className="p-4 text-center">Essential</th>
                      <th className="p-4 text-center bg-amber-500/10 text-theme-gold font-bold">Growth</th>
                      <th className="p-4 text-center">Premium</th>
                      <th className="p-4 text-center">Business</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-500/10 text-stone-600 dark:text-stone-300">
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Custom design web pages</td>
                      <td className="p-4 text-center">1 Page</td>
                      <td className="p-4 text-center bg-amber-500/10 font-semibold text-theme-gold">Up to 3 Pages</td>
                      <td className="p-4 text-center">Up to 5 Pages</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Dashboard panels tier</td>
                      <td className="p-4 text-center">Basic control</td>
                      <td className="p-4 text-center bg-amber-500/10 font-semibold text-theme-gold">Enhanced</td>
                      <td className="p-4 text-center">Complete</td>
                      <td className="p-4 text-center">Enterprise Stack</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Change ingredient prices</td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center bg-amber-500/10"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Inject dynamic items</td>
                      <td className="p-4 text-center text-stone-500">—</td>
                      <td className="p-4 text-center bg-amber-500/10"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Bespoke categorization</td>
                      <td className="p-4 text-center text-stone-500">—</td>
                      <td className="p-4 text-center bg-amber-500/10 text-stone-500">—</td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-theme-title">Interactive Pre-order checkout</td>
                      <td className="p-4 text-center text-stone-500">—</td>
                      <td className="p-4 text-center bg-amber-500/10 text-stone-500">—</td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                      <td className="p-4 text-center"><i className="fa-solid fa-check text-theme-gold"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Embedded Global CTA Banner */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-theme">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(171,129,91,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl sm:text-4xl font-serif text-theme-title leading-tight mb-4">Ready to modernize your restaurant website?</h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Eliminate SaaS software traps. Reclaim structural control over your guest platform with a premium restaurant page backed by private menu management settings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
            <a href="#/pricing" className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-stone-950 font-bold rounded-full hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(196,155,85,0.25)] transition-all uppercase text-xs">
              Get Started Today
            </a>
            <button onClick={handleGeneralConsultation} className="w-full sm:w-auto px-8 py-3.5 bg-stone-500/10 border border-theme text-theme-title rounded-full font-bold hover:opacity-80 transition-all uppercase text-xs">
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {modal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-300">
          <div className="panel-theme border p-5 sm:p-6 rounded-2xl max-w-md w-full mx-4 relative shadow-2xl text-left bg-stone-950 text-stone-200">
            <button onClick={() => setModal(prev => ({ ...prev, open: false }))} className="absolute top-3.5 right-3.5 text-stone-400 hover:text-white transition-colors" aria-label="Close dialog">
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-theme-gold flex items-center justify-center mb-4 border border-theme">
              <i className="fa-solid fa-receipt text-lg"></i>
            </div>
            <h4 className="text-lg font-serif font-bold text-white mb-1.5">{modal.heading}</h4>
            <p className="text-stone-400 text-[10px] sm:text-xs mb-4">{modal.details}</p>
            
            <form onSubmit={submitDemoForm} className="space-y-3">
              <div>
                <label className="text-[9px] text-theme-gold block mb-1 uppercase tracking-widest font-bold">Your Name</label>
                <input type="text" required placeholder="Alexander Mercer" className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-[9px] text-theme-gold block mb-1 uppercase tracking-widest font-bold">Restaurant Name</label>
                <input type="text" required placeholder="Lumina Cafe" className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-[9px] text-theme-gold block mb-1 uppercase tracking-widest font-bold">Your Email</label>
                <input type="email" required placeholder="alex@lumina.com" className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-500 text-stone-950 font-black rounded-lg hover:opacity-90 uppercase text-xs tracking-wider transition-all shadow-md">
                Submit setup inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Dialog Modal */}
      {successModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-300">
          <div className="panel-theme border p-6 rounded-2xl max-w-sm w-full mx-4 text-center shadow-2xl bg-stone-950 text-stone-200">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-theme-gold flex items-center justify-center mx-auto mb-4 border border-theme">
              <i className="fa-solid fa-check text-xl animate-bounce"></i>
            </div>
            <h4 className="text-lg font-serif font-bold text-white mb-1.5">{successModal.heading}</h4>
            <p className="text-stone-400 text-xs mb-5 leading-relaxed">{successModal.body}</p>
            <button onClick={() => setSuccessModal({ open: false, heading: '', body: '' })} className="w-full py-2 bg-stone-900 border border-stone-850 text-white rounded-lg hover:bg-stone-800 text-xs font-bold uppercase transition-all">
              Close dialog
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-theme bg-stone-500/5 pt-12 pb-8 relative z-10 text-xs text-left">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 overflow-hidden rounded-full border border-theme bg-black flex items-center justify-center shrink-0">
                  <img src="images/VT_logo_transparent_bg.png" alt="VibeTable Logo" className="w-full h-full object-cover rounded-full" onError={(e) => e.target.src='https://placehold.co/100x100/c49b55/ffffff?text=VT'} />
                </div>
                <span className="text-base font-serif font-bold text-theme-title">VibeTable</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
                Custom restaurant websites engineered for design-centric venues, luxury cafes, and high-performance dining entities globally.
              </p>
            </div>
            <div>
              <h5 className="text-theme-title font-bold mb-3 uppercase tracking-wider text-[10px]">Platform</h5>
              <ul className="space-y-2 text-stone-500">
                <li><a href="#/why-vibetable" className="hover:text-theme-gold transition-colors">Why Own</a></li>
                <li><a href="#/demo" className="hover:text-theme-gold transition-colors">Interactive Demo</a></li>
                <li><a href="#/pricing" className="hover:text-theme-gold transition-colors">Investment plans</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-theme-title font-bold mb-3 uppercase tracking-wider text-[10px]">Onboarding</h5>
              <ul className="space-y-2 text-stone-500">
                <li><a href="#/features" className="hover:text-theme-gold transition-colors">Platform features</a></li>
                <li><a href="#/features" className="hover:text-theme-gold transition-colors">Onboarding FAQ</a></li>
                <li><a href="#" className="hover:text-theme-gold transition-colors">On-demand support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[10px] text-center">
            <p>© 2026 VibeTable Platform Inc. Private platforms are properties of purchasing entities.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-theme-gold transition-colors" aria-label="Twitter connection"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-theme-gold transition-colors" aria-label="Instagram page"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-theme-gold transition-colors" aria-label="LinkedIn network"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Vercel Analytics tracking script instantiated directly into the DOM tree */}
      <Analytics />
    </div>
  );
}

// Subcomponent for handling dynamic, sleek FAQ accordion items in state
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-theme rounded-xl bg-stone-500/5 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-5 py-4 flex items-center justify-between text-left text-theme-title font-serif font-bold text-sm sm:text-base focus:outline-none hover:bg-amber-500/10 transition-all"
      >
        <span>{question}</span>
        <i className={`fa-solid fa-chevron-down text-theme-gold transition-transform duration-300 text-xs ml-3 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '160px' : '0px' }}
      >
        <p className="px-5 pb-4 text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}