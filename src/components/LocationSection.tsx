import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Plane, Train, Car, Building2 } from "lucide-react";
import locationMapImage from "@/assets/location-nikoo.png";
import { useState, useRef } from "react";
import { ModalPortal } from "./ModalPortal";

const LocationSection = () => {
  const landmarks = [
    {
      icon: Train,
      name: "Yelahanka Metro Station",
      time: "2 Min",
      color: "text-blue-600"
    },
    {
      icon: Car,
      name: "NH 44",
      time: "2 Min", 
      color: "text-green-600"
    },
    {
      icon: Train,
      name: "Yelahanka Junction",
      time: "8 Min",
      color: "text-purple-600"
    },
    {
      icon: Plane,
      name: "Kempegowda International Airport",
      time: "20 Min",
      color: "text-orange-600"
    },
    {
      icon: Building2,
      name: "Central Bengaluru District",
      time: "40 Min",
      color: "text-red-600"
    }
  ];

  const connectivity = [
    {
      category: "Schools",
      items: ["Ryan International School", "Delhi Public School", "Vidya Niketan School", "Narayana E-Techno School"]
    },
    {
      category: "Shopping & Entertainment", 
      items: ["Prestige Shantiniketan Mall", "Elements Mall", "Esteem Mall", "VR Bengaluru"]
    },
    {
      category: "Business Hubs",
      items: ["Prestige Cloud Tech Park", "Aerospace SEZ", "Devanahalli Business Park", "IT Corridor"]
    },
    {
      category: "Hospitals",
      items: ["Columbia Asia Hospital", "Aster CMI Hospital", "Apollo Clinic", "Manipal Hospital"]
    }
  ];

  // Add state and handlers for the Schedule Site Visit modal
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [siteVisitSubmitted, setSiteVisitSubmitted] = useState(false);
  const [siteVisitForm, setSiteVisitForm] = useState({ name: "", phone: "", email: "", consent: false });
  const [mapsOpen, setMapsOpen] = useState(false);
  const [mapsSubmitted, setMapsSubmitted] = useState(false);
  const [mapsForm, setMapsForm] = useState({ name: "", phone: "", email: "", consent: false });
  const [siteVisitFormErrors, setSiteVisitFormErrors] = useState<{ email?: string; phone?: string }>({});
  const [mapsFormErrors, setMapsFormErrors] = useState<{ email?: string; phone?: string }>({});

  const handleSiteVisitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSiteVisitForm({
      ...siteVisitForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone) && !/^([0-9])\1{9}$/.test(phone);
  };

  const handleSiteVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors: { email?: string; phone?: string } = {};
    if (!validateEmail(siteVisitForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!validatePhone(siteVisitForm.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    setSiteVisitFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeDGka2PeJFaPp7z0NrndXt8rvuJwNxzi6ffllVgO8SyQfWtg/formResponse";
    const ENTRY_IDS = {
      name: "entry.1338687725",
      phone: "entry.1492404407",
      email: "entry.1765571584",
      formName: "entry.1294608166",
      consent: "entry.182177265",
    };
    const formData = new FormData();
    formData.append(ENTRY_IDS.name, siteVisitForm.name);
    formData.append(ENTRY_IDS.phone, siteVisitForm.phone);
    formData.append(ENTRY_IDS.email, siteVisitForm.email);
    formData.append(ENTRY_IDS.formName, "Schedule Site Visit");
    if (siteVisitForm.consent) {
      formData.append(ENTRY_IDS.consent, "I agree to be contacted regarding my enquiry");
    }
    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (error) {}
    setSiteVisitSubmitted(true);
  };

  const closeSiteVisitModal = () => {
    setSiteVisitOpen(false);
    setTimeout(() => setSiteVisitSubmitted(false), 300);
    setSiteVisitForm({ name: "", phone: "", email: "", consent: false });
    setSiteVisitFormErrors({});
  };

  const handleMapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setMapsForm({
      ...mapsForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMapsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors: { email?: string; phone?: string } = {};
    if (!validateEmail(mapsForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!validatePhone(mapsForm.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    setMapsFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeDGka2PeJFaPp7z0NrndXt8rvuJwNxzi6ffllVgO8SyQfWtg/formResponse";
    const ENTRY_IDS = {
      name: "entry.1338687725",
      phone: "entry.1492404407",
      email: "entry.1765571584",
      formName: "entry.1294608166",
      consent: "entry.182177265",
    };
    const formData = new FormData();
    formData.append(ENTRY_IDS.name, mapsForm.name);
    formData.append(ENTRY_IDS.phone, mapsForm.phone);
    formData.append(ENTRY_IDS.email, mapsForm.email);
    formData.append(ENTRY_IDS.formName, "Get Location on WhatsApp");
    if (mapsForm.consent) {
      formData.append(ENTRY_IDS.consent, "I agree to be contacted regarding my enquiry");
    }
    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (error) {}
    setMapsSubmitted(true);
  };

  const closeMapsModal = () => {
    setMapsOpen(false);
    setTimeout(() => setMapsSubmitted(false), 300);
    setMapsForm({ name: "", phone: "", email: "", consent: false });
    setMapsFormErrors({});
  };

  return (
    <section className="pt-12 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Prime Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Location Advantage
          </h2>
          <div className="w-24 h-1 bg-gradient-premium mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find Your Home in the Heart of North Bangalore, Closer to Everything That Matters!
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Map Image */}
            <div className="w-full flex justify-start pt-[15px]">
              <Card className="overflow-hidden border-0 shadow-luxury max-w-2xl w-full min-h-[340px] md:min-h-[440px] flex items-stretch">
                <div className="relative group w-full h-full">
                  <img 
                    src={locationMapImage} 
                    alt="Nikoo Garden Estate Location Map" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 min-h-[340px] md:min-h-[440px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-secondary-foreground font-semibold">
                      Interactive Map
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
            {/* Right: Travel Landmarks */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-left">Key Landmarks & Travel Times</h3>
              <div className="space-y-4">
                {landmarks.map((landmark, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-card transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent/50"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${landmark.color} bg-gradient-to-br from-current/10 to-current/5 rounded-full flex items-center justify-center`}>
                            <landmark.icon className={`w-6 h-6 ${landmark.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {landmark.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-bold text-primary text-lg">{landmark.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connectivity Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Connectivity & Key Infrastructure
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Schools */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-blue-100 max-w-sm w-full">
              <div className="mb-3 text-blue-600 flex items-center justify-center">
                <span className="bg-blue-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H17.5A2.5 2.5 0 0 1 20 19.5V21H4v-1.5Z'/><path d='M12 3v14'/><path d='M7 7l5-4 5 4'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-blue-700 mb-3 text-center">Schools</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Chaman Bhartiya School | Bhartiya City</li>
                <li>Air Force School</li>
                <li>Vidya Niketan School</li>
                <li>Vidyashilp Academy</li>
                <li>Canadian International School</li>
                <li>Mallaya Aditi International School</li>
                <li>Delhi Public School</li>
                <li>Stonehill International School</li>
              </ul>
            </div>
            {/* Hospitals */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-pink-100 max-w-sm w-full">
              <div className="mb-3 text-pink-600 flex items-center justify-center">
                <span className="bg-pink-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10'/><path d='M12 8v8M8 12h8'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-pink-700 mb-3 text-center">Hospitals</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Bangalore Baptist Hospital</li>
                <li>CMI Aster</li>
                <li>Columbia Asia</li>
                <li>Cyte Care</li>
                <li>Motherhood</li>
                <li>OVUM</li>
                <li>Regal Hospital</li>
              </ul>
            </div>
            {/* Tech Parks */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-green-100 max-w-sm w-full">
              <div className="mb-3 text-green-600 flex items-center justify-center">
                <span className="bg-green-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='3' width='18' height='18' rx='2'/><rect x='9' y='9' width='6' height='6'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-green-700 mb-3 text-center">Tech Parks</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>BCIT | Bhartiya City</li>
                <li>Manyata Tech Park</li>
                <li>Kirloskar Tech Park</li>
                <li>Hinduja Tech Park</li>
                <li>Devanahalli Business Park upcoming</li>
                <li>Brigade Magnum</li>
                <li>Brigade Opus</li>
                <li>Brigade Senate</li>
              </ul>
            </div>
            {/* Hotels */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-yellow-100 max-w-sm w-full">
              <div className="mb-3 text-yellow-600 flex items-center justify-center">
                <span className="bg-yellow-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='7' width='18' height='13' rx='2'/><path d='M16 3v4'/><path d='M8 3v4'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-yellow-700 mb-3 text-center">Hotels</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>The Leela Hotel | Bhartiya City</li>
                <li>Howard Johnson</li>
                <li>Marriott Courtyard</li>
                <li>Taj</li>
                <li>Zuri</li>
                <li>Four Seasons</li>
                <li>Taj Bangalore (Near International Airport)</li>
              </ul>
            </div>
            {/* Malls & Entertainment Parks */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-purple-100 max-w-sm w-full">
              <div className="mb-3 text-purple-600 flex items-center justify-center">
                <span className="bg-purple-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='2' y='7' width='20' height='13' rx='2'/><path d='M16 3v4'/><path d='M8 3v4'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-purple-700 mb-3 text-center">Malls & Entertainment Parks</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Mall of Bengaluru | Bhartiya City</li>
                <li>Esteem Mall</li>
                <li>RMZ Galleria</li>
                <li>Elements Mall</li>
                <li>Orion West</li>
              </ul>
            </div>
            {/* Current and Upcoming Infrastructure */}
            <div className="flex flex-col bg-white/90 rounded-2xl shadow-card p-6 group/feature relative border border-red-100 col-span-1 sm:col-span-2 lg:col-span-3 w-full">
              <div className="mb-3 text-red-600 flex items-center justify-center">
                <span className="bg-red-100 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10'/></svg>
                </span>
              </div>
              <div className="text-xl font-bold text-red-700 mb-3 text-center">Current and Upcoming Infrastructure</div>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li><b>BIAL IT Investment Region (ITIR):</b> 12,000-acres, interest from 55+ multinational IT companies including Infosys, Wipro, TCS, Cognizant.</li>
                <li><b>Bangalore Aerospace SEZ:</b> 950-acre park, 250-acre SEZ, 56+ large/mid-sized companies.</li>
                <li><b>Aerotropolis-Airport City:</b> KIA expansion, Terminal 2 (255,000 sq m), 60M passengers/year, Bangalore International Convention Centre (5 acres).</li>
                <li><b>Global Financial District:</b> Planned near Devanahalli, 150 acres, specialized services for banks, insurance, stock exchanges, etc.</li>
                <li><b>Road Infrastructure:</b> All roads in North Bangalore Thanisandra micro market to be relaid by BBMP, upgradation work scheduled, white-topping for Thanisandra Main Road.</li>
                <li><b>Peripheral Ring Road:</b> PRR bisects the site, 1km frontage, connects all parts of Bangalore, gateway to business/IT districts.</li>
                <li><b>Namma Metro Update:</b> Phase 2B: Route to KIA from KR Puram via Nagawara and Hebbal operational by 2026.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#cf2e2e] rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Experience the Location Advantage
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Schedule a site visit to explore the connectivity and convenience of North Bangalore's most promising location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="relative h-[50px] min-w-[220px] flex items-center justify-center overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-xl px-8 py-5 font-bold"
              onClick={() => setSiteVisitOpen(true)}
            >
              <span className="relative z-10 whitespace-nowrap">Schedule Site Visit</span>
            </button>
            {siteVisitOpen && (
              <ModalPortal>
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeSiteVisitModal} role="dialog" aria-modal="true">
                  <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                      onClick={closeSiteVisitModal}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    {!siteVisitSubmitted ? (
                      <form
                        id="schedule-site-visit-form"
                        className="flex flex-col gap-5"
                        onSubmit={handleSiteVisitSubmit}
                      >
                        <h3 className="text-2xl font-bold mb-2 text-center text-primary">Schedule a Site Visit</h3>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={siteVisitForm.name}
                          onChange={handleSiteVisitChange}
                          required
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={siteVisitForm.phone}
                          onChange={handleSiteVisitChange}
                          required
                          pattern="[0-9]{10,}"
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {siteVisitFormErrors.phone && <span className="text-red-600 text-sm">{siteVisitFormErrors.phone}</span>}
                        <input
                          type="email"
                          name="email"
                          placeholder="Email ID"
                          value={siteVisitForm.email}
                          onChange={handleSiteVisitChange}
                          required
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {siteVisitFormErrors.email && <span className="text-red-600 text-sm">{siteVisitFormErrors.email}</span>}
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={siteVisitForm.consent}
                            onChange={handleSiteVisitChange}
                            required
                            className="accent-primary"
                          />
                          I agree to be contacted regarding my enquiry
                        </label>
                        <input type="hidden" name="formName" value="Schedule Site Visit" />
                        <button
                          type="submit"
                          className="bg-[#CF2E2E] text-white font-bold py-3 rounded-lg hover:bg-[#b82828] transition-colors text-lg mt-2 disabled:opacity-60"
                          disabled={!siteVisitForm.consent}
                        >
                          Schedule Site Visit
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                        <p className="text-gray-700 text-center mb-4">Your site visit request has been received.<br/>We look forward to welcoming you for a personal tour of the property soon!</p>
                        <button
                          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82828]"
                          onClick={closeSiteVisitModal}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ModalPortal>
            )}
            <button
              type="button"
              className="relative h-[50px] min-w-[220px] flex items-center justify-center overflow-hidden border border-[#828281] bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-xl px-8 py-5 font-bold"
              onClick={() => setMapsOpen(true)}
            >
              <span className="relative z-10 whitespace-nowrap">View on Google Maps</span>
            </button>
            {mapsOpen && (
              <ModalPortal>
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2" onClick={closeMapsModal} role="dialog" aria-modal="true">
                  <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-fade-in mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                      onClick={closeMapsModal}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    {!mapsSubmitted ? (
                      <form
                        id="view-on-google-maps-form"
                        className="flex flex-col gap-5"
                        onSubmit={handleMapsSubmit}
                      >
                        <h3 className="text-2xl font-bold mb-2 text-center text-primary">Get Location on WhatsApp</h3>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={mapsForm.name}
                          onChange={handleMapsChange}
                          required
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={mapsForm.phone}
                          onChange={handleMapsChange}
                          required
                          pattern="[0-9]{10,}"
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {mapsFormErrors.phone && <span className="text-red-600 text-sm">{mapsFormErrors.phone}</span>}
                        <input
                          type="email"
                          name="email"
                          placeholder="Email ID"
                          value={mapsForm.email}
                          onChange={handleMapsChange}
                          required
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {mapsFormErrors.email && <span className="text-red-600 text-sm">{mapsFormErrors.email}</span>}
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={mapsForm.consent}
                            onChange={handleMapsChange}
                            required
                            className="accent-primary"
                          />
                          I agree to be contacted regarding my enquiry
                        </label>
                        <input type="hidden" name="formName" value="Get Location on WhatsApp" />
                        <button
                          type="submit"
                          className="bg-[#CF2E2E] text-white font-bold py-3 rounded-lg hover:bg-[#b82828] transition-colors text-lg mt-2 disabled:opacity-60"
                          disabled={!mapsForm.consent}
                        >
                          Get Location on WhatsApp
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                        <p className="text-gray-700 text-center mb-4">Thank you! We will share the location on your WhatsApp shortly.</p>
                        <button
                          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82828]"
                          onClick={closeMapsModal}
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
      </div>
    </section>
  );
};

export default LocationSection;