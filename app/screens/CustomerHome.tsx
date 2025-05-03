import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Modal,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { logout } from '../utils/auth';

const CustomerHome = () => {
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(2);
  const [cardWidth, setCardWidth] = useState('47%');

  useEffect(() => {
    // More conservative breakpoint for tablets/laptops
    const isLargeScreen = width >= 900;
    setNumColumns(isLargeScreen ? 3 : 2);
    
    // Calculate card width with proper margins
    const calculatedWidth = isLargeScreen 
      ? (width - 40) / 3 - 16  // 40px total horizontal padding, 16px gap
      : (width - 32) / 2 - 8;  // 32px total horizontal padding, 8px gap
    
    setCardWidth(calculatedWidth);
  }, [width]);

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false);
  const scrollViewRef = useRef(null);

  // Updated categories for electronics only
  const categories = [
    { id: 'all', name: 'All', icon: 'grid-outline' },
    { id: 'smartphones', name: 'Smartphones', icon: 'phone-portrait-outline' },
    { id: 'laptops', name: 'Laptops', icon: 'laptop-outline' },
    { id: 'tablets', name: 'Tablets', icon: 'tablet-portrait-outline' },
    { id: 'accessories', name: 'Accessories', icon: 'hardware-chip-outline' },
  ];

  // Updated mock data with more products for different categories
  const products = [
    {
      id: '1',
      name: 'Smartphone X',
      category: 'smartphones',
      image: require('../../assets/images/mobile.jpeg'),
      prices: [
        { shop: 'Tech Store', price: 15999, distance: '0.5 km', rating: 4.5 },
        { shop: 'Digital Hub', price: 16499, distance: '1.2 km', rating: 4.2 },
        { shop: 'Electronics Plus', price: 16999, distance: '2.0 km', rating: 4.0 },
      ],
      rating: 4.5,
      reviews: 128,
      description: 'Latest smartphone with advanced features and high-performance camera',
      specifications: {
        screen: '6.5 inch OLED',
        processor: 'Snapdragon 8 Gen 2',
        ram: '8GB',
        storage: '128GB',
      },
      priceHistory: [
        { date: '2024-03-01', price: 16999 },
        { date: '2024-03-15', price: 16499 },
        { date: '2024-03-30', price: 15999 },
      ],
    },
    {
      id: '2',
      name: 'Pro Laptop 2024',
      category: 'laptops',
      image: require('../../assets/images/laptops.jpg'),
      prices: [
        { shop: 'Tech Store', price: 45999, distance: '0.5 km', rating: 4.5 },
        { shop: 'Digital Hub', price: 46999, distance: '1.2 km', rating: 4.2 },
      ],
      rating: 4.3,
      reviews: 85,
      description: 'High-performance laptop for professionals',
      specifications: {
        screen: '15.6 inch FHD',
        processor: 'Intel i7 12th Gen',
        ram: '16GB',
        storage: '512GB SSD',
      },
      priceHistory: [
        { date: '2024-03-01', price: 47999 },
        { date: '2024-03-15', price: 46999 },
        { date: '2024-03-30', price: 45999 },
      ],
    },
    {
      id: '3',
      name: 'Tablet Pro',
      category: 'tablets',
      image: require('../../assets/images/tablets.jpeg'),
      prices: [
        { shop: 'Tech Store', price: 29999, distance: '0.5 km', rating: 4.5 },
        { shop: 'Digital Hub', price: 30999, distance: '1.2 km', rating: 4.2 },
      ],
      rating: 4.4,
      reviews: 92,
      description: 'Premium tablet for work and entertainment',
      specifications: {
        screen: '11 inch Retina',
        processor: 'Apple M2',
        ram: '8GB',
        storage: '256GB',
      },
      priceHistory: [
        { date: '2024-03-01', price: 31999 },
        { date: '2024-03-15', price: 30999 },
        { date: '2024-03-30', price: 29999 },
      ],
    },
    {
      id: '4',
      name: 'Wireless Earbuds Pro',
      category: 'accessories',
      image: require('../../assets/images/airpodespro.png'),
      prices: [
        { shop: 'Tech Store', price: 7999, distance: '0.5 km', rating: 4.5 },
        { shop: 'Digital Hub', price: 8199, distance: '1.2 km', rating: 4.2 },
      ],
      rating: 4.6,
      reviews: 156,
      description: 'Premium wireless earbuds with noise cancellation',
      specifications: {
        battery: '24 hours',
        connectivity: 'Bluetooth 5.0',
        features: 'ANC, Touch Controls',
      },
      priceHistory: [
        { date: '2024-03-01', price: 8499 },
        { date: '2024-03-15', price: 8199 },
        { date: '2024-03-30', price: 7999 },
      ],
    },
    {
      id: '5',
      name: 'Canon EOS 1500D',
      category: 'accessories',
      image: require('../../assets/images/canon.jpeg'),
      prices: [
        { shop: 'Shutter World', price: 32999, distance: '1.0 km', rating: 4.3 },
        { shop: 'Lens & Clicks', price: 33499, distance: '1.8 km', rating: 4.4 },
      ],
      rating: 4.4,
      reviews: 95,
      description: 'DSLR camera with 24.1 MP APS-C CMOS sensor and WiFi connectivity',
      specifications: {
        resolution: '24.1 MP',
        connectivity: 'WiFi, NFC',
        lens: '18-55mm Kit Lens',
      },
      priceHistory: [
        { date: '2024-03-01', price: 34999 },
        { date: '2024-03-20', price: 33999 },
        { date: '2024-04-01', price: 32999 },
      ],
    },
    {
      id: '6',
      name: 'Sony Alpha Z7-E10',
      category: 'accessories',
      image: require('../../assets/images/sonya7.jpeg'),
      prices: [
        { shop: 'Photo Experts', price: 52999, distance: '0.8 km', rating: 4.6 },
        { shop: 'Click Studio', price: 53999, distance: '1.5 km', rating: 4.5 },
      ],
      rating: 4.6,
      reviews: 110,
      description: 'Mirrorless camera with interchangeable lenses and advanced autofocus',
      specifications: {
        resolution: '24.2 MP',
        display: '3-inch Flip-out Screen',
        video: '4K recording',
      },
      priceHistory: [
        { date: '2024-03-10', price: 54999 },
        { date: '2024-03-25', price: 53999 },
        { date: '2024-04-10', price: 52999 },
      ],
    },
    {
      id: '7',
      name: 'Logitech Wireless Mouse M235',
      category: 'accessories',
      image: require('../../assets/images/mouse.jpg'),
      prices: [
        { shop: 'Gadget Zone', price: 799, distance: '0.3 km', rating: 4.2 },
        { shop: 'Tech Spot', price: 849, distance: '1.0 km', rating: 4.1 },
      ],
      rating: 4.2,
      reviews: 78,
      description: 'Comfortable and compact wireless mouse with 12-month battery life',
      specifications: {
        connectivity: '2.4GHz Wireless',
        dpi: '1000',
        battery: '1 AA (included)',
      },
      priceHistory: [
        { date: '2024-03-15', price: 899 },
        { date: '2024-04-01', price: 849 },
        { date: '2024-04-18', price: 799 },
      ],
    },
    {
      id: '8',
      name: 'MacBook Air M2',
      category: 'laptops',
      image: require('../../assets/images/macbookair.jpg'),
      prices: [
        { shop: 'Apple Store', price: 99999, distance: '2.0 km', rating: 4.8 },
        { shop: 'Tech World', price: 101999, distance: '2.5 km', rating: 4.7 },
      ],
      rating: 4.8,
      reviews: 140,
      description: 'Apple MacBook Air with M2 chip and 13.6-inch Retina display',
      specifications: {
        processor: 'Apple M2',
        ram: '8GB',
        storage: '256GB SSD',
      },
      priceHistory: [
        { date: '2024-03-01', price: 104999 },
        { date: '2024-03-25', price: 101999 },
        { date: '2024-04-15', price: 99999 },
      ],
    },
    {
      id: '9',
      name: 'iPhone 13',
      category: 'smartphones',
      image: require('../../assets/images/iphone13.jpg'),
      prices: [
        { shop: 'iWorld', price: 59999, distance: '1.1 km', rating: 4.6 },
        { shop: 'Mobile Planet', price: 60999, distance: '1.9 km', rating: 4.5 },
      ],
      rating: 4.6,
      reviews: 210,
      description: 'Apple iPhone 13 with A15 Bionic chip and dual-camera system',
      specifications: {
        screen: '6.1 inch Super Retina XDR',
        processor: 'A15 Bionic',
        storage: '128GB',
      },
      priceHistory: [
        { date: '2024-03-01', price: 63999 },
        { date: '2024-03-20', price: 61999 },
        { date: '2024-04-10', price: 59999 },
      ],
    },
  ];

  // Updated search and filter logic
  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product, shop) => {
    setCart(prev => [...prev, { product, shop, quantity: 1 }]);
    Alert.alert('Success', 'Added to cart!');
  };

  const setPriceAlert = (product, targetPrice) => {
    setPriceAlerts(prev => [...prev, { product, targetPrice }]);
    Alert.alert('Success', 'Price alert set!');
  };

  const renderProductCard = ({ item }) => (
    <View style={[styles.productCardWrapper, { width: cardWidth }]}>
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => {
          setSelectedProduct(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.productImageContainer}>
          <Image source={item.image} style={styles.productImage} />
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(item.id)}
          >
            <Ionicons 
              name={wishlist.includes(item.id) ? "heart" : "heart-outline"} 
              size={18} 
              color={wishlist.includes(item.id) ? "#ff4757" : "#5a4233"} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <View style={styles.productDetails}>
            <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
            <View style={styles.priceInfo}>
              <Text style={styles.bestPrice}>₹{Math.min(...item.prices.map(p => p.price)).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviews})</Text>
            </View>
            <Text style={styles.shopCount}>{item.prices.length} shops</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderProductDetails = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#5a4233" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalImageContainer}>
              <Image source={selectedProduct?.image} style={styles.modalImage} />
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{selectedProduct?.description}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              {Object.entries(selectedProduct?.specifications || {}).map(([key, value]) => (
                <View key={key} style={styles.specItem}>
                  <Text style={styles.specLabel}>{key}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Best Prices</Text>
              {selectedProduct?.prices.map((shop, index) => (
                <View key={index} style={styles.shopListItem}>
                  <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{shop.shop}</Text>
                    <View style={styles.shopDetails}>
                      <Text style={styles.shopPrice}>₹{shop.price.toLocaleString('en-IN')}</Text>
                      <View style={styles.shopRating}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.shopRatingText}>{shop.rating}</Text>
                      </View>
                      <Text style={styles.shopDistance}>{shop.distance}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => addToCart(selectedProduct, shop)}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Price History</Text>
              <View style={styles.priceHistory}>
                {selectedProduct?.priceHistory.map((history, index) => (
                  <View key={index} style={styles.priceHistoryItem}>
                    <Text style={styles.priceHistoryDate}>{history.date}</Text>
                    <Text style={styles.priceHistoryPrice}>₹{history.price.toLocaleString('en-IN')}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.modalSection, styles.lastSection]}>
              <Text style={styles.sectionTitle}>Set Price Alert</Text>
              <View style={styles.priceAlertContainer}>
                <TextInput
                  style={styles.priceAlertInput}
                  placeholder="Enter target price"
                  keyboardType="numeric"
                  placeholderTextColor="#8b5e3b"
                />
                <TouchableOpacity 
                  style={styles.setAlertButton}
                  onPress={() => setPriceAlert(selectedProduct, 15000)}
                >
                  <Text style={styles.setAlertText}>Set Alert</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderWishlist = () => (
    <View style={styles.section}>
      <FlatList
        key={`grid-${numColumns}-wishlist`}
        data={products.filter(product => wishlist.includes(product.id))}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsList}
        numColumns={numColumns}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );

  const renderCart = () => (
    <View style={styles.section}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.product.image} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.product.name}</Text>
              <Text style={styles.cartItemShop}>{item.shop.shop}</Text>
              <Text style={styles.cartItemPrice}>₹{item.shop.price}</Text>
            </View>
            <View style={styles.cartItemActions}>
              <TouchableOpacity style={styles.quantityButton}>
                <Ionicons name="remove" size={20} color="#5a4233" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton}>
                <Ionicons name="add" size={20} color="#5a4233" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );

  const renderPriceAlerts = () => (
    <View style={styles.section}>
      <FlatList
        data={priceAlerts}
        renderItem={({ item }) => (
          <View style={styles.alertItem}>
            <Image source={item.product.image} style={styles.alertItemImage} />
            <View style={styles.alertItemInfo}>
              <Text style={styles.alertItemName}>{item.product.name}</Text>
              <Text style={styles.alertItemPrice}>Target: ₹{item.targetPrice}</Text>
              <Text style={styles.alertItemCurrent}>
                Current: ₹{Math.min(...item.product.prices.map(p => p.price))}
              </Text>
            </View>
            <TouchableOpacity style={styles.removeAlertButton}>
              <Ionicons name="close-circle" size={24} color="#ff4757" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => logout(navigation, 'customer')
        }
      ]
    );
  };

  return (
    <ProtectedRoute userType="customer">
      <LinearGradient colors={['#e3caa5', '#b58e6d']} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="search-circle" size={32} color="#5a4233" />
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#5a4233" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for electronics..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              placeholderTextColor="#8b5e3b"
              returnKeyType="search"
            />
            {searchQuery !== '' && (
              <TouchableOpacity 
                style={styles.clearSearch}
                onPress={() => setSearchQuery('')}
              >
                <Ionicons name="close-circle" size={20} color="#5a4233" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#5a4233" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesWrapper}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons 
                    name={category.icon} 
                    size={20} 
                    color={selectedCategory === category.id ? '#fff' : '#5a4233'} 
                  />
                </View>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {activeTab === 'home' && (
            <FlatList
              key={`grid-${numColumns}`}
              data={getFilteredProducts()}
              renderItem={renderProductCard}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.productsList}
              numColumns={numColumns}
              columnWrapperStyle={styles.productRow}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No products found</Text>
                </View>
              )}
            />
          )}
          {activeTab === 'wishlist' && renderWishlist()}
          {activeTab === 'cart' && renderCart()}
          {activeTab === 'alerts' && renderPriceAlerts()}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'home' && styles.activeTab]}
            onPress={() => setActiveTab('home')}
          >
            <Ionicons name="home-outline" size={24} color={activeTab === 'home' ? '#fff' : '#5a4233'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'wishlist' && styles.activeTab]}
            onPress={() => setActiveTab('wishlist')}
          >
            <Ionicons name="heart-outline" size={24} color={activeTab === 'wishlist' ? '#fff' : '#5a4233'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cart' && styles.activeTab]}
            onPress={() => setActiveTab('cart')}
          >
            <Ionicons name="cart-outline" size={24} color={activeTab === 'cart' ? '#fff' : '#5a4233'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'alerts' && styles.activeTab]}
            onPress={() => setActiveTab('alerts')}
          >
            <Ionicons name="notifications-outline" size={24} color={activeTab === 'alerts' ? '#fff' : '#5a4233'} />
          </TouchableOpacity>
        </View>

        {renderProductDetails()}

        {/* Add Chatbot Button */}
        <TouchableOpacity
          style={styles.chatbotButton}
          onPress={() => setShowChatbot(true)}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Chatbot Modal */}
        <Modal
          visible={showChatbot}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowChatbot(false)}
        >
          <Chatbot onClose={() => setShowChatbot(false)} />
        </Modal>
      </LinearGradient>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  logoContainer: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#5a4233',
    height: 45,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 8,
  },
  categoriesWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 4,
  },
  selectedCategory: {
    backgroundColor: '#8b5e3b',
  },
  categoryIcon: {
    marginBottom: 4,
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#5a4233',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  productsList: {
    padding: 8,
    flexGrow: 1,
  },
  productRow: {
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 8,
  },
  productCardWrapper: {
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 170,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  productImageContainer: {
    width: '35%',
    height: '100%',
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 6,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent:'space-between',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#5a4233',
    marginBottom: 6,
    lineHeight: 18,
  },
  priceInfo: {
    marginBottom: 6,
  },
  bestPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#28a745',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#5a4233',
    marginLeft: 3,
  },
  reviews: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
    marginLeft: 2,
  },
  shopCount: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
  },
  viewDetailsButton: {
    backgroundColor: '#8b5e3b',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  viewDetailsText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    justifyContent: 'space-around',
  },
  tab: {
    padding: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#8b5e3b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalContent: {
    flexGrow: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#5a4233',
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  modalImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f8f8f8',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#5a4233',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
    lineHeight: 20,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  specLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#5a4233',
    textTransform: 'capitalize',
  },
  specValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
  },
  shopListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  shopInfo: {
    flex: 1,
    marginRight: 10,
  },
  shopName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#5a4233',
  },
  shopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  shopPrice: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#28a745',
    marginRight: 10,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  shopRatingText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#5a4233',
    marginLeft: 3,
  },
  shopDistance: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
  },
  addToCartButton: {
    backgroundColor: '#8b5e3b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
  priceHistory: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  priceHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  priceHistoryDate: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#7a5645',
  },
  priceHistoryPrice: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#5a4233',
  },
  priceAlertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceAlertInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    fontFamily: 'Poppins-Regular',
    color: '#5a4233',
  },
  setAlertButton: {
    backgroundColor: '#8b5e3b',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  setAlertText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
  },
  cartItemShop: {
    fontSize: 14,
    color: '#7a5645',
    marginTop: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#8b5e3b',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#5a4233',
    marginHorizontal: 10,
  },
  alertItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  alertItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  alertItemInfo: {
    flex: 1,
  },
  alertItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
  },
  alertItemPrice: {
    fontSize: 14,
    color: '#7a5645',
    marginTop: 5,
  },
  alertItemCurrent: {
    fontSize: 14,
    color: '#8b5e3b',
    fontWeight: 'bold',
    marginTop: 5,
  },
  removeAlertButton: {
    padding: 5,
  },
  chatbotButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clearSearch: {
    padding: 8,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#5a4233',
    textAlign: 'center',
  },
  logoutButton: {
    padding: 8,
    marginLeft: 10,
  },
});

export default CustomerHome; 