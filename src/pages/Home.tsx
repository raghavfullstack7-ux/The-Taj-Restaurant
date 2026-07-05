import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, MoveLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useGSAP(() => {
    gsap.fromTo(".hero-text-anim", 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.1
      }
    );

    // Fade-in sections
    const sections = gsap.utils.toArray(".reveal-section") as HTMLElement[];
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    });

    // Stagger items
    const staggerSections = gsap.utils.toArray(".stagger-section") as HTMLElement[];
    staggerSections.forEach((section) => {
      const items = section.querySelectorAll(".stagger-item");
      gsap.fromTo(items, 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        }
      );
    });

    // Parallax images
    const parallaxImages = gsap.utils.toArray(".parallax-img") as HTMLElement[];
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: "15%",
        ease: "none"
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="w-full flex-1 flex flex-col pt-4 px-5 sm:px-6 md:px-8 pb-8 overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] mb-24 overflow-hidden rounded-sm">
        {heroImages.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Restaurant Hero ${index + 1}`} 
            className={`parallax-img absolute -top-[10%] left-0 w-full h-[120%] object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 pt-24 pb-8 md:p-8 text-center z-10">
          <div className="hero-text-anim opacity-0 relative flex flex-col text-white scale-[0.7] sm:scale-90 md:scale-[1.5] lg:scale-[1.7] mb-8 md:mb-16 origin-center">
            <div className="font-serif text-3xl sm:text-3xl md:text-4xl leading-none absolute -top-5 sm:-top-5 md:-top-7 left-1 tracking-wider text-left">THE</div>
            <div className="font-serif text-[5rem] sm:text-8xl md:text-9xl leading-none tracking-tight flex items-start">
              <span className="pr-1">T</span>
              <span className="pr-2">A</span>
              <span className="relative">
                J
                <div className="absolute top-1 -right-5 sm:-right-6 w-6 sm:w-8 h-6 sm:h-8 border border-white/80 rounded-full flex items-center justify-center">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border border-white/80 rounded-full"></div>
                </div>
              </span>
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 w-[77%] h-[2px] bg-white"></div>
              <div className="pt-3">
                <span className="font-sans text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.28em] whitespace-nowrap font-bold block text-left">Multicuisine Restaurant</span>
              </div>
            </div>
          </div>
          
          <p className="hero-text-anim opacity-0 font-sans text-xs sm:text-sm md:text-base font-medium max-w-sm md:max-w-md text-center leading-relaxed mt-4 drop-shadow-md">
            The Taj — Restaurant of bold culinary solutions.<br className="hidden sm:block"/>
            Netting fresh flavours, one dish at a time!
          </p>
        </div>
        
        {/* Pagination Dots Simulator for Hero */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
          {heroImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentImageIndex(index)}
              className={`w-12 sm:w-16 h-0.5 transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Large Hero Follow-up Image */}
      <section className="mb-24 reveal-section">
        <div className="w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-sm relative">
            <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" alt="Restaurant Interior" className="parallax-img absolute -top-[10%] left-0 w-full h-[120%] object-cover" />
        </div>
      </section>

      {/* About Section */}
      <section className="mb-32 reveal-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark leading-tight tracking-tight">
                    About <span className="italic">our restaurant</span>
                </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-sm font-sans text-brand-dark/90 leading-relaxed font-medium">
                <p>
                    The menu at a modern multicuisine restaurant is where tradition meets innovation. Chefs incorporate global influences and cutting-edge techniques to redefine classic dishes, offering items like tandoori with unexpected twists, sushi with exotic fruit infusions, and signature curries with homemade artisanal spices.
                </p>
                <p>
                    Freshness is paramount; the chefs often source local, seasonal ingredients, ensuring the highest quality and flavor. To cater to diverse palates, the menu may also feature plant-based or alternative protein options that align with current dietary trends.
                </p>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-32 stagger-section">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark tracking-tight text-center mb-16 stagger-item">
            Why <span className="italic">Choose Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Master Chefs", text: "Our culinary team is led by internationally acclaimed chefs with decades of experience." },
                { title: "Fresh Ingredients", text: "We source only the finest, seasonal ingredients from trusted local farmers and markets." },
                { title: "Luxurious Ambiance", text: "Experience dining in a sophisticated setting designed for comfort and elegance." }
            ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-brand-light rounded-sm stagger-item">
                    <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mb-6">
                        <div className="w-8 h-8 bg-brand-gold/20 rounded-full"></div>
                    </div>
                    <h3 className="font-serif text-2xl mb-4">{feature.title}</h3>
                    <p className="font-sans text-sm text-brand-dark/80 leading-relaxed font-medium">
                        {feature.text}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="mb-32 stagger-section">
        <div className="flex justify-between items-end mb-12 border-b border-brand-dark/10 pb-6 stagger-item">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark tracking-tight">Our menu</h2>
            <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-brand-cream transition-colors">
                    <MoveLeft size={16} strokeWidth={1} />
                </button>
                <button className="w-10 h-10 rounded-full border border-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-brand-cream transition-colors">
                    <MoveRight size={16} strokeWidth={1} />
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group cursor-pointer stagger-item">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden bg-brand-light rounded-sm relative">
                    <img src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=984&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Flounder with lemon" />
                </div>
                <div className="flex justify-between items-center text-[11px] font-sans font-medium text-brand-dark">
                    <span className="font-serif italic text-lg">Butter Chicken</span>
                    <span className="opacity-50 uppercase tracking-widest font-bold">Main</span>
                </div>
            </div>
            
            <div className="group cursor-pointer stagger-item">
                <div className="w-full aspect-square md:aspect-[4/5] mb-4 overflow-hidden bg-brand-light rounded-sm relative">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Fresh oysters" />
                </div>
                <div className="flex justify-between items-center text-[11px] font-sans font-medium text-brand-dark">
                    <span className="font-serif italic text-lg">Tandoori Platter</span>
                    <span className="opacity-50 uppercase tracking-widest font-bold">Appetizer</span>
                </div>
            </div>
            
            <div className="group cursor-pointer stagger-item">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden bg-brand-light rounded-sm relative">
                    <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Assorted shrimp" />
                </div>
                <div className="flex justify-between items-center text-[11px] font-sans font-medium text-brand-dark">
                    <span className="font-serif italic text-lg">Kung Pao Paneer</span>
                    <span className="opacity-50 uppercase tracking-widest font-bold">Appetizer</span>
                </div>
            </div>
        </div>
      </section>

      {/* Reels / Social Section */}
      <section className="mb-32 stagger-section">
        <div className="flex justify-between items-end mb-12 border-b border-brand-dark/10 pb-6 stagger-item">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark tracking-tight">The Taj <span className="italic">Reels</span></h2>
            <Link to="/gallery" className="text-[10px] uppercase font-bold tracking-widest hover:opacity-50 transition-opacity">
                @thetajrestaurant
            </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
                "https://images.unsplash.com/photo-1544025162-831e50d60d3d?q=80&w=2072&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1574966739987-65e38f2fea44?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2076&auto=format&fit=crop"
            ].map((img, i) => (
                <div key={i} className="group relative aspect-[9/16] overflow-hidden rounded-sm cursor-pointer stagger-item">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Instagram Reel" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="mb-32 reveal-section bg-brand-dark text-brand-cream p-8 sm:p-12 md:p-20 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
            <h3 className="font-serif text-3xl md:text-5xl italic leading-tight mb-8">
              "We believe that a great meal is not just about the food, but the memories created around the table."
            </h3>
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-brand-gold">
              — Chef Alexander Sterling, Head Chef
            </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="mb-20 stagger-section">
          <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2 stagger-item">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-sm relative">
                      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" alt="Restaurant Events" className="parallax-img absolute -top-[10%] left-0 w-full h-[120%] object-cover" />
                  </div>
              </div>
              <div className="lg:w-1/2 flex flex-col pt-10">
                  <div className="flex justify-between items-center mb-12 stagger-item">
                    <div className="relative flex flex-col text-brand-dark scale-75 origin-left">
                      <div className="font-serif text-xl leading-none absolute -top-3 left-0.5 tracking-wider">THE</div>
                      <div className="font-serif text-5xl leading-none tracking-tight flex items-start">
                        <span className="pr-1">T</span>
                        <span className="pr-1">A</span>
                        <span className="relative">J</span>
                      </div>
                    </div>
                    <Link to="/reservations" className="border border-brand-dark rounded-full px-6 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors">
                        Reservation
                    </Link>
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark mb-16 leading-tight tracking-tight stagger-item">
                      The Taj<br/><span className="italic">restaurant events</span>
                  </h2>
                  
                  <div className="space-y-10 font-sans pr-8">
                      <div className="stagger-item">
                          <p className="text-[11px] font-bold uppercase tracking-wider mb-3">15 FEB <span className="mx-2 font-serif italic text-sm lowercase opacity-70">/</span> Wine and dine 7-9 PM / $50</p>
                          <p className="text-sm font-medium text-brand-dark/80 leading-relaxed max-w-sm">Indulge in an evening of elegance as we present a curated wine pairing experience.</p>
                      </div>
                      <div className="stagger-item">
                          <p className="text-[11px] font-bold uppercase tracking-wider mb-3">16 FEB <span className="mx-2 font-serif italic text-sm lowercase opacity-70">/</span> Beverage Workshop / $65</p>
                          <p className="text-sm font-medium text-brand-dark/80 leading-relaxed max-w-sm">Learn the secrets behind our signature mocktails and cocktails from our head mixologist.</p>
                      </div>
                      <div className="pb-8 stagger-item">
                          <p className="text-[11px] font-bold uppercase tracking-wider mb-3">20 FEB <span className="mx-2 font-serif italic text-sm lowercase opacity-70">/</span> Culinary workshop / $75</p>
                          <p className="text-sm font-medium text-brand-dark/80 leading-relaxed max-w-sm">Learn the art of crafting perfect pasta from scratch in our interactive workshop.</p>
                      </div>
                      
                      <div className="stagger-item">
                          <Link to="/events" className="inline-block border border-brand-dark rounded-full px-12 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors text-center w-full sm:w-auto">
                              Book Now
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-32 reveal-section bg-brand-light p-8 md:p-16 rounded-sm">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark tracking-tight text-center mb-16">
            What our <span className="italic">guests say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { name: "Sarah Jenkins", text: "An absolute triumph of flavors. The butter chicken here is unlike anything I've ever had before. A must-visit!" },
                { name: "David Chen", text: "Impeccable service and an ambiance that perfectly balances luxury and comfort. The tandoori platter was divine." },
                { name: "Emily Thorne", text: "We celebrated our anniversary here and it was magical. The attention to detail in every dish is extraordinary." }
            ].map((testimonial, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                    <div className="text-brand-gold mb-6">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
                    </div>
                    <p className="font-sans text-sm font-medium text-brand-dark/80 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                    </p>
                    <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark">
                        {testimonial.name}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="mb-20 reveal-section">
        <div className="bg-brand-dark text-brand-cream rounded-sm overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-gold block mb-4">Book a Table</span>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                    Reserve your<br/><span className="italic">experience</span>
                </h2>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-sans text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Date</label>
                            <input type="date" className="w-full bg-transparent border-b border-brand-cream/30 pb-2 font-sans text-sm outline-none focus:border-brand-gold transition-colors [color-scheme:dark]" />
                        </div>
                        <div>
                            <label className="block font-sans text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Time</label>
                            <input type="time" className="w-full bg-transparent border-b border-brand-cream/30 pb-2 font-sans text-sm outline-none focus:border-brand-gold transition-colors [color-scheme:dark]" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-sans text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Guests</label>
                            <select className="w-full bg-transparent border-b border-brand-cream/30 pb-2 font-sans text-sm outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer">
                                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-brand-dark text-brand-cream">{n} Person{n > 1 ? 's' : ''}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block font-sans text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Name</label>
                            <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-brand-cream/30 pb-2 font-sans text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-cream/30" />
                        </div>
                    </div>
                    
                    <button type="submit" className="mt-8 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors px-10 py-3 rounded-full font-sans text-[10px] uppercase font-bold tracking-widest w-full">
                        Confirm Reservation
                    </button>
                </form>
            </div>
            
            <div className="md:w-1/2 relative h-64 md:h-auto">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Restaurant Table" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        </div>
      </section>
    </div>
  );
}
