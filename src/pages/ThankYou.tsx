import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle } from "lucide-react";
import heroImage from "@/assets/nikoo-hero.png";

const ThankYou = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Thank You!
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
            Your request has been submitted successfully. Our team will get back to you soon with more information about Nikoo Garden Estates.
          </p>
          
          {/* Return to Home Button */}
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-[#CF2E2E] hover:bg-[#b82828] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Button>
          </Link>
          
          {/* Additional Info */}
          <p className="text-sm text-gray-300 mt-8">
            If you have any immediate questions, feel free to call us at{" "}
            <a href="tel:+919876543210" className="text-white font-semibold hover:underline">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
