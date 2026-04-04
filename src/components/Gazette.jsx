import React from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SparklesIcon = ({ size, fill, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path>
  </svg>
);

const FacebookIcon = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || "2"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const PinterestIcon = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || "2"} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="12" x2="12" y2="22"></line>
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8c0 3.7-1.8 6.5-4.5 7.5"></path>
    <circle cx="12" cy="10" r="1"></circle>
  </svg>
);

const TikTokIcon = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || "2"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

export default function Gazette() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: '#F3F0E8' }}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '48px 48px'
           }}>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center px-6"
      >
        <h2 className="font-sans font-medium text-3xl md:text-[34px] tracking-[0.02em] uppercase mb-5" style={{ color: '#977A40' }}>
          The Aurelia Gazette
        </h2>
        <p className="font-sans text-[15px] font-medium md:text-[16px] text-[#1a1a1a] mb-10 max-w-2xl leading-[1.4]">
          Discover exclusive collections, artist stories, and behind-the-scenes insights.<br className="hidden md:block" />
          Subscribing ensures you never miss a beat of the Aurelia narrative.
        </p>
        
        <div className="flex flex-row items-stretch w-full max-w-[540px] h-[54px] mb-14" style={{ border: '1.5px solid #A28344' }}>
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS" 
            className="flex-1 bg-transparent px-6 text-[14px] font-medium tracking-[0.02em] uppercase outline-none text-[#1a1a1a] placeholder:text-[#9A9A9A] min-w-0"
          />
          <button className="text-white px-10 text-[14px] tracking-[0.02em] uppercase transition-opacity whitespace-nowrap" 
                  style={{ background: 'linear-gradient(to right, #9B7E43, #B89E66, #9B7E43)' }}>
            Subscribe
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-[#1a1a1a] mb-20">
          <a href="#" className="hover:opacity-70 transition-opacity"><InstagramIcon size={24} strokeWidth={2.5} /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><PinterestIcon size={24} strokeWidth={2.5} /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><FacebookIcon size={24} strokeWidth={2.5} /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><TikTokIcon size={24} strokeWidth={2.5} /></a>
        </div>
        
        <div className="text-[11px] font-bold uppercase tracking-[0.02em] text-[#1a1a1a]">
          Aurelia London. All Rights Reserved.
        </div>
      </motion.div>

      {/* Star Shape Bottom Right */}
      <div className="absolute right-12 bottom-12 opacity-80 pointer-events-none" style={{ color: '#E8E4D8' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
        </svg>
      </div>
    </section>
  );
}

