#!/bin/bash

# Fix all @/ imports in UI components
find /home/coder/DragFormMaster/lib/components/ui -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from \"@/lib/utils\"|from \"../../lib/utils\"|g" \
  -e "s|from '@/lib/utils'|from '../../lib/utils'|g" \
  -e "s|from \"@/components/ui/|from \"./|g" \
  -e "s|from '@/components/ui/|from './|g" \
  -e "s|from \"@/hooks/|from \"../../hooks/|g" \
  -e "s|from '@/hooks/|from '../../hooks/|g" \
  {} \;

# Fix remaining imports in form-builder components
find /home/coder/DragFormMaster/lib/components/form-builder -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from \"@/|from \"../../|g" \
  -e "s|from '@/|from '../../|g" \
  {} \;

# Fix wizard steps imports
find /home/coder/DragFormMaster/lib/components/form-builder/wizard-steps -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|from \"../../types|from \"../../../types|g" \
  -e "s|from '../../types|from '../../../types|g" \
  -e "s|from \"../../components/ui|from \"../../ui|g" \
  -e "s|from '../../components/ui|from '../../ui|g" \
  -e "s|from \"../../components/form-builder|from \"..|g" \
  -e "s|from '../../components/form-builder|from '..|g" \
  -e "s|from \"../../utils|from \"../../../utils|g" \
  -e "s|from '../../utils|from '../../../utils|g" \
  -e "s|from \"../../lib/utils|from \"../../../lib/utils|g" \
  -e "s|from '../../lib/utils|from '../../../lib/utils|g" \
  {} \;

echo "All imports fixed!"