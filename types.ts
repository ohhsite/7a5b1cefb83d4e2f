// types.ts
export interface ConfigData {
    siteName: string;
    siteDescription: string;
    therapist: {
      name: string;
      title: string;
      email: string;
      phone: string;
      address: string;
      workingHours: string;
    };
    location: {
      city: string;
      address: string;
      mapUrl: string;
    };
    colors: {
      primary: string;
      primaryLight: string;
      secondary: string;
      secondaryLight: string;
      accent: string;
      accentLight: string;
      dark: string;
      light: string;
      white: string;
      black: string;
      textPrimary: string;
      textSecondary: string;
      background: string;
      backgroundLight: string;
      backgroundDark: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    social: {
      facebook: string;
      instagram: string;
      linkedin: string;
    };
    metadata: {
      title: string;
      description: string;
      keywords: string;
    };
    crisisHelp: {
      phoneNumber: string;
      availabilityText: string;
    };
  }
  
  export interface AboutData {
    title: string;
    name: string;
    credentials: string;
    imageUrl: string;
    imageAlt: string;
    description: string[];
    badges: string[];
  }
  
  export interface SpecializationItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
  }

  export interface SpecializationData {
    title: string;
    subtitle: string;
    specializations: SpecializationItem[];
  }
  
  // Definicja typu dla usługi
  export interface PricingService {
    id: string;
    title: string;
    price: number;
    currency: string;
    duration: number;
    durationUnit: string;
    description?: string;
  }
  
  // Główny interfejs PricingData
  export interface PricingData {
    title: string;
    subtitle: string;
    services: PricingService[];
    paymentMethods: string[];
    notes: string[];
  }
  
  export interface FaqData {
    title: string;
    subtitle: string;
    questions: {
      id: string;
      question: string;
      answer: string;
    }[];
  }
  
  export interface TestimonialData {
    title: string;
    description: string;
    googleMapsLink: string;
    showRating: boolean;
    testimonials: {
      id: string;
      name: string;
      rating: number;
      text: string;
    }[];
  }
  
  export interface BlogData {
    title: string;
    description: string;
    readMoreText: string;
    articles: {
      title: string;
      excerpt: string;
      date: string;
      imageUrl: string;
      imageAlt: string;
      url: string;
    }[];
  }
  
  export interface ProcessData {
    title: string;
    description: string;
    steps: {
      id: string;
      title: string;
      description: string;
      icon: string;
      order: number;
    }[];
  }
  
  export interface ContactData {
    title: string;
    description: string;
    formFields: {
      name: {
        label: string;
        placeholder: string;
        required: boolean;
      };
      email: {
        label: string;
        placeholder: string;
        required: boolean;
      };
      phone: {
        label: string;
        placeholder: string;
        required: boolean;
      };
      subject: {
        label: string;
        placeholder: string;
        required: boolean;
      };
      message: {
        label: string;
        placeholder: string;
        required: boolean;
      };
      gdprCheckbox: {
        label: string;
        required: boolean;
      };
    };
    submitButton: string;
    calendlyLink: string;
    appointmentButtonText: string;
    contactInfo: {
      address: string;
      phone: string;
      email: string;
      workingHours: string;
    };
    mapEmbedUrl: string;
  }
  
  export interface FooterData {
    copyright: string;
    links: {
      text: string;
      url: string;
    }[];
    crisisHelp: {
      title: string;
      description: string;
      phoneNumber: string;
      availabilityText: string;
    };
    cookieConsent: {
      message: string;
      acceptButtonText: string;
      moreInfoText: string;
      moreInfoUrl: string;
    };
  }
  
  export interface ServicesData {
    title: string;
    description: string;
    showIcons: boolean;
    showHoverEffects: boolean;
    layout: "grid" | "list" | "cards";
  }
  
  export interface CookieConsentData {
    message: string;
    acceptButtonText: string;
    moreInfoText: string;
    moreInfoUrl: string;
  }


// 🔁 Lista etapów konwersacji, po których prowadzi agent AI
export const CONVERSATION_FLOW = [
  "therapistData",
  "about",
  "services",
  "process",
  "testimonials",
  "pricing",
  "faq",
  "contact"
] as const;

export type Step = typeof CONVERSATION_FLOW[number];

// 🔁 Pomocnicza funkcja do wyciągnięcia kolejnego kroku
export function getNextStep(current: Step): Step | null {
  const index = CONVERSATION_FLOW.indexOf(current);
  return index < CONVERSATION_FLOW.length - 1 ? CONVERSATION_FLOW[index + 1] : null;
}

export type StepMetadata = {
  label: string;
  jsonFile: string;
  fields: string[];
};

export const STEP_DETAILS: Record<Step, StepMetadata> = {
  therapistData: {
    label: "Dane terapeuty",
    jsonFile: "config.json",
    fields: ["therapist.name", "therapist.title", "therapist.phone", "therapist.email", "therapist.address", "therapist.workingHours"]
  },
  about: {
    label: "Sekcja 'O mnie'",
    jsonFile: "about.json",
    fields: ["name", "credentials", "description", "badges", "imageUrl", "imageAlt"]
  },
  services: {
    label: "Usługi",
    jsonFile: "services.json",
    fields: ["title", "description", "layout", "showIcons", "showHoverEffects"]
  },
  process: {
    label: "Proces pracy",
    jsonFile: "process.json",
    fields: ["title", "description", "steps"]
  },
  testimonials: {
    label: "Opinie",
    jsonFile: "testimonials.json",
    fields: ["title", "description", "testimonials", "googleMapsLink", "showRating"]
  },
  pricing: {
    label: "Cennik",
    jsonFile: "pricing.json",
    fields: ["title", "subtitle", "services", "paymentMethods", "notes"]
  },
  faq: {
    label: "FAQ",
    jsonFile: "faq.json",
    fields: ["title", "subtitle", "questions"]
  },
  contact: {
    label: "Kontakt",
    jsonFile: "contact.json",
    fields: ["title", "description", "formFields", "submitButton", "calendlyLink", "appointmentButtonText", "mapEmbedUrl"]
  }
};
