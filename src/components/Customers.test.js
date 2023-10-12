import React from 'react';
import { render } from '@testing-library/react';
import Customers from './Customers';

beforeEach(() => {
  fetch.resetMocks();
});

test('renders Customers component', async () => {
  fetch.mockResponses(
    [JSON.stringify({ results: [], count: 0 }), { status: 200 }],
    [JSON.stringify({ results: [] }), { status: 200 }]
  );

  const { getByText } = render(<Customers />);
  
  expect(getByText('Customers')).toBeInTheDocument();
  expect(getByText('Search')).toBeInTheDocument();
});
