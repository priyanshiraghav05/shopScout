import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'customer' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const navigation = useNavigation();

  // TODO: Replace this with actual authentication check
  const isAuthenticated = true; // This should come from your auth context/state
  const currentUserType = 'customer'; // This should come from your auth context/state

  if (!isAuthenticated) {
    // Redirect to login or show unauthorized message
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to access this page</Text>
      </View>
    );
  }

  if (currentUserType !== userType) {
    // Redirect to appropriate home page or show unauthorized message
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You don't have permission to access this page</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProtectedRoute; 