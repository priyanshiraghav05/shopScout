const axios = require('axios');
const baseURL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  userType: 'customer'
};

const testShopkeeper = {
  name: 'Test Shopkeeper',
  email: 'shopkeeper@example.com',
  password: 'password123',
  userType: 'shopkeeper',
  shopInfo: {
    shopName: 'Test Shop',
    address: '123 Test Street',
    phone: '1234567890',
    description: 'A test shop'
  }
};

const testProduct = {
  name: 'Test Product',
  description: 'A test product',
  category: 'Smartphones',
  price: 999.99,
  marketPrice: 1099.99,
  discount: 10,
  images: ['test-image.jpg'],
  stock: {
    quantity: 10,
    sold: 0
  }
};

// Helper function to log test results
const logTest = (testName, passed) => {
  console.log(`${testName}: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
};

// Main test function
async function runTests() {
  let customerToken = '';
  let shopkeeperToken = '';
  let productId = '';

  try {
    // 1. Test User Registration
    console.log('\nTesting User Registration...');
    try {
      const response = await axios.post(`${baseURL}/auth/register`, testUser);
      logTest('Customer Registration', response.status === 200);
      customerToken = response.data.token;
    } catch (error) {
      logTest('Customer Registration', false);
      console.error('Registration Error:', error.response?.data || error.message);
    }

    // 2. Test Shopkeeper Registration
    try {
      const response = await axios.post(`${baseURL}/auth/register`, testShopkeeper);
      logTest('Shopkeeper Registration', response.status === 200);
      shopkeeperToken = response.data.token;
    } catch (error) {
      logTest('Shopkeeper Registration', false);
      console.error('Registration Error:', error.response?.data || error.message);
    }

    // 3. Test Login
    console.log('\nTesting Login...');
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      logTest('Customer Login', response.status === 200);
      customerToken = response.data.token;
    } catch (error) {
      logTest('Customer Login', false);
      console.error('Login Error:', error.response?.data || error.message);
    }

    // 4. Test Product Creation
    console.log('\nTesting Product Management...');
    try {
      const response = await axios.post(`${baseURL}/products`, testProduct, {
        headers: { 'x-auth-token': shopkeeperToken }
      });
      logTest('Product Creation', response.status === 200);
      productId = response.data._id;
    } catch (error) {
      logTest('Product Creation', false);
      console.error('Product Creation Error:', error.response?.data || error.message);
    }

    // 5. Test Product Listing
    try {
      const response = await axios.get(`${baseURL}/products`);
      logTest('Product Listing', response.status === 200 && response.data.length > 0);
    } catch (error) {
      logTest('Product Listing', false);
      console.error('Product Listing Error:', error.response?.data || error.message);
    }

    // 6. Test Shop Management
    console.log('\nTesting Shop Management...');
    try {
      const response = await axios.get(`${baseURL}/shops`, {
        headers: { 'x-auth-token': shopkeeperToken }
      });
      logTest('Shop Listing', response.status === 200);
    } catch (error) {
      logTest('Shop Listing', false);
      console.error('Shop Listing Error:', error.response?.data || error.message);
    }

    // 7. Test Product Review
    console.log('\nTesting Reviews...');
    try {
      const response = await axios.post(
        `${baseURL}/products/${productId}/reviews`,
        {
          rating: 5,
          comment: 'Great product!'
        },
        {
          headers: { 'x-auth-token': customerToken }
        }
      );
      logTest('Review Creation', response.status === 200);
    } catch (error) {
      logTest('Review Creation', false);
      console.error('Review Creation Error:', error.response?.data || error.message);
    }

    // 8. Test Analytics
    console.log('\nTesting Analytics...');
    try {
      const response = await axios.get(`${baseURL}/shops/analytics`, {
        headers: { 'x-auth-token': shopkeeperToken }
      });
      logTest('Analytics Access', response.status === 200);
    } catch (error) {
      logTest('Analytics Access', false);
      console.error('Analytics Error:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('Test Suite Error:', error.message);
  }
}

// Run the tests
runTests(); 