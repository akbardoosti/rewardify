export const useUtils = () => {
  const formatNumber = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) {
      return '';
    }
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) {
      return '';
    }
    return num.toLocaleString('en-US');
  };

  const parseNumber = (value: string): number => {
    return Number(value.replace(/,/g, ''));
  };

  return {
    formatNumber,
    parseNumber,
  };
};