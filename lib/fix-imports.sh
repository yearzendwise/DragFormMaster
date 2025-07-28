#!/bin/bash

# Fix imports in all TypeScript/TSX files
find /home/coder/DragFormMaster/lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|'@/types/form-builder'|'../../types/form-builder'|g" \
  -e "s|'@/components/|'../|g" \
  -e "s|'@/hooks/|'../../hooks/|g" \
  -e "s|'@/utils/|'../../utils/|g" \
  -e "s|'@/lib/utils'|'../../lib/utils'|g" \
  {} \;

# Fix specific paths for components in form-builder directory
find /home/coder/DragFormMaster/lib/components/form-builder -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|'@/types/form-builder'|'../../types/form-builder'|g" \
  -e "s|'../ui/|'../ui/|g" \
  -e "s|'../../hooks/|'../../hooks/|g" \
  -e "s|'../../utils/|'../../utils/|g" \
  -e "s|'../../lib/utils'|'../../lib/utils'|g" \
  {} \;

# Fix paths for wizard steps
find /home/coder/DragFormMaster/lib/components/form-builder/wizard-steps -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|'@/types/form-builder'|'../../../types/form-builder'|g" \
  -e "s|'../../ui/|'../../ui/|g" \
  -e "s|'../../../hooks/|'../../../hooks/|g" \
  -e "s|'../../../utils/|'../../../utils/|g" \
  -e "s|'../../../lib/utils'|'../../../lib/utils'|g" \
  {} \;

# Fix paths for hooks
find /home/coder/DragFormMaster/lib/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|'@/types/form-builder'|'../types/form-builder'|g" \
  -e "s|'@/utils/|'../utils/|g" \
  {} \;

# Fix paths for utils
find /home/coder/DragFormMaster/lib/utils -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s|'@/types/form-builder'|'../types/form-builder'|g" \
  {} \;

echo "Import paths fixed!"