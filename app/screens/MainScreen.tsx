import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import OnboardingCarousel from '../components/OnboardingCarousel';

const { width } = Dimensions.get('window');

// Only use valid Ionicons icon names
const featureSlides = [
  {
    icon: 'trending-up-outline',
    title: 'Compare Prices Instantly',
    description: 'Find the best deals from nearby shops in real-time',
    colors: ['#FF6B6B', '#FF8E8E'] as [string, string],
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Verified Local Shops',
    description: 'Shop with confidence from trusted vendors',
    colors: ['#4ECDC4', '#6EE7E7'] as [string, string],
  },
  {
    icon: 'grid-outline',
    title: 'One Place for Everything',
    description: 'Electronics, gadgets, accessories and more',
    colors: ['#9D6B53', '#6B4F4F'] as [string, string],
  },
  {
    icon: 'person-outline',
    title: 'Made for You',
    description: 'Smart shopping experience curated for your needs',
    colors: ['#FFB75E', '#ED8F03'] as [string, string],
  },
];

const infoCards = [
  {
    icon: 'trending-up-outline',
    title: 'Best Deals',
    description: 'Get notified about price drops',
  },
  {
    icon: 'notifications-outline',
    title: 'Price Alerts',
    description: 'Never miss a great deal',
  },
  {
    icon: 'git-compare-outline',
    title: 'Best Comparison',
    description: 'Compare prices easily',
  },
];

type RootStackParamList = {
  MainScreen: undefined;
  CustomerLogin: undefined;
  CustomerSignup: undefined;
  ShopkeeperLogin: undefined;
  ShopkeeperSignup: undefined;
  ShopkeeperDashboard: undefined;
  CustomerHome: undefined;
  CategoryScreen: undefined;
  AdminDashboard: undefined;
};

const MainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.rootContainer}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Image
          source={require('../../assets/images/shopScout.png')}
          style={styles.navLogo}
          resizeMode="contain"
        />
        <Text style={styles.navTitle}>ShopScout</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image with Overlay */}
        <View style={styles.headerImageContainer}>
          <ImageBackground
            source={require('../../assets/images/bgImage_Project.jpg')}
            style={styles.headerImage}
            imageStyle={styles.headerImageStyle}
            resizeMode="cover"
          >
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>ShopScout</Text>
              <Text style={styles.headerSubtitle}>Your Smart Shopping Companion</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Role Selection Cards */}
        <View style={styles.roleCardsRow}>
          {/* Customer Card */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CustomerLogin')}
          >
            <View style={styles.roleIconCircle}>
              <Ionicons name="person-outline" size={32} color="#4b2e23" />
            </View>
            <Text style={styles.roleTitle}>Customer</Text>
            <Text style={styles.roleSubtitle}>Find best deals</Text>
            <View style={styles.roleButton}>
              <LinearGradient
                colors={["#6b3f2a", "#4b2e23"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.roleButtonGradient}
              >
                <Text style={styles.roleButtonText}>Continue</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="white" style={{ marginLeft: 4 }} />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          {/* Shopkeeper Card */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ShopkeeperLogin')}
          >
            <View style={styles.roleIconCircle}>
              <Ionicons name="business-outline" size={32} color="#4b2e23" />
            </View>
            <Text style={styles.roleTitle}>Shopkeeper</Text>
            <Text style={styles.roleSubtitle}>Manage your store</Text>
            <View style={styles.roleButton}>
              <LinearGradient
                colors={["#6b3f2a", "#4b2e23"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.roleButtonGradient}
              >
                <Text style={styles.roleButtonText}>Continue</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="white" style={{ marginLeft: 4 }} />
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        {/* Carousel Section - Use OnboardingCarousel */}
        <View style={styles.carouselSection}>
          <OnboardingCarousel />
        </View>

        {/* Bottom Info Cards */}
        <View style={styles.infoCardsRow}>
          {infoCards.map((card, idx) => (
            <View style={styles.infoCard} key={idx}>
              <Ionicons name={card.icon as any} size={24} color="#4b2e23" style={{ marginBottom: 4 }} />
              <Text style={styles.infoCardTitle}>{card.title}</Text>
              <Text style={styles.infoCardDescription}>{card.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, { opacity: 0.5 }]} disabled>
          <Ionicons name="paper-plane-outline" size={18} color="#fff" />
          <Text style={styles.navButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f7ede5',
  },
  topNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7ede5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  navLogo: {
    width: 32,
    height: 32,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b2e23',
    marginLeft: 10,
  },
  scrollContent: {
    paddingBottom: 80,
    alignItems: 'center',
  },
  headerImageContainer: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 18,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageStyle: {
    opacity: 0.92,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#4b2e23',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#4b2e23',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 7,
    textAlign: 'center',
    fontWeight: '500',
  },
  roleCardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 18,
    marginBottom: 18,
    width: '100%',
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 22,
    flex: 1,
    minWidth: 140,
    maxWidth: 260,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  roleIconCircle: {
    backgroundColor: '#f7ede5',
    borderRadius: 50,
    padding: 14,
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b2e23',
    marginBottom: 2,
  },
  roleSubtitle: {
    fontSize: 13,
    color: '#4b2e23',
    marginBottom: 12,
  },
  roleButton: {
    marginTop: 'auto',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  roleButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  roleButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  carouselSection: {
    width: '100%',
    marginTop: 0,
    marginBottom: 18,
    alignItems: 'center',
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
    gap: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b2e23',
    marginBottom: 2,
    textAlign: 'center',
  },
  infoCardDescription: {
    fontSize: 11,
    color: '#4b2e23',
    textAlign: 'center',
  },
  bottomNavbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 32,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default MainScreen; 