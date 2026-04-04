import React, { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/HeroSection';
import ProductScroll from './components/ProductScroll';
import LivingNarrative from './components/LivingNarrative';
import Gazette from './components/Gazette';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e) => {
      // You can bind framer-motion scroll updates to Lenis here if needed,
      // but Framer Motion's useScroll taps into window scroll naturally 
      // which Lenis also controls.
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-base min-h-screen selection:bg-accent selection:text-[#F5EFE6]">
      {/* Navigation (simplified luxury nav) */}
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-8 mix-blend-difference text-[#F5EFE6] pointer-events-none">
        <div className="font-serif text-3xl tracking-widest font-semibold leading-none pointer-events-auto cursor-pointer">
          AURELIA
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.25em] uppercase font-medium pointer-events-auto">
          <a href="#" className="hover:text-accent transition-colors">Collection</a>
          <a href="#" className="hover:text-accent transition-colors">Atelier</a>
          <a href="#" className="hover:text-accent transition-colors">Boutiques</a>
        </div>
        <button className="text-[10px] tracking-[0.25em] uppercase font-medium border-b border-transparent hover:border-accent hover:text-accent transition-colors pointer-events-auto">
          Menu
        </button>
      </nav>

      {/* Main Experience */}
      <main>
        <HeroSection />
        
        {/* Subtle transition area if needed to blend the scrolling sections */}
        <div className="h-[20vh] bg-base flex items-center justify-center text-accent/30 pointer-events-none">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-heading/10 to-transparent"></div>
        </div>

        <ProductScroll />
        
        <LivingNarrative />
        
        <Gazette />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
