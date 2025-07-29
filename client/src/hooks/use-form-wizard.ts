import { useState, useEffect } from 'react';
import { WizardStep, WizardState, FormTheme, FormElement, CustomColors } from '@/types/form-builder';
import { applyCustomColors, extractThemeColors } from '@/utils/theme-color-utils';

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
      input: 'w-full px-4 py-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white',
      button: 'w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium tracking-wide shadow-md hover:shadow-lg',
      background: 'bg-gray-50',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-md',
        activeLabel: 'text-gray-900 font-medium',
        inactiveLabel: 'text-gray-500'
      },
      progressBar: {
        container: 'w-full bg-gray-200 rounded-lg h-2 mb-6',
        fill: 'bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-lg transition-all duration-500 ease-out'
      }
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
      input: 'w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl',
      background: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-gray-300 data-[state=unchecked]:border-purple-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-purple-500',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-lg',
        activeLabel: 'text-gray-800 font-semibold',
        inactiveLabel: 'text-gray-500'
      },
      progressBar: {
        container: 'w-full bg-gray-200/60 rounded-xl h-3 mb-8 backdrop-blur-sm',
        fill: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-xl transition-all duration-700 ease-out shadow-lg'
      }
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate design with precise spacing and structured layout',
    preview: 'bg-gray-50 border-l-4 border-blue-600 shadow-sm',
    styles: {
      container: 'max-w-3xl mx-auto p-10 bg-white border border-gray-200 shadow-sm rounded-lg',
      header: 'text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200',
      field: 'mb-6',
      label: 'block text-sm font-medium text-gray-700 mb-2',
      input: 'w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white',
      button: 'w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md',
      background: 'bg-gray-50',
      booleanSwitch: {
        track: 'border data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600',
        thumb: 'data-[state=unchecked]:bg-white data-[state=checked]:bg-white shadow-sm',
        activeLabel: 'text-gray-900 font-medium',
        inactiveLabel: 'text-gray-600 font-normal'
      },
      progressBar: {
        container: 'w-full bg-gray-200 rounded-full h-1.5 mb-6',
        fill: 'bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out'
      }
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
      input: 'w-full px-4 py-3 h-12 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-pink-50 focus:bg-white hover:border-purple-300',
      button: 'w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105',
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100',
      booleanSwitch: {
        track: 'border-3 data-[state=unchecked]:bg-pink-200 data-[state=unchecked]:border-pink-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-purple-400',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-lg',
        activeLabel: 'text-purple-700 font-bold',
        inactiveLabel: 'text-pink-400 font-bold'
      },
      progressBar: {
        container: 'w-full bg-pink-200 rounded-2xl h-4 mb-6 border-2 border-pink-300',
        fill: 'bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-2xl transition-all duration-500 ease-bounce shadow-lg'
      }
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
      input: 'w-full px-4 py-3 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 placeholder-gray-400',
      button: 'w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold tracking-widest uppercase shadow-lg hover:shadow-xl',
      background: 'bg-gray-900',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-gray-700 data-[state=unchecked]:border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-yellow-500 data-[state=checked]:border-yellow-400',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-xl',
        activeLabel: 'text-yellow-400 font-medium tracking-widest uppercase',
        inactiveLabel: 'text-gray-400 font-medium tracking-widest uppercase'
      },
      progressBar: {
        container: 'w-full bg-gray-700 rounded-lg h-3 mb-10 border border-gray-600',
        fill: 'bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-lg transition-all duration-700 ease-out shadow-lg shadow-yellow-400/30'
      }
    }
  },
  {
    id: 'modern-bold',
    name: 'Modern Bold',
    description: 'Ultra-bold gradients with striking typography and dynamic effects',
    preview: 'bg-gradient-to-br from-orange-500 via-red-500 to-purple-600',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-white border-4 border-transparent bg-clip-padding rounded-3xl shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500 before:via-red-500 before:to-purple-600 before:rounded-3xl before:-z-10 before:blur-xl before:opacity-20',
      header: 'text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 bg-clip-text text-transparent mb-10 tracking-tighter drop-shadow-lg',
      field: 'mb-8',
      label: 'block text-base font-black text-gray-900 mb-4 tracking-wide uppercase drop-shadow-sm',
      input: 'w-full px-6 py-4 h-14 border-3 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl font-semibold text-gray-900 placeholder-gray-500',
      button: 'w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white py-5 px-8 rounded-2xl hover:scale-110 hover:rotate-1 transition-all duration-400 font-black text-lg uppercase tracking-widest shadow-2xl hover:shadow-orange-500/40 border-2 border-white/20',
      background: 'bg-gradient-to-br from-orange-50 via-red-50 to-purple-50',
      booleanSwitch: {
        track: 'border-3 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-orange-500',
        thumb: 'data-[state=unchecked]:bg-gray-600 data-[state=checked]:bg-white shadow-2xl',
        activeLabel: 'text-gray-900 font-black uppercase tracking-wide',
        inactiveLabel: 'text-gray-500 font-semibold'
      },
      progressBar: {
        container: 'w-full bg-gray-200 rounded-2xl h-4 mb-8 border-2 border-gray-300 shadow-inner',
        fill: 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 h-4 rounded-2xl transition-all duration-800 ease-out shadow-lg shadow-orange-500/50'
      }
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
      input: 'w-full px-4 py-3 h-12 bg-gray-900 border-2 border-cyan-400 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 placeholder-gray-500 shadow-inner',
      button: 'w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 font-bold uppercase tracking-wider shadow-lg shadow-cyan-400/30 hover:shadow-xl',
      background: 'bg-gray-900',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-gray-800 data-[state=unchecked]:border-cyan-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-green-400 data-[state=checked]:border-cyan-400',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-lg shadow-cyan-400/50',
        activeLabel: 'text-cyan-400 font-bold tracking-wider uppercase',
        inactiveLabel: 'text-gray-500 font-bold tracking-wider uppercase'
      },
      progressBar: {
        container: 'w-full bg-gray-800 rounded-lg h-3 mb-8 border-2 border-cyan-400 shadow-inner',
        fill: 'bg-gradient-to-r from-cyan-400 to-green-400 h-3 rounded-lg transition-all duration-600 ease-out shadow-lg shadow-cyan-400/50'
      }
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
      input: 'w-full px-4 py-3 h-12 border-2 border-green-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl',
      background: 'bg-gradient-to-br from-green-100 to-emerald-100',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-green-200 data-[state=unchecked]:border-green-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-600 data-[state=checked]:to-emerald-600 data-[state=checked]:border-emerald-500',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-lg',
        activeLabel: 'text-green-800 font-semibold tracking-wide',
        inactiveLabel: 'text-emerald-400 font-semibold tracking-wide'
      },
      progressBar: {
        container: 'w-full bg-green-200 rounded-3xl h-3 mb-8 border-2 border-green-300',
        fill: 'bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-3xl transition-all duration-500 ease-out shadow-lg'
      }
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
      input: 'w-full px-5 py-3 h-12 bg-purple-800/50 border border-purple-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 placeholder-purple-300 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold tracking-widest uppercase shadow-lg hover:shadow-xl font-serif',
      background: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-purple-800 data-[state=unchecked]:border-purple-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-yellow-500 data-[state=checked]:border-yellow-400',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-xl',
        activeLabel: 'text-yellow-400 font-medium tracking-widest uppercase font-serif',
        inactiveLabel: 'text-purple-300 font-medium tracking-widest uppercase font-serif'
      },
      progressBar: {
        container: 'w-full bg-purple-800/50 rounded-lg h-4 mb-10 border border-purple-600 backdrop-blur-sm',
        fill: 'bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-lg transition-all duration-800 ease-out shadow-lg shadow-yellow-400/30'
      }
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
      input: 'w-full px-4 py-3 h-12 border-3 border-orange-400 rounded-none focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-yellow-50 font-mono',
      button: 'w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-none hover:from-orange-600 hover:to-pink-600 transition-all duration-200 font-black uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105',
      background: 'bg-gradient-to-br from-yellow-200 to-orange-200',
      booleanSwitch: {
        track: 'border-4 rounded-none data-[state=unchecked]:bg-yellow-300 data-[state=unchecked]:border-orange-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-orange-400',
        thumb: 'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 shadow-lg rounded-none',
        activeLabel: 'text-orange-600 font-black tracking-wider uppercase transform skew-x-6',
        inactiveLabel: 'text-pink-400 font-black tracking-wider uppercase transform skew-x-6'
      },
      progressBar: {
        container: 'w-full bg-yellow-300 rounded-none h-4 mb-6 border-4 border-orange-400 transform skew-x-6',
        fill: 'bg-gradient-to-r from-orange-500 to-pink-500 h-4 rounded-none transition-all duration-400 ease-out shadow-lg transform -skew-x-6'
      }
    }
  },
  {
    id: 'neo-modern',
    name: 'Neo Modern',
    description: 'Ultra-contemporary design with sharp edges, monospace fonts, and tech-inspired aesthetics',
    preview: 'bg-gradient-to-br from-slate-800 via-gray-800 to-black border border-green-400/30',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-900/95 to-gray-900/95 backdrop-blur-xl border border-green-400/20 rounded-none shadow-2xl relative overflow-hidden',
      header: 'text-3xl font-mono font-bold text-green-400 mb-8 tracking-wider border-l-4 border-green-400 pl-4 relative before:content-[">"] before:text-green-400 before:mr-2',
      field: 'mb-6',
      label: 'block text-xs font-mono font-bold text-gray-300 mb-3 tracking-widest uppercase relative before:content-["//"] before:text-green-400/60 before:mr-2',
      input: 'w-full px-4 py-3 h-12 bg-black/50 border border-green-400/30 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300 text-green-100 font-mono placeholder-gray-500 backdrop-blur-sm',
      button: 'w-full bg-gradient-to-r from-green-600 to-emerald-600 text-black py-4 px-6 rounded-none hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-mono font-bold uppercase tracking-widest shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-green-400/50',
      background: 'bg-gradient-to-br from-slate-900 to-black',
      booleanSwitch: {
        track: 'border-2 rounded-none data-[state=unchecked]:bg-gray-800 data-[state=unchecked]:border-green-400/30 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-400',
        thumb: 'data-[state=unchecked]:bg-gray-600 data-[state=checked]:bg-black shadow-lg rounded-none',
        activeLabel: 'text-green-400 font-mono font-bold uppercase tracking-wider',
        inactiveLabel: 'text-gray-500 font-mono uppercase tracking-wider'
      },
      progressBar: {
        container: 'w-full bg-gray-800 rounded-none h-2 mb-6 border border-green-400/30',
        fill: 'bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-none transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.3)]'
      }
    }
  },
  // New themes added
  {
    id: 'cosmic',
    name: 'Cosmic',
    description: 'Space-themed design with cosmic gradients and starry effects',
    preview: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-black',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-black/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3Ccircle cx="23" cy="5" r="1"/%3E%3Ccircle cx="33" cy="15" r="1"/%3E%3C/g%3E%3C/svg%3E")]',
      header: 'text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-8 tracking-wide',
      field: 'mb-6',
      label: 'block text-sm font-medium text-purple-200 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 h-12 border border-purple-500/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-black/40 backdrop-blur-sm text-white placeholder-purple-300/60',
      button: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/50 transform hover:scale-105',
      background: 'bg-gradient-to-br from-black via-purple-950 to-indigo-950',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-purple-900/40 data-[state=unchecked]:border-purple-500/40 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-purple-400',
        thumb: 'data-[state=unchecked]:bg-purple-300 data-[state=checked]:bg-cyan-300 shadow-lg shadow-purple-500/20',
        activeLabel: 'text-purple-200 font-medium',
        inactiveLabel: 'text-purple-400/60'
      },
      progressBar: {
        container: 'w-full bg-purple-900/40 rounded-full h-3 mb-6 border border-purple-500/30',
        fill: 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/30'
      }
    }
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Raw, industrial design with bold typography and concrete textures',
    preview: 'bg-gray-800 border-4 border-black',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gray-100 border-8 border-black shadow-[8px_8px_0_0_#000000]',
      header: 'text-5xl font-black text-black mb-8 uppercase tracking-tight',
      field: 'mb-6',
      label: 'block text-sm font-black text-black mb-2 uppercase tracking-wider',
      input: 'w-full px-4 py-3 h-12 border-4 border-black bg-white focus:outline-none focus:bg-yellow-100 transition-all duration-100 text-black font-bold',
      button: 'w-full bg-black text-white py-4 px-6 hover:bg-gray-800 transition-all duration-100 font-black uppercase tracking-wider shadow-[4px_4px_0_0_#000000] hover:shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px]',
      background: 'bg-gray-300',
      booleanSwitch: {
        track: 'border-4 data-[state=unchecked]:bg-gray-400 data-[state=unchecked]:border-black data-[state=checked]:bg-black data-[state=checked]:border-black',
        thumb: 'data-[state=unchecked]:bg-black data-[state=checked]:bg-white shadow-[2px_2px_0_0_#000000]',
        activeLabel: 'text-black font-black uppercase',
        inactiveLabel: 'text-gray-600 font-black uppercase'
      },
      progressBar: {
        container: 'w-full bg-white border-4 border-black h-6 mb-6',
        fill: 'bg-black h-6 transition-all duration-200 ease-linear'
      }
    }
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    description: 'Soft, dreamy design with gentle pastels and cloud-like elements',
    preview: 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-lg border border-purple-200/50 rounded-3xl shadow-xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-100/30 before:via-purple-100/30 before:to-blue-100/30 before:rounded-3xl',
      header: 'text-4xl font-light text-purple-800 mb-8 tracking-wide relative z-10',
      field: 'mb-6 relative z-10',
      label: 'block text-sm font-medium text-purple-700 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 h-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-purple-300',
      button: 'w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 px-6 rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105',
      background: 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-purple-100 data-[state=unchecked]:border-purple-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-400 data-[state=checked]:to-pink-400 data-[state=checked]:border-purple-400',
        thumb: 'data-[state=unchecked]:bg-purple-400 data-[state=checked]:bg-white shadow-md',
        activeLabel: 'text-purple-700 font-medium',
        inactiveLabel: 'text-purple-400'
      },
      progressBar: {
        container: 'w-full bg-purple-100 rounded-full h-3 mb-6 border border-purple-200',
        fill: 'bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-700 ease-out shadow-sm'
      }
    }
  },
  {
    id: 'promotional',
    name: 'Promotional',
    description: 'Marketing-focused design with hero sections, badges, and conversion elements',
    preview: 'bg-gradient-to-br from-red-500 to-orange-500',
    styles: {
      container: 'max-w-2xl mx-auto bg-white rounded-none shadow-2xl relative overflow-visible pt-16 pb-8 px-8',
      header: 'relative text-5xl font-black text-center mb-12 px-8 py-6 bg-gradient-to-r from-red-500 to-orange-500 text-white -mx-8 mt-0 shadow-lg before:content-["🔥_LIMITED_OFFER_🔥"] before:absolute before:-top-12 before:left-1/2 before:-translate-x-1/2 before:bg-yellow-400 before:text-black before:px-6 before:py-2 before:rounded-full before:text-sm before:font-bold before:animate-bounce',
      field: 'mb-8 relative before:content-[""] before:absolute before:-left-4 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-red-500 before:to-orange-500',
      label: 'inline-block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider bg-yellow-100 px-3 py-1 rounded-md relative after:content-["*"] after:text-red-500 after:ml-1 after:text-lg',
      input: 'w-full px-6 py-4 h-12 border-3 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-gray-50 text-lg font-medium shadow-inner hover:shadow-md',
      button: 'relative w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-6 px-8 rounded-lg font-black text-xl uppercase tracking-wider shadow-2xl transform hover:scale-105 transition-all duration-300 before:content-["➜"] before:absolute before:right-8 before:top-1/2 before:-translate-y-1/2 before:text-2xl before:animate-pulse after:content-["CLAIM_NOW!"] after:absolute after:-top-3 after:right-4 after:bg-yellow-400 after:text-black after:px-3 after:py-1 after:rounded after:text-xs after:font-bold after:rotate-12',
      background: 'bg-gradient-to-br from-gray-50 to-orange-50',
      booleanSwitch: {
        track: 'border-3 rounded-full data-[state=unchecked]:bg-gray-300 data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-500 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600 data-[state=checked]:shadow-lg data-[state=checked]:shadow-red-500/30',
        thumb: 'data-[state=unchecked]:bg-white data-[state=checked]:bg-white shadow-xl data-[state=checked]:shadow-2xl data-[state=checked]:scale-110',
        activeLabel: 'text-red-600 font-black text-lg relative after:content-["✓"] after:ml-2 after:text-green-500',
        inactiveLabel: 'text-gray-500 font-bold line-through'
      },
      progressBar: {
        container: 'w-full bg-gray-200 rounded-lg h-6 mb-10 relative overflow-hidden shadow-inner before:content-["ALMOST_THERE!"] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:text-xs before:font-bold before:text-gray-500 before:tracking-wider',
        fill: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-6 rounded-lg transition-all duration-700 ease-out relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-shimmer'
      }
    }
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern lights inspired with ethereal gradients and glowing effects',
    preview: 'bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-600',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-teal-400/20 rounded-3xl shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:from-teal-500/10 before:via-emerald-500/10 before:to-cyan-600/10 before:animate-pulse',
      header: 'text-4xl font-light bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-8 tracking-wide text-center relative after:content-[""] after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-gradient-to-r after:from-transparent after:via-teal-400/50 after:to-transparent',
      field: 'mb-6 relative',
      label: 'block text-sm font-medium text-teal-200 mb-3 tracking-wide opacity-90',
      input: 'w-full px-4 py-3 h-12 border border-teal-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-transparent transition-all duration-300 bg-slate-800/50 backdrop-blur-sm text-white placeholder-teal-300/40 shadow-[0_0_15px_rgba(20,184,166,0.1)]',
      button: 'w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white py-4 px-6 rounded-xl hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 font-medium transform hover:scale-105 relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
      background: 'bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-slate-700/50 data-[state=unchecked]:border-teal-400/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-teal-500 data-[state=checked]:to-cyan-500 data-[state=checked]:border-teal-400 data-[state=checked]:shadow-[0_0_15px_rgba(20,184,166,0.4)]',
        thumb: 'data-[state=unchecked]:bg-slate-400 data-[state=checked]:bg-white shadow-lg data-[state=checked]:shadow-[0_0_10px_rgba(255,255,255,0.5)]',
        activeLabel: 'text-teal-300 font-medium tracking-wide',
        inactiveLabel: 'text-slate-400/70'
      },
      progressBar: {
        container: 'w-full bg-slate-800/50 rounded-full h-3 mb-6 border border-teal-400/20 backdrop-blur-sm',
        fill: 'bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 h-3 rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(20,184,166,0.5)] relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-shimmer'
      }
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm sunset hues with soft transitions and dreamy atmosphere',
    preview: 'bg-gradient-to-br from-rose-400 via-orange-400 to-amber-500',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-lg border border-orange-200/50 rounded-3xl shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:top-0 before:right-0 before:w-96 before:h-96 before:bg-gradient-radial before:from-rose-300/20 before:to-transparent before:blur-3xl',
      header: 'text-4xl font-bold bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-8 tracking-tight drop-shadow-sm',
      field: 'mb-6',
      label: 'block text-sm font-semibold text-orange-800 mb-3 tracking-wide',
      input: 'w-full px-4 py-3 h-12 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-rose-300 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-orange-300 shadow-sm hover:shadow-md',
      button: 'w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105 relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent hover:before:from-black/20',
      background: 'bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-orange-100 data-[state=unchecked]:border-orange-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-rose-500 data-[state=checked]:to-amber-500 data-[state=checked]:border-rose-400 data-[state=checked]:shadow-md',
        thumb: 'data-[state=unchecked]:bg-orange-400 data-[state=checked]:bg-white shadow-lg',
        activeLabel: 'text-orange-800 font-semibold',
        inactiveLabel: 'text-orange-400'
      },
      progressBar: {
        container: 'w-full bg-orange-100 rounded-full h-3 mb-6 border border-orange-200 shadow-inner',
        fill: 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 h-3 rounded-full transition-all duration-700 ease-out shadow-md relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent'
      }
    }
  },
  {
    id: 'ocean-depth',
    name: 'Ocean Depth',
    description: 'Deep sea inspired with aquatic gradients and fluid animations',
    preview: 'bg-gradient-to-b from-blue-600 via-blue-800 to-indigo-950',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-gradient-to-b from-blue-900/95 via-blue-950/95 to-indigo-950/95 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] before:from-blue-500/10 before:to-transparent before:animate-pulse',
      header: 'text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent mb-8 tracking-wide text-center drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      field: 'mb-6 relative',
      label: 'block text-sm font-medium text-blue-200 mb-3 tracking-wide drop-shadow-sm',
      input: 'w-full px-4 py-3 h-12 border border-blue-400/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 bg-blue-950/50 backdrop-blur-sm text-white placeholder-blue-300/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]',
      button: 'w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white py-4 px-6 rounded-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 font-semibold transform hover:scale-105 relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000',
      background: 'bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-blue-900/50 data-[state=unchecked]:border-blue-400/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500 data-[state=checked]:border-blue-400 data-[state=checked]:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        thumb: 'data-[state=unchecked]:bg-blue-400 data-[state=checked]:bg-white shadow-lg data-[state=checked]:shadow-[0_0_15px_rgba(255,255,255,0.6)]',
        activeLabel: 'text-blue-200 font-medium tracking-wide drop-shadow-sm',
        inactiveLabel: 'text-blue-400/60'
      },
      progressBar: {
        container: 'w-full bg-blue-950/50 rounded-full h-3 mb-6 border border-blue-400/20 backdrop-blur-sm shadow-inner',
        fill: 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 h-3 rounded-full transition-all duration-700 ease-out shadow-[0_0_25px_rgba(59,130,246,0.6)] relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] before:animate-shimmer'
      }
    }
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Cyberpunk matrix style with digital rain effects and terminal aesthetics',
    preview: 'bg-black border border-green-500/50',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-black border border-green-500/30 rounded-none shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,0,0.03)_50%,transparent_100%)] before:bg-[length:2px_20px] before:animate-matrix-rain',
      header: 'text-3xl font-mono font-bold text-green-400 mb-8 tracking-wider text-center relative before:content-["["] before:text-green-600 before:mr-2 after:content-["]"] after:text-green-600 after:ml-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]',
      field: 'mb-6 relative pl-4 before:content-[">"] before:absolute before:left-0 before:top-8 before:text-green-500 before:font-mono',
      label: 'block text-xs font-mono font-bold text-green-300 mb-3 tracking-widest uppercase opacity-80',
      input: 'w-full px-4 py-3 h-12 bg-black border border-green-500/50 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-200 text-green-100 font-mono placeholder-green-600/50 caret-green-400',
      button: 'w-full bg-black border-2 border-green-400 text-green-400 py-4 px-6 rounded-none hover:bg-green-400 hover:text-black transition-all duration-200 font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] relative overflow-hidden before:content-["EXECUTE_"] before:mr-1',
      background: 'bg-black',
      booleanSwitch: {
        track: 'border-2 rounded-none data-[state=unchecked]:bg-black data-[state=unchecked]:border-green-600/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400 data-[state=checked]:shadow-[0_0_10px_rgba(34,197,94,0.6)]',
        thumb: 'data-[state=unchecked]:bg-green-600 data-[state=checked]:bg-black shadow-lg rounded-none',
        activeLabel: 'text-green-400 font-mono font-bold uppercase tracking-wider before:content-["[ON]"] before:mr-2',
        inactiveLabel: 'text-green-600/50 font-mono uppercase tracking-wider before:content-["[OFF]"] before:mr-2'
      },
      progressBar: {
        container: 'w-full bg-black border border-green-600/30 rounded-none h-4 mb-6 relative overflow-hidden before:content-["LOADING..."] before:absolute before:left-2 before:top-0 before:text-[10px] before:text-green-600/50 before:font-mono before:leading-4',
        fill: 'bg-green-500 h-4 rounded-none transition-all duration-300 ease-linear relative before:content-[""] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.3)_10px,rgba(0,0,0,0.3)_20px)] before:animate-scan'
      }
    }
  },
  {
    id: 'royal-quantum',
    name: 'Royal Quantum',
    description: 'Regal purple meets quantum physics with particle effects and royal grandeur',
    preview: 'bg-gradient-to-br from-purple-800 via-violet-900 to-indigo-950 border-2 border-gold-400',
    styles: {
      container: 'max-w-2xl mx-auto p-10 bg-gradient-to-br from-purple-900/95 via-violet-950/95 to-indigo-950/95 backdrop-blur-xl border-2 border-yellow-400/40 rounded-3xl shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.1)_0%,transparent_50%)] after:content-[""] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.1)_0%,transparent_50%)]',
      header: 'text-5xl font-serif font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-10 tracking-wide text-center relative before:content-["♛"] before:absolute before:-left-16 before:text-yellow-400/40 before:text-6xl after:content-["♛"] after:absolute after:-right-16 after:text-yellow-400/40 after:text-6xl drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]',
      field: 'mb-8 relative before:content-[""] before:absolute before:-left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-yellow-400/50 before:to-transparent',
      label: 'inline-block text-sm font-serif font-semibold text-yellow-300 mb-4 tracking-widest uppercase relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-yellow-400/30 after:to-transparent',
      input: 'w-full px-5 py-3 h-12 border border-yellow-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300 bg-purple-950/50 backdrop-blur-sm text-white placeholder-violet-300/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] font-serif',
      button: 'w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-purple-900 py-4 px-8 rounded-xl hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all duration-300 font-serif font-bold uppercase tracking-widest transform hover:scale-105 relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.7)_50%,transparent_60%)] before:translate-x-[-150%] hover:before:translate-x-[150%] before:transition-transform before:duration-700',
      background: 'bg-gradient-to-br from-purple-950 via-violet-950 to-indigo-950',
      booleanSwitch: {
        track: 'border-2 data-[state=unchecked]:bg-purple-900/50 data-[state=unchecked]:border-violet-400/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-yellow-300 data-[state=checked]:border-yellow-400 data-[state=checked]:shadow-[0_0_20px_rgba(251,191,36,0.5)]',
        thumb: 'data-[state=unchecked]:bg-violet-400 data-[state=checked]:bg-purple-900 shadow-xl',
        activeLabel: 'text-yellow-300 font-serif font-semibold tracking-widest uppercase',
        inactiveLabel: 'text-violet-400/60 font-serif'
      },
      progressBar: {
        container: 'w-full bg-purple-950/50 rounded-full h-4 mb-8 border border-yellow-400/20 backdrop-blur-sm shadow-inner relative overflow-hidden',
        fill: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 h-4 rounded-full transition-all duration-700 ease-out shadow-[0_0_30px_rgba(251,191,36,0.6)] relative before:content-[""] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.3)_20px,rgba(255,255,255,0.3)_40px)] before:animate-slide'
      }
    }
  },
  {
    id: 'executive-neon',
    name: 'Executive Neon',
    description: 'Corporate elegance meets electric neon accents for modern executives',
    preview: 'bg-gradient-to-r from-slate-900 to-gray-900 border-t-4 border-electric-blue-500',
    styles: {
      container: 'max-w-2xl mx-auto p-10 bg-gradient-to-b from-slate-900 to-gray-900 border border-gray-700 rounded-none shadow-2xl relative overflow-hidden before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-500 before:via-cyan-400 before:to-blue-500 before:animate-slide after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-cyan-400/50 after:to-transparent',
      header: 'text-4xl font-sans font-light text-white mb-10 tracking-[0.2em] text-center uppercase relative after:content-[""] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-32 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent',
      field: 'mb-8 relative group',
      label: 'block text-xs font-sans font-medium text-gray-400 mb-3 tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-cyan-400',
      input: 'w-full px-4 py-3 h-12 border border-gray-700 bg-gray-800/50 rounded-none focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_0_1px_rgba(6,182,212,0.5)] transition-all duration-300 text-white placeholder-gray-500 font-light tracking-wide hover:border-gray-600',
      button: 'relative w-full bg-gray-900 border border-gray-700 text-white py-4 px-8 rounded-none transition-all duration-300 font-light uppercase tracking-[0.2em] hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
      background: 'bg-gradient-to-b from-gray-900 to-slate-900',
      booleanSwitch: {
        track: 'border data-[state=unchecked]:bg-gray-800 data-[state=unchecked]:border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-cyan-400 data-[state=checked]:shadow-[inset_0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300',
        thumb: 'data-[state=unchecked]:bg-gray-600 data-[state=checked]:bg-cyan-400 shadow-lg data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-300',
        activeLabel: 'text-cyan-400 font-light tracking-[0.15em] uppercase',
        inactiveLabel: 'text-gray-500 font-light tracking-[0.15em] uppercase'
      },
      progressBar: {
        container: 'w-full bg-gray-800 h-1 mb-8 relative overflow-hidden',
        fill: 'bg-cyan-400 h-1 transition-all duration-500 ease-out relative shadow-[0_0_10px_rgba(6,182,212,0.6)] before:content-[""] before:absolute before:top-0 before:right-0 before:bottom-0 before:w-2 before:bg-white before:blur-sm before:animate-pulse'
      }
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
        elements: [],
        settings: {
          description: '',
          showProgressBar: false,
          allowSaveProgress: false,
          showFormTitle: true,
          compactMode: false,
        }
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

  const updateFormData = (title: string, elements: FormElement[], settings?: any) => {
    setWizardState(prev => {
      const newState = {
        ...prev,
        formData: { 
          title, 
          elements,
          settings: settings || prev.formData.settings
        }
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

  const customizeThemeColors = (colors: CustomColors) => {
    setWizardState(prev => {
      if (!prev.selectedTheme) return prev;
      
      const customizedTheme = applyCustomColors(prev.selectedTheme, colors);
      const newState = {
        ...prev,
        selectedTheme: customizedTheme
      };
      saveToStorage(newState);
      return newState;
    });
  };

  const resetThemeColors = () => {
    setWizardState(prev => {
      if (!prev.selectedTheme) return prev;
      
      // Find the original theme from defaultThemes
      const originalTheme = defaultThemes.find(t => t.id === prev.selectedTheme!.id);
      if (!originalTheme) return prev;
      
      const newState = {
        ...prev,
        selectedTheme: { ...originalTheme, customColors: undefined }
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
        elements: [],
        settings: {
          description: '',
          showProgressBar: false,
          allowSaveProgress: false,
          showFormTitle: true,
          compactMode: false,
        }
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
    customizeThemeColors,
    resetThemeColors,
    completeWizard,
    resetWizard
  };
}