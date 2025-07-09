import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import masterPlanImage from "@/assets/Masterplan-01.png";
import meditationGardenImg from "@/assets/yoga-garden.png";
import reflexologyPathImg from "@/assets/Reflexology-Path.png";
import gardenOfLeisureImg from "@/assets/Garden of Leisure.png";
import gardenOfHopeImg from "@/assets/Garden of Hope.png";
import butterflyGardenImg from "@/assets/_Butterfly Garden.png";
import gardenOfWildernessImg from "@/assets/Garden of Wilderness.png";
import gardenOfWonderImg from "@/assets/Garden of Wonder.png";
import textureFlowerGardenImg from "@/assets/Texture Flower Garden.png";
import lawnTennisImg from "@/assets/Lawn Tennis.png";
import cricketNetImg from "@/assets/_Cricket Net.png";
import childrensPlayAreaImg from "@/assets/Children's Play Area.png";
import dogParkImg from "@/assets/Dog Park.png";
import amphitheatreImg from "@/assets/_Amphitheatre.png";
import celebrationLawnImg from "@/assets/Celebration Lawn.png";
import bbqPitImg from "@/assets/BBQ Pit.png";
import outdoorDiningImg from "@/assets/_Outdoor Dining Area.png";
import boardwalkImg from "@/assets/Boardwalk.png";
import centralPedestrianImg from "@/assets/Central Pedestrian Friendly.png";
import visitorsCarParkingImg from "@/assets/Visitor's Car Parking Spaces.png";
import busDropoffImg from "@/assets/Bus Dropoff.png";
import { ModalPortal } from "./ModalPortal";

const amenities = [
  {
    name: "Meditation Garden",
    desc: "A peaceful garden for meditation and relaxation.",
    map: { x: 82, y: 92 },
    image: meditationGardenImg
  },
  {
    name: "Reflexology Path",
    desc: "A path designed for foot therapy.",
    map: { x: 80, y: 85 },
    image: reflexologyPathImg
  },
  {
    name: "Garden of Leisure",
    desc: "A relaxing leisure garden.",
    map: { x: 95, y: 10 },
    image: gardenOfLeisureImg
  },
  {
    name: "Garden of Hope",
    desc: "A garden symbolizing hope.",
    map: { x: 85, y: 80 },
    image: gardenOfHopeImg
  },
  {
    name: "Butterfly Garden",
    desc: "A vibrant garden filled with butterflies and flowers.",
    map: { x: 30, y: 95 },
    image: butterflyGardenImg
  },
  {
    name: "Garden of Wilderness",
    desc: "A wild, natural garden.",
    map: { x: 20, y: 90 },
    image: gardenOfWildernessImg
  },
  {
    name: "Garden of Wonder",
    desc: "A garden to inspire wonder.",
    map: { x: 10, y: 10 },
    image: gardenOfWonderImg
  },
  {
    name: "Tiered Sensory and Texture Flower Garden",
    desc: "A multi-sensory flower garden.",
    map: { x: 15, y: 20 },
    image: textureFlowerGardenImg
  },
  {
    name: "Lawn Tennis, Multipurpose Court",
    desc: "State-of-the-art tennis and multipurpose court.",
    map: { x: 92, y: 40 },
    image: lawnTennisImg
  },
  {
    name: "Cricket Net",
    desc: "Practice cricket nets.",
    map: { x: 90, y: 50 },
    image: cricketNetImg
  },
  {
    name: "Children's Play Area",
    desc: "A fun play area for children.",
    map: { x: 95, y: 60 },
    image: childrensPlayAreaImg
  },
  {
    name: "Dog Park",
    desc: "A park for your furry friends.",
    map: { x: 98, y: 20 },
    image: dogParkImg
  },
  {
    name: "Amphitheatre",
    desc: "An open-air venue for performances.",
    map: { x: 80, y: 75 },
    image: amphitheatreImg
  },
  {
    name: "Celebration Lawn",
    desc: "A lawn for celebrations and gatherings.",
    map: { x: 90, y: 70 },
    image: celebrationLawnImg
  },
  {
    name: "BBQ Pit",
    desc: "Outdoor barbecue area.",
    map: { x: 85, y: 60 },
    image: bbqPitImg
  },
  {
    name: "Outdoor Dining Area",
    desc: "Al fresco dining space.",
    map: { x: 80, y: 65 },
    image: outdoorDiningImg
  },
  {
    name: "Boardwalk",
    desc: "A scenic boardwalk.",
    map: { x: 98, y: 5 },
    image: boardwalkImg
  },
  {
    name: "Central Pedestrian Friendly Route with Pop-up Activities",
    desc: "A central pedestrian route.",
    map: { x: 10, y: 50 },
    image: centralPedestrianImg
  },
  {
    name: "Visitor's Car Parking Spaces",
    desc: "Parking for visitors.",
    map: { x: 50, y: 5 },
    image: visitorsCarParkingImg
  },
  {
    name: "Bus Dropoff",
    desc: "Bus dropoff point.",
    map: { x: 95, y: 2 },
    image: busDropoffImg
  }
];

const AmenitiesSection = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [hoveredAmenity, setHoveredAmenity] = useState(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeDGka2PeJFaPp7z0NrndXt8rvuJwNxzi6ffllVgO8SyQfWtg/formResponse";
    const ENTRY_IDS = {
      name: "entry.1338687725",
      phone: "entry.1492404407",
      email: "entry.1765571584",
      formName: "entry.1294608166",
      consent: "entry.182177265",
    };
    const formData = new FormData();
    formData.append(ENTRY_IDS.name, form.name);
    formData.append(ENTRY_IDS.phone, form.phone);
    formData.append(ENTRY_IDS.email, form.email);
    formData.append(ENTRY_IDS.formName, "Amenities Visit Scheduler");
    if (form.consent) {
      formData.append(ENTRY_IDS.consent, "I agree to be contacted regarding my enquiry");
    }
    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (error) {}
    setSubmitted(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
    setForm({ name: "", phone: "", email: "", consent: false });
  };

  return (
    <section className="min-h-screen bg-gradient-subtle pt-12 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-primary border-primary/30 px-4 py-2 mb-4 bg-white/80 backdrop-blur-md">
            World-Class Amenities
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight drop-shadow-lg">
            Discover <span className="bg-gradient-premium bg-clip-text text-transparent">Extraordinary</span> Living
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            20+ thoughtfully planned amenities for every member of your family
          </p>
        </div>
        {/* Main Content Grid */}
        {/* CTA Button - now below the left amenities list */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Scrollable Amenities List + CTA */}
          <div>
            <div className="relative max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md rounded-t-2xl shadow-md px-6 py-4 mb-4 border-b border-border">
                <h3 className="text-2xl font-bold text-primary tracking-wide text-center">Explore Amenities</h3>
              </div>
              <div className="space-y-6 bg-white/80 rounded-2xl shadow-xl px-4 pb-6 pt-2">
                {amenities.map((am, i) => (
                  <div
                    key={am.name}
                    className={`group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/10 shadow-card cursor-pointer transition-all duration-300 border border-transparent hover:border-primary/40 hover:shadow-lg ${selectedAmenity === am.name ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedAmenity(am.name)}
                    onMouseEnter={() => setHoveredAmenity(am.name)}
                    onMouseLeave={() => setHoveredAmenity(null)}
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      <img src={am.image} alt={am.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {am.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {am.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-20 mb-8">
              <button
                type="button"
                className="relative h-[50px] min-w-[200px] flex items-center justify-center overflow-hidden border border-[#828281] bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4 text-xl px-10 py-5 font-bold"
                onClick={() => setOpen(true)}
              >
                <span className="relative z-10 whitespace-nowrap">Schedule Visit</span>
              </button>
            </div>
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
                    {!submitted ? (
                      <form
                        id="amenities-visit-scheduler-form"
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
                        <input
                          type="email"
                          name="email"
                          placeholder="Email ID"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input type="hidden" name="formName" value="Amenities Visit Scheduler" />
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
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                        <p className="text-gray-700 text-center">Your request for a visit has been received.<br/>Our team will reach out to you soon to confirm your visit to the amenities!</p>
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
          {/* Right Side - Interactive Map */}
          <div className="lg:sticky lg:top-8">
            <div className="p-6 shadow-luxury rounded-3xl bg-white/90">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Property Master Plan
              </h3>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-card">
                  <img
                    src={masterPlanImage}
                    alt="Property Master Plan"
                    className="w-full max-h-[500px] object-contain"
                  />
                  {/* Amenity Markers */}
                  {amenities.map((am, i) => (
                    <button
                      key={am.name}
                      className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selectedAmenity === am.name || hoveredAmenity === am.name ? 'bg-primary scale-150 animate-pulse' : 'bg-accent hover:bg-primary hover:scale-125'}`}
                      style={{ left: `${am.map.x}%`, top: `${am.map.y}%` }}
                      onClick={() => setSelectedAmenity(am.name)}
                      title={am.name}
                    />
                  ))}
                </div>
                {/* Selected Amenity Details */}
                {selectedAmenity && (
                  <div className="mt-6 animate-fade-in">
                    {(() => {
                      const am = amenities.find(a => a.name === selectedAmenity);
                      if (!am) return null;
                      return (
                        <div className="p-4 bg-card border-primary/20 rounded-xl flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0">
                            <img src={am.image} alt={am.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground mb-1">
                              {am.name}
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {am.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Click on the markers to explore each amenity in detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;