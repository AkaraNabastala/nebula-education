/**
 * Safe CSV Export Utility
 * Mitigates CSV Formula Injection (CWE-1236) and handles quotes and newlines
 */

export const sanitizeCsvCell = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '""';
  }

  let str = String(value);

  // Formula injection mitigation: prepend single quote if cell starts with risky formula trigger
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape existing double quotes by doubling them
  str = str.replace(/"/g, '""');

  return `"${str}"`;
};

export const downloadCsvFile = (
  filename: string,
  headers: string[],
  rows: (string | number | null | undefined)[][]
): void => {
  const headerLine = headers.map(sanitizeCsvCell).join(',');
  const rowLines = rows.map(row => row.map(sanitizeCsvCell).join(','));

  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n'); // UTF-8 BOM for Excel compatibility
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
