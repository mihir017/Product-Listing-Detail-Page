export const validatePrice = (minPrice, maxPrice) => {
  const min = minPrice === '' || minPrice === null || minPrice === undefined
    ? null
    : Number(minPrice);
  const max = maxPrice === '' || maxPrice === null || maxPrice === undefined
    ? null
    : Number(maxPrice);

  if (min !== null && Number.isNaN(min)) {
    return 'Minimum price must be a valid number.';
  }

  if (max !== null && Number.isNaN(max)) {
    return 'Maximum price must be a valid number.';
  }

  if (min !== null && min < 0) {
    return 'Minimum price cannot be negative.';
  }

  if (max !== null && max < 0) {
    return 'Maximum price cannot be negative.';
  }

  if (min !== null && max !== null && min > max) {
    return 'Minimum price cannot be greater than maximum price.';
  }

  return '';
};
