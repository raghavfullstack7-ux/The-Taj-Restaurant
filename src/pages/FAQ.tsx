import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const container = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  const faqs = [
    { q: "Do you offer vegetarian and vegan options?", a: "Yes, we have a dedicated section of our menu for both vegetarian and vegan diets, crafted with the same care as our meat dishes." },
    { q: "What is the dress code?", a: "Our dress code is smart casual. We welcome guests to dress comfortably, but kindly request no beachwear or flip-flops in the evening." },
    { q: "Is parking available?", a: "Valet parking is available every evening from 6 PM. Alternatively, there is a public parking garage located just one block away." },
    { q: "Can I bring my own wine?", a: "We have a carefully curated wine list, but you may bring your own special bottle. A corkage fee of $25 per bottle applies." }
  ];

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24 min-h-screen">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Got Questions?</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">FAQ</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-3xl mx-auto">
        <div className="border-t border-brand-dark/10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="reveal-item border-b border-brand-dark/10">
              <button 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-serif text-xl md:text-2xl font-bold pr-8 italic">{faq.q}</span>
                <span className="shrink-0 text-brand-gold">
                  {openIdx === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-sans text-brand-dark/80 text-sm font-medium leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
