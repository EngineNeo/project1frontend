import React from 'react';
import { render } from '@testing-library/react';
import Movies from './Movies';

test('renders Movies component', () => {
  const { getByText } = render(<Movies />);
  expect(getByText('Search Movies')).toBeInTheDocument();
});