import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  const categories = [
    {
      title: "Starters & Soups",
      items: [
        { name: "Tandoori Platter", desc: "Assorted kebabs marinated in authentic spices and char-grilled.", price: "$24" },
        { name: "Crispy Honey Chili Lotus", desc: "Sweet and savory stems with toasted sesame.", price: "$18" },
        { name: "Mulligatawny Soup", desc: "Classic lentil soup infused with coconut milk and curry leaves.", price: "$12" }
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Butter Chicken Masala", desc: "Tender chicken cooked in a rich, creamy tomato gravy.", price: "$28" },
        { name: "Awadhi Dum Gosht", desc: "Slow-cooked mutton with saffron aged basmati.", price: "$32" },
        { name: "Kung Pao Paneer", desc: "Spicy, sweet & savory dish with crispy paneer and peanuts.", price: "$22" },
        { name: "Truffle Mushroom Risotto", desc: "Arborio rice cooked with wild mushrooms and truffle oil.", price: "$26" }
      ]
    },
    {
      title: "Desserts & Beverages",
      items: [
        { name: "Saffron Pistachio Kulfi", desc: "Traditional Indian ice cream flavored with saffron and cardamom.", price: "$12" },
        { name: "Dark Chocolate Lava Cake", desc: "Warm molten cake served with vanilla bean gelato.", price: "$14" },
        { name: "Mango Cardamom Lassi", desc: "Refreshing yogurt drink with alphonso mangoes.", price: "$8" }
      ]
    }
  ];

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Culinary Excellence</span>
          <h1 className="font-serif text-5xl md:text-[80px] font-medium text-brand-dark mb-8 tracking-tight">Our Menu</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-4xl mx-auto">
        {categories.map((cat, idx) => (
          <div key={idx} className="mb-20 reveal-item">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-dark italic mb-10 text-center border-b border-brand-dark/10 pb-4">{cat.title}</h2>
            <div className="space-y-8">
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex justify-between items-start group cursor-default">
                  <div className="max-w-[70%]">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-dark mb-2 group-hover:opacity-70 transition-opacity">{item.name}</h3>
                    <p className="font-sans text-brand-dark/70 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="font-serif italic text-lg md:text-xl text-brand-dark/80">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      
      <div className="text-center mt-12 reveal-item">
        <a href="#" className="inline-block border border-brand-dark rounded-full px-10 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors text-brand-dark">
            Download PDF Menu
        </a>
      </div>
    </div>
  );
}
