import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.8, 420);
const SPACING = 20;

const slides = [
  {
    id: 1,
    title: 'Compare Prices Instantly',
    description: 'Find the best deals from nearby shops in real-time',
    icon: 'trending-up',
    gradient: ['#FF6B6B', '#FF8E8E'],
    cssGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
  },
  {
    id: 2,
    title: 'Verified Local Shops',
    description: 'Shop with confidence from trusted vendors',
    icon: 'shield-checkmark',
    gradient: ['#4ECDC4', '#6EE7E7'],
    cssGradient: 'linear-gradient(135deg, #4ECDC4 0%, #6EE7E7 100%)',
  },
  {
    id: 3,
    title: 'One Place for Everything',
    description: 'Electronics, gadgets, accessories and more',
    icon: 'grid',
    gradient: ['#9D6B53', '#6B4F4F'],
    cssGradient: 'linear-gradient(135deg, #9D6B53 0%, #6B4F4F 100%)',
  },
  {
    id: 4,
    title: 'Made for You',
    description: 'Smart shopping experience curated for your needs',
    icon: 'person',
    gradient: ['#FFB75E', '#ED8F03'],
    cssGradient: 'linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)',
  },
];

const OnboardingCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const webScrollRef = useRef<HTMLDivElement>(null);

  // For web: update activeIndex on scroll
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handle = () => {
      if (!webScrollRef.current) return;
      const scrollLeft = webScrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (CARD_WIDTH + SPACING));
      setActiveIndex(newIndex);
    };
    const node = webScrollRef.current;
    if (node) node.addEventListener('scroll', handle, { passive: true });
    return () => { if (node) node.removeEventListener('scroll', handle); };
  }, []);

  // For mobile: update activeIndex on momentum scroll end
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / (CARD_WIDTH + SPACING));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Navigation buttons
  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      if (Platform.OS === 'web') {
        webScrollRef.current?.scrollTo({
          left: (CARD_WIDTH + SPACING) * (activeIndex + 1),
          behavior: 'smooth',
        });
      } else {
        scrollViewRef.current?.scrollTo({
          x: (CARD_WIDTH + SPACING) * (activeIndex + 1),
          animated: true,
        });
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      if (Platform.OS === 'web') {
        webScrollRef.current?.scrollTo({
          left: (CARD_WIDTH + SPACING) * (activeIndex - 1),
          behavior: 'smooth',
        });
      } else {
        scrollViewRef.current?.scrollTo({
          x: (CARD_WIDTH + SPACING) * (activeIndex - 1),
          animated: true,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {/* Previous Button - only show on large screens */}
        {Platform.OS === 'web' && activeIndex > 0 && (
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={handlePrev}
          >
            <Ionicons name="chevron-back" size={28} color="#6B4F4F" />
          </TouchableOpacity>
        )}

        {Platform.OS === 'web' ? (
          <div
            ref={webScrollRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: `${SPACING}px`,
              padding: `10px ${SPACING}px`,
              width: '100%',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                style={{
                  flex: '0 0 auto',
                  width: CARD_WIDTH,
                  height: 220,
                  borderRadius: 25,
                  overflow: 'hidden',
                  boxShadow: activeIndex === index
                    ? '0 8px 32px rgba(0,0,0,0.18)'
                    : '0 4px 16px rgba(0,0,0,0.12)',
                  scrollSnapAlign: 'center',
                  background: slide.cssGradient,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'grab',
                  transform: activeIndex === index ? 'scale(1.03)' : undefined,
                  opacity: activeIndex === index ? 1 : 0.95,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Ionicons name={slide.icon as any} size={40} color="#fff" />
                </div>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center' }}>{slide.title}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: '20px' }}>{slide.description}</span>
              </div>
            ))}
          </div>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + SPACING}
            contentContainerStyle={styles.scrollContent}
          >
            {slides.map((slide, index) => (
              <View key={slide.id} style={styles.card}>
                <LinearGradient
                  colors={slide.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name={slide.icon as any} size={40} color="#fff" />
                  </View>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Next Button - only show on large screens */}
        {Platform.OS === 'web' && activeIndex < slides.length - 1 && (
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
    backgroundColor: '#fff',
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
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