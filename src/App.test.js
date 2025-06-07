// App.test.jsx or App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the website homepage', () => {
  render(<App />);
  const headingElement = screen.getByText(/Bug Tracker/i); // Replace with actual text from your app
  expect(headingElement).toBeInTheDocument();
});
