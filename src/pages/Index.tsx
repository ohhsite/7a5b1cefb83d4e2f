import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SpecializationsSection from "../components/SpecializationsSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import configData from "../data/config.json";

const Index = () => {
  // Inicjalizuj system kolorów z config.json
  useTheme();
  
  useEffect(() => {
    document.title = `${configData.siteName} - Profesjonalna pomoc psychologiczna w ${configData.therapist.cityName}`;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SpecializationsSection />
        <ProcessSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />        
        <ContactSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
