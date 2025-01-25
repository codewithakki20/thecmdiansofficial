import { render, screen } from '@testing-library/react';
import App from './App';

test('renders The CMDians official text', () => {
  render(<App />);
  const headingElement = screen.getByText(/The CMDians official/i); // Adjusted regex to match the title
  expect(headingElement).toBeInTheDocument();
});
