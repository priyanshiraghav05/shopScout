import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 20;

const slides = [
  {
    id: 1,
    title: 'Compare Prices Instantly',
    description: 'Find the best deals from nearby shops in real-time',
    icon: 'trending-up',
    gradient: ['#FF6B6B', '#FF8E8E'],
  },
  {
    id: 2,
    title: 'Verified Local Shops',
    description: 'Shop with confidence from trusted vendors',
    icon: 'shield-checkmark',
    gradient: ['#4ECDC4', '#6EE7E7'],
  },
  {
    id: 3,
    title: 'One Place for Everything',
    description: 'Electronics, gadgets, accessories and more',
    icon: 'grid',
    gradient: ['#9D6B53', '#6B4F4F'],
  },
  {
    id: 4,
    title: 'Made for You',
    description: 'Smart shopping experience curated for your needs',
    icon: 'person',
    gradient: ['#FFB75E', '#ED8F03'],
  },
];

const OnboardingCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const isLargeScreen = width > 768;

  const handleScroll = (event) => {
    // Calculate the active index based on scroll position
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / (CARD_WIDTH + SPACING));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (CARD_WIDTH + SPACING) * (activeIndex + 1),
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollViewRef.current?.scrollTo({
        x: (CARD_WIDTH + SPACING) * (activeIndex - 1),
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {/* Previous Button - only show on large screens */}
        {isLargeScreen && activeIndex > 0 && (
          <TouchableOpacity 
            style={[styles.navButton, styles.prevButton]} 
            onPress={handlePrev}
          >
            <Ionicons name="chevron-back" size={28} color="#6B4F4F" />
          </TouchableOpacity>
        )}

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + SPACING}
          contentContainerStyle={styles.scrollContent}
        >
          {slides.map((slide, index) => (
            <View key={slide.id} style={styles.card}>
              <LinearGradient
                colors={slide.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={slide.icon} size={40} color="#fff" />
                </View>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        {/* Next Button - only show on large screens */}
        {isLargeScreen && activeIndex < slides.length - 1 && (
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]} 
            onPress={handleNext}
          >
            <Ionicons name="chevron-forward" size={28} color="#6B4F4F" />
          </TouchableOpacity>
        )}
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: index === activeIndex ? 20 : 8,
                backgroundColor: index === activeIndex 
                  ? '#6B4F4F' 
                  : 'rgba(107, 79, 79, 0.3)',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: SPACING,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    marginHorizontal: SPACING / 2,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B4F4F',
    marginHorizontal: 2,
    transition: 'all 0.3s ease', // Smooth transition for dot changes
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
  },
  prevButton: {
    marginLeft: 10,
  },
  nextButton: {
    marginRight: 10,
  },
});

export default OnboardingCarousel; 