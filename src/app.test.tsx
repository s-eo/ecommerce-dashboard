import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/test-utils';

import App from "./App";

describe('Simple truthy test', () => {
    it('renders Ecom Store text', () => {
        render(<App />);
        expect(screen.getByText('Ecom Store')).toBeInTheDocument();
    });
});