'use client';
import { HydrationBoundary } from '@tanstack/react-query'

export function Hydration({ state, children }: any) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}