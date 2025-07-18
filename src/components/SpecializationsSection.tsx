import { useInView } from "react-intersection-observer";
import { Brain, Shield, Users, Heart, Flame } from "lucide-react";
import specializationsData from "../data/specializations.json";
import configData from "../data/config.json";
import { ConfigData, SpecializationData } from "../../types";

// Rzutowanie danych
const typedConfigData = configData as ConfigData;
const typedSpecializationsData = specializationsData as SpecializationData;

const SpecializationsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Brain: <Brain size={36} className="text-theme-primary" />,
      Shield: <Shield size={36} className="text-theme-primary" />,
      Users: <Users size={36} className="text-theme-primary" />,
      Heart: <Heart size={36} className="text-theme-primary" />,
      Flame: <Flame size={36} className="text-theme-primary" />
    };
    return icons[iconName] || <Brain size={36} className="text-theme-primary" />;
  };

  const specializations = Array.isArray(typedSpecializationsData.specializations)
    ? [...typedSpecializationsData.specializations].sort((a, b) => a.order - b.order)
    : [];

  // Jeśli nie ma specjalizacji, tytułu ani podtytułu – nie pokazuj sekcji wcale
  const noContent = specializations.length === 0 && 
    !typedSpecializationsData.title && 
    !typedSpecializationsData.subtitle;

  if (noContent) return null;

  return (
    <section id="specializations" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {(typedSpecializationsData.title || typedSpecializationsData.subtitle) && (
          <div className="text-center mb-16">
            {typedSpecializationsData.title && (
              <h2 className="section-title">{typedSpecializationsData.title}</h2>
            )}
            {typedSpecializationsData.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {typedSpecializationsData.subtitle}
              </p>
            )}
          </div>
        )}

        {specializations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((specialization, index) => (
            <div
              key={specialization.id || index}
              className={`card-shadow p-8 rounded-lg card-hover transition-all duration-700 delay-${index * 100} ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto bg-theme-primary-50"
              >
                {getIcon(specialization.icon)}
              </div>

              <h3 className="text-xl font-bold mb-4 text-center">{specialization.title}</h3>
              <p className="text-gray-600 text-center">{specialization.description}</p>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecializationsSection;
