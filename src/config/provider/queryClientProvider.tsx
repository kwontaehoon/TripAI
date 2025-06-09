'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClientProvider = ({children}: Readonly<{children: React.ReactNode}>) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 600
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default queryClientProvider