import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "../src/components/Theme/ThemeProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
})

export default function AllTheProviders ({children}: {children: React.ReactNode}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}