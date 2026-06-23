import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/test-utils';

import App from "./App";
import {ThemeProvider} from "./components/Theme/ThemeProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {type ReactNode} from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        },
    },
})

describe('Simple truthy test', () => {
    it('renders Ecom Store text', () => {

        const wrapper = (props: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {props.children}
                </ThemeProvider>
            </QueryClientProvider>
        )
        render(<App />, { wrapper });
        expect(screen.getByText('Ecom Store')).toBeInTheDocument();
    });
});