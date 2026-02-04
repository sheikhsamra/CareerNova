import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    
    // GSAP Infinite Scroll Animation
    const scrollTween = gsap.to(marquee, {
      xPercent: -50, // Loop ke liye adha scroll
      ease: "none",
      duration: 20, // Speed: Zyada seconds matlab slow aur smooth
      repeat: -1,
    });

    // Hover par slow karne ke liye (Optional)
    const handleMouseEnter = () => gsap.to(scrollTween, { timeScale: 0.2, duration: 0.5 });
    const handleMouseLeave = () => gsap.to(scrollTween, { timeScale: 1, duration: 0.5 });

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      scrollTween.kill();
    };
  }, []);

  const tags = [
    "ATS-Friendly", "Modern Templates", "Free PDF Download", 
    "Secure Data", "Easy to Edit", "Career Growth", 
    "Professional Layouts", "AI-Powered", "Fast & Reliable"
  ];

  return (
    <section className="marquee-wrapper py-5 overflow-hidden border-y transition-colors duration-300">
      <div className="flex whitespace-nowrap items-center" ref={marqueeRef}>
        {/* Do baar map isliye taake loop toot-ta hua nazar na aaye (Seamless) */}
        {[...tags, ...tags].map((tag, index) => (
          <div key={index} className="flex items-center gap-6 mx-10">
            {/* Neon Dot */}
            <div className="marquee-dot w-3 h-3 rounded-full"></div>
            {/* Text */}
            <span className="marquee-text text-xl font-black uppercase italic tracking-tighter">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;