import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getUsers } from '../utils/auth';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
      setLoading(false);
    }
  };

  const renderUserCard = (user) => (
    <View style={styles.userCard} key={user.email}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>Email: {user.email}</Text>
      <Text style={styles.userType}>Type: {user.userType}</Text>
      {user.userType === 'shopkeeper' && user.shopInfo && (
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>Shop: {user.shopInfo.shopName}</Text>
          <Text style={styles.shopAddress}>Address: {user.shopInfo.address}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>User List</Text>
      <ScrollView style={styles.userList}>
        {users.map(renderUserCard)}
      </ScrollView>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchUsers}>
        <Text style={styles.refreshButtonText}>Refresh List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  userList: {
    flex: 1,
  },
  userCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  shopInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopAddress: {
    fontSize: 14,
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminDashboard; 