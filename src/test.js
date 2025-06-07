// test-import.test.js
import { BrowserRouter } from 'react-router-dom';

test('react-router-dom should import', () => {
  expect(BrowserRouter).toBeDefined();
});