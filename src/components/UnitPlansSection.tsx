import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Home, Square } from "lucide-react";
import { useState, useRef } from "react";
import { ModalPortal } from "./ModalPortal";

// Import local images
import studioImage from "@/assets/studio .png";
import oneBhkImage from "@/assets/1bhk.png";
import oneFiveBhkImage from "@/assets/1.5bhk.png";
import twoBhkImage from "@/assets/2bhk.png";
import twoFiveBhkImage from "@/assets/2.5bhk.png";
import threeBhkImage from "@/assets/3bhk.png";
import threeFiveBhkImage from "@/assets/3.5bhk.png";
import threeBedLoftImage from "@/assets/3 Bed Loft.png";
import fourBhkImage from "@/assets/4bhk.png";

const UnitPlansSection = () => {
    const unitPlans = [
    {
      type: "Studio",
      size: "480 - 540 sqft",
      price: "₹50 Lacs*",
      highlight: "Starting Price",
      image: studioImage
    },
    {
      type: "1 BHK",
      size: "750 - 800 sqft", 
      price: "₹75 Lacs*",
      highlight: "Popular Choice",
      image: oneBhkImage
    },
    {
      type: "1.5 BHK",
      size: "1030 - 1090 sqft",
      price: "₹1.03 Cr*",
      highlight: null,
      image: oneFiveBhkImage
    },
    {
      type: "2 BHK",
      size: "1100 - 1200 sqft",
      price: "₹1.10 Cr*",
      highlight: "Best Value",
      image: twoBhkImage
    },
    {
      type: "2.5 BHK",
      size: "1350 - 1400 sqft",
      price: "₹1.35 Cr*",
      highlight: null,
      image: twoFiveBhkImage
    },
    {
      type: "3 BHK",
      size: "1600 - 1800 sqft",
      price: "₹1.6 Cr*",
      highlight: "Family Favorite",
      image: threeBhkImage
    },
    {
      type: "3.5 BHK",
      size: "1900 - 2000 sqft",
      price: "₹1.9 Cr*",
      highlight: null,
      image: threeFiveBhkImage
    },
    {
      type: "3 Bed Loft",
      size: "2150 - 2200 sqft",
      price: "₹2.1 Cr*",
      highlight: "Premium",
      image: threeBedLoftImage
    },
    {
      type: "4 BHK",
      size: "2400 - 2600 sqft",
      price: "₹2.5 Cr*",
      highlight: "Luxury",
      image: fourBhkImage
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [submittedIndex, setSubmittedIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [allPlansOpen, setAllPlansOpen] = useState(false);
  const [allPlansSubmitted, setAllPlansSubmitted] = useState(false);
  const allPlansDownloadRef = useRef<HTMLAnchorElement>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent, idx: number) => {
    e.preventDefault();
    if (form.consent) {
      setSubmittedIndex(idx);
      setTimeout(() => {
        // Trigger download after a short delay for UX
        downloadRef.current?.click();
      }, 800);
    }
  };

  const closeModal = () => {
    setOpenIndex(null);
    setTimeout(() => setSubmittedIndex(null), 300);
    setForm({ name: "", phone: "", email: "", consent: false });
  };

  const handleAllPlansChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAllPlansSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.consent) {
      setAllPlansSubmitted(true);
      setTimeout(() => {
        allPlansDownloadRef.current?.click();
      }, 800);
    }
  };

  const closeAllPlansModal = () => {
    setAllPlansOpen(false);
    setTimeout(() => setAllPlansSubmitted(false), 300);
    setForm({ name: "", phone: "", email: "", consent: false });
  };

  const handleConsultationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.consent) {
      setConsultationSubmitted(true);
    }
  };

  const closeConsultationModal = () => {
    setConsultationOpen(false);
    setTimeout(() => setConsultationSubmitted(false), 300);
    setForm({ name: "", phone: "", email: "", consent: false });
  };

  // Helper to get the floor plan file name based on unit type
  const getFloorPlanFile = (type: string) => {
    // Map type to image file name (assume all are .png and lowercase, spaces/periods removed)
    const fileMap: Record<string, string> = {
      "Studio": "studio.png",
      "1 BHK": "1bhk.png",
      "1.5 BHK": "1.5bhk.png",
      "2 BHK": "2bhk.png",
      "2.5 BHK": "2.5bhk.png",
      "3 BHK": "3bhk.png",
      "3.5 BHK": "3.5bhk.png",
      "3 Bed Loft": "3bedloft.png",
      "4 BHK": "4bhk.png"
    };
    return fileMap[type] || "floorplan.png";
  };

  return (
    <section className="pt-12 pb-16 bg-gradient-subtle relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 xl:px-0 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-white/80 backdrop-blur-sm">
            Choose Your Perfect Home
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Unit Plans & Pricing
          </h2>
          <div className="w-24 h-1 bg-gradient-premium mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From cozy studios to spacious 4 BHK homes - find the perfect space for your family
          </p>
        </div>

        {/* Unit Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mb-16 mx-auto">
          {unitPlans.map((unit, index) => (
            <Card 
              key={index} 
              className="relative group rounded-2xl overflow-hidden shadow-xl bg-white/90 backdrop-blur-md min-h-[450px] flex flex-col justify-end transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-20 animate-fadeInUp"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={unit.image}
                  alt={`${unit.type} apartment`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105 rounded-2xl"
                  loading="lazy"
                />
                {/* Subtle overlay for readability, less opaque */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Highlight Badge */}
              {unit.highlight && (
                <div className="absolute top-3 right-3 z-20">
                  <Badge variant="secondary" className="text-xs font-semibold" style={{ background: '#cf231b', color: '#fff' }}>
                    {unit.highlight}
                  </Badge>
                </div>
              )}
              {/* Content - left bottom, above button */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8">
                <div className="mt-auto flex flex-col items-start w-full">
                  <span className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-2 rounded-lg text-2xl font-bold bg-black text-white shadow-lg">
                      {unit.price}
                    </span>
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                    {unit.type}
                    </span>
                  </span>
                </div>
                {/* Single CTA Button - styled like 'View on Google Maps', but width/height/corner radius as before */}
                <div className="flex justify-center w-full">
                  <button
                    type="button"
                    className="relative h-[50px] w-full max-w-xs flex items-center justify-center gap-2 overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-base px-8 py-5 font-semibold rounded-lg"
                    onClick={() => { setOpenIndex(index); setForm({ name: "", phone: "", email: "", consent: false }); setSubmittedIndex(null); }}
                  >
                    <span className="relative z-10 whitespace-nowrap">Schedule Visit / Download Unit Plan</span>
                  </button>
                </div>
                {openIndex === index && (
                  <ModalPortal>
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeModal} role="dialog" aria-modal="true">
                      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                          onClick={closeModal}
                          aria-label="Close"
                        >
                          ×
                        </button>
                        {submittedIndex !== index ? (
                          <form
                            id={`unitplan-download-form-${index}`}
                            className="flex flex-col gap-5"
                            onSubmit={e => handleSubmit(e, index)}
                          >
                            <h3 className="text-2xl font-bold mb-2 text-center text-primary">Download {unit.type} Floor Plan</h3>
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
                              placeholder="Email ID"
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
                              Download Now
                            </button>
                          </form>
                        ) : (
                          <div className="flex flex-col items-center justify-center min-h-[200px]">
                            <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                            <p className="text-gray-700 text-center mb-4">Your details have been received.<br/>Your download will begin automatically.</p>
                            <a
                              ref={downloadRef}
                              href={`/floor-plan/${getFloorPlanFile(unit.type)}`}
                              download
                              className="hidden"
                            >
                              Download
                            </a>
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
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#cf2e2e] rounded-3xl p-12 border-2 border-red-500/30 shadow-2xl mt-8">
          <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg">
            Need Help Choosing the Right Unit?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Our property consultants are here to help you find the perfect home that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              type="button"
              className="relative h-[50px] min-w-[220px] flex items-center justify-center gap-3 overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-xl px-8 py-5 font-bold animate-bounce-once"
              onClick={() => setAllPlansOpen(true)}
            >
              <Download className="w-6 h-6 relative z-10" />
              <span className="relative z-10 whitespace-nowrap">Download All Plans</span>
            </button>
            <button
              type="button"
              className="relative h-[50px] min-w-[220px] flex items-center justify-center overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-xl px-8 py-5 font-bold"
              onClick={() => setConsultationOpen(true)}
            >
              <span className="relative z-10 whitespace-nowrap">Schedule Consultation</span>
            </button>
          </div>
          {allPlansOpen && (
            <ModalPortal>
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeAllPlansModal} role="dialog" aria-modal="true">
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    onClick={closeAllPlansModal}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  {!allPlansSubmitted ? (
                    <form
                      id="download-all-plans-form"
                      className="flex flex-col gap-5"
                      onSubmit={handleAllPlansSubmit}
                    >
                      <h3 className="text-2xl font-bold mb-2 text-center text-primary">Download All Floor Plans</h3>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleAllPlansChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleAllPlansChange}
                        required
                        pattern="[0-9]{10,}"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={form.email}
                        onChange={handleAllPlansChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={form.consent}
                          onChange={handleAllPlansChange}
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
                        Download All
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                      <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                      <p className="text-gray-700 text-center mb-4">Your details have been received.<br/>Your download will begin automatically.</p>
                      <a
                        ref={allPlansDownloadRef}
                        href="/floor-plan/all-plans.zip"
                        download
                        className="hidden"
                      >
                        Download All
                      </a>
                      <button
                        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82828]"
                        onClick={closeAllPlansModal}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ModalPortal>
          )}
          {consultationOpen && (
            <ModalPortal>
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeConsultationModal} role="dialog" aria-modal="true">
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    onClick={closeConsultationModal}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  {!consultationSubmitted ? (
                    <form
                      id="schedule-consultation-form"
                      className="flex flex-col gap-5"
                      onSubmit={handleConsultationSubmit}
                    >
                      <h3 className="text-2xl font-bold mb-2 text-center text-primary">Schedule a Free Consultation</h3>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleConsultationChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleConsultationChange}
                        required
                        pattern="[0-9]{10,}"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={form.email}
                        onChange={handleConsultationChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={form.consent}
                          onChange={handleConsultationChange}
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
                        Schedule Consultation
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                      <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                      <p className="text-gray-700 text-center mb-4">Your consultation request has been received.<br/>Our expert will reach out to you soon to help you find your perfect home. We look forward to assisting you!</p>
                      <button
                        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82828]"
                        onClick={closeConsultationModal}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ModalPortal>
          )}
        </div>
      </div>
    </section>
  );
};

export default UnitPlansSection;