import React from 'react';
import { render } from '@testing-library/react';
import Customers from './Customers';

test('renders Customers component', () => {
  const { getByText } = render(<Customers />);
  expect(getByText('Customers')).toBeInTheDocument();
});
