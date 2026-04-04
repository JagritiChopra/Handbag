import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 242;

function currentFrame(index) {
  if (index === 0 || index === FRAME_COUNT - 1) {
    return `/sequence-images/ezgif-frame-000.jpg`;
  }
  const paddedIndex = index.toString().padStart(3, '0');
  return `/sequence-images/ezgif-frame-${paddedIndex}.jpg`;
}

export default function ProductScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const imgArray = [];

    const loadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (isCancelled) break;
        
        const img = new Image();
        img.src = currentFrame(i);
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            // If image is missing, we try to avoid crashing by resolving anyway
            loadedCount++; 
            resolve();
          };
        });
        
        imgArray.push(img);
      }
      
      if (!isCancelled) {
        setImages(imgArray);
        setLoaded(true);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw canvas frame
  const drawFrame = (frameIndex) => {
    if (!canvasRef.current || !images[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = images[frameIndex];

    // Ensure we handle canvas coordinate space and real layout size
    const targetWidth = canvas.offsetWidth * window.devicePixelRatio;
    const targetHeight = canvas.offsetHeight * window.devicePixelRatio;
    
    // ONLY set width/height if it actually changed to prevent horrific clear-buffer flicker
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // Scale context to devicePixelRatio for retina displays
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Calculate aspect ratio to cover entire screen
    const canvasScale = Math.max(
      canvas.offsetWidth / img.width, 
      canvas.offsetHeight / img.height
    );
    
    const drawWidth = img.width * canvasScale;
    const drawHeight = img.height * canvasScale;
    
    const x = (canvas.offsetWidth - drawWidth) / 2;
    const y = (canvas.offsetHeight - drawHeight) / 2;
    
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    
    // Draw initial frame
    drawFrame(0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      requestAnimationFrame(() => {
        const holdScroll = 0.05; // Hold for 5% of the scroll sequence (~15vh)
        let progress = 0;
        if (latest > holdScroll) {
          progress = (latest - holdScroll) / (1 - holdScroll);
        }
        
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT)
        );
        drawFrame(frameIndex);
      });
    });

    return () => unsubscribe();
  }, [loaded, images, scrollYProgress]);

  // Overlay opacity values based on scroll
  const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const y0 = useTransform(scrollYProgress, [0, 0.15, 0.2], [20, 0, -20]);

  const opacity25 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const y25 = useTransform(scrollYProgress, [0.2, 0.35, 0.4], [20, 0, -20]);

  const opacity50 = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const y50 = useTransform(scrollYProgress, [0.45, 0.6, 0.65], [20, 0, -20]);

  const opacity75 = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
  const y75 = useTransform(scrollYProgress, [0.7, 0.85, 0.9], [20, 0, -20]);

  const opacity95 = useTransform(scrollYProgress, [0.92, 0.95], [0, 1]);
  const y95 = useTransform(scrollYProgress, [0.92, 0.95], [20, 0]);

  // Window resize handler
  useEffect(() => {
    if (!loaded) return;
    
    let debounceTimer;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const latest = scrollYProgress.get();
        const holdScroll = 0.05;
        let progress = 0;
        if (latest > holdScroll) {
          progress = (latest - holdScroll) / (1 - holdScroll);
        }
        
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT)
        );
        requestAnimationFrame(() => drawFrame(frameIndex));
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, [loaded, images, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-base">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden mix-blend-multiply">
        
        {/* Loader Overlay */}
        <AnimatePresence>
          {!loaded && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-base"
            >
              <div className="text-center">
                <span className="font-serif italic text-heading text-2xl tracking-wider">Assembling perfection</span>
                <div className="w-48 h-[1px] bg-heading/20 mx-auto mt-6 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-accent"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="mt-4 text-xs tracking-widest text-body">{loadingProgress}% loaded</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 360 Canvas */}
        <canvas 
          ref={canvasRef} 
          className="relative z-10 w-full h-screen pointer-events-none object-cover"
        />

        {/* Dynamic Text Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          <motion.div 
            style={{ opacity: opacity0, y: y0 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-heading drop-shadow-md">Crafted for Elegance</h2>
          </motion.div>
          
          <motion.div 
            style={{ opacity: opacity25, y: y25 }}
            className="absolute top-1/3 left-[10%] md:left-[15%] w-full max-w-xs text-left"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-heading leading-tight mb-4 drop-shadow-md">Italian <br/><span className="text-accent italic">Leather</span></h2>
            <p className="font-sans text-sm text-heading font-medium tracking-wide leading-relaxed drop-shadow-sm">Sourced from exclusively certified European tanneries, offering a butter-soft finish that improves with time.</p>
          </motion.div>

          <motion.div 
            style={{ opacity: opacity50, y: y50 }}
            className="absolute top-[40%] right-[10%] md:right-[15%] w-full max-w-xs text-right"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-heading leading-tight mb-4 drop-shadow-md">Precision <br/><span className="text-accent italic">Details</span></h2>
            <p className="font-sans text-sm text-heading font-medium tracking-wide leading-relaxed drop-shadow-sm">Each clasp is hand-polished and coated in 18-karat gold, a structural masterclass of form meeting function.</p>
          </motion.div>

          <motion.div 
            style={{ opacity: opacity75, y: y75 }}
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-heading drop-shadow-md">Timeless Design</h2>
          </motion.div>

          <motion.div 
            style={{ opacity: opacity95, y: y95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-heading mb-10 drop-shadow-lg text-center">Make It Yours</h2>
            <button className="group relative overflow-hidden border border-heading text-heading px-12 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-heading hover:text-[#F5EFE6] transition-colors duration-500 bg-base/50 backdrop-blur-sm">
              <span className="relative z-10 flex items-center gap-4">
                Explore Collection
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
