import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reservations() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useGSAP(() => {
    gsap.fromTo(".reveal-item", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/book-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("Your table has been successfully reserved. A confirmation email has been sent.");
        setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "2", specialRequests: "" });
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to make a reservation.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div ref={container} className="w-full bg-brand-cream pt-32 md:pt-40 px-5 sm:px-6 md:px-8 pb-24">
      <section className="pt-10 pb-16 text-center reveal-item relative overflow-hidden">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark opacity-50 block mb-6">Join Us</span>
          <h1 className="font-serif text-6xl md:text-[80px] font-medium text-brand-dark mb-8 italic tracking-tight">Reserve a Table</h1>
          <div className="w-16 h-px bg-brand-dark mx-auto opacity-20"></div>
      </section>

      <section className="max-w-2xl mx-auto reveal-item">
        {status === "success" ? (
          <div className="bg-white/30 border border-brand-dark/10 p-12 text-center rounded-sm">
            <h3 className="font-serif text-3xl mb-4 italic">Thank You!</h3>
            <p className="font-sans text-sm text-brand-dark/80 mb-8">{message}</p>
            <button onClick={() => setStatus("idle")} className="border border-brand-dark rounded-full px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors">
              Make Another Booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-12 bg-white/30 backdrop-blur-sm border border-brand-dark/5 shadow-sm rounded-3xl">
            {status === "error" && (
              <div className="bg-red-50 text-red-600 p-4 text-sm text-center border border-red-200 mb-6">
                {message}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors placeholder-brand-dark/30" placeholder="John Doe" />
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors placeholder-brand-dark/30" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors placeholder-brand-dark/30" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Guests</label>
                <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} People</option>)}
                  <option value="10+">10+ People</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors" />
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Time</label>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <label className="block font-sans text-[10px] uppercase font-bold tracking-widest text-brand-dark opacity-70 mb-2">Special Requests (Optional)</label>
              <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm font-medium focus:outline-none focus:border-brand-dark transition-colors placeholder-brand-dark/30 resize-none" placeholder="Allergies, anniversaries, window seating..."></textarea>
            </div>

            <div className="pt-8 text-center">
              <button disabled={status === "loading"} type="submit" className="bg-brand-dark text-white rounded-full px-12 py-4 text-xs uppercase font-bold tracking-widest hover:bg-brand-dark/90 transition-colors disabled:opacity-50 w-full sm:w-auto">
                {status === "loading" ? "Processing..." : "Confirm Reservation"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
