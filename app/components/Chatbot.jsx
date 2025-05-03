import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your shopping assistant. How can I help you today?",
      isBot: true,
      quickReplies: [
        { text: "Find best prices", category: "price" },
        { text: "Compare products", category: "compare" },
        { text: "Shopping tips", category: "tips" },
        { text: "Track orders", category: "orders" },
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        isBot: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: generateBotResponse(inputText.trim()),
          isBot: true,
          quickReplies: generateQuickReplies(inputText.trim()),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);

      // Scroll to bottom
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      id: messages.length + 1,
      text: reply.text,
      isBot: false,
    };
    setMessages([...messages, newMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate bot response based on quick reply category
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(reply.category),
        isBot: true,
        quickReplies: generateQuickReplies(reply.category),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    // Scroll to bottom
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced response logic
    if (lowerMessage.includes('price') || lowerMessage === 'price') {
      return "I can help you find the best prices! Here's what you can do:\n\n1. Use the search bar to find specific products\n2. Browse through categories to see all available items\n3. Set price alerts to get notified when prices drop\n4. Compare prices from different sellers\n\nWhat would you like to do?";
    } else if (lowerMessage.includes('compare') || lowerMessage === 'compare') {
      return "To compare products:\n\n1. Click on any product card to see detailed information\n2. View prices from different sellers\n3. Check product specifications\n4. Read customer reviews\n\nWould you like to compare specific products?";
    } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      return "Delivery information:\n\n1. Each product shows delivery options from different sellers\n2. You can see estimated delivery times\n3. Some sellers offer free shipping\n4. Track your orders in the 'Orders' tab\n\nNeed help with a specific order?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage === 'tips') {
      return "Here are some shopping tips:\n\n1. Set price alerts for products you want\n2. Compare prices from multiple sellers\n3. Check seller ratings and reviews\n4. Look for special offers and discounts\n5. Read product specifications carefully\n\nWhat else would you like to know?";
    } else if (lowerMessage.includes('order') || lowerMessage === 'orders') {
      return "Order tracking:\n\n1. Go to the 'Orders' tab\n2. View all your current and past orders\n3. Track delivery status\n4. Manage returns and refunds\n\nWould you like to track a specific order?";
    } else {
      return "I'm here to help you find the best deals! You can:\n\n1. Search for products\n2. Compare prices\n3. Set price alerts\n4. Track orders\n5. Get shopping tips\n\nWhat would you like to do?";
    }
  };

  const generateQuickReplies = (category) => {
    switch (category) {
      case 'price':
        return [
          { text: "Set price alert", category: "alert" },
          { text: "Show best deals", category: "deals" },
          { text: "Price history", category: "history" },
        ];
      case 'compare':
        return [
          { text: "Compare specs", category: "specs" },
          { text: "Show reviews", category: "reviews" },
          { text: "Price comparison", category: "price" },
        ];
      case 'tips':
        return [
          { text: "Best time to buy", category: "timing" },
          { text: "Deal alerts", category: "alerts" },
          { text: "Shopping guides", category: "guides" },
        ];
      case 'orders':
        return [
          { text: "Track order", category: "track" },
          { text: "Order history", category: "history" },
          { text: "Returns", category: "returns" },
        ];
      default:
        return [
          { text: "Find best prices", category: "price" },
          { text: "Compare products", category: "compare" },
          { text: "Shopping tips", category: "tips" },
          { text: "Track orders", category: "orders" },
        ];
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/images/shopScout.png')} 
            style={styles.headerLogo}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Shopping Assistant</Text>
            <Text style={styles.headerSubtitle}>Online 24/7</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View key={message.id}>
            <View
              style={[
                styles.messageBubble,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isBot ? styles.botMessageText : styles.userMessageText,
              ]}>
                {message.text}
              </Text>
            </View>
            {message.quickReplies && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.quickRepliesContainer}
              >
                {message.quickReplies.map((reply, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickReplyButton}
                    onPress={() => handleQuickReply(reply)}
                  >
                    <Text style={styles.quickReplyText}>{reply.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        ))}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() ? '#fff' : '#999'}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  closeButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  quickReplyButton: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  quickReplyText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#90caf9',
    marginRight: 8,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default Chatbot; 