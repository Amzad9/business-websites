export function normalizeFrontmatterDate(value: string | Date | undefined): string {
  if (value && typeof value === 'object' && 'toISOString' in value) {
    return (value as Date).toISOString().split('T')[0]
  }

  return String(value ?? '')
}

