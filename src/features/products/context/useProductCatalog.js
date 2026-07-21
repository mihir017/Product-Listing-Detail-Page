import { useContext } from 'react';
import { ProductCatalogContext } from './productCatalogContextObject';

export function useProductCatalog() {
  const context = useContext(ProductCatalogContext);

  if (!context) {
    throw new Error(
      'useProductCatalog must be used within a ProductCatalogProvider'
    );
  }

  return context;
}
