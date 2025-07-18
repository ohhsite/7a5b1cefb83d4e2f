import { useEffect, useState } from "react";
import { ArrowDown, Star, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";
import heroData from "../data/hero.json";
import configData from "../data/config.json";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Dynamically set CSS variables from config
    const root = document.documentElement;
    Object.entries(configData.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    root.style.setProperty('--font-heading', configData.fonts.heading);
    root.style.setProperty('--font-body', configData.fonts.body);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-32"
      ref={ref}
    >
      {/* Profesjonalne tło bez zdjęć */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Główne tło gradientowe */}
        <div 
          className="absolute inset-0"
          style={{
            background: scrolled 
              ? 'linear-gradient(135deg, var(--color-backgroundLight) 0%, var(--color-background) 50%, var(--color-backgroundDark) 100%)'
              : 'linear-gradient(135deg, var(--color-background) 0%, var(--color-backgroundLight) 50%, var(--color-light) 100%)',
            transition: "all 0.5s ease-out",
          }}
        />

        {/* Abstrakcyjne kształty dekoracyjne */}
        <div 
          className="absolute w-96 h-96 rounded-full top-1/4 left-1/4"
          style={{
            background: `radial-gradient(circle, var(--color-accent) 0%, transparent 70%)`,
            opacity: 0.1,
            filter: 'blur(60px)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotate(15deg)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bottom-1/4 right-1/3"
          style={{
            background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
            opacity: 0.15,
            filter: 'blur(50px)',
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) rotate(-20deg)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        
        {/* Dodatkowe dekoracyjne elementy */}
        <div 
          className="absolute w-64 h-64 rounded-full top-1/3 right-1/4"
          style={{
            background: `linear-gradient(45deg, var(--color-secondary) 0%, transparent 60%)`,
            opacity: 0.08,
            filter: 'blur(40px)',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.4}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />

        {/* Geometryczne wzory */}
        <div 
          className="absolute top-1/2 left-1/2 w-32 h-32 border-2 rounded-full"
          style={{
            borderColor: "var(--color-accent)",
            opacity: 0.1,
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) rotate(${mousePosition.x}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center md:items-start">
        <div className="md:max-w-4xl lg:max-w-5xl w-full">
          {/* Badge/Tagline */}
          <div
            className={`inline-flex items-center text-white font-medium text-lg md:text-xl mb-6 px-6 py-3 rounded-full transition-all duration-1000 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
            style={{ 
              backgroundColor: "var(--color-primary)",
              border: `1px solid var(--color-primaryLight)`
            }}
          >
            <div 
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: "var(--color-accent)" }}
            ></div>
            Licencjonowany psycholog kliniczny
          </div>

          {/* Główna karta - dostosowana do jasnego tła */}
          <div 
            className={`bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl transition-all duration-1000 w-full shadow-2xl border border-gray-100 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Imię i tytuł terapeuty */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ 
                fontFamily: "var(--font-heading)",
                color: "var(--color-textPrimary)"
              }}
            >
              <span className="block md:inline">{configData.therapist.name}</span>
              <span 
                className="text-3xl md:text-4xl lg:text-5xl mt-2 block"
                style={{ color: "var(--color-textSecondary)" }}
              >
                {configData.therapist.title}
              </span>
            </h1>

            {/* Headline z JSON */}
            <h2 
              className={`text-2xl md:text-3xl font-bold mb-4 leading-tight transition-all duration-1000 delay-200 ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: "var(--color-primary)",
                fontFamily: "var(--font-heading)"
              }}
            >
              {heroData.headline}
            </h2>

            {/* Subheadline z JSON */}
            <p
              className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-1000 delay-300 ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                fontFamily: "var(--font-body)",
                color: "var(--color-textSecondary)"
              }}
            >
              {heroData.subheadline}
            </p>

            {/* Info-boxy rozszerzone */}
            <div className={`flex flex-wrap justify-center md:justify-start gap-4 mb-8 transition-all duration-1000 delay-400 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}>
              <div 
                className="flex items-center px-4 py-3 rounded-xl border"
                style={{ 
                  backgroundColor: "var(--color-backgroundLight)",
                  borderColor: "var(--color-primaryLight)"
                }}
              >
                <Star style={{ color: "#facc15" }} className="mr-3" size={20} />
                <span style={{ color: "var(--color-textPrimary)" }} className="font-medium">500+ zadowolonych pacjentów</span>
              </div>

              <div 
                className="flex items-center px-4 py-3 rounded-xl border"
                style={{ 
                  backgroundColor: "var(--color-backgroundLight)",
                  borderColor: "var(--color-accentLight)"
                }}
              >
                <Calendar style={{ color: "var(--color-primary)" }} className="mr-3" size={20} />
                <span style={{ color: "var(--color-textPrimary)" }} className="font-medium">Pierwsze spotkanie w ciągu 7 dni</span>
              </div>

              <div 
                className="flex items-center px-4 py-3 rounded-xl border"
                style={{ 
                  backgroundColor: "var(--color-backgroundLight)",
                  borderColor: "var(--color-secondaryLight)"
                }}
              >
                <CheckCircle style={{ color: "var(--color-accent)" }} className="mr-3" size={20} />
                <span style={{ color: "var(--color-textPrimary)" }} className="font-medium">10+ lat doświadczenia</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-4 mb-6 transition-all duration-1000 delay-500 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}>
              <Link
                to="contact"
                smooth={true}
                duration={800}
                className="text-lg px-8 py-4 font-semibold inline-block cursor-pointer transition-all duration-300 
                  relative overflow-hidden group hover:shadow-xl rounded-xl text-white hover:-translate-y-1"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <span className="relative z-10">{heroData.ctaText}</span>
                <span 
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-primaryLight)" }}
                ></span>
              </Link>

              <Link
                to="about"
                smooth={true}
                duration={800}
                className="text-lg px-8 py-4 font-semibold inline-block cursor-pointer transition-all duration-300 
                  bg-transparent rounded-xl hover:-translate-y-1 border-2"
                style={{ 
                  color: "var(--color-primary)",
                  borderColor: "var(--color-primary)"
                }}
              >
                Poznaj mnie
              </Link>
            </div>

            {/* Trust indicators */}
            <div className={`flex flex-wrap gap-6 transition-all duration-1000 delay-600 ${
              inView ? "opacity-100" : "opacity-0"
            }`}>
              <div className="flex items-center">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span style={{ color: "var(--color-textSecondary)" }}>Certyfikowany terapeuta CBT</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span style={{ color: "var(--color-textSecondary)" }}>Konsultacje w {configData.therapist.cityName} i online</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span style={{ color: "var(--color-textSecondary)" }}>Pełna dyskrecja</span>
              </div>
            </div>
          </div>

          {/* Statystyki i usługi - dostosowane do jasnego tła */}
          <div className={`grid md:grid-cols-2 gap-6 mt-8 transition-all duration-1000 delay-700 ${
            inView ? "opacity-100" : "opacity-0 translate-y-8"
          }`}>

           
          </div>

          {/* Godziny pracy - dostosowane */}
          <div className={`mt-6 transition-all duration-1000 delay-800 ${
            inView ? "opacity-100" : "opacity-0"
          }`}>
            <div 
              className="inline-flex items-center px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: "var(--color-backgroundLight)",
                borderColor: "var(--color-primaryLight)"
              }}
            >
              <Calendar className="mr-2" size={18} style={{ color: "var(--color-primary)" }} />
              <span style={{ color: "var(--color-textSecondary)" }}>{configData.therapist.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strzałka - dostosowana do jasnego tła */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link 
          to="about" 
          smooth={true} 
          duration={800} 
          aria-label="Przewiń w dół"
        >
          <div 
            className="p-3 rounded-full transition-all hover:shadow-lg"
            style={{ 
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)"
            }}
          >
            <ArrowDown size={24} />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;