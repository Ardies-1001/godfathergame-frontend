export const formatPrice = (value: number | string) => {
  const numValue = Number(value)
  const currencyLabel = 'FCFA'
  const currencyLocale = 'fr-BJ'
  const currencyCode = 'XOF'

  if (currencyLabel === 'FCFA' || currencyCode === 'XOF') {
    const formatted = new Intl.NumberFormat(currencyLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numValue)
    return `${formatted} ${currencyLabel}`
  }

  return new Intl.NumberFormat(currencyLocale, { style: 'currency', currency: currencyCode }).format(numValue)
}
