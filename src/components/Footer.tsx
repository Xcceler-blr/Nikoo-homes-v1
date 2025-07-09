import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#3b3b3b] text-white py-10 px-4">
      <div className="max-w-3xl mx-auto text-center text-sm leading-relaxed">
        <strong>Marketed by authorized channel partner</strong><br />
        Disclaimer : The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purposes only. This is the official website of authorized marketing partner. We may share data with RERA registered brokers/companies for further processing. We may also send updates to the mobile number/email id registered with us. All Rights Reserved.
        AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148
      </div>
    </footer>
  );
};

export default Footer;

