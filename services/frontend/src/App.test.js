import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Healthcare heading', () => {
  render(<App />);
  const headerElement = screen.getByText(/Smart Healthcare - Appointments/i);
  expect(headerElement).toBeInTheDocument();
});
