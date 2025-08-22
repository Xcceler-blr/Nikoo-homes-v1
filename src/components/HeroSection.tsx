import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import heroImage from "@/assets/nikoo-hero.png";
import logo from "@/assets/nikoo homes.png";
import { ModalPortal } from "./ModalPortal";
import { HubSpotIntegration } from "@/lib/hubspot-integration";

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });
  const [formErrors, setFormErrors] = useState<{ email?: string; phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone) && !/^([0-9])\1{9}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors: { email?: string; phone?: string } = {};
    if (!validateEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!validatePhone(form.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    try {
      // Submit to both Google Forms and HubSpot
      await HubSpotIntegration.submitToBoth('site-visit', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        consent: form.consent,
        formName: "Schedule Visit",
        additionalData: {
          source: 'Hero Section',
          page_url: window.location.href
        }
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // Optionally handle error
    }
    // Redirect to thank you page
    navigate('/thank-you');
  };

  const closeModal = () => {
    setOpen(false);
  };

  const [brochureOpen, setBrochureOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", phone: "", email: "", consent: false });
  const [brochureFormErrors, setBrochureFormErrors] = useState<{ email?: string; phone?: string }>({});
  const brochureDownloadRef = useRef<HTMLAnchorElement>(null);

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBrochureForm({
      ...brochureForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors: { email?: string; phone?: string } = {};
    if (!validateEmail(brochureForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!validatePhone(brochureForm.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    setBrochureFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    try {
      // Submit to both Google Forms and HubSpot
      await HubSpotIntegration.submitToBoth('download', {
        name: brochureForm.name,
        email: brochureForm.email,
        phone: brochureForm.phone,
        consent: brochureForm.consent,
        formName: "Download Brochure",
        additionalData: {
          source: 'Hero Section',
          page_url: window.location.href
        }
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
    // Trigger brochure download before redirecting
    if (brochureDownloadRef.current) {
      brochureDownloadRef.current.click();
    }
    // Redirect to thank you page
    navigate('/thank-you');
  };

  const closeBrochureModal = () => {
    setBrochureOpen(false);
    setBrochureForm({ name: "", phone: "", email: "", consent: false });
  };



  return (
    <>
      <section className="relative w-full min-h-[45vh] flex flex-col overflow-hidden pb-16 pt-[30px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-10 pb-6 w-full">
          <div className="max-w-4xl mx-auto">
            {/* Logo - Aligned with Content */}
            <div className="mb-8 flex items-center pt-[10px]">
              <img src={logo} alt="Nikoo Homes Logo" className="h-20 w-auto max-w-[260px] object-contain" />
            </div>
            {/* Pre-launch Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-secondary-foreground font-medium">Pre-Launching Now</span>
            </div>
            {/* Main Headlines */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-fade-in">
              <span className="bg-gradient-to-r from-[#CF2E2E] to-[#FF6B6B] bg-clip-text text-transparent">
                Your Dream Home at
              </span>{" "}
              <span className="bg-gradient-to-r from-[#CF2E2E] to-[#FF6B6B] bg-clip-text text-transparent">
                Sadahalli
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground/90 mb-6 animate-fade-in">
              Nikoo Homes Garden Estate
            </h2>
            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in">
              1, 2, 3 & 4 BHK Smart Homes Starting at{" "}
              <span className="text-secondary font-bold text-3xl">₹50L*</span>
            </p>
            {/* Key Features */}
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in">
              <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary-foreground/20">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground">Premium Location</span>
              </div>
              <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary-foreground/20">
                <div className="w-5 h-5 bg-secondary rounded-full"></div>
                <span className="text-primary-foreground">Garden Township</span>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in mb-8 justify-start">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg font-bold shadow-lg bg-[#CF2E2E] text-white hover:bg-[#b82828] border-none flex items-center justify-center"
                onClick={() => setOpen(true)}
              >
                Book Your Visit Now
              </Button>
              <Button 
                size="lg"
                className="px-8 py-4 text-lg font-bold shadow-lg bg-[#CF2E2E] text-white hover:bg-[#b82828] border-none flex items-center justify-center"
                onClick={() => setBrochureOpen(true)}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
            {/* Contact Info */}
            <div className="mt-8 text-primary-foreground/70 animate-fade-in">
              <p className="text-sm">*T&C Apply | RERA Registration Pending</p>
            </div>
            {/* Floating Elements */}
            <div className="absolute bottom-10 right-10 animate-bounce z-10">
              <div className="w-16 h-16 bg-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-secondary rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2px gap */}
      <div style={{ height: '2px' }} />

      {/* Popup Modal for Visit Scheduling */}
      {open && (
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
                <form
                  id="nikoo-visit-scheduler-form"
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-2xl font-bold mb-2 text-center text-primary">Schedule Your Visit</h3>
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
                  {formErrors.phone && <span className="text-red-600 text-sm">{formErrors.phone}</span>}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {formErrors.email && <span className="text-red-600 text-sm">{formErrors.email}</span>}
                  <input type="hidden" name="formName" value="Schedule Visit" />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      required
                      className="accent-primary"
                    />
                    I agree to be contacted regarding my enquiry
                  </label>
                  <button
                    type="submit"
                    className="bg-[#CF2E2E] text-white font-bold py-3 rounded-lg hover:bg-[#b82828] transition-colors text-lg mt-2 disabled:opacity-60"
                    disabled={!form.consent}
                  >
                    Schedule Visit Now
                  </button>
                </form>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* Brochure Download Modal */}
      {brochureOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeBrochureModal} role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={closeBrochureModal}
                aria-label="Close"
              >
                ×
              </button>
                <form
                  id="nikoo-brochure-download-form"
                  className="flex flex-col gap-5"
                  onSubmit={handleBrochureSubmit}
                >
                  <h3 className="text-2xl font-bold mb-2 text-center text-primary">Download Brochure</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={brochureForm.name}
                    onChange={handleBrochureChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={brochureForm.phone}
                    onChange={handleBrochureChange}
                    required
                    pattern="[0-9]{10,}"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {brochureFormErrors.phone && <span className="text-red-600 text-sm">{brochureFormErrors.phone}</span>}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={brochureForm.email}
                    onChange={handleBrochureChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {brochureFormErrors.email && <span className="text-red-600 text-sm">{brochureFormErrors.email}</span>}
                  <input type="hidden" name="formName" value="Download Brochure" />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={brochureForm.consent}
                      onChange={handleBrochureChange}
                      required
                      className="accent-primary"
                    />
                    I agree to be contacted regarding my enquiry
                  </label>
                  <button
                    type="submit"
                    className="bg-[#CF2E2E] text-white font-bold py-3 rounded-lg hover:bg-[#b82828] transition-colors text-lg mt-2 disabled:opacity-60"
                    disabled={!brochureForm.consent}
                  >
                    Download Brochure
                  </button>
                </form>
                {/* Hidden download link for automatic download */}
                <a
                  ref={brochureDownloadRef}
                  href="/brochure.pdf"
                  download
                  className="hidden"
                >
                  Download Brochure
                </a>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default HeroSection;