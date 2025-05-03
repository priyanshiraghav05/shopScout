import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize default admin user
export const initializeDefaultAdmin = async () => {
  try {
    const users = await getUsers();
    if (users.length === 0) {
      const defaultAdmin = {
        name: 'Admin',
        email: 'admin@shopscout.com',
        password: 'admin123',
        role: 'admin',
        userType: 'admin'
      };
      await storeUserData(defaultAdmin);
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Store user data
export const storeUserData = async (userData) => {
  try {
    const users = await getUsers();
    users.push(userData);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Authenticate user
export const authenticateUser = async (email, password) => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Check if user is admin
export const isAdmin = async (email) => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email);
    return user ? user.role === 'admin' : false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}; 