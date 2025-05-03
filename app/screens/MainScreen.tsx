import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import OnboardingCarousel from '../components/OnboardingCarousel';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  console.log('MainScreen rendering');
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    console.log('MainScreen useEffect running');
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f5e1da", "#e0c3a5", "#c8a27a"]}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/shopScout.png')}
                style={styles.logoSmall}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>ShopScout</Text>
            </View>
          </View>

          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <ImageBackground
              source={require('../../assets/images/bgImage_Project.jpg')}
              style={styles.mainBackground}
              imageStyle={styles.backgroundImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(255, 245, 242, 0.5)', 'rgba(232, 213, 196, 0.6)']}
                style={styles.heroGradient}
              >
                <Animated.View 
                  style={[
                    styles.heroContent,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY }],
                    },
                  ]}
                >
                  <Text style={styles.heroTitle}>ShopScout</Text>
                  <Text style={styles.heroSubtitle}>Bringing the Best of Local Shopping Right to Your Fingertips!</Text>
                  <View style={styles.heroLine} />
                </Animated.View>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* Carousel Section */}
          <View style={styles.carouselSection}>
            <OnboardingCarousel />
          </View>

          {/* Bottom Half - Light Gradient */}
          <View style={styles.bottomHalf}>
            <LinearGradient
              colors={['rgba(255, 245, 242, 0.98)', 'rgba(232, 213, 196, 0.99)']}
              style={styles.bottomOverlay}
            >
              {/* Login Cards Section */}
              <View style={styles.mainContent}>
                <Animated.View 
                  style={[
                    styles.cardsSection,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY }],
                    },
                  ]}
                >
                  <View style={styles.cardsContainer}>
                    {/* Customer Card */}
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('CustomerLogin')}
                      activeOpacity={0.8}
                    >
                      <Animated.View 
                        style={[
                          styles.uiCard,
                          {
                            transform: [{ scale: scaleAnim }],
                          },
                        ]}
                      >
                        <View style={styles.cardContent}>
                          <View style={styles.iconCircle}>
                            <Ionicons name="person" size={32} color="#6b4f4f" />
                          </View>
                          <View style={styles.cardTitleContainer}>
                            <Text style={styles.cardTitle}>Customer</Text>
                            <Text style={styles.cardSubtitle}>Find best deals</Text>
                          </View>
                          <View style={styles.cardButton}>
                            <LinearGradient
                              colors={["#9d6b53", "#6b4f4f"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.buttonGradient}
                            >
                              <Text style={styles.cardButtonText}>Continue</Text>
                              <Ionicons name="arrow-forward" size={18} color="white" style={styles.buttonIcon} />
                            </LinearGradient>
                          </View>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>

                    {/* Shopkeeper Card */}
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('ShopkeeperLogin')}
                      activeOpacity={0.8}
                    >
                      <Animated.View 
                        style={[
                          styles.uiCard,
                          {
                            transform: [{ scale: scaleAnim }],
                          },
                        ]}
                      >
                        <View style={styles.cardContent}>
                          <View style={styles.iconCircle}>
                            <Ionicons name="business" size={32} color="#6b4f4f" />
                          </View>
                          <View style={styles.cardTitleContainer}>
                            <Text style={styles.cardTitle}>Shopkeeper</Text>
                            <Text style={styles.cardSubtitle}>Manage your store</Text>
                          </View>
                          <View style={styles.cardButton}>
                            <LinearGradient
                              colors={["#9d6b53", "#6b4f4f"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.buttonGradient}
                            >
                              <Text style={styles.cardButtonText}>Continue</Text>
                              <Ionicons name="arrow-forward" size={18} color="white" style={styles.buttonIcon} />
                            </LinearGradient>
                          </View>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>

              {/* Feature Cards */}
              <View style={styles.featuresContainer}>
                {[
                  {
                    icon: "trending-up",
                    title: "Best Deals",
                    description: "Get notified about price drops"
                  },
                  {
                    icon: "notifications",
                    title: "Price Alerts",
                    description: "Never miss a great deal"
                  },
                  {
                    icon: "git-compare",
                    title: "Best Comparison",
                    description: "Compare prices easily"
                  }
                ].map((feature, index) => (
                  <Animated.View 
                    key={index}
                    style={[
                      styles.featureCard,
                      {
                        transform: [{ scale: scaleAnim }],
                      },
                    ]}
                    onStartShouldSetResponder={() => true}
                    onResponderGrant={handlePressIn}
                    onResponderRelease={handlePressOut}
                  >
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                      style={styles.featureGradient}
                    >
                      <View style={styles.featureIconContainer}>
                        <Ionicons name={feature.icon} size={32} color="#6b4f4f" />
                      </View>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>{feature.description}</Text>
                    </LinearGradient>
                  </Animated.View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F2',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSmall: {
    width: 35,
    height: 35,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#6b4f4f',
  },
  heroBanner: {
    height: height * 0.25,
    marginBottom: 15,
  },
  mainBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.85,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6b4f4f',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6b4f4f',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  heroLine: {
    width: 50,
    height: 3,
    backgroundColor: '#6b4f4f',
    borderRadius: 1.5,
  },
  carouselSection: {
    marginBottom: 15,
    height: height * 0.2,
  },
  bottomHalf: {
    flex: 1,
  },
  bottomOverlay: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  mainContent: {
    flex: 1,
  },
  cardsSection: {
    marginTop: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  uiCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 8,
    maxWidth: '45%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(107, 79, 79, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b4f4f',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#9d6b53',
    marginTop: 2,
    textAlign: 'center',
  },
  cardButton: {
    overflow: 'hidden',
    borderRadius: 12,
    width: '100%',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 15,
  },
  featureCard: {
    flex: 1,
    minWidth: width > 500 ? 160 : (width - 80) / 3,
    maxWidth: (width - 48) / 3,
    borderRadius: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  featureGradient: {
    padding: 12,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#6b4f4f',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b4f4f',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 10,
    color: '#8b6a5c',
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default MainScreen; 