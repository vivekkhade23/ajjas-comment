import { render, screen } from '@testing-library/react';
import App from './App';

test('renders call recorder dashboard', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /call recorder dashboard/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /start recording/i })).toBeInTheDocument();
  expect(screen.getByText(/no recordings yet/i)).toBeInTheDocument();
});
