import React from 'react';

const footerLinks = [
  { links: ["OUR STORY", "CAREERS", "PRESS", "SUSTAINABILITY"] },
  { links: ["CLIENT SERVICES", "CONTACT US", "SHIPPING", "RETURNS"] },
  { links: ["EXPLORE", "OUR CRAFT", "THE SIGNATURE", "THE NARRATIVE"] },
  { links: ["LEGAL", "TERMS", "PRIVACY", "COOKIE POLICY"] },
];

// Reusable Icon Wrapper for consistent sizing
const SocialLink = ({ children }) => (
  <a href="#" className="hover:opacity-50 transition-opacity transform hover:scale-110">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#F7F4ED] text-[#A68B52] w-full h-screen overflow-hidden flex flex-col items-center justify-between py-12 px-8">
      
      {/* 1. Background Grid - Extremely subtle to match design */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(to right, #A68B52 1px, transparent 1px), linear-gradient(to bottom, #A68B52 1px, transparent 1px)`,
             backgroundSize: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px)'
           }}>
      </div>
      
      {/* 2. Decorative Corner Images - Adjusted to stay in corners without scrolling */}
      <img 
        src="/folded-towel-top.png" 
        alt="" 
        className="absolute -top-10 -right-10 w-[25vw] max-w-[350px] pointer-events-none opacity-80"
      />
      <img 
        src="/folded-towel-bottom.png" 
        alt="" 
        className="absolute -bottom-10 -left-10 w-[25vw] max-w-[350px] pointer-events-none opacity-80"
      />

      {/* 3. Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl h-full space-y-8 md:space-y-12">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="font-serif text-5xl md:text-7xl tracking-[0.25em] font-light leading-none">AURELIA</h2>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.6em] mt-3 opacity-90">London</p>
        </div>

        {/* Central Icon */}
        <div className="h-16 md:h-20 w-auto">
          <img src="/logo-handbag.png" alt="Aurelia Icon" className="h-full w-auto object-contain" />
        </div>

        {/* Links Grid - Constrained width to keep it central */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 md:gap-x-20 gap-y-8 w-full max-w-3xl">
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-3 text-center md:text-left">
              {column.links.map((link, linkIdx) => (
                <a key={linkIdx} href="#" className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] font-bold hover:opacity-50 transition-opacity">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        
        {/* Social & Copyright Footer Area */}
        <div className="flex flex-col items-center space-y-8 pt-4">
          <div className="flex items-center gap-10">
            <SocialLink>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </SocialLink>
            <SocialLink>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.9 6.46 9.27.09.02.12-.04.12-.09v-.62c-2.03.44-2.46-.98-2.46-.98-.33-.84-.81-1.06-.81-1.06-.66-.45.05-.44.05-.44.73.05 1.12.75 1.12.75.65 1.12 1.71.79 2.13.61.07-.47.26-.79.47-.97-1.62-.18-3.32-.81-3.32-3.6 0-.8.29-1.45.76-1.97-.08-.18-.33-.92.07-1.93 0 0 .61-.2 2.01.75.58-.16 1.21-.24 1.83-.24.62 0 1.25.08 1.83.24 1.4-1.95 2.01-.75 2.01-.75.4 1.01.15 1.75.07 1.93.47.52.76 1.17.76 1.97 0 2.8-1.7 3.42-3.32 3.6.26.23.5.68.5 1.38v2.04c0 .05.03.11.13.09C19.32 19.91 22 16.27 22 12c0-5.52-4.48-10-10-10z"/></svg>
            </SocialLink>
            <SocialLink>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </SocialLink>
            <SocialLink>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-6.01 1.52-1.19 3.57-1.73 5.51-1.43l.01 4.16c-1.13-.21-2.36.06-3.27.79-.67.53-1.05 1.34-1.15 2.19-.21 1.22.44 2.55 1.48 3.16.88.54 1.97.64 2.96.34 1.05-.3 1.92-1.12 2.34-2.11.32-.73.41-1.54.4-2.34l-.02-12.01z"></path></svg>
            </SocialLink>
          </div>

          <div className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] opacity-70">
            AURELIA LONDON. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
      
      {/* 4. Tiny Star Bottom Right */}
      <div className="absolute right-6 bottom-6 opacity-40 pointer-events-none text-[#A68B52]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      </div>

    </footer>
  );
}