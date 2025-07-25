import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomColors, FormTheme } from '@/types/form-builder';
import { Palette, RotateCcw } from 'lucide-react';

interface ColorCustomizerProps {
  theme: FormTheme;
  onColorsChange: (colors: CustomColors) => void;
  onResetColors: () => void;
}

export function ColorCustomizer({ theme, onColorsChange, onResetColors }: ColorCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current colors (either custom or defaults)
  const currentColors = theme.customColors || {
    primary: '#3B82F6', // Default blue
    secondary: '#6B7280', // Default gray
    background: '#F9FAFB' // Default light gray
  };

  const [colors, setColors] = useState<CustomColors>(currentColors);

  const handleColorChange = (colorType: keyof CustomColors, value: string) => {
    const newColors = { ...colors, [colorType]: value };
    setColors(newColors);
    onColorsChange(newColors);
  };

  const handleReset = () => {
    setColors({
      primary: '#3B82F6',
      secondary: '#6B7280', 
      background: '#F9FAFB'
    });
    onResetColors();
  };

  const presetColors = {
    primary: [
      '#3B82F6', // Blue
      '#EF4444', // Red
      '#10B981', // Green
      '#8B5CF6', // Purple
      '#F59E0B', // Amber
      '#EC4899', // Pink
      '#06B6D4', // Cyan
      '#84CC16', // Lime
    ],
    secondary: [
      '#6B7280', // Gray
      '#374151', // Dark gray
      '#9CA3AF', // Light gray
      '#1F2937', // Very dark gray
      '#F3F4F6', // Very light gray
      '#E5E7EB', // Light gray
      '#D1D5DB', // Medium light gray
      '#4B5563', // Medium gray
    ],
    background: [
      '#FFFFFF', // White
      '#F9FAFB', // Very light gray
      '#F3F4F6', // Light gray
      '#E5E7EB', // Medium light gray
      '#000000', // Black
      '#1F2937', // Dark gray
      '#111827', // Very dark gray
      '#030712', // Almost black
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-200"
        >
          <Palette className="w-4 h-4" />
          Modify Colors
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize Colors - {theme.name} Theme
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Primary Color */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Primary Color
              <span className="text-xs text-gray-500 ml-2">(buttons, links, accents)</span>
            </Label>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: colors.primary }}
              />
              <Input
                type="color"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-16 h-10 p-1 border-gray-200"
              />
              <Input
                type="text"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                placeholder="#3B82F6"
                className="flex-1 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {presetColors.primary.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform duration-150"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange('primary', color)}
                />
              ))}
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Secondary Color
              <span className="text-xs text-gray-500 ml-2">(borders, subtle elements)</span>
            </Label>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: colors.secondary }}
              />
              <Input
                type="color"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-16 h-10 p-1 border-gray-200"
              />
              <Input
                type="text"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                placeholder="#6B7280"
                className="flex-1 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {presetColors.secondary.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform duration-150"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange('secondary', color)}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Background Color
              <span className="text-xs text-gray-500 ml-2">(form background)</span>
            </Label>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: colors.background }}
              />
              <Input
                type="color"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-16 h-10 p-1 border-gray-200"
              />
              <Input
                type="text"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                placeholder="#F9FAFB"
                className="flex-1 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {presetColors.background.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform duration-150"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange('background', color)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-3">Preview</div>
            <div 
              className="p-4 rounded-lg border"
              style={{ backgroundColor: colors.background }}
            >
              <div 
                className="text-lg font-semibold mb-3"
                style={{ color: colors.primary }}
              >
                Sample Form Title
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.secondary }}>
                    Sample Input
                  </label>
                  <div className="w-full px-3 py-2 border rounded text-sm bg-white" style={{ borderColor: colors.secondary }}>
                    Sample text...
                  </div>
                </div>
                <button 
                  className="w-full py-2 px-4 rounded text-white text-sm font-medium"
                  style={{ backgroundColor: colors.primary }}
                >
                  Submit Button
                </button>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-green-600 hover:bg-green-700"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}