export const getUniqueBrands = (products) => {
  const brands = new Set();

  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });

  return Array.from(brands)
    .sort((a, b) => a.localeCompare(b))
    .map((brand) => ({
      value: brand,
      label: brand,
    }));
};

export const filterProducts = (products, filters = {}) => {
  const {
    search = '',
    categories = [],
    brands = [],
    minPrice = '',
    maxPrice = '',
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    if (normalizedSearch) {
      const haystack = [
        product.title,
        product.brand,
        product.category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }

    if (brands.length > 0) {
      if (!product.brand || !brands.includes(product.brand)) {
        return false;
      }
    }

    const price = Number(product.price);
    const min =
      minPrice === '' || minPrice === null || minPrice === undefined
        ? null
        : Number(minPrice);
    const max =
      maxPrice === '' || maxPrice === null || maxPrice === undefined
        ? null
        : Number(maxPrice);

    if (min !== null && !Number.isNaN(min) && price < min) {
      return false;
    }

    if (max !== null && !Number.isNaN(max) && price > max) {
      return false;
    }

    return true;
  });
};

export const paginateProducts = (products, page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  return products.slice(start, start + pageSize);
};
