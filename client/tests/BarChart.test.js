import React from 'react';
import { render } from '@testing-library/react';
import BarChartComponent from '../src/components/Marks/TableMarks/BarChart';

test('renders BarChartComponent with provided data', () => {
  const barChartData = [
    { x: 0, y: 5, label: 'Math' },
    { x: 1, y: 8, label: 'English' },
    // Add more data as needed
  ];

  const { getByText, getByTestId } = render(<BarChartComponent barChartData={barChartData} />);

  // Check if the component renders with the correct data
  expect(getByText('Liczba ocen')).toBeInTheDocument();

  // Check if the x-axis labels are rendered
  expect(getByText('Math')).toBeInTheDocument();
  expect(getByText('English')).toBeInTheDocument();

  // Check if the y-axis title is rendered
  expect(getByText('Liczba ocen')).toBeInTheDocument();

  // Check if the bars are rendered correctly
  const mathBar = getByTestId('bar-Math');
  const englishBar = getByTestId('bar-English');

  expect(mathBar).toHaveAttribute('height', '5');
  expect(englishBar).toHaveAttribute('height', '8');
});

// Add more specific assertions based on your component's structure and behavior
