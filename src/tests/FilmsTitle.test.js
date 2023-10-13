import React from 'react';
import { render } from '@testing-library/react';
import Films from '../components/Films';

beforeEach(() => {
  fetch.resetMocks();
});

test('renders Films component', async () => {
  fetch.mockResponses(
    [JSON.stringify({ results: [], count: 0 }), { status: 200 }]
  );

  const { getByText } = render(<Films />);
  
  expect(getByText('Search Films')).toBeInTheDocument();
  expect(getByText('Search')).toBeInTheDocument();
});
