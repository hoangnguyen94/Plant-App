import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  test('renders the alert component with messages', () => {
    const messages = ['Error 1', 'Error 2'];
    const { container } = render(<Alert type="danger" messages={messages} />);
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders the alert component without messages', () => {
    const { container } = render(<Alert type="danger" messages={[]} />);
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders the alert component with a different type', () => {
    const messages = ['Warning'];
    const { container } = render(<Alert type="warning" messages={messages} />);
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders the alert component with multiple messages', () => {
    const messages = ['Message 1', 'Message 2', 'Message 3'];
    const { container } = render(<Alert type="info" messages={messages} />);
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
