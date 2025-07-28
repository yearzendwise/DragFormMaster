#!/bin/bash

echo "Fixing import paths in src directory..."

# Fix wizard-steps imports (they are 3 levels deep)
echo "Fixing wizard-steps imports..."
find /home/coder/DragFormMaster/lib/src/components/form-builder/wizard-steps -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./hooks/|from '../../../hooks/|g" \
  -e "s|from \"\.\./\.\./hooks/|from \"../../../hooks/|g" \
  -e "s|from '\.\./form-builder/|from '../|g" \
  -e "s|from \"\.\./form-builder/|from \"../|g" \
  -e "s|from '\.\./ui/|from '../../ui/|g" \
  -e "s|from \"\.\./ui/|from \"../../ui/|g" \
  -e "s|from '\.\./\.\./\.\./types/|from '../../../../types/|g" \
  -e "s|from \"\.\./\.\./\.\./types/|from \"../../../../types/|g" \
  -e "s|from '\.\./\.\./\.\./utils/|from '../../../../utils/|g" \
  -e "s|from \"\.\./\.\./\.\./utils/|from \"../../../../utils/|g" \
  {} \;

# Fix form-builder components imports (they are 2 levels deep)
echo "Fixing form-builder component imports..."
find /home/coder/DragFormMaster/lib/src/components/form-builder -maxdepth 1 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./types/|from '../../../types/|g" \
  -e "s|from \"\.\./\.\./types/|from \"../../../types/|g" \
  -e "s|from '\.\./\.\./hooks/|from '../../../hooks/|g" \
  -e "s|from \"\.\./\.\./hooks/|from \"../../../hooks/|g" \
  -e "s|from '\.\./\.\./utils/|from '../../../utils/|g" \
  -e "s|from \"\.\./\.\./utils/|from \"../../../utils/|g" \
  -e "s|from '\.\./\.\./lib/|from '../../../lib/|g" \
  -e "s|from \"\.\./\.\./lib/|from \"../../../lib/|g" \
  -e "s|from '\.\./ui/|from '../ui/|g" \
  -e "s|from \"\.\./ui/|from \"../ui/|g" \
  {} \;

# Fix UI components imports
echo "Fixing UI component imports..."
find /home/coder/DragFormMaster/lib/src/components/ui -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./lib/|from '../../../lib/|g" \
  -e "s|from \"\.\./\.\./lib/|from \"../../../lib/|g" \
  -e "s|from '\.\./\.\./hooks/|from '../../../hooks/|g" \
  -e "s|from \"\.\./\.\./hooks/|from \"../../../hooks/|g" \
  -e "s|from '\./|from './|g" \
  -e "s|from \"\./|from \"./|g" \
  {} \;

# Fix hooks imports
echo "Fixing hooks imports..."
find /home/coder/DragFormMaster/lib/src/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./types/|from '../types/|g" \
  -e "s|from \"\.\./types/|from \"../types/|g" \
  -e "s|from '\.\./utils/|from '../utils/|g" \
  -e "s|from \"\.\./utils/|from \"../utils/|g" \
  {} \;

# Fix utils imports
echo "Fixing utils imports..."
find /home/coder/DragFormMaster/lib/src/utils -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from '\.\./\.\./types/|from '../types/|g" \
  -e "s|from \"\.\./\.\./types/|from \"../types/|g" \
  -e "s|from '\.\./types/|from '../types/|g" \
  -e "s|from \"\.\./types/|from \"../types/|g" \
  {} \;

echo "Import paths fixed!"