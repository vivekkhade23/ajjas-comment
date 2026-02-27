import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HIMS title', () => {
  render(<App />);
  const title = screen.getByText(/Healthcare Information Management System/i);
  expect(title).toBeInTheDocument();
});
