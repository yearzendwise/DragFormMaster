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
                  <div className={`h-32 ${theme.preview} relative flex items-center justify-center`}>
                    {selectedTheme?.id === theme.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-white font-semibold opacity-75">Preview</div>
                      <div className="text-white text-sm opacity-50">{theme.name}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{theme.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{theme.description}</p>
                    
                    {/* Sample form preview */}
                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg border">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-700">Name</div>
                        <div className="h-8 bg-white border border-slate-200 rounded px-3 flex items-center">
                          <div className="text-xs text-slate-400">Enter your name</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-700">Email</div>
                        <div className="h-8 bg-white border border-slate-200 rounded px-3 flex items-center">
                          <div className="text-xs text-slate-400">Enter your email</div>
                        </div>
                      </div>
                      <div className="h-8 bg-blue-500 rounded flex items-center justify-center">
                        <div className="text-xs text-white font-medium">Submit</div>
                      </div>
                    </div>

                    <Button
                      variant={selectedTheme?.id === theme.id ? "default" : "outline"}
                      size="sm"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTheme(theme);
                      }}
                    >
                      {selectedTheme?.id === theme.id ? "Selected" : "Select Theme"}
                    </Button>
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