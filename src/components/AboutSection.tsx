import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";
import aboutData from "../data/about.json";
import configData from "../data/config.json";
import { ConfigData, AboutData } from "../../types";

const typedConfigData = configData as ConfigData;
const typedAboutData = aboutData as AboutData;

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { primary, secondary, accent, backgroundLight, white, black } = typedConfigData.colors;
  
  // Dane z config.json mają priorytet nad about.json
  const name = typedConfigData.therapist.name || typedAboutData.name;
  const credentials = typedConfigData.therapist.title || typedAboutData.credentials;
  
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (inView) {
      paragraphRefs.current.forEach((paragraph, index) => {
        if (paragraph) {
          setTimeout(() => {
            paragraph.classList.add("opacity-100");
            paragraph.classList.remove("opacity-0", "translate-y-4");
          }, 300 * index);
        }
      });
    }
  }, [inView]);

  const getBadgeColor = (index: number) => 
    index === 0 ? primary : index === 1 ? accent : secondary;

  const handleBadgeHover = (e: React.MouseEvent<HTMLDivElement>, color: string, isHover: boolean) => {
    e.currentTarget.style.background = isHover ? color : `${color}10`;
    e.currentTarget.style.color = isHover ? white : color;
  };

  return (
    <section
      id="about"
      style={{
        background: `linear-gradient(to bottom, ${backgroundLight}, ${white})`,
        paddingTop: "8rem"
      }}
      className="section-padding"
      ref={ref}
    >
      {/* SEO Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": name,
          "jobTitle": credentials,
          "description": typedAboutData.description[0],
          "image": typedAboutData.imageUrl,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": typedConfigData.location.city,
            "streetAddress": typedConfigData.location.address
          },
          "telephone": typedConfigData.therapist.phone,
          "email": typedConfigData.therapist.email
        })}
      </script>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Zdjęcie z efektami */}
          <div className={`w-full lg:w-5/12 transition-all duration-1000 ${
            inView ? "opacity-100" : "opacity-0 -translate-x-8"
          }`}>
            <div className="relative perspective-1000">
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:rotate-y-5 hover:scale-105">
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: `linear-gradient(to top, ${black}60, transparent)` }}
                />
                <img
                  src={typedAboutData.imageUrl}
                  alt={typedAboutData.imageAlt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Karta z danymi */}
              <div
                className="absolute -bottom-6 right-4 p-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: white }}
              >
                <div className="flex items-center">
                  <div
                    className="rounded-full p-3 mr-3"
                    style={{ background: `${primary}10` }}
                  >
                    <User style={{ color: primary }} size={24} />
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold">{name}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {credentials}
                    </p>
                  </div>
                </div>
              </div>

              {/* Efekty świetlne */}
              <div
                className="absolute -z-10 -top-5 -left-5 w-24 h-24 rounded-full blur-xl"
                style={{ background: `${primary}20` }}
              />
              <div
                className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
                style={{ background: `${accent}20` }}
              />
            </div>
          </div>

          {/* Treść */}
          <div className={`w-full lg:w-7/12 transition-all duration-1000 delay-300 ${
            inView ? "opacity-100" : "opacity-0 translate-x-8"
          }`}>
            <header>
              <h2 className="section-title mb-8 relative">
                {typedAboutData.title}
                <span
                  className="absolute -z-10 left-0 bottom-0 w-16 h-8 blur-lg"
                  style={{ background: `${accent}20` }}
                />
              </h2>
            </header>

            <div className="prose prose-lg max-w-none mt-6">
              {typedAboutData.description.map((paragraph, index) => (
                <p
                  key={index}
                  ref={el => paragraphRefs.current[index] = el}
                  className="mb-6 opacity-0 translate-y-4 transition-all duration-500"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Odznaki */}
            <div className="mt-10 flex flex-wrap gap-4">
              {typedAboutData.badges.map((badge, index) => {
                const badgeColor = getBadgeColor(index);
                return (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
                    style={{ background: `${badgeColor}10`, color: badgeColor }}
                    onMouseOver={(e) => handleBadgeHover(e, badgeColor, true)}
                    onMouseOut={(e) => handleBadgeHover(e, badgeColor, false)}
                  >
                    {badge}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;