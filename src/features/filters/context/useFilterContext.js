import { useContext } from 'react';
import { FilterContext } from './filterContextObject';

export function useFilterContext() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }

  return context;
}
