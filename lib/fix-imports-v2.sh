#!/bin/bash

echo "Fixing import paths in src directory..."

# Fix wizard-steps imports (they are in src/components/form-builder/wizard-steps/)
echo "Fixing wizard-steps imports..."
find /home/coder/DragFormMaster/lib/src/components/form-builder/wizard-steps -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./\.\./\.\./types/|from '../../../types/|g" \
  -e "s|from \"\.\./\.\./\.\./\.\./types/|from \"../../../types/|g" \
  -e "s|from '\.\./\.\./\.\./hooks/|from '../../../hooks/|g" \
  -e "s|from \"\.\./\.\./\.\./hooks/|from \"../../../hooks/|g" \
  -e "s|from '\.\./\.\./ui/|from '../../ui/|g" \
  -e "s|from \"\.\./\.\./ui/|from \"../../ui/|g" \
  -e "s|from '\.\./\.\./\.\./\.\./utils/|from '../../../utils/|g" \
  -e "s|from \"\.\./\.\./\.\./\.\./utils/|from \"../../../utils/|g" \
  {} \;

# Fix form-builder components imports (they are in src/components/form-builder/)
echo "Fixing form-builder component imports..."
find /home/coder/DragFormMaster/lib/src/components/form-builder -maxdepth 1 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./\.\./types/|from '../../types/|g" \
  -e "s|from \"\.\./\.\./\.\./types/|from \"../../types/|g" \
  -e "s|from '\.\./\.\./\.\./hooks/|from '../../hooks/|g" \
  -e "s|from \"\.\./\.\./\.\./hooks/|from \"../../hooks/|g" \
  -e "s|from '\.\./\.\./\.\./utils/|from '../../utils/|g" \
  -e "s|from \"\.\./\.\./\.\./utils/|from \"../../utils/|g" \
  -e "s|from '\.\./\.\./\.\./lib/|from '../../lib/|g" \
  -e "s|from \"\.\./\.\./\.\./lib/|from \"../../lib/|g" \
  {} \;

# Fix UI components imports (they are in src/components/ui/)
echo "Fixing UI component imports..."
find /home/coder/DragFormMaster/lib/src/components/ui -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./\.\./lib/|from '../../lib/|g" \
  -e "s|from \"\.\./\.\./\.\./lib/|from \"../../lib/|g" \
  -e "s|from '\.\./\.\./\.\./hooks/|from '../../hooks/|g" \
  -e "s|from \"\.\./\.\./\.\./hooks/|from \"../../hooks/|g" \
  {} \;

# Fix FormBuilder.tsx imports (it's in src/components/)
echo "Fixing FormBuilder.tsx imports..."
sed -i \
  -e "s|from '\.\./types/|from '../types/|g" \
  -e "s|from \"\.\./types/|from \"../types/|g" \
  /home/coder/DragFormMaster/lib/src/components/FormBuilder.tsx

echo "Import paths fixed!"