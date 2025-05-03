import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ShopkeeperDashboard = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Smartphone X',
      price: 15999,
      quantity: 10,
      category: 'electronics',
      description: 'Latest smartphone with advanced features',
      image: require('../../assets/images/mobile.jpeg'),
      marketPrice: 16999,
      discount: 5,
      rating: 4.5,
      reviews: 128,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    image: null,
  });
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, orders, analytics, profile

  // Mock data for analytics
  const analytics = {
    totalSales: 25000,
    totalOrders: 45,
    averageOrderValue: 555.56,
    topSellingItems: [
      { name: 'Item 1', sales: 120 },
      { name: 'Item 2', sales: 85 },
      { name: 'Item 3', sales: 65 },
    ],
  };

  // Mock data for orders
  const orders = [
    {
      id: '1',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        address: '123 Main St, Mumbai, India'
      },
      items: [
        {
          id: '1',
          name: 'iPhone 13',
          price: 69999,
          quantity: 1,
          image: require('../../assets/images/mobile.jpeg')
        },
        {
          id: '2',
          name: 'AirPods Pro',
          price: 24999,
          quantity: 1,
          image: require('../../assets/images/airpodespro.png')
        }
      ],
      total: 94998,
      status: 'pending',
      orderDate: '2024-04-25',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 9876543211',
        address: '456 Park Ave, Delhi, India'
      },
      items: [
        {
          id: '3',
          name: 'Samsung Galaxy S24',
          price: 79999,
          quantity: 1,
          image: require('../../assets/images/mobile.jpeg')
        }
      ],
      total: 79999,
      status: 'completed',
      orderDate: '2024-04-24',
      paymentMethod: 'UPI'
    }
  ];

  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.quantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        ...newItem,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity),
      },
    ]);
    setNewItem({ name: '', price: '', quantity: '', category: '', description: '', image: null });
    setModalVisible(false);
  };

  const handleUpdateItem = () => {
    if (!editingItem.name || !editingItem.price || !editingItem.quantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setItems(items.map(item => 
      item.id === editingItem.id ? {
        ...item,
        name: editingItem.name,
        price: parseFloat(editingItem.price),
        quantity: parseInt(editingItem.quantity),
        category: editingItem.category,
        description: editingItem.description,
      } : item
    ));
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setItems(items.filter(item => item.id !== id)),
        },
      ]
    );
  };

  const handleOrderAction = (orderId, action) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: action === 'accept' ? 'completed' : 'rejected' }
        : order
    );
    setOrders(updatedOrders);
    setOrderDetailsVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderInventory = () => (
    <View style={styles.section}>
      <View style={styles.marketInsights}>
        <Text style={styles.insightsTitle}>Market Insights</Text>
        <View style={styles.insightsGrid}>
          <View style={styles.insightCard}>
            <Text style={styles.insightValue}>₹16,999</Text>
            <Text style={styles.insightLabel}>Market Average</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightValue}>₹15,999</Text>
            <Text style={styles.insightLabel}>Your Price</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightValue}>5%</Text>
            <Text style={styles.insightLabel}>Price Advantage</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingItem(null);
          setNewItem({ name: '', price: '', quantity: '', category: '', description: '', image: null });
          setModalVisible(true);
        }}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Product</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <Text style={styles.marketPrice}>Market: ₹{item.marketPrice}</Text>
                <Text style={styles.discount}>-{item.discount}%</Text>
              </View>
              <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemDetails}>Category: {item.category}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.reviews}>({item.reviews} reviews)</Text>
              </View>
            </View>
            <View style={styles.itemActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {
                  setEditingItem(item);
                  setModalVisible(true);
                }}
              >
                <Ionicons name="pencil" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Ionicons name="trash" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.section}>
      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Price Comparison Analytics</Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsValue}>₹{analytics.totalSales}</Text>
            <Text style={styles.analyticsLabel}>Total Sales</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsValue}>{analytics.totalOrders}</Text>
            <Text style={styles.analyticsLabel}>Total Orders</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsValue}>₹{analytics.averageOrderValue}</Text>
            <Text style={styles.analyticsLabel}>Avg. Order Value</Text>
          </View>
        </View>
      </View>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Price Competitiveness</Text>
        <View style={styles.competitivenessStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Price Match Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Products Below Market</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2,500</Text>
            <Text style={styles.statLabel}>Avg. Price Advantage</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderOrders = () => (
    <View style={styles.section}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={[
                styles.orderStatus,
                item.status === 'completed' ? styles.statusCompleted : 
                item.status === 'rejected' ? styles.statusRejected : styles.statusPending
              ]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.customerName}>{item.customer.name}</Text>
            <Text style={styles.orderDate}>{formatDate(item.orderDate)}</Text>
            <View style={styles.orderItems}>
              {item.items.map((orderItem, index) => (
                <View key={index} style={styles.orderItemPreview}>
                  <Image source={orderItem.image} style={styles.itemThumbnail} />
                  <View style={styles.itemPreviewInfo}>
                    <Text style={styles.itemName}>{orderItem.name}</Text>
                    <Text style={styles.itemQuantity}>Qty: {orderItem.quantity}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{orderItem.price}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.orderTotal}>Total: ₹{item.total}</Text>
            <View style={styles.orderActionButtons}>
              <TouchableOpacity 
                style={styles.viewDetailsButton}
                onPress={() => {
                  setSelectedOrder(item);
                  setOrderDetailsVisible(true);
                }}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
              {item.status === 'pending' && (
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={() => handleOrderAction(item.id, 'accept')}
                  >
                    <Text style={styles.actionButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleOrderAction(item.id, 'reject')}
                  >
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={orderDetailsVisible}
        onRequestClose={() => setOrderDetailsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setOrderDetailsVisible(false)}
              >
                <View style={styles.closeIconContainer}>
                  <Ionicons name="close-circle" size={32} color="#5a4233" />
                </View>
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Name:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.name}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.phone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Address:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.address}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Order Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Order Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(selectedOrder.orderDate)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Method:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.paymentMethod}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text style={[
                      styles.statusBadge,
                      selectedOrder.status === 'completed' ? styles.statusCompleted :
                      selectedOrder.status === 'rejected' ? styles.statusRejected : styles.statusPending
                    ]}>
                      {selectedOrder.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Items</Text>
                  {selectedOrder.items.map((item, index) => (
                    <View key={index} style={styles.detailItem}>
                      <Image source={item.image} style={styles.detailItemImage} />
                      <View style={styles.detailItemInfo}>
                        <Text style={styles.detailItemName}>{item.name}</Text>
                        <Text style={styles.detailItemQuantity}>Quantity: {item.quantity}</Text>
                        <Text style={styles.detailItemPrice}>₹{item.price}</Text>
                      </View>
                    </View>
                  ))}
                  <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalAmount}>₹{selectedOrder.total}</Text>
                  </View>
                </View>

                {selectedOrder.status === 'pending' && (
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={[styles.modalActionButton, styles.acceptButton]}
                      onPress={() => handleOrderAction(selectedOrder.id, 'accept')}
                    >
                      <Text style={styles.modalActionButtonText}>Accept Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalActionButton, styles.rejectButton]}
                      onPress={() => handleOrderAction(selectedOrder.id, 'reject')}
                    >
                      <Text style={styles.modalActionButtonText}>Reject Order</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.section}>
      <View style={styles.profileCard}>
        <Image
          source={require('../../assets/images/shopScout.png')}
          style={styles.profileImage}
        />
        <Text style={styles.shopName}>My Shop Name</Text>
        <Text style={styles.shopAddress}>123 Shop Street, City</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#5a4233" />
            <Text style={styles.settingText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#5a4233" />
            <Text style={styles.settingText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="help-circle-outline" size={24} color="#5a4233" />
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#e3caa5', '#b58e6d']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopkeeper Dashboard</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inventory' && styles.activeTab]}
          onPress={() => setActiveTab('inventory')}
        >
          <Ionicons name="cube-outline" size={24} color={activeTab === 'inventory' ? '#fff' : '#5a4233'} />
          <Text style={[styles.tabText, activeTab === 'inventory' && styles.activeTabText]}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Ionicons name="receipt-outline" size={24} color={activeTab === 'orders' ? '#fff' : '#5a4233'} />
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <Ionicons name="bar-chart-outline" size={24} color={activeTab === 'analytics' ? '#fff' : '#5a4233'} />
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons name="person-outline" size={24} color={activeTab === 'profile' ? '#fff' : '#5a4233'} />
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'profile' && renderProfile()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={editingItem ? editingItem.name : newItem.name}
              onChangeText={(text) => {
                if (editingItem) {
                  setEditingItem({ ...editingItem, name: text });
                } else {
                  setNewItem({ ...newItem, name: text });
                }
              }}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={editingItem ? editingItem.price.toString() : newItem.price}
              onChangeText={(text) => {
                if (editingItem) {
                  setEditingItem({ ...editingItem, price: text });
                } else {
                  setNewItem({ ...newItem, price: text });
                }
              }}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={editingItem ? editingItem.quantity.toString() : newItem.quantity}
              onChangeText={(text) => {
                if (editingItem) {
                  setEditingItem({ ...editingItem, quantity: text });
                } else {
                  setNewItem({ ...newItem, quantity: text });
                }
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Category"
              value={editingItem ? editingItem.category : newItem.category}
              onChangeText={(text) => {
                if (editingItem) {
                  setEditingItem({ ...editingItem, category: text });
                } else {
                  setNewItem({ ...newItem, category: text });
                }
              }}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={editingItem ? editingItem.description : newItem.description}
              onChangeText={(text) => {
                if (editingItem) {
                  setEditingItem({ ...editingItem, description: text });
                } else {
                  setNewItem({ ...newItem, description: text });
                }
              }}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={editingItem ? handleUpdateItem : handleAddItem}
              >
                <Text style={styles.modalButtonText}>
                  {editingItem ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a4233',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#8b5e3b',
  },
  tabText: {
    marginLeft: 5,
    color: '#5a4233',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5e3b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 5,
  },
  itemDetails: {
    fontSize: 14,
    color: '#7a5645',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#8b5e3b',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#c4a27a',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#7a5645',
  },
  saveButton: {
    backgroundColor: '#8b5e3b',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  analyticsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 15,
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    flex: 1,
    alignItems: 'center',
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5e3b',
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#7a5645',
    marginTop: 5,
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topItemName: {
    fontSize: 16,
    color: '#5a4233',
  },
  topItemSales: {
    fontSize: 16,
    color: '#8b5e3b',
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
  },
  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusPending: {
    backgroundColor: '#ffd700',
    color: '#856404',
  },
  statusCompleted: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  customerName: {
    fontSize: 14,
    color: '#7a5645',
    marginBottom: 5,
  },
  orderItems: {
    marginVertical: 5,
  },
  orderItemPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  itemThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemPreviewInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5a4233',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#7a5645',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b5e3b',
  },
  orderDate: {
    fontSize: 12,
    color: '#7a5645',
    marginBottom: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
    marginTop: 5,
  },
  orderActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#8b5e3b',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  statusRejected: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 5,
  },
  shopAddress: {
    fontSize: 16,
    color: '#7a5645',
    marginBottom: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5e3b',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  editProfileText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  settingsSection: {
    width: '100%',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 16,
    color: '#5a4233',
    marginLeft: 10,
  },
  marketInsights: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 10,
  },
  insightsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insightCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  insightValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5e3b',
  },
  insightLabel: {
    fontSize: 12,
    color: '#7a5645',
    marginTop: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5e3b',
    marginLeft: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#7a5645',
    marginLeft: 5,
  },
  competitivenessStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5e3b',
  },
  statLabel: {
    fontSize: 12,
    color: '#7a5645',
    marginTop: 5,
    textAlign: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(90, 66, 51, 0.1)',
    paddingBottom: 15,
  },
  closeButton: {
    padding: 5,
    marginRight: -5,
  },
  closeIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  detailSection: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    color: '#7a5645',
    fontWeight: '600',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#5a4233',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  detailItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  detailItemInfo: {
    flex: 1,
  },
  detailItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
    marginBottom: 5,
  },
  detailItemQuantity: {
    fontSize: 14,
    color: '#7a5645',
  },
  detailItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5e3b',
    marginTop: 5,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(122, 86, 69, 0.2)',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4233',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5e3b',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  modalActionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalActionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});

export default ShopkeeperDashboard; 