import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "../src/components/Theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          retry: false
        },
    },
})

export default function AllTheProviders ({children}: {children: React.ReactNode}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    )
}