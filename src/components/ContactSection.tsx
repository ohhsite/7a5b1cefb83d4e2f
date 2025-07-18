import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Calendar, Send } from "lucide-react";
import contactData from "../data/contact.json";
import configData from "../data/config.json";
import { ConfigData, ContactData } from "../../types";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

// Rzutowanie danych
const typedConfigData = configData as ConfigData;
const typedContactData = contactData as ContactData;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    gdprConsent: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { primary, accent, backgroundLight, white } = typedConfigData.colors;
  const [touchRipple, setTouchRipple] = useState({ active: false, x: 0, y: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(true);
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, gdprConsent: checked }));
    setFormTouched(true);
    if (formErrors.gdprConsent) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.gdprConsent;
        return newErrors;
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTouchRipple({
      active: true,
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    });
    setTimeout(() => setTouchRipple(prev => ({ ...prev, active: false })), 500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Imię jest wymagane";
    if (!formData.message.trim()) errors.message = "Wiadomość jest wymagana";
    if (!formData.gdprConsent) errors.gdprConsent = "Musisz wyrazić zgodę na przetwarzanie danych";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        toast({
          title: "Wiadomość wysłana",
          description: "Dziękujemy za kontakt. Odezwiemy się wkrótce.",
        });
        setFormData({ name: '', subject: '', message: '', gdprConsent: false });
        setFormTouched(false);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setFormErrors(errors);
    }
  };

  const [particles, setParticles] = useState<{ x: number, y: number, size: number, speed: number }[]>([]);
  useEffect(() => {
    if (inView) {
      const newParticles = Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    }
  }, [inView]);

  useEffect(() => {
    if (!inView || particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, y: (p.y + p.speed) % 100 })));
    }, 50);
    return () => clearInterval(interval);
  }, [inView, particles]);

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(to top, ${backgroundLight}, ${white})` }}>
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`,
            background: `${primary}20`
          }}></div>
        ))}
      </div>

      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">{typedContactData.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typedContactData.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div className={`transition-all duration-700 delay-100 ${inView ? "opacity-100" : "opacity-0 translate-x-8"}`}>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border relative overflow-hidden" onTouchStart={handleTouchStart}>
              {touchRipple.active && (
                <div className="absolute rounded-full animate-ripple" style={{
                  left: touchRipple.x, top: touchRipple.y,
                  width: '200px', height: '200px',
                  transform: 'translate(-50%, -50%)',
                  background: `${primary}10`
                }}></div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-700">{typedContactData.formFields.name.label}</label>
                  <Input id="name" name="name" placeholder={typedContactData.formFields.name.placeholder} value={formData.name} onChange={handleChange}
                    className={`transition-all duration-300 ${formErrors.name ? "border-red-500" : formTouched && formData.name ? "border-green-500" : ""}`}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-gray-700">{typedContactData.formFields.subject.label}</label>
                  <Input id="subject" name="subject" placeholder={typedContactData.formFields.subject.placeholder} value={formData.subject} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-gray-700">{typedContactData.formFields.message.label}</label>
                <Textarea id="message" name="message" placeholder={typedContactData.formFields.message.placeholder} rows={5} value={formData.message} onChange={handleChange}
                  className={`transition-all duration-300 ${formErrors.message ? "border-red-500" : formTouched && formData.message ? "border-green-500" : ""}`}
                />
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <Checkbox id="gdpr" checked={formData.gdprConsent} onCheckedChange={handleCheckboxChange} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="gdpr" className="text-gray-600">{typedContactData.formFields.gdprCheckbox.label}</label>
                  {formErrors.gdprConsent && <p className="text-red-500 text-sm mt-1">{formErrors.gdprConsent}</p>}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full group relative overflow-hidden" style={{ backgroundColor: primary }}>
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? "Wysyłanie..." : typedContactData.submitButton}
                  <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: `${primary}20` }}></span>
              </Button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100" : "opacity-0 translate-x-8"}`}>
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 mb-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Dane kontaktowe</h3>
              <div className="space-y-6">
                <ContactInfo icon={MapPin} label="Adres" value={typedConfigData.therapist.address} color={primary} />
                <ContactInfo icon={Phone} label="Telefon" value={typedConfigData.therapist.phone} color={primary} link={`tel:${typedConfigData.therapist.phone}`} />
                <ContactInfo icon={Mail} label="Email" value={typedConfigData.therapist.email} color={primary} link={`mailto:${typedConfigData.therapist.email}`} />
                <ContactInfo icon={Calendar} label="Godziny pracy" value={typedConfigData.therapist.workingHours} color={primary} />
              </div>

              <div className="mt-8">
                <a href={typedContactData.calendlyLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full text-white py-3 px-6 rounded-md transition-colors group"
                  style={{ backgroundColor: accent }}>
                  <Calendar className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                  {typedContactData.appointmentButtonText}
                </a>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72 relative transform hover:scale-[1.02] transition-transform duration-300">
              <iframe title="Mapa lokalizacji gabinetu" width="100%" height="100%" style={{ border: 0 }}
                src={typedContactData.mapEmbedUrl || `https://www.google.com/maps/embed/v1/place?key=API_KEY&q=${encodeURIComponent(typedConfigData.therapist.address)}`}
                allowFullScreen></iframe>
              <div className="absolute inset-0 border-4 border-white pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component do wyświetlania informacji kontaktowej
const ContactInfo = ({ icon: Icon, label, value, color, link }: { icon: any, label: string, value: string, color: string, link?: string }) => (
  <div className="flex items-start group">
    <div className="p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors" style={{ background: `${color}10` }}>
      <Icon style={{ color }} size={24} />
    </div>
    <div>
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      {link ? (
        <a href={link} className="text-gray-600 hover:text-primary transition-colors">{value}</a>
      ) : (
        <p className="text-gray-600">{value}</p>
      )}
    </div>
  </div>
);

export default ContactSection;
