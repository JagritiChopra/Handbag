import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [layout, setLayout] = React.useState({ vh: 800, dx: 0, bagYTarget1: 960, bagYTarget2: 1200, vw: 1200 });
  const bagContainerRef = useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      let dx = 0;
      if (vw >= 768) {
        const gridWidth = Math.min(vw - 48, 1280); // px-6 is 48px total padding
        const gap = 48; // gap-12 is 48px
        dx = -((gridWidth + gap) / 4);
      }

      // Calculate vertical compensation so the bag always lands at exact screen center
      let centerOnContainer = vh / 2;
      if (bagContainerRef.current) {
        const bagRect = bagContainerRef.current.getBoundingClientRect();
        const heroRect = containerRef.current.getBoundingClientRect();
        centerOnContainer = (bagRect.top - heroRect.top) + (bagRect.height / 2);
      }
      
      // At scroll 1.2vh, hero container is scrolled up by 1.2vh. 
      // We want bag screen center to be exactly at 0.5vh.
      const bagYTarget1 = (1.7 * vh) - centerOnContainer;
      
      // Continue the same slope for the remaining 0.3vh
      const bagYTarget2 = bagYTarget1 * (1.5 / 1.2);
      
      setLayout({ vh, dx, bagYTarget1, bagYTarget2, vw });
    };
    
    // Slight delay to ensure DOM is fully laid out before math
    setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // The bag perfectly aligns down to center viewport
  const bagY = useTransform(scrollY, [0, layout.vh * 1.2, layout.vh * 1.5], [0, layout.bagYTarget1, layout.bagYTarget2]);
  
  // The bag moves from right column to center of screen horizontally by 1.2vh and stays there
  const rawBagX = useTransform(scrollY, [0, layout.vh * 1.2, layout.vh * 1.5], [0, layout.dx, layout.dx]);
  
  // Add a slight spring to X for smoother feeling
  const bagX = useSpring(rawBagX, { stiffness: 100, damping: 30, mass: 1 });

  // Scale it up slightly to match the canvas product which is cover
  const bagScale = useTransform(scrollY, [0, layout.vh * 1.2, layout.vh * 1.5], [1, 1.25, 1.25]);
  
  // Rotate smoothly back to 0 so it aligns perfectly with the straight canvas frame
  const bagRotate = useTransform(scrollY, [0, layout.vh * 1.2, layout.vh * 1.5], [-5, 0, 0]);

  // Fade out instantly at 1.2vh to prevent "multiply" blend double-darkness flicker
  const bagOpacity = useTransform(scrollY, [layout.vh * 1.199, layout.vh * 1.2], [1, 0]);

  // Text fade out on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] w-full flex items-center bg-base z-30">
      {/* Subtle Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-[#f0ebe0] to-[#e6dfd1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          className="flex flex-col justify-center max-w-lg mt-20 md:mt-0"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-heading"
          >
            The Aurelia<br />
            <span className="font-light italic text-accent">Signature</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-6 text-lg md:text-xl font-sans font-light text-body leading-relaxed"
          >
            Indulge in the presence of perfection. Each Aurelia Signature bag is intimately crafted from supreme European leathers, blending timeless elegance with contemporary design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-10"
          >
            <button className="group relative overflow-hidden bg-heading text-[#F5EFE6] px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-black transition-colors duration-500">
              <span className="relative z-10 flex items-center gap-4">
                Pre-order now
                <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all duration-300"></span>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Handbag Image */}
        <div ref={bagContainerRef} className="relative h-full flex justify-center items-center pointer-events-none z-50">
          <motion.div
            style={{ 
              y: bagY,
              x: bagX,
              scale: bagScale,
              rotate: bagRotate,
              opacity: bagOpacity
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 w-full flex justify-center items-center backdrop-blur-none"
          >
            {/* Soft shadow under the bag - fades out faster so it doesn't show in the canvas */}
            <motion.div 
               style={{ opacity: useTransform(scrollY, [0, layout.vh * 0.5], [1, 0]) }}
               className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/5 rounded-full blur-2xl"
            />
            
            {/* The Bag Image */}
            <img 
              src="/hero_bag.png" 
              alt="Aurelia Signature Bag" 
              className="w-full max-w-[120%] h-auto object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
        style={{ opacity: textOpacity }}
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold text-heading">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-heading to-transparent"></div>
      </motion.div>
    </section>
  );
}
