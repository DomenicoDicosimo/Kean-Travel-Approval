import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App.js';

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<App />);
        const heading = screen.getByText(/Welcome/);
        expect(heading).toBeInTheDocument()
    });
});