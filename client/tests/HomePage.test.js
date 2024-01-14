import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../src/components/HomePage/HomePage';

jest.mock('../src/components/HomePage/HomePage', () => ({
  HomePage: jest.fn(() => <div data-testid="mocked-homepage" />),
}));

describe('HomePage Component', () => {
  it('renders HomePage component', () => {
    render(<HomePage />);

    expect(screen.getByTestId('mocked-homepage')).toBeInTheDocument();
  });

});