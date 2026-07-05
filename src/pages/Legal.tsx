import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Legal() {
  const { page } = useParams();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });
  
  const getTitle = () => {
    switch(page) {
      case 'privacy-policy': return 'Privacy Policy';
      case 'terms-conditions': return 'Terms & Conditions';
      case 'refund-cancellation': return 'Refund & Cancellation';
      default: return 'Legal Information';
    }
  };

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24 min-h-screen">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Legal</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-brand-dark mb-8 italic tracking-tight">{getTitle()}</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>
      
      <section className="max-w-3xl mx-auto reveal-item font-sans text-sm font-medium text-brand-dark/80 leading-relaxed space-y-6">
        <p className="opacity-50">Last updated: {new Date().toLocaleDateString()}</p>
        <p>This is a placeholder for the {getTitle()} documentation. For a real production site, you would populate this page with the legally binding agreements and policies that govern the use of your website and restaurant services.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-dark italic mt-8 mb-4">1. Introduction</h2>
        <p>Your privacy and trust are important to us. This document outlines the rules and guidelines we follow to ensure your experience with The Taj Multicuisine Restaurant is safe and enjoyable.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-dark italic mt-8 mb-4">2. Data Collection</h2>
        <p>When making a reservation, we collect basic contact information (name, email, phone number) to guarantee your booking and communicate updates. We do not sell or share this data with third parties outside of our service providers necessary for operations.</p>
      </section>
    </div>
  );
}
