
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryProductPage from "./CategoryProductPage";
import FilteredShopsPage from "./FilteredShopsPage";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "1", name: "Mobiles", image: require("../../assets/images/mobile.jpeg") },
  { id: "2", name: "Laptops", image: require("../../assets/images/laptops.jpg") },
  { id: "3", name: "Accessories", image: require("../../assets/images/accessories.jpeg") },
  { id: "4", name: "Cameras", image: require("../../assets/images/camera.jpeg") },
];

const shops = [
  {
    id: "1",
    name: "Croma",
    location:
      "Unit No 201A, 2nd Flr, Elante Mall, PN 178 & 178A, Phase 1 Industrial Area Chandigarh - 160002",
    products: [
      { name: "iPhone 14", price: 79999 },
      { name: "Samsung Galaxy S23", price: 74999 },
      { name: "MacBook Pro", price: 132999 }, // Added for comparison
      { name: "Dell XPS 13", price: 101999 }, // Added for comparison
    ],
    image: require("../../assets/images/croma.png"),
  },
  {
    id: "2",
    name: "Reliance Digital",
    location:
      "Shop No 247, 2nd Floor, Elante Mall Industrial & Business Park Area Chandigarh - 160002",
    products: [
      { name: "iPhone 14", price: 77999 }, // Now also available here
      { name: "Samsung Galaxy S23", price: 72999 }, // Now also available here
      { name: "MacBook Pro", price: 129999 },
      { name: "Dell XPS 13", price: 99999 },
    ],
    image: require("../../assets/images/reliance.png"),
  },
];

const HomePage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShops, setFilteredShops] = useState(shops);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const newShops = shops.filter((shop) => shop.name.toLowerCase().includes(text.toLowerCase()));
    const newCategories = categories.filter((category) => category.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredShops(newShops);
    setFilteredCategories(newCategories);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search products or shops..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      
      <Text style={styles.sectionHeader}>Nearby Shops</Text>
    {filteredShops.length > 0 ? (
      <FlatList
        horizontal
        data={filteredShops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ShopDetails", { shop: item })}>
            <View style={styles.shopCard}>
              <Image source={item.image} style={styles.shopImage} />
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopLocation} numberOfLines={4}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }} // ✅ Prevent shrinking
        showsHorizontalScrollIndicator={false}
      />
    ) : (
      <Text style={styles.noResultsText}>No nearby shops found</Text>
    )}
      
      <Text style={styles.sectionHeader}>Categories</Text>
    {filteredCategories.length > 0 ? (
      <FlatList
        data={filteredCategories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("CategoryProducts", { category: item })}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    ) : (
      <Text style={styles.noResultsText}>No categories found</Text>
    )}
    </View>
    </ScrollView>
  );
};
const ShopDetailsPage = ({ route }) => {
  const { shop } = route.params;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comparison, setComparison] = useState([]);

  // Function to compare prices of a selected product across all shops
  const comparePrices = (productName) => {
    const priceList = [];

    shops.forEach((s) => {
      s.products.forEach((product) => {
        if (product.name === productName) {
          priceList.push({ shop: s.name, price: product.price });
        }
      });
    });

    // Sort prices from lowest to highest
    priceList.sort((a, b) => a.price - b.price);

    setSelectedProduct(productName);
    setComparison(priceList);
  };

  return (
    <View style={styles.container}>
      {/* Shop Details */}
      <Text style={styles.shopName}>{shop.name}</Text>
      <Text style={styles.shopLocation}>{shop.location}</Text>

      {/* Available Products List */}
      <Text style={styles.sectionHeader}>Available Products</Text>
      <FlatList
        data={shop.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => comparePrices(item.name)} 
            style={styles.productCard}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Price Comparison Section */}
      {selectedProduct && (
        <View style={styles.comparisonContainer}>
          <Text style={styles.sectionHeader}>Best Prices for {selectedProduct}</Text>
          {comparison.map((item, index) => (
            <Text 
              key={index} 
              style={[
                styles.comparisonText, 
                index === 0 && { color: "green", fontWeight: "bold" } // Highlight best price
              ]}
            >
              {item.shop}: ₹{item.price}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const CategoriesPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>All Categories</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("FilteredShops", { category: item.name })}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ProfilePage = () => {
  return (
    <View style={styles.profileContainer}>
      <Image source={require("../../assets/images/user.png")} style={styles.profileImage} />
      <Text style={styles.sectionHeader}>Profile</Text>
      <Text style={styles.userName}>John Doe</Text>
      <Text style={styles.text}>Email: johndoe@example.com</Text>
      <TouchableOpacity style={styles.button}>
    <Ionicons name="pencil" size={16} color="black" />
    <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="ShopDetails" component={ShopDetailsPage} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductPage} />
      <Stack.Screen name="FilteredShops" component={FilteredShopsPage}  /> 
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Categories" component={CategoriesPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF3E0", padding: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4E1D2",
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
  },
  searchIcon: { marginRight: 10 },
  searchBar: { flex: 1, fontSize: 16, color: "#5A3E36" },
  sectionHeader: { fontSize: 20, fontWeight: "bold", color: "#5A3E36", marginBottom: 10 },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    
  },
  shopCard: {
    backgroundColor: "#E8C6A7",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    width: 200, // Adjusted width for better layout
    minHeight: 270,  // Ensures minimum height but allows expansion
    justifyContent: "flex-start", // Lets card expand if needed
  },
  shopName: { fontSize: 18, fontWeight: "bold", color: "#4A2F27" },
  shopLocation: {
    fontSize: 12, // Smaller font for better fit
    color: "#6B4F4F",
    textAlign: "center",
    paddingHorizontal: 5,
    flexShrink: 1, // Prevents text from getting cut
    flexWrap: "wrap", // Ensures text wraps properly
    width: "100%",
    minHeight: 60, 
    overflow: "visible",
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EED6C4",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 100, height: 100, resizeMode: "contain", marginBottom: 8 },
  categoryName: { fontSize: 16, fontWeight: "bold", color: "#4A2F27" },
  productCard: { padding: 10, margin: 5, backgroundColor: "#f9f9f9", borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: "green" },
  noResultsText: { textAlign: "center", fontSize: 16, color: "#6B4F4F", marginVertical: 10 },
  shopImage: {
    width: "100%",
    height: 120, // Increased height for better layout
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  comparisonContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFF0E0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5B299",
  },
  comparisonText: {
    fontSize: 16,
    color: "#5A3E36",
    marginVertical: 3,
  },
  
});

export default AppNavigator;