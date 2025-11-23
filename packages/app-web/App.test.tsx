import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders the LandingPage by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Find Local Help, Instantly./i })).toBeInTheDocument();
  });
});
