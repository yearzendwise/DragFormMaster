import { useState } from 'react';
import { WizardStep, WizardState, FormTheme, FormElement } from '@/types/form-builder';

const defaultThemes: FormTheme[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with subtle borders',
    preview: 'bg-white border border-gray-200',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-sm',
      header: 'text-2xl font-semibold text-gray-900 mb-6',
      field: 'mb-6',
      label: 'block text-sm font-medium text-gray-700 mb-2',
      input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
      button: 'w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors',
      background: 'bg-gray-50'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold gradients with rounded corners',
    preview: 'bg-gradient-to-r from-blue-500 to-purple-600',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border-0',
      header: 'text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8',
      field: 'mb-6',
      label: 'block text-sm font-semibold text-gray-800 mb-3',
      input: 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
      button: 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold',
      background: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-friendly design with structured layout',
    preview: 'bg-slate-100 border-l-4 border-blue-600',
    styles: {
      container: 'max-w-3xl mx-auto p-10 bg-white border border-slate-200 shadow-lg',
      header: 'text-2xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4',
      field: 'mb-8',
      label: 'block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide',
      input: 'w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
      button: 'w-full bg-slate-800 text-white py-3 px-6 hover:bg-slate-900 transition-colors font-medium uppercase tracking-wide',
      background: 'bg-slate-50'
    }
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Colorful and fun design with rounded elements',
    preview: 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-200',
      header: 'text-3xl font-black text-pink-600 mb-8 text-center',
      field: 'mb-6',
      label: 'block text-sm font-bold text-purple-700 mb-3',
      input: 'w-full px-4 py-3 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-purple-400 focus:border-purple-400',
      button: 'w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all font-bold text-lg',
      background: 'bg-gradient-to-r from-pink-100 via-purple-50 to-indigo-100'
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with luxury feel',
    preview: 'bg-gradient-to-r from-gray-900 to-gray-700',
    styles: {
      container: 'max-w-2xl mx-auto p-10 bg-gray-900 text-white rounded-lg border border-gray-700 shadow-2xl',
      header: 'text-2xl font-light text-gold-400 mb-8 text-center border-b border-gray-700 pb-4',
      field: 'mb-8',
      label: 'block text-sm font-medium text-gray-300 mb-3',
      input: 'w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500',
      button: 'w-full bg-gold-600 text-gray-900 py-3 px-6 rounded-md hover:bg-gold-500 transition-colors font-medium',
      background: 'bg-gray-800'
    }
  }
];

export function useFormWizard() {
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 'build',
    formData: {
      title: 'Untitled Form',
      elements: []
    },
    selectedTheme: null,
    isComplete: false
  });

  const nextStep = () => {
    setWizardState(prev => {
      if (prev.currentStep === 'build') {
        return { ...prev, currentStep: 'style' };
      } else if (prev.currentStep === 'style') {
        return { ...prev, currentStep: 'preview' };
      }
      return prev;
    });
  };

  const previousStep = () => {
    setWizardState(prev => {
      if (prev.currentStep === 'style') {
        return { ...prev, currentStep: 'build' };
      } else if (prev.currentStep === 'preview') {
        return { ...prev, currentStep: 'style' };
      }
      return prev;
    });
  };

  const updateFormData = (title: string, elements: FormElement[]) => {
    setWizardState(prev => ({
      ...prev,
      formData: { title, elements }
    }));
  };

  const selectTheme = (theme: FormTheme) => {
    setWizardState(prev => ({
      ...prev,
      selectedTheme: theme
    }));
  };

  const completeWizard = () => {
    setWizardState(prev => ({
      ...prev,
      isComplete: true
    }));
  };

  const resetWizard = () => {
    setWizardState({
      currentStep: 'build',
      formData: {
        title: 'Untitled Form',
        elements: []
      },
      selectedTheme: null,
      isComplete: false
    });
  };

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