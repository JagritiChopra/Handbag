import React from 'react';
import { motion } from 'framer-motion';

const SparkleIcon = ({ size, fill, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="white" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path>
  </svg>
);

export default function LivingNarrative() {
  const models = [
    { src: '/models/model1.png', title: 'Urban Ease' },
    { src: '/models/model2.png', title: 'Timeless Grace' },
    { src: '/models/model3.png', title: 'Modern Muse' },
  ];

  return (
    <section className="relative w-full min-h-[100svh] py-20 lg:py-0 bg-[#F7F7F4] flex flex-col items-center justify-center overflow-hidden border-t border-heading/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`,
             backgroundSize: '120px 120px',
             backgroundPosition: 'center top'
           }}>
      </div>
      
      {/* Subtle overlay to soften edges */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F7F7F4]/40 via-transparent to-[#F7F7F4]/60 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-heading mb-10 md:mb-16 drop-shadow-sm text-center"
        >
          The Living Narrative
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
          {models.map((model, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 * idx }}
              className="flex flex-col items-center group w-full"
            >
              <div className="relative w-full aspect-square bg-[#E8E8E0] overflow-hidden shadow-lg border border-black/5 mb-6 md:mb-8 drop-shadow-md">
                <img 
                  src={model.src} 
                  alt={model.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/models/model1.png'; }}
                />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-heading opacity-90 transition-colors duration-500">{model.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sparkle Icon Bottom Right */}
      <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 z-20">
        <SparkleIcon size={44} strokeWidth={1} fill="#FFF" />
      </div>
    </section>
  );
}
