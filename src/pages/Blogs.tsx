import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Blogs() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  const blogs = [
    { title: "The Art of Tandoor Cooking", cat: "Chef's Journal", date: "Oct 12, 2023", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" },
    { title: "Pairing Wine with Spicy Food", cat: "Beverages", date: "Sep 28, 2023", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" },
    { title: "Seasonal Ingredients Fall 2023", cat: "Ingredients", date: "Sep 15, 2023", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Read & Learn</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Our Journal</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((b, i) => (
          <article key={i} className="reveal-item group cursor-pointer bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-brand-dark/5 shadow-sm">
            <div className="w-full aspect-[4/3] overflow-hidden mb-6 rounded-lg">
              <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-brand-gold">{b.cat}</span>
              <span className="font-sans font-medium text-[10px] uppercase tracking-widest text-brand-dark/50">{b.date}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold group-hover:text-brand-gold transition-colors leading-snug">{b.title}</h3>
          </article>
        ))}
      </section>
    </div>
  );
}
