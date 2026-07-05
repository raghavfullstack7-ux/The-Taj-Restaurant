import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const container = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("All");

  useGSAP(() => {
    gsap.fromTo(".reveal-img", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  const galleryData = [
    { category: "Interior", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" },
    { category: "Dining Area", src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" },
    { category: "Food", src: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=984&auto=format&fit=crop" },
    { category: "Food", src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" },
    { category: "Food", src: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop" },
    { category: "Events", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" },
    { category: "Kitchen", src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop" },
    { category: "Interior", src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" },
  ];

  const categories = ["All", "Interior", "Dining Area", "Food", "Kitchen", "Events"];
  
  const filteredImages = activeTab === "All" 
    ? galleryData 
    : galleryData.filter(img => img.category === activeTab);

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24">
      <section className="pt-10 pb-12 text-center reveal-img relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Visual Journey</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Our Gallery</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-7xl mx-auto mb-12 reveal-img">
        <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === cat ? 'bg-brand-dark text-brand-cream' : 'border border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[50vh]">
        {filteredImages.map((item, i) => (
          <div key={`${activeTab}-${i}`} className={`relative reveal-img overflow-hidden group ${i === 0 && activeTab === 'All' ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <img src={item.src} alt={item.category} className="w-full h-full object-cover aspect-[4/5] md:aspect-auto md:h-full group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                <span className="text-white font-sans text-xs uppercase tracking-widest font-bold">{item.category}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
