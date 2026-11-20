'use client';

import { Suspense } from 'react';
import PostHogInner from './PostHogInner';

// Suspense only wraps the tracker (useSearchParams); children must stay outside or the
// whole page is client-rendered and the static export ships empty HTML.
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogInner />
      </Suspense>
      {children}
    </>
  );
}
