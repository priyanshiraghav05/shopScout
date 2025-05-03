import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CategoryScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: 'phone-portrait' },
    { id: 'laptops', name: 'Laptops', icon: 'laptop' },
    { id: 'tablets', name: 'Tablets', icon: 'tablet-landscape' },
    { id: 'accessories', name: 'Accessories', icon: 'headset' },
    { id: 'gaming', name: 'Gaming', icon: 'game-controller' },
    { id: 'cameras', name: 'Cameras', icon: 'camera' },
  ];

  const handleCategoryPress = (categoryId) => {
    navigation.navigate('CustomerHome', { category: categoryId });
  };

  return (
    <LinearGradient colors={["#f5e1da", "#e0c3a5", "#c8a27a"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.id)}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
              style={styles.categoryGradient}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={category.icon} size={30} color="#6b4f4f" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b4f4f',
  },
  categoriesContainer: {
    flex: 1,
    padding: 20,
  },
  categoryCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b4f4f',
  },
});

export default CategoryScreen; 