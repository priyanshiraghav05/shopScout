const axios = require('axios');
const baseURL = 'http://localhost:5000/api';

async function testEndpoints() {
  try {
    // Test user registration
    console.log('Testing user registration...');
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      userType: 'customer'
    };
    
    const registerResponse = await axios.post(`${baseURL}/auth/register`, userData);
    console.log('Registration successful:', registerResponse.data);

    // Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: userData.email,
      password: userData.password
    });
    console.log('Login successful:', loginResponse.data);

    // Test getting all products
    console.log('\nTesting product listing...');
    const productsResponse = await axios.get(`${baseURL}/products`);
    console.log('Products retrieved:', productsResponse.data.length);

    // Test getting all shops
    console.log('\nTesting shop listing...');
    const shopsResponse = await axios.get(`${baseURL}/shops`);
    console.log('Shops retrieved:', shopsResponse.data.length);

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testEndpoints(); 