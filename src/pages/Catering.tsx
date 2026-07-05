import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Catering() {
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
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Beyond Our Walls</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Catering Services</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24 reveal-item">
          <div>
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop" alt="Catering setup" className="w-full aspect-[4/5] object-cover rounded-sm" />
          </div>
          <div>
            <h2 className="font-serif text-4xl font-medium italic mb-6 leading-tight">Elevate your next<br/>celebration</h2>
            <p className="font-sans text-brand-dark/80 text-sm font-medium leading-relaxed mb-6">
              From intimate weddings to large corporate galas, The Taj brings its signature culinary excellence to your venue of choice. Our dedicated catering team works closely with you to design a bespoke menu that fits the occasion perfectly.
            </p>
            <ul className="space-y-4 mb-10 font-sans text-sm font-medium text-brand-dark/80">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span> Wedding Receptions</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span> Corporate Lunches</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span> Private Home Dinners</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span> Outdoor Festivals</li>
            </ul>
            <Link to="/contact" className="inline-block bg-brand-dark text-white rounded-full px-10 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark/90 transition-colors">
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
