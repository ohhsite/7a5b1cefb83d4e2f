# 🎨 System Kolorów - Dokumentacja

## ✅ **IMPLEMENTACJA UKOŃCZONA!**

System kolorów z `config.json` został w pełni zaimplementowany. Teraz **zmiana kolorów w config.json natychmiast wpływa na całą stronę!**

## 🔧 **Jak zmienić kolory na stronie:**

### **1. Edytuj plik `src/data/config.json`:**

```json
{
  "colors": {
    "primary": "#3B82F6",           // Główny kolor (np. niebieskit)
    "primaryLight": "#60A5FA",      // Jaśniejszy odcień primary
    "secondary": "#10B981",         // Kolor dodatkowy (np. zielony)
    "secondaryLight": "#34D399",    // Jaśniejszy odcień secondary
    "accent": "#F59E0B",            // Kolor akcentujący (np. pomarańczowy)
    "accentLight": "#FBBF24",       // Jaśniejszy odcień accent
    "dark": "#1F2937",              // Ciemny kolor
    "light": "#F3F4F6",             // Jasny kolor
    "white": "#FFFFFF",             // Biały
    "black": "#000000",             // Czarny
    "textPrimary": "#1F2937",       // Główny kolor tekstu
    "textSecondary": "#6B7280",     // Dodatkowy kolor tekstu
    "background": "#F9FAFB",        // Kolor tła
    "backgroundLight": "#F3F4F6",   // Jaśniejsze tło
    "backgroundDark": "#E5E7EB"     // Ciemniejsze tło
  }
}
```

### **2. Zapisz plik - kolory automatycznie się zmienią!**

## 🎯 **Dostępne klasy CSS:**

### **Kolory tła:**
- `bg-theme-primary` - główny kolor tła
- `bg-theme-primary-light` - jaśniejszy primary
- `bg-theme-primary-50` - półprzezroczysty primary (5%)
- `bg-theme-primary-100` - półprzezroczysty primary (10%)
- `bg-theme-secondary` - kolor dodatkowy
- `bg-theme-accent` - kolor akcentujący
- `bg-theme-background` - tło
- `bg-theme-background-light` - jaśniejsze tło

### **Kolory tekstu:**
- `text-theme-primary` - główny kolor tekstu
- `text-theme-secondary` - dodatkowy kolor tekstu
- `text-theme-accent` - kolor akcentujący tekstu
- `text-theme-text-primary` - kolor z config.textPrimary
- `text-theme-text-secondary` - kolor z config.textSecondary

### **Kolory obramowań:**
- `border-theme-primary` - główne obramowanie
- `border-theme-secondary` - dodatkowe obramowanie
- `border-theme-accent` - akcentujące obramowanie

### **Efekty hover:**
- `hover:bg-theme-primary-light` - jaśniejszy primary przy hover
- `hover:bg-theme-primary-dark` - ciemniejszy primary przy hover
- `hover:text-theme-primary` - zmiana koloru tekstu przy hover

### **Gradienty:**
- `bg-gradient-primary` - gradient primary → primary-light
- `bg-gradient-secondary` - gradient secondary → secondary-light
- `bg-gradient-accent` - gradient accent → accent-light

## 📝 **Przykłady użycia:**

### **Przycisk z kolorami z config.json:**
```tsx
<button className="bg-theme-primary hover:bg-theme-primary-light text-white px-6 py-3 rounded-lg transition-colors">
  Przycisk
</button>
```

### **Karta z obramowaniem:**
```tsx
<div className="bg-white border-2 border-theme-accent rounded-lg p-6">
  <h3 className="text-theme-primary font-bold">Tytuł</h3>
  <p className="text-theme-text-secondary">Opis</p>
</div>
```

### **Ikona z kolorem z config:**
```tsx
<Heart className="text-theme-primary" size={24} />
```

## 🔄 **Zaimplementowane komponenty:**

✅ **Header** - logo, nawigacja, przyciski kontaktu
✅ **PricingSection** - ceny, metody płatności, notatki  
✅ **SpecializationsSection** - ikony, tła, obramowania
✅ **useTheme hook** - automatyczne ładowanie kolorów z config.json

## 🎨 **Przykładowe zestawy kolorów:**

### **Zestaw 1 - Niebieski profesjonalny:**
```json
"primary": "#2563EB",
"primaryLight": "#3B82F6", 
"secondary": "#059669",
"accent": "#DC2626"
```

### **Zestaw 2 - Fioletowy kreatywny:**
```json
"primary": "#7C3AED",
"primaryLight": "#8B5CF6",
"secondary": "#EC4899", 
"accent": "#F59E0B"
```

### **Zestaw 3 - Zielony naturalny:**
```json
"primary": "#059669",
"primaryLight": "#10B981",
"secondary": "#0891B2",
"accent": "#EA580C"
```

## 🚀 **Testowanie zmian:**

1. Otwórz plik `src/data/config.json`
2. Zmień wartość np. `"primary": "#DC2626"` (na czerwony)
3. Zapisz plik
4. Przeładuj stronę - wszystkie elementy primary będą czerwone!

**System jest w pełni funkcjonalny i gotowy do użycia!** 🎉
