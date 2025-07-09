import HeroSection from "@/components/HeroSection";
import WhyNikooSection from "@/components/WhyNikooSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import UnitPlansSection from "@/components/UnitPlansSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import React, { useEffect, useRef } from "react";

const Index = () => {
  const sections = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const reveal = () => {
      sections.forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          ref.current.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, [sections]);

  return (
    <div className="min-h-screen">
      <div ref={sections[0]} className="fade-up"><HeroSection /></div>
      <div ref={sections[1]} className="fade-up"><WhyNikooSection /></div>
      <div ref={sections[2]} className="fade-up"><AmenitiesSection /></div>
      <div ref={sections[3]} className="fade-up"><UnitPlansSection /></div>
      <div ref={sections[4]} className="fade-up"><LocationSection /></div>
      <div ref={sections[5]} className="fade-up"><Footer /></div>
    </div>
  );
};

export default Index;
