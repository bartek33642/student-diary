import React from 'react';
import { render } from '@testing-library/react';
import BarChartComponent from '../src/components/Marks/TableMarks/BarChart';

jest.mock('react-vis', () => ({
  XYPlot: jest.fn(({ children }) => <div data-testid="mocked-xyplot">{children}</div>),
  VerticalBarSeries: jest.fn(() => <div data-testid="mocked-verticalbarseries" />),
  XAxis: jest.fn(({ title }) => <div data-testid="mocked-xaxis">{title}</div>),
  YAxis: jest.fn(({ title }) => <div data-testid="mocked-yaxis">{title}</div>),
}));

test('renders BarChartComponent with provided data', () => {
  const barChartData = [
      { x: 0, y: 5, label: 'Matematyka' },
      { x: 1, y: 8, label: 'Fizyka' },
  ];

  const { getByTestId } = render(<BarChartComponent barChartData={barChartData} />);

  expect(getByTestId('mocked-xyplot')).toBeInTheDocument();
  expect(getByTestId('mocked-verticalbarseries')).toBeInTheDocument();
  expect(getByTestId('mocked-xaxis')).toBeInTheDocument();
  expect(getByTestId('mocked-yaxis')).toBeInTheDocument();
});
