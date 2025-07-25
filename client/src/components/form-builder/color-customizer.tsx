import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { CustomColors, FormTheme } from '@/types/form-builder';
import { Palette, RotateCcw, Sparkles, Pipette } from 'lucide-react';
import { getThemeGradientPresets } from '@/utils/theme-gradient-presets';
import { extractThemeColors } from '@/utils/theme-color-utils';

interface ColorCustomizerProps {
  theme: FormTheme;
  onColorsChange: (colors: CustomColors) => void;
  onResetColors: () => void;
}

export function ColorCustomizer({ theme, onColorsChange, onResetColors }: ColorCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get theme defaults as base colors
  const themeDefaults = extractThemeColors(theme);
  
  // Get current colors (either custom or defaults)
  const currentColors = theme.customColors || themeDefaults;
  const [colors, setColors] = useState<CustomColors>(currentColors);
  
  // Track which colors are using gradients
  const [useGradient, setUseGradient] = useState({
    primary: !!currentColors.primaryGradient,
    secondary: !!currentColors.secondaryGradient,
    background: !!currentColors.backgroundGradient
  });

  // Get theme-specific gradient presets
  const gradientPresets = getThemeGradientPresets(theme.id);

  useEffect(() => {
    // Update colors when theme changes
    const newColors = theme.customColors || extractThemeColors(theme);
    setColors(newColors);
    setUseGradient({
      primary: !!newColors.primaryGradient,
      secondary: !!newColors.secondaryGradient,
      background: !!newColors.backgroundGradient
    });
  }, [theme]);

  const handleColorChange = (colorType: keyof CustomColors, value: string) => {
    const newColors = { ...colors, [colorType]: value };
    setColors(newColors);
    onColorsChange(newColors);
  };

  const handleGradientToggle = (colorType: 'primary' | 'secondary' | 'background', enabled: boolean) => {
    const newUseGradient = { ...useGradient, [colorType]: enabled };
    setUseGradient(newUseGradient);
    
    // If disabling gradient, remove the gradient property
    if (!enabled) {
      const newColors = { ...colors };
      delete newColors[`${colorType}Gradient` as keyof CustomColors];
      setColors(newColors);
      onColorsChange(newColors);
    }
  };

  const handleGradientSelect = (colorType: 'primary' | 'secondary' | 'background', gradient: string) => {
    const newColors = { 
      ...colors, 
      [`${colorType}Gradient` as keyof CustomColors]: gradient 
    };
    setColors(newColors);
    onColorsChange(newColors);
  };

  const handleReset = () => {
    const defaultColors = extractThemeColors(theme);
    setColors(defaultColors);
    setUseGradient({
      primary: false,
      secondary: false,
      background: false
    });
    onResetColors();
    setIsOpen(false);
  };

  const presetColors = {
    primary: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
    secondary: ['#6B7280', '#64748B', '#78716C', '#71717A', '#737373', '#525252'],
    background: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#F8FAFC', '#FAFAFA']
  };

  const renderColorSection = (
    colorType: 'primary' | 'secondary' | 'background',
    label: string,
    description: string
  ) => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <div className="flex items-center gap-2">
            <Label htmlFor={`${colorType}-gradient`} className="text-xs">
              Use Gradient
            </Label>
            <Switch
              id={`${colorType}-gradient`}
              checked={useGradient[colorType]}
              onCheckedChange={(checked) => handleGradientToggle(colorType, checked)}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
      </div>

      <Tabs defaultValue="color" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          {useGradient[colorType] && <TabsTrigger value="gradients">Gradients</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="color" className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="color"
                value={colors[colorType]}
                onChange={(e) => handleColorChange(colorType, e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={colors[colorType]}
              onChange={(e) => handleColorChange(colorType, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="presets">
          <div className="grid grid-cols-6 gap-2">
            {presetColors[colorType].map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(colorType, color)}
                className="w-full h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </TabsContent>
        
        {useGradient[colorType] && (
          <TabsContent value="gradients" className="space-y-2">
            {gradientPresets[colorType].map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleGradientSelect(colorType, preset.gradient)}
                className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-all text-left"
              >
                <div className={`h-8 rounded mb-2 ${preset.preview}`} />
                <p className="text-xs font-medium">{preset.name}</p>
              </button>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );

  // Create preview styles
  const previewStyles = {
    primary: useGradient.primary && colors.primaryGradient 
      ? { background: colors.primaryGradient }
      : { backgroundColor: colors.primary },
    secondary: useGradient.secondary && colors.secondaryGradient
      ? { background: colors.secondaryGradient }
      : { backgroundColor: colors.secondary },
    background: useGradient.background && colors.backgroundGradient
      ? { background: colors.backgroundGradient }
      : { backgroundColor: colors.background }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Modify Colors
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Theme Colors</DialogTitle>
          <DialogDescription>
            Personalize your form with custom colors and gradients. Changes are applied in real-time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {renderColorSection('primary', 'Primary Color', 'Used for buttons, links, and interactive elements')}
          {renderColorSection('secondary', 'Secondary Color', 'Used for labels, headings, and secondary text')}
          {renderColorSection('background', 'Background Color', 'Used for form background and containers')}
          
          {/* Live Preview */}
          <div className="mt-6 p-4 border rounded-lg space-y-3">
            <Label className="text-sm font-medium">Live Preview</Label>
            <div className="space-y-3">
              <div className="p-4 rounded" style={previewStyles.background}>
                <label className="block text-sm font-medium mb-2" style={previewStyles.secondary}>
                  Sample Label
                </label>
                <input 
                  type="text" 
                  placeholder="Sample input field"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.primary }}
                />
                <button 
                  className="mt-3 px-4 py-2 rounded text-white font-medium"
                  style={previewStyles.primary}
                >
                  Sample Button
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Theme Defaults
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}