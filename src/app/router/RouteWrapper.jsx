import { Suspense } from 'react';
import Loader from '@/shared/components/Loader';

export default function RouteWrapper({ Component, Layout }) {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Component />
      </Suspense>
    </Layout>
  );
}
