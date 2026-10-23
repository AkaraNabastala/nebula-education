/**
 * Utility formatting functions for Indonesian educational system
 */

export const formatDateID = (dateInput?: string | Date | null): string => {
  if (!dateInput) return '-';
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) {
      // If it's already a formatted string like "10 Nov 2026", return it directly
      return String(dateInput);
    }
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return String(dateInput);
  }
};

export const formatDateTimeID = (dateInput?: string | Date | null): string => {
  if (!dateInput) return '-';
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);
    return `${date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })}, ${date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })} WIB`;
  } catch {
    return String(dateInput);
  }
};

export const formatCurrencyIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const toISODateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};
