import { FormTheme } from '@/types/form-builder';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface StyleStepProps {
  themes: FormTheme[];
  selectedTheme: FormTheme | null;
  onSelectTheme: (theme: FormTheme) => void;
}

export function StyleStep({ themes, selectedTheme, onSelectTheme }: StyleStepProps) {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-6 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Your Form Style</h2>
          <p className="text-slate-600">Select a visual theme that matches your brand and preferences</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative group cursor-pointer transition-all duration-200 ${
                  selectedTheme?.id === theme.id
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : 'hover:shadow-lg hover:scale-105'
                }`}
                onClick={() => onSelectTheme(theme)}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                  {/* Preview */}
                  <div className={`h-40 ${theme.preview} relative flex items-center justify-center overflow-hidden`}>
                    {selectedTheme?.id === theme.id && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                    
                    {/* Theme-specific preview content */}
                    <div className="text-center px-4">
                      {theme.id === 'neon' && (
                        <div className="text-cyan-400 font-bold text-lg tracking-wider drop-shadow-lg">
                          CYBER<span className="text-green-400">FORM</span>
                        </div>
                      )}
                      {theme.id === 'nature' && (
                        <div className="text-white font-semibold text-lg">
                          🌿 Natural Forms 🌿
                        </div>
                      )}
                      {theme.id === 'luxury' && (
                        <div className="text-yellow-400 font-light text-lg tracking-widest font-serif">
                          LUXURY DESIGN
                        </div>
                      )}
                      {theme.id === 'retro' && (
                        <div className="text-white font-black text-lg tracking-wider transform -skew-x-12 uppercase">
                          80S STYLE
                        </div>
                      )}
                      {theme.id === 'cosmic' && (
                        <div className="text-purple-300 font-bold text-lg tracking-wider drop-shadow-lg">
                          <span className="text-cyan-400">✦</span> COSMIC <span className="text-pink-400">✦</span>
                        </div>
                      )}
                      {theme.id === 'brutalist' && (
                        <div className="text-white font-black text-lg tracking-wider uppercase border-4 border-white px-4 py-2">
                          BRUTALIST
                        </div>
                      )}
                      {theme.id === 'pastel-dream' && (
                        <div className="text-purple-600 font-medium text-lg tracking-wide">
                          ✨ Pastel Dreams ✨
                        </div>
                      )}
                      {theme.id === 'professional' && (
                        <div className="text-blue-600 font-semibold text-lg">
                          PROFESSIONAL
                        </div>
                      )}
                      {theme.id === 'neo-modern' && (
                        <div className="text-green-400 font-mono font-bold text-lg tracking-wider">
                          &gt; NEO_MODERN.exe
                        </div>
                      )}
                      {theme.id === 'modern-bold' && (
                        <div className="text-white font-black text-xl tracking-wider drop-shadow-lg">
                          MODERN BOLD
                        </div>
                      )}
                      {theme.id === 'minimal' && (
                        <div className="text-gray-800 font-light text-lg tracking-wide">
                          MINIMAL
                        </div>
                      )}
                      {theme.id === 'aurora' && (
                        <div className="text-teal-300 font-light text-lg tracking-widest drop-shadow-lg">
                          <span className="text-emerald-300">✦</span> AURORA <span className="text-cyan-300">✦</span>
                        </div>
                      )}
                      {theme.id === 'sunset' && (
                        <div className="text-white font-bold text-lg tracking-wide drop-shadow-lg">
                          <span className="text-yellow-300">☀</span> SUNSET <span className="text-rose-300">☀</span>
                        </div>
                      )}
                      {theme.id === 'ocean-depth' && (
                        <div className="text-blue-300 font-bold text-lg tracking-wide drop-shadow-[0_0_10px_rgba(147,197,253,0.8)]">
                          <span className="text-cyan-300">🌊</span> OCEAN DEPTH <span className="text-blue-400">🌊</span>
                        </div>
                      )}
                      {theme.id === 'matrix' && (
                        <div className="text-green-400 font-mono font-bold text-lg tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                          [MATRIX_THEME]
                        </div>
                      )}
                      {theme.id === 'royal-quantum' && (
                        <div className="text-yellow-300 font-serif text-lg tracking-widest drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                          ♛ ROYAL QUANTUM ♛
                        </div>
                      )}
                      {theme.id === 'executive-neon' && (
                        <div className="text-cyan-400 font-sans font-light text-lg tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                          EXECUTIVE
                        </div>
                      )}
                      {!['neon', 'nature', 'luxury', 'retro', 'cosmic', 'brutalist', 'pastel-dream', 'professional', 'neo-modern', 'minimal', 'modern-bold', 'aurora', 'sunset', 'ocean-depth', 'matrix', 'royal-quantum', 'executive-neon'].includes(theme.id) && (
                        <>
                          <div className="text-white font-semibold opacity-90 text-lg">{theme.name}</div>
                          <div className="text-white text-sm opacity-60 mt-1">Theme Preview</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{theme.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{theme.description}</p>
                    
                    {/* Enhanced sample form preview */}
                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg border overflow-hidden">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-700">Name</div>
                        <div className={`h-8 px-3 flex items-center text-xs ${
                          theme.id === 'neon' ? 'bg-gray-900 border-2 border-cyan-400 text-cyan-100' :
                          theme.id === 'nature' ? 'bg-white border-2 border-green-300 rounded-2xl' :
                          theme.id === 'luxury' ? 'bg-purple-800/50 border border-yellow-400 text-white' :
                          theme.id === 'retro' ? 'bg-yellow-50 border-3 border-orange-400' :
                          theme.id === 'glassmorphism' ? 'bg-transparent backdrop-blur-xl border border-white/30 rounded-2xl text-white shadow-inner shadow-black/10' :
                          theme.id === 'elegant' ? 'bg-gray-800 border border-gray-600 text-white rounded-lg' :
                          theme.id === 'playful' ? 'bg-pink-50 border-3 border-pink-300 rounded-2xl' :
                          theme.id === 'modern' ? 'bg-white/80 border-2 border-gray-200 rounded-xl backdrop-blur-sm' :
                          theme.id === 'professional' ? 'bg-white border border-gray-300 rounded-md' :
                          theme.id === 'cosmic' ? 'bg-black/40 border border-purple-500/40 text-purple-200 rounded-lg' :
                          theme.id === 'brutalist' ? 'bg-white border-4 border-black' :
                          theme.id === 'pastel-dream' ? 'bg-white/70 border-2 border-purple-200 rounded-2xl' :
                          theme.id === 'neo-modern' ? 'bg-black/50 border border-green-400/30 text-green-100 font-mono' :
                          theme.id === 'modern-bold' ? 'bg-gradient-to-r from-white to-gray-50 border-3 border-orange-500/30 text-gray-900 font-semibold rounded-2xl shadow-lg' :
                          theme.id === 'aurora' ? 'bg-slate-800/50 border border-teal-400/30 text-teal-100' :
                          theme.id === 'sunset' ? 'bg-white/70 border-2 border-orange-200 rounded-2xl' :
                          theme.id === 'ocean-depth' ? 'bg-blue-950/50 border border-blue-400/30 rounded-2xl text-blue-100' :
                          theme.id === 'matrix' ? 'bg-black border border-green-500/50 text-green-100 font-mono' :
                          theme.id === 'royal-quantum' ? 'bg-purple-950/50 border border-yellow-400/30 rounded-xl text-white font-serif' :
                          theme.id === 'executive-neon' ? 'bg-gray-800/50 border border-gray-700 text-white' :
                          'bg-white border border-gray-300 rounded-lg'
                        }`}>
                          <div className={theme.id === 'neon' || theme.id === 'luxury' || theme.id === 'elegant' || theme.id === 'glassmorphism' || theme.id === 'cosmic' || theme.id === 'neo-modern' || theme.id === 'aurora' || theme.id === 'ocean-depth' || theme.id === 'matrix' || theme.id === 'royal-quantum' || theme.id === 'executive-neon' ? 'text-gray-300' : theme.id === 'brutalist' || theme.id === 'modern-bold' ? 'text-black' : 'text-slate-400'}>
                            Enter your name
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-700">Email</div>
                        <div className={`h-8 px-3 flex items-center text-xs ${
                          theme.id === 'neon' ? 'bg-gray-900 border-2 border-green-400 text-green-100' :
                          theme.id === 'nature' ? 'bg-white border-2 border-emerald-300 rounded-2xl' :
                          theme.id === 'luxury' ? 'bg-purple-800/50 border border-yellow-400 text-white' :
                          theme.id === 'retro' ? 'bg-yellow-50 border-3 border-pink-400' :
                          theme.id === 'glassmorphism' ? 'bg-transparent backdrop-blur-xl border border-white/30 rounded-2xl text-white shadow-inner shadow-black/10' :
                          theme.id === 'elegant' ? 'bg-gray-800 border border-gray-600 text-white rounded-lg' :
                          theme.id === 'playful' ? 'bg-pink-50 border-3 border-purple-300 rounded-2xl' :
                          theme.id === 'modern' ? 'bg-white/80 border-2 border-gray-200 rounded-xl backdrop-blur-sm' :
                          theme.id === 'professional' ? 'bg-white border border-gray-300 rounded-md' :
                          theme.id === 'cosmic' ? 'bg-black/40 border border-purple-500/40 text-purple-200 rounded-lg' :
                          theme.id === 'brutalist' ? 'bg-white border-4 border-black' :
                          theme.id === 'pastel-dream' ? 'bg-white/70 border-2 border-purple-200 rounded-2xl' :
                          theme.id === 'neo-modern' ? 'bg-black/50 border border-green-400/30 text-green-100 font-mono' :
                          theme.id === 'modern-bold' ? 'bg-gradient-to-r from-white to-gray-50 border-3 border-orange-500/30 text-gray-900 font-semibold rounded-2xl shadow-lg' :
                          theme.id === 'aurora' ? 'bg-slate-800/50 border border-teal-400/30 text-teal-100' :
                          theme.id === 'sunset' ? 'bg-white/70 border-2 border-orange-200 rounded-2xl' :
                          theme.id === 'ocean-depth' ? 'bg-blue-950/50 border border-blue-400/30 rounded-2xl text-blue-100' :
                          theme.id === 'matrix' ? 'bg-black border border-green-500/50 text-green-100 font-mono' :
                          theme.id === 'royal-quantum' ? 'bg-purple-950/50 border border-yellow-400/30 rounded-xl text-white font-serif' :
                          theme.id === 'executive-neon' ? 'bg-gray-800/50 border border-gray-700 text-white' :
                          'bg-white border border-gray-300 rounded-lg'
                        }`}>
                          <div className={theme.id === 'neon' || theme.id === 'luxury' || theme.id === 'elegant' || theme.id === 'glassmorphism' || theme.id === 'cosmic' || theme.id === 'neo-modern' || theme.id === 'aurora' || theme.id === 'ocean-depth' || theme.id === 'matrix' || theme.id === 'royal-quantum' || theme.id === 'executive-neon' ? 'text-gray-300' : theme.id === 'brutalist' || theme.id === 'modern-bold' ? 'text-black' : 'text-slate-400'}>
                            Enter your email
                          </div>
                        </div>
                      </div>
                      <div className={`h-8 flex items-center justify-center text-xs font-medium ${
                        theme.id === 'neon' ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-black rounded-lg' :
                        theme.id === 'nature' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl' :
                        theme.id === 'luxury' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-lg' :
                        theme.id === 'retro' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' :
              
                        theme.id === 'elegant' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg' :
                        theme.id === 'playful' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl' :
                        theme.id === 'modern' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl' :
                        theme.id === 'professional' ? 'bg-blue-600 text-white rounded-md' :
                        theme.id === 'cosmic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg' :
                        theme.id === 'brutalist' ? 'bg-black text-white border-4 border-black' :
                        theme.id === 'pastel-dream' ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl' :
                        theme.id === 'neo-modern' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-black font-mono border border-green-400/50' :
                        theme.id === 'modern-bold' ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl border-2 border-white/20' :
                        theme.id === 'aurora' ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white rounded-xl' :
                        theme.id === 'sunset' ? 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white rounded-2xl' :
                        theme.id === 'ocean-depth' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white rounded-2xl' :
                        theme.id === 'matrix' ? 'bg-black border-2 border-green-400 text-green-400 font-mono uppercase tracking-widest' :
                        theme.id === 'royal-quantum' ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-purple-900 rounded-xl font-serif font-bold uppercase' :
                        theme.id === 'executive-neon' ? 'bg-gray-900 border border-gray-700 text-cyan-400 font-light uppercase tracking-widest' :
                        'bg-gray-900 text-white rounded-lg'
                      }`}>
                        Submit
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}