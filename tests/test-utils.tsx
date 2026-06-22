import React, {type ReactElement} from 'react'
import {render, type RenderOptions} from '@testing-library/react'
import {ThemeProvider} from '../src/components/Theme/ThemeProvider'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
})

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export {customRender as render}