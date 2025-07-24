import React from 'react';
import { HeadlessUIBooleanSwitch } from '@/components/form-builder/headlessui-form-components';
import { formThemes } from '@/hooks/use-form-wizard';

export default function TestSwitch() {
  const [values, setValues] = React.useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-8">Boolean Switch Test - All Themes</h1>
      
      {formThemes.map((theme) => (
        <div key={theme.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">{theme.name} Theme</h2>
          
          <div className="space-y-4">
            {/* Test with labels */}
            <div>
              <p className="text-sm text-gray-600 mb-2">With Labels:</p>
              <HeadlessUIBooleanSwitch
                name={`${theme.id}-with-labels`}
                themeStyles={theme.styles}
                value={values[`${theme.id}-with-labels`] || false}
                onValueChange={(value: boolean) => setValues(prev => ({ ...prev, [`${theme.id}-with-labels`]: value }))}
                variant="yes-no"
                showLabels={true}
              />
            </div>
            
            {/* Test without labels */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Without Labels:</p>
              <HeadlessUIBooleanSwitch
                name={`${theme.id}-no-labels`}
                themeStyles={theme.styles}
                value={values[`${theme.id}-no-labels`] || false}
                onValueChange={(value: boolean) => setValues(prev => ({ ...prev, [`${theme.id}-no-labels`]: value }))}
                variant="on-off"
                showLabels={false}
              />
            </div>
            
            {/* Test different variants */}
            <div>
              <p className="text-sm text-gray-600 mb-2">True/False Variant:</p>
              <HeadlessUIBooleanSwitch
                name={`${theme.id}-true-false`}
                themeStyles={theme.styles}
                value={values[`${theme.id}-true-false`] || false}
                onValueChange={(value: boolean) => setValues(prev => ({ ...prev, [`${theme.id}-true-false`]: value }))}
                variant="true-false"
                showLabels={true}
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Current Values:</h3>
        <pre className="text-xs">{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
}