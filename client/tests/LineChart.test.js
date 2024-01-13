import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChartComponent from '../src/components/Marks/TableMarks/LineChart';

jest.mock('react-vis', () => ({
  XYPlot: jest.fn(({ children }) => <div data-testid="mocked-xyplot">{children}</div>),
  LineSeries: jest.fn(() => <div data-testid="mocked-lineseries" />),
  Hint: jest.fn(({ children }) => <div data-testid="mocked-hint">{children}</div>),
}));

test('renders LineChartComponent with provided data', () => {
  const lineChartData = [
      { x: 0, y: 5, label: 'Matematyka' },
      { x: 1, y: 8, label: 'Fizyka' },
  ];

  const { getByTestId } = render(<LineChartComponent lineChartData={lineChartData} />);

  expect(getByTestId('mocked-xyplot')).toBeInTheDocument();
  expect(getByTestId('mocked-lineseries')).toBeInTheDocument();

  expect(screen.queryByTestId('mocked-hint')).not.toBeInTheDocument();
});
