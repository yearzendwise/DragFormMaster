import { FormElement, FormElementType } from '@/types/form-builder';
import { DroppableCanvas } from './droppable-canvas';

interface FormCanvasProps {
  formTitle: string;
  elements: FormElement[];
  selectedElementId: string | null;
  previewMode: boolean;
  draggedType: FormElementType | null;
  onSelectElement: (id: string | null) => void;
  onRemoveElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  onUpdateFormTitle: (title: string) => void;
  onTogglePreview: () => void;
  onMobileEdit?: (id: string) => void;
  isDragging?: boolean;
  onMoveElement?: (fromIndex: number, toIndex: number) => void;
}

export function FormCanvas({
  formTitle,
  elements,
  selectedElementId,
  previewMode,
  draggedType,
  onSelectElement,
  onRemoveElement,
  onUpdateElement,
  onUpdateFormTitle,
  onTogglePreview,
  onMobileEdit,
  isDragging = false,
  onMoveElement,
}: FormCanvasProps) {
  return (
    <main className="flex-1 flex flex-col bg-neutral-50">
      {/* Canvas Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-3 md:px-6 py-3 md:py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <input
                type="text"
                value={formTitle}
                onChange={(e) => onUpdateFormTitle(e.target.value)}
                className="text-lg md:text-xl font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 placeholder-slate-400 w-full"
                placeholder="Untitled Form"
              />
              <div className="flex items-center space-x-1 hidden sm:flex">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Auto-saved</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-600 flex items-center">
              {previewMode ? (
                <>
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="hidden sm:inline">Preview mode - see how your form will look to users</span>
                  <span className="sm:hidden">Preview mode</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd"/>
                  </svg>
                  <span className="hidden sm:inline">Build mode - drag components from the sidebar or click to add</span>
                  <span className="sm:hidden">Build mode</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-1 md:space-x-2 ${
                  !previewMode 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
                onClick={onTogglePreview}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button 
                className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-1 md:space-x-2 ${
                  previewMode 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
                onClick={onTogglePreview}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>
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
        draggedType={draggedType}
        onMobileEdit={onMobileEdit}
        isDragging={isDragging}
        onMoveElement={onMoveElement}
      />
    </main>
  );
}
