import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';

beforeEach(() => {
  fetch.resetMocks();
});

test('renders LandingPage component', async () => {
  fetch.mockResponses(
    [JSON.stringify([]), { status: 200 }],
    [JSON.stringify([]), { status: 200 }]
  );

  const { getByText } = render(<LandingPage />);
  
  expect(getByText('Top Movies')).toBeInTheDocument();
  expect(getByText('Top 5 Actors')).toBeInTheDocument();
});