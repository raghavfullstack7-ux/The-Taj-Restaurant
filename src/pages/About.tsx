import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    const sections = gsap.utils.toArray(".reveal-section") as HTMLElement[];
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
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
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-8 overflow-hidden">
      {/* Page Header */}
      <section className="pt-10 pb-16 text-center hero-content relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Discover Our Roots</span>
          <h1 className="font-serif text-5xl md:text-[80px] font-medium text-brand-dark mb-8 tracking-tight">Our Story</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      {/* Our Story / Restaurant Journey */}
      <section className="py-20 reveal-section">
        <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-brand-dark mb-8 tracking-tight leading-tight">Our Restaurant<br/><span className="italic">Journey</span></h2>
                    <p className="font-sans text-brand-dark/80 font-medium leading-relaxed mb-6 text-sm">
                        The Taj Multicuisine Restaurant began with a simple vision: to create a dining experience that transcends borders. Established in 2010, our journey started in a small kitchen where passion for authentic spices met the art of culinary presentation.
                    </p>
                    <p className="font-sans text-brand-dark/80 font-medium leading-relaxed text-sm">
                        Over the years, we have grown into a beloved culinary destination, known for our impeccable service and a menu that celebrates the rich diversity of global cuisines. Our commitment to quality remains as strong today as it was on day one.
                    </p>
                </div>
                <div className="relative w-full overflow-hidden aspect-[4/5] rounded-sm">
                    <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" alt="Restaurant interior" className="parallax-img absolute -top-[10%] left-0 w-full h-[120%] object-cover shadow-sm" />
                </div>
            </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 reveal-section bg-brand-dark text-brand-cream rounded-sm p-8 md:p-16 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-6 italic">Our Vision</h3>
                    <p className="font-sans text-sm text-brand-cream/80 leading-relaxed font-medium">
                        To be globally recognized as the premier destination for culinary excellence, where diverse cultures unite through exceptional food, creating lasting memories for every guest who walks through our doors.
                    </p>
                </div>
                <div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-6 italic">Our Mission</h3>
                    <p className="font-sans text-sm text-brand-cream/80 leading-relaxed font-medium">
                        To craft extraordinary dining experiences by blending traditional recipes with modern techniques. We are dedicated to sourcing sustainable ingredients, empowering our culinary team, and delivering heartfelt hospitality.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Chef Introduction */}
      <section className="py-24 reveal-section">
          <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1 relative w-full overflow-hidden aspect-square rounded-sm">
                      <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop" alt="Executive Chef" className="parallax-img absolute -top-[10%] left-0 w-full h-[120%] object-cover shadow-sm" />
                  </div>
                  <div className="order-1 lg:order-2">
                      <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">The Maestro</span>
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-brand-dark mb-4 tracking-tight leading-tight">Chef<br/><span className="italic">Rajan Sharma</span></h2>
                      <p className="font-sans text-brand-dark uppercase tracking-[0.2em] font-bold text-[10px] mb-8">Executive Head Chef</p>
                      
                      <p className="font-sans text-brand-dark/80 font-medium leading-relaxed mb-8 text-sm">
                          With over 25 years of experience in luxury hotels across India and Europe, Chef Rajan brings a wealth of knowledge and creativity to The Taj. His philosophy centers around respecting traditional methods while embracing modern techniques.
                      </p>
                      
                      <div className="p-6 border-l border-brand-dark/20 font-serif italic text-brand-dark text-lg leading-relaxed">
                          "Cooking is an art, but it's also about respecting the ingredients. At The Taj, we don't just cook food; we craft experiences that evoke memories and create new ones."
                      </div>
                  </div>
              </div>
          </div>
      </section>
      {/* Kitchen Standards */}
      <section className="py-24 reveal-section bg-brand-light rounded-sm">
          <div className="container mx-auto max-w-6xl px-8">
              <h2 className="font-serif text-4xl md:text-5xl text-brand-dark tracking-tight text-center mb-16">
                  Our <span className="italic">Kitchen Standards</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                      <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                          </svg>
                      </div>
                      <h3 className="font-serif text-2xl mb-4 text-brand-dark">Uncompromising Hygiene</h3>
                      <p className="font-sans text-sm text-brand-dark/80 leading-relaxed font-medium">
                          Our kitchen operates under the strictest sanitation protocols, exceeding industry standards to ensure every dish is prepared in a pristine, safe environment.
                      </p>
                  </div>
                  <div className="text-center">
                      <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                      </div>
                      <h3 className="font-serif text-2xl mb-4 text-brand-dark">Sustainable Sourcing</h3>
                      <p className="font-sans text-sm text-brand-dark/80 leading-relaxed font-medium">
                          We proudly partner with local farms and sustainable fisheries, guaranteeing that our ingredients are not only fresh but ethically harvested.
                      </p>
                  </div>
                  <div className="text-center">
                      <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                      </div>
                      <h3 className="font-serif text-2xl mb-4 text-brand-dark">Artisanal Craftsmanship</h3>
                      <p className="font-sans text-sm text-brand-dark/80 leading-relaxed font-medium">
                          From house-ground spices to hand-rolled pastas, we believe in the magic of scratch cooking, preserving the authenticity of global flavors.
                      </p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
