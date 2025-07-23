import { useState, useEffect } from 'react';
import { WizardStep, WizardState, FormTheme, FormElement } from '@/types/form-builder';

const defaultThemes: FormTheme[] = [
  // Enhanced existing themes
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with modern spacing and subtle shadows',
    preview: 'bg-white border border-gray-200 shadow-sm',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm',
      header: 'text-3xl font-light text-gray-900 mb-8 tracking-wide',
      field: 'mb-6',
      label: 'block text-sm font-medium text-gray-700 mb-2 tracking-wide',
      input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white',
      button: 'w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium tracking-wide shadow-md hover:shadow-lg',
      background: 'bg-gray-50'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold gradients with glass morphism and modern typography',
    preview: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl',
      header: 'text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight',
      field: 'mb-6',
      label: 'block text-sm font-semibold text-gray-800 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl',
      background: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate design with precise spacing and structured layout',
    preview: 'bg-slate-200 border-l-4 border-blue-600 shadow-md',
    styles: {
      container: 'max-w-3xl mx-auto p-12 bg-white border border-slate-200 shadow-xl rounded-lg',
      header: 'text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-200 pb-6 tracking-tight',
      field: 'mb-8',
      label: 'block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider',
      input: 'w-full px-4 py-3 border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 bg-slate-50 focus:bg-white',
      button: 'w-full bg-slate-900 text-white py-4 px-8 rounded-md hover:bg-slate-800 transition-all duration-200 font-bold uppercase tracking-wider shadow-lg hover:shadow-xl',
      background: 'bg-slate-50'
    }
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Vibrant colors with bouncy animations and friendly design',
    preview: 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-2xl',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-200 transform hover:scale-105 transition-transform duration-300',
      header: 'text-4xl font-black text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-8 text-center animate-pulse',
      field: 'mb-6',
      label: 'block text-sm font-bold text-purple-700 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-pink-50 focus:bg-white hover:border-purple-300',
      button: 'w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105',
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100'
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated dark theme with gold accents and luxury feel',
    preview: 'bg-gradient-to-r from-gray-900 to-gray-700 border border-yellow-400/20',
    styles: {
      container: 'max-w-2xl mx-auto p-12 bg-gray-900 text-white rounded-2xl border border-yellow-400/20 shadow-2xl',
      header: 'text-3xl font-light text-yellow-400 mb-10 text-center border-b border-gray-700 pb-6 tracking-widest',
      field: 'mb-8',
      label: 'block text-sm font-medium text-gray-300 mb-4 tracking-widest uppercase',
      input: 'w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 placeholder-gray-400',
      button: 'w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold tracking-widest uppercase shadow-lg hover:shadow-xl',
      background: 'bg-gray-900'
    }
  },
  // New themes
  {
    id: 'neon',
    name: 'Neon',
    description: 'Cyberpunk inspired with glowing neon effects and dark backgrounds',
    preview: 'bg-black border-2 border-cyan-400 shadow-cyan-400/50 shadow-lg',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-black border-2 border-cyan-400 rounded-xl shadow-2xl shadow-cyan-400/30',
      header: 'text-4xl font-bold text-cyan-400 mb-8 text-center tracking-wider drop-shadow-lg shadow-cyan-400/50',
      field: 'mb-6',
      label: 'block text-sm font-bold text-green-400 mb-3 tracking-wider uppercase',
      input: 'w-full px-4 py-3 bg-gray-900 border-2 border-cyan-400 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 placeholder-gray-500 shadow-inner',
      button: 'w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 font-bold uppercase tracking-wider shadow-lg shadow-cyan-400/30 hover:shadow-xl',
      background: 'bg-gray-900'
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Earth tones with organic shapes and natural textures',
    preview: 'bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl',
    styles: {
      container: 'max-w-2xl mx-auto p-10 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl shadow-2xl',
      header: 'text-3xl font-bold text-green-800 mb-8 text-center tracking-wide',
      field: 'mb-7',
      label: 'block text-sm font-semibold text-emerald-700 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 border-2 border-green-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl',
      background: 'bg-gradient-to-br from-green-100 to-emerald-100'
    }
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium design with rich colors and sophisticated typography',
    preview: 'bg-gradient-to-r from-purple-900 to-indigo-900 border border-gold-400',
    styles: {
      container: 'max-w-2xl mx-auto p-12 bg-gradient-to-br from-purple-900 to-indigo-900 text-white border border-yellow-400 rounded-2xl shadow-2xl',
      header: 'text-4xl font-light text-yellow-400 mb-10 text-center tracking-widest font-serif',
      field: 'mb-8',
      label: 'block text-sm font-medium text-yellow-300 mb-4 tracking-widest uppercase font-serif',
      input: 'w-full px-5 py-4 bg-purple-800/50 border border-purple-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 placeholder-purple-300 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold tracking-widest uppercase shadow-lg hover:shadow-xl font-serif',
      background: 'bg-gradient-to-br from-purple-100 to-indigo-100'
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Vintage 80s style with bold colors and geometric patterns',
    preview: 'bg-gradient-to-r from-orange-400 to-pink-500 border-4 border-yellow-300',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-orange-100 to-pink-100 border-4 border-yellow-400 rounded-none shadow-2xl',
      header: 'text-4xl font-black text-orange-600 mb-8 text-center tracking-wider uppercase transform -skew-x-12',
      field: 'mb-6',
      label: 'block text-sm font-black text-pink-600 mb-3 tracking-wider uppercase transform skew-x-6',
      input: 'w-full px-4 py-3 border-3 border-orange-400 rounded-none focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-yellow-50 font-mono',
      button: 'w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-none hover:from-orange-600 hover:to-pink-600 transition-all duration-200 font-black uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105',
      background: 'bg-gradient-to-br from-yellow-200 to-orange-200'
    }
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'True glass effect with ultra-transparent backgrounds and crystal-clear visibility',
    preview: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
    styles: {
      container: 'glassmorphism-container max-w-2xl mx-auto p-12 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl shadow-black/10',
      header: 'text-4xl font-bold text-white mb-10 text-center tracking-wide drop-shadow-2xl shadow-black/50',
      field: 'mb-8',
      label: 'block text-sm font-bold text-white mb-4 tracking-wider uppercase drop-shadow-lg shadow-black/50 bg-transparent',
      input: 'glassmorphism-input w-full px-5 py-4 !bg-transparent backdrop-blur-xl border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 text-white placeholder-white/60 shadow-inner shadow-black/10 focus:shadow-white/20',
      button: 'w-full bg-white/10 backdrop-blur-xl border border-white/40 text-white py-4 px-6 rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 font-bold shadow-2xl hover:shadow-white/20 drop-shadow-lg',
      background: 'bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30'
    }
  }
];

// Storage utility functions
const STORAGE_KEY = 'form-wizard-data';

function saveToStorage(data: WizardState) {
  try {
    // Try localStorage first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    try {
      // Fallback to sessionStorage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (fallbackError) {
      console.warn('Failed to save form data to storage:', fallbackError);
    }
  }
}

function loadFromStorage(): WizardState | null {
  try {
    // Try localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  
  try {
    // Fallback to sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load from sessionStorage:', error);
  }
  
  return null;
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear storage:', error);
  }
}

export function useFormWizard() {
  // Initialize state from storage or default values
  const getInitialState = (): WizardState => {
    const saved = loadFromStorage();
    return saved || {
      currentStep: 'build',
      formData: {
        title: 'Untitled Form',
        elements: []
      },
      selectedTheme: null,
      isComplete: false
    };
  };

  const [wizardState, setWizardState] = useState<WizardState>(getInitialState);

  const nextStep = () => {
    setWizardState(prev => {
      const newState = prev.currentStep === 'build' 
        ? { ...prev, currentStep: 'style' as const }
        : prev.currentStep === 'style' 
        ? { ...prev, currentStep: 'preview' as const }
        : prev;
      
      if (newState !== prev) {
        saveToStorage(newState);
      }
      return newState;
    });
  };

  const previousStep = () => {
    setWizardState(prev => {
      const newState = prev.currentStep === 'style'
        ? { ...prev, currentStep: 'build' as const }
        : prev.currentStep === 'preview'
        ? { ...prev, currentStep: 'style' as const }
        : prev;
      
      if (newState !== prev) {
        saveToStorage(newState);
      }
      return newState;
    });
  };

  const updateFormData = (title: string, elements: FormElement[]) => {
    setWizardState(prev => {
      const newState = {
        ...prev,
        formData: { title, elements }
      };
      saveToStorage(newState);
      return newState;
    });
  };

  const selectTheme = (theme: FormTheme) => {
    setWizardState(prev => {
      const newState = {
        ...prev,
        selectedTheme: theme
      };
      saveToStorage(newState);
      return newState;
    });
  };

  const completeWizard = () => {
    setWizardState(prev => ({
      ...prev,
      isComplete: true
    }));
  };

  const resetWizard = () => {
    const newState = {
      currentStep: 'build' as const,
      formData: {
        title: 'Untitled Form',
        elements: []
      },
      selectedTheme: null,
      isComplete: false
    };
    clearStorage();
    setWizardState(newState);
  };

  // Save data before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToStorage(wizardState);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [wizardState]);

  return {
    wizardState,
    themes: defaultThemes,
    nextStep,
    previousStep,
    updateFormData,
    selectTheme,
    completeWizard,
    resetWizard
  };
}