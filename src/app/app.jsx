import { FilterProvider } from '@/features/filters/context/FilterContext';
import { ProductCatalogProvider } from '@/features/products/context/ProductCatalogContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function App() {
  return (
    <ProductCatalogProvider>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </ProductCatalogProvider>
  );
}
