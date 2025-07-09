import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Zap, Shield, Trees, Building2 } from "lucide-react";
import image from "@/assets/Web-page_jpeg-02.jpg";
import { ModalPortal } from "./ModalPortal";

const WhyNikooSection = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.consent) {
      setSubmitted(true);
      // Optionally, handle form data here (e.g., send to API)
    }
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
    setForm({ name: "", phone: "", email: "", consent: false });
  };

  const highlights = [
    {
      icon: MapPin,
      title: "Strategic Location",
      description: "Just opposite Prestige Cloud Tech Park, before Airport Toll Gate"
    },
    {
      icon: Clock,
      title: "26 Minutes to Airport",
      description: "Quick access to Aerospace SEZ and international connectivity"
    },
    {
      icon: Zap,
      title: "Smart Homes",
      description: "Future-ready apartments with modern amenities and technology"
    },
    {
      icon: Shield,
      title: "Trusted Developer",
      description: "By Bhartiya City - proven track record of excellence"
    },
    {
      icon: Trees,
      title: "Green Township",
      description: "Expansive greenery with sustainable living concepts"
    },
    {
      icon: Building2,
      title: "Mixed Development",
      description: "Apartments, duplexes, row houses, and premium villas"
    }
  ];

  return (
    <>
      {/* Modal OUTSIDE section for full viewport overlay */}
      {open && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
              {!submitted ? (
                <form
                  id="nikoo-discover-more-form"
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-2xl font-bold mb-2 text-center text-primary">Discover More About Nikoo</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10,}"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      required
                      className="accent-primary"
                    />
                    I agree to be contacted regarding my enquiry.
                  </label>
                  <button
                    type="submit"
                    className="bg-[#CF2E2E] text-white font-bold py-3 rounded-lg hover:bg-[#b82828] transition-colors text-lg mt-2 disabled:opacity-60"
                    disabled={!form.consent}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                  <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                  <p className="text-gray-700 text-center">We will send you more information about Nikoo Garden Estates soon.</p>
                  <button
                    className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82828]"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </ModalPortal>
      )}
      <section className="pt-12 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 md:px-8 xl:px-0">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Nikoo Garden Estates?
            </h2>
            <div className="w-24 h-1 bg-gradient-premium mx-auto mb-8"></div>
          </div>

          {/* Two Column: Left Text, Right Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-16 w-full max-w-6xl mx-auto">
            {/* Left: New Description */}
            <div className="md:pr-12">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium">
                Bhartiya Nikoo Garden Estate is a premium upcoming township by Bhartiya City, located in Sadahalli, North Bangalore. Surrounded by greenery, it offers a mix of smart apartments, duplexes, row houses, and villas—designed for modern urban living. Ideally located opposite Prestige Cloud Tech Park and close to the Airport Toll Gate, it ensures seamless connectivity to key IT and industrial hubs. With prices starting at <span className="text-[#CF2E2E] font-bold">₹50 Lakhs onwards*</span>, this project blends lifestyle, convenience, and long-term value. Crafted with sustainable design and world-class amenities, it’s the perfect address for those seeking a future-ready home in North Bangalore.
              </p>
            </div>
            {/* Right: Image */}
            <div className="flex justify-center md:justify-end md:pl-12">
              <img src={image} alt="Nikoo Garden Estate" className="rounded-2xl shadow-xl max-w-full h-auto object-cover md:max-w-md lg:max-w-lg" />
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            <form className="w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-primary/10 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6"
              style={{ boxSizing: 'border-box' }}
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Name"
                className="flex-1 min-w-0 w-full md:w-auto rounded-lg border border-input bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="flex-1 min-w-0 w-full md:w-auto rounded-lg border border-input bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-0 w-full md:w-auto rounded-lg border border-input bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground transition-all"
              />
              <Button
                size="lg"
                className="px-8 py-2 text-lg font-bold shadow-lg bg-[#CF2E2E] text-white hover:bg-[#b82828] border-none flex items-center justify-center whitespace-nowrap"
                type="submit"
              >
                Submit Enquiry
              </Button>
            </form>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full max-w-6xl mx-auto px-0">
            {highlights.map((highlight, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-glow transition-all duration-300 border-0 bg-[#fff5f5] backdrop-blur-sm hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: '#ff6b6b' }}>
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="relative h-[50px] min-w-[320px] flex items-center justify-center overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-lg px-8 py-6"
              onClick={() => setOpen(true)}
            >
              <span className="relative z-10 whitespace-nowrap">Discover More About Nikoo</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyNikooSection;