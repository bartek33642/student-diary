import React from 'react';
import { render, screen } from '@testing-library/react';
import RadialChartComponent from '../src/components/Marks/TableMarks/RadialChart';

jest.mock('react-vis', () => ({
  RadialChart: jest.fn(() => <div data-testid="mocked-radialchart" />),
}));

test('renders RadialChartComponent with provided data', () => {
  const data = [
      { angle: 1, label: 'Matematyka' },
      { angle: 2, label: 'Fizyka' },
  ];

  render(<RadialChartComponent data={data} />);

  expect(screen.getByTestId('mocked-radialchart')).toBeInTheDocument();
});
