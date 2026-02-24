export const formatNumber = (value: number, options?: Intl.NumberFormatOptions, locale = 'en-US') =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 20,
    ...options,
  }).format(value);

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = 'en-US',
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(value);

export const formatPercentage = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = 'en-US',
) =>
  new Intl.NumberFormat(locale, {
    style: 'percent',
    ...options,
  }).format(value);
