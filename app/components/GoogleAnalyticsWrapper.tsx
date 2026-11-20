'use client';

import { Suspense } from 'react';
import GoogleAnalyticsInner from './GoogleAnalyticsInner';

type GoogleAnalyticsWrapperProps = {
  measurementId: string;
};

export default function GoogleAnalyticsWrapper({ measurementId }: GoogleAnalyticsWrapperProps) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner measurementId={measurementId} />
    </Suspense>
  );
}