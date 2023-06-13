import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner component', () => {
  test('renders the loading spinner component', () => {
    const { container } = render(<LoadingSpinner />);
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
