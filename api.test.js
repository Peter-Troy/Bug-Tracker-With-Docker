// Polyfill for TextEncoder and TextDecoder in Node.js environments
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}

const request = require('supertest');
const baseUrl = 'http://127.0.0.1:5000'; // Flask API URL

describe('API Tests', () => {
  it('should return a 200 status code and an array of bugs from /bugs endpoint', async () => {
    const response = await request(baseUrl).get('/bugs');
    
    // Check if the status code is 200
    expect(response.status).toBe(200);

    // Check if the response body is an array
    expect(Array.isArray(response.body)).toBe(true);

    // Optionally check if the response body contains the required properties
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
    }
  });
});
