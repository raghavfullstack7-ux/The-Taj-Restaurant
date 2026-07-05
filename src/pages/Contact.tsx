import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Get in Touch</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Contact Us</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 reveal-item">
        <div className="bg-white/30 backdrop-blur-sm p-12 border border-brand-dark/10 rounded-3xl">
          <h3 className="font-serif text-3xl font-bold italic mb-8">Send us a message</h3>
          <form className="space-y-8">
            <div>
              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors" />
            </div>
            <div>
              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors" />
            </div>
            <div>
              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors resize-none"></textarea>
            </div>
            <button type="button" className="bg-brand-dark text-white rounded-full px-10 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark/90 transition-colors w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="flex flex-col justify-between space-y-12">
          <div>
            <h3 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-brand-dark opacity-50 mb-4">Location</h3>
            <p className="font-serif text-2xl leading-relaxed italic">
              123 Culinary Avenue,<br/>
              Food City, FC 12345<br/>
              United States
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-brand-dark opacity-50 mb-4">Contact Info</h3>
            <p className="font-serif text-2xl leading-relaxed italic">
              +1 (555) 123-4567<br/>
              info@thetajrestaurant.com
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-brand-dark opacity-50 mb-4">Opening Hours</h3>
            <p className="font-serif text-xl leading-relaxed font-bold">
              <span className="block mb-2 font-sans font-normal text-sm">Mon - Fri: <span className="font-serif italic font-normal text-lg ml-2">12:00 PM - 11:30 PM</span></span>
              <span className="block mb-2 font-sans font-normal text-sm">Saturday: <span className="font-serif italic font-normal text-lg ml-2">12:00 PM - 12:30 AM</span></span>
              <span className="block font-sans font-normal text-sm">Sunday: <span className="font-serif italic font-normal text-lg ml-2">11:00 AM - 11:30 PM</span></span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
