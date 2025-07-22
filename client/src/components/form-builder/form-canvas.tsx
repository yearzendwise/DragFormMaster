import { FormElement } from '@/types/form-builder';
import { DroppableCanvas } from './droppable-canvas';

interface FormCanvasProps {
  formTitle: string;
  elements: FormElement[];
  selectedElementId: string | null;
  previewMode: boolean;
  onSelectElement: (id: string | null) => void;
  onRemoveElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  onUpdateFormTitle: (title: string) => void;
  onTogglePreview: () => void;
}

export function FormCanvas({
  formTitle,
  elements,
  selectedElementId,
  previewMode,
  onSelectElement,
  onRemoveElement,
  onUpdateElement,
  onUpdateFormTitle,
  onTogglePreview,
}: FormCanvasProps) {
  return (
    <main className="flex-1 flex flex-col bg-neutral-50">
      {/* Canvas Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => onUpdateFormTitle(e.target.value)}
              className="text-lg font-semibold text-neutral-800 bg-transparent border-none outline-none focus:ring-0"
              placeholder="Form Title"
            />
            <p className="text-sm text-neutral-500">
              {previewMode 
                ? "Preview mode - see how your form will look to users"
                : "Drag components from the sidebar to build your form"
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                !previewMode 
                  ? 'bg-blue-600 text-white' 
                  : 'text-neutral-600 hover:text-blue-600'
              }`}
              onClick={onTogglePreview}
            >
              <i className="fas fa-edit mr-1"></i>Edit
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                previewMode 
                  ? 'bg-blue-600 text-white' 
                  : 'text-neutral-600 hover:text-blue-600'
              }`}
              onClick={onTogglePreview}
            >
              <i className="fas fa-eye mr-1"></i>Preview
            </button>
          </div>
        </div>
      </div>

      <DroppableCanvas
        elements={elements}
        selectedElementId={selectedElementId}
        onSelectElement={onSelectElement}
        onRemoveElement={onRemoveElement}
        onUpdateElement={onUpdateElement}
        formTitle={formTitle}
        previewMode={previewMode}
      />
    </main>
  );
}
