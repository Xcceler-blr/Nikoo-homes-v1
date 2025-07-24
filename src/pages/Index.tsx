import HeroSection from "@/components/HeroSection";
import WhyNikooSection from "@/components/WhyNikooSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import UnitPlansSection from "@/components/UnitPlansSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import React, { useEffect, useRef, useState } from "react";

const Index = () => {
  const sections = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    document.title = "Live Smart at Bhartiya City Nikoo Homes Sadahalli | 2 & 3 BHK";
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = "Explore Bhartiya City Nikoo Homes Sadahalli for premium 2 & 3 BHK apartments with top-class amenities in North Bangalore. Book your dream home today!";
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }

    // Schema Markup Injection
    const schemaId = 'nikoo-schema-ld-json';
    let schemaTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schemaTag) {
      schemaTag.remove();
    }
    schemaTag = document.createElement('script') as HTMLScriptElement;
    schemaTag.type = 'application/ld+json';
    schemaTag.id = schemaId;
    schemaTag.text = `[
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Bhartiya City",
        "description": "Premier real estate developer in Bangalore specializing in luxury residential projects and sustainable urban development",
        "url": "https://www.nikoogardensestate.com/",
        "logo": "https://www.nikoogardensestate.com/assets/nikoo-hero-BWy1I2Nv.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Nikoo Garden Estate",
        "description": "Premium luxury residential township spread across 29 acres in Sadahalli, North Bangalore, offering 1, 2, 3, and 4 BHK apartments, villas, and row houses with world-class amenities",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Navarathna Agrahara Road, Sadahalli",
          "addressLocality": "Devanahalli",
          "addressRegion": "Karnataka",
          "postalCode": "562110",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.2846",
          "longitude": "77.6047"
        },
        "image": "https://www.nikoogardensestate.com/assets/nikoo-hero-BWy1I2Nv.png",
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Swimming Pool",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification", 
            "name": "Gymnasium",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Clubhouse",
            "value": "60,000 sq ft"
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Children's Play Area",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Landscaped Gardens",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "24/7 Security",
            "value": true
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ResidentialComplex",
        "name": "Nikoo Garden Estate Sadahalli",
        "description": "Luxury residential complex with premium apartments and villas in North Bangalore near Kempegowda International Airport",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sadahalli",
          "addressLocality": "Devanahalli", 
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "numberOfRooms": "1800+",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "29",
          "unitCode": "ACR"
        },
        "numberOfBedrooms": "1 to 4 BHK configurations",
        "petsAllowed": false,
        "smokingAllowed": false
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Nikoo Garden Estate Apartments",
        "description": "Premium 1, 2, 3 and 4 BHK apartments in Bangalore with modern amenities, landscaped gardens, and excellent connectivity to airport and IT hubs",
        "brand": {
          "@type": "Brand",
          "name": "Bhartiya City Nikoo Homes"
        },
        "image": "https://www.nikoogardensestate.com/assets/nikoo-hero-BWy1I2Nv.png",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "4900000",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "4900000",
            "maxPrice": "25000000",
            "priceCurrency": "INR"
          },
          "availability": "https://schema.org/PreOrder",
          "validFrom": "2024-01-01",
          "priceValidUntil": "2025-12-31"
        },
        "category": "Real Estate",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Type",
            "value": "Residential Apartments"
          },
          {
            "@type": "PropertyValue", 
            "name": "Project Status",
            "value": "Pre-Launch"
          },
          {
            "@type": "PropertyValue",
            "name": "Possession Date", 
            "value": "2029 Onwards"
          },
          {
            "@type": "PropertyValue",
            "name": "RERA Registration",
            "value": "In Process"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": "https://www.nikoogardensestate.com/assets/nikoo-hero-BWy1I2Nv.png",
        "name": "Nikoo Garden Estate Bangalore",
        "description": "Aerial view of Nikoo Garden Estate luxury residential project in Sadahalli, Bangalore showing modern towers and landscaped gardens",
        "caption": "Premium residential complex with world-class amenities in North Bangalore",
        "creditText": "Bhartiya City",
        "copyrightHolder": {
          "@type": "Organization",
          "name": "Bhartiya City"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the location of Nikoo Garden Estate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nikoo Garden Estate is located in Sadahalli, Devanahalli, North Bangalore, just minutes away from Kempegowda International Airport."
            }
          },
          {
            "@type": "Question", 
            "name": "What apartment configurations are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nikoo Garden Estate offers studio, 1 BHK, 2 BHK, 3 BHK, and 4 BHK apartments, along with premium villas and row houses."
            }
          },
          {
            "@type": "Question",
            "name": "What are the key amenities provided?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "The project features a 60,000 sq ft clubhouse, swimming pool, gymnasium, landscaped gardens, children's play area, meditation pods, and 24/7 security."
            }
          },
          {
            "@type": "Question",
            "name": "When is the expected possession date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The expected possession for Nikoo Garden Estate is 2029 onwards, with RERA registration currently in process."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Apartment", 
        "name": "Luxury Apartments at Nikoo Garden Estate",
        "description": "Spacious and well-designed apartments with modern amenities in a gated community near Bangalore Airport",
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": "500",
          "maxValue": "2500", 
          "unitCode": "FTK"
        },
        "numberOfRooms": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 4
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sadahalli",
          "addressLocality": "Devanahalli",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "amenityFeature": [
          "Air Conditioning",
          "Balcony", 
          "Modular Kitchen",
          "Vitrified Tiles",
          "Premium Fixtures"
        ]
      }
    ]`;
    document.head.appendChild(schemaTag);
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      if (sections[1].current) {
        const rect = sections[1].current.getBoundingClientRect();
        setShowGoToTop(rect.top < 0); // Show if scrolled past second section
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div ref={sections[0]} className="fade-up"><HeroSection /></div>
      <div ref={sections[1]} className="fade-up"><WhyNikooSection /></div>
      <div ref={sections[2]} className="fade-up"><AmenitiesSection /></div>
      <div ref={sections[3]} className="fade-up"><UnitPlansSection /></div>
      <div ref={sections[4]} className="fade-up"><LocationSection /></div>
      <div ref={sections[5]} className="fade-up"><Footer /></div>
      {showGoToTop && (
        <button
          onClick={handleGoToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#CF2E2E] text-white p-3 rounded-full shadow-lg hover:bg-[#b82828] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CF2E2E] animate-fade-in"
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 go-to-top-animate" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
};

export default Index;
