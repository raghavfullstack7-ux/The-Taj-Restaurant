import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const container = useRef<HTMLDivElement>(null);
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "loading" | "success">("idle");

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  const events = [
    { type: "Private Events", title: "Birthday Parties", desc: "Celebrate your special day with custom menus, dedicated service, and an unforgettable ambiance tailored just for you." },
    { type: "Private Events", title: "Anniversary Celebrations", desc: "Mark your milestone with a romantic dinner setting, champagne toasts, and a curated culinary journey." },
    { type: "Corporate", title: "Corporate Events", desc: "From business luncheons to grand annual galas, we provide the perfect professional yet luxurious environment." },
    { type: "Gatherings", title: "Family Gatherings", desc: "Bring the whole family together in our spacious dining areas designed for sharing joy and great food." }
  ];

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus("loading");
    setTimeout(() => {
        setEnquiryStatus("success");
    }, 1500);
  };

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24 overflow-hidden">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Gatherings</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Special Events</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {events.map((ev, i) => (
            <div key={i} className="reveal-item flex flex-col items-start border-b border-brand-dark/10 pb-12">
              <span className="font-sans text-[10px] uppercase font-bold tracking-widest opacity-50 mb-4">{ev.type}</span>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 italic">{ev.title}</h3>
              <p className="font-sans text-sm text-brand-dark/70 leading-relaxed max-w-md font-medium">{ev.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto reveal-item bg-brand-dark text-brand-cream rounded-sm p-8 md:p-16 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10">
              <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl md:text-5xl italic tracking-tight mb-4">Event Enquiry</h2>
                  <p className="font-sans text-sm font-medium text-brand-cream/80 max-w-lg mx-auto">
                      Planning something special? Let us help you organize the perfect event. Fill out the form below and our events coordinator will reach out to you.
                  </p>
              </div>

              {enquiryStatus === "success" ? (
                  <div className="text-center py-12">
                      <h3 className="font-serif text-3xl mb-4 text-brand-gold">Enquiry Received</h3>
                      <p className="font-sans text-sm text-brand-cream/80 mb-8">Thank you. Our team will contact you shortly.</p>
                      <button onClick={() => setEnquiryStatus("idle")} className="border border-brand-gold text-brand-gold rounded-full px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-colors">
                        New Enquiry
                      </button>
                  </div>
              ) : (
                  <form onSubmit={handleEnquiry} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-gold opacity-80 mb-2">Full Name</label>
                              <input required type="text" className="w-full bg-transparent border-b border-brand-cream/30 py-3 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors placeholder-brand-cream/30" placeholder="Your Name" />
                          </div>
                          <div>
                              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-gold opacity-80 mb-2">Email</label>
                              <input required type="email" className="w-full bg-transparent border-b border-brand-cream/30 py-3 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors placeholder-brand-cream/30" placeholder="your@email.com" />
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-gold opacity-80 mb-2">Event Type</label>
                              <select className="w-full bg-transparent border-b border-brand-cream/30 py-3 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer">
                                  <option value="birthday" className="bg-brand-dark">Birthday Party</option>
                                  <option value="anniversary" className="bg-brand-dark">Anniversary</option>
                                  <option value="corporate" className="bg-brand-dark">Corporate Event</option>
                                  <option value="family" className="bg-brand-dark">Family Gathering</option>
                                  <option value="other" className="bg-brand-dark">Other</option>
                              </select>
                          </div>
                          <div>
                              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-gold opacity-80 mb-2">Estimated Guests</label>
                              <input required type="number" min="1" className="w-full bg-transparent border-b border-brand-cream/30 py-3 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors placeholder-brand-cream/30" placeholder="e.g. 25" />
                          </div>
                      </div>

                      <div className="pt-4">
                          <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-gold opacity-80 mb-2">Event Details</label>
                          <textarea required rows={4} className="w-full bg-transparent border-b border-brand-cream/30 py-3 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors placeholder-brand-cream/30 resize-none" placeholder="Tell us more about your event..."></textarea>
                      </div>

                      <div className="pt-8 text-center">
                          <button disabled={enquiryStatus === "loading"} type="submit" className="border border-brand-gold bg-brand-gold text-brand-dark rounded-full px-12 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-transparent hover:text-brand-gold transition-colors disabled:opacity-50 w-full md:w-auto">
                              {enquiryStatus === "loading" ? "Submitting..." : "Submit Enquiry"}
                          </button>
                      </div>
                  </form>
              )}
          </div>
      </section>
    </div>
  );
}
