// import React from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

// const products = {
//   Mobiles: [
//     { id: "1", name: "iPhone 13", price: "$799", image: require("../../assets/images/iphone13.jpg") },
//     { id: "2", name: "Samsung S21", price: "$699", image: require("../../assets/images/samsung21.jpg") },
//   ],
//   Laptops: [
//     { id: "3", name: "MacBook Air M1", price: "$999", image: require("../../assets/images/macbookair.jpg") },
//     { id: "4", name: "Dell XPS 13", price: "$1099", image: require("../../assets/images/delxps.jpeg") },
//   ],
//   Accessories: [
//     { id: "5", name: "AirPods Pro", price: "$249", image: require("../../assets/images/airpodespro.png") },
//     { id: "6", name: "Logitech Mouse", price: "$49", image: require("../../assets/images/mouse.jpg") },
//   ],
//   Cameras: [
//     { id: "7", name: "Canon EOS R5", price: "$3899", image: require("../../assets/images/canon.jpeg") },
//     { id: "8", name: "Sony A7 III", price: "$1999", image: require("../../assets/images/sonya7.jpeg") },
//   ],
// };

// const CategoryProductPage = ({ route, navigation }) => {
//   const { category } = route.params;
//   const categoryProducts = products[category.name] || [];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{category.name} Products</Text>
//       <FlatList
//         data={categoryProducts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
//             <View style={styles.productCard}>
//               <Image source={item.image} style={styles.productImage} />
//               <Text style={styles.productName}>{item.name}</Text>
//               <Text style={styles.productPrice}>{item.price}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#fff" },
//   header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   productCard: { padding: 10, marginVertical: 5, backgroundColor: "#f8f8f8", borderRadius: 8, alignItems: "center" },
//   productImage: { width: 100, height: 100, resizeMode: "contain" },
//   productName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
//   productPrice: { fontSize: 14, color: "gray" },
// });

// export default CategoryProductPage;
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

const products = {
  Mobiles: [
    { id: "1", name: "iPhone 13", image: require("../../assets/images/iphone13.jpg") },
    { id: "2", name: "Samsung S21", image: require("../../assets/images/samsung21.jpg") },
  ],
  Laptops: [
    { id: "3", name: "MacBook Air M1", image: require("../../assets/images/macbookair.jpg") },
    { id: "4", name: "Dell XPS 13", image: require("../../assets/images/delxps.jpeg") },
  ],
  Accessories: [
    { id: "5", name: "AirPods Pro", image: require("../../assets/images/airpodespro.png") },
    { id: "6", name: "Logitech Mouse", image: require("../../assets/images/mouse.jpg") },
  ],
  Cameras: [
    { id: "7", name: "Canon EOS R5", image: require("../../assets/images/canon.jpeg") },
    { id: "8", name: "Sony A7 III", image: require("../../assets/images/sonya7.jpeg") },
  ],
};

const shops = [
  {
    id: "1",
    name: "Croma",
    products: {
      "iPhone 14": 79999,
      "Samsung Galaxy S23": 74999,
      "MacBook Pro": 132999,
      "Dell XPS 13": 101999,
      "AirPods Pro": 24999,
      "Logitech Mouse": 2999,
      "Canon EOS R5": 389999,
      "Sony A7 III": 199999,
    },
  },
  {
    id: "2",
    name: "Reliance Digital",
    products: {
      "iPhone 14": 77999,
      "Samsung Galaxy S23": 72999,
      "MacBook Pro": 129999,
      "Dell XPS 13": 99999,
      "AirPods Pro": 23999,
      "Logitech Mouse": 2799,
      "Canon EOS R5": 384999,
      "Sony A7 III": 195999,
    },
  },
];

const CategoryProductPage = ({ route }) => {
  const { category } = route.params;
  const categoryProducts = products[category.name] || [];

  const getBestPrice = (productName) => {
    let bestPrice = null;
    let bestShop = "";
    
    shops.forEach((shop) => {
      if (shop.products[productName] !== undefined) {
        if (bestPrice === null || shop.products[productName] < bestPrice) {
          bestPrice = shop.products[productName];
          bestShop = shop.name;
        }
      }
    });

    return { bestPrice, bestShop };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.name} Products</Text>
      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { bestPrice, bestShop } = getBestPrice(item.name);
          return (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              {bestPrice ? (
                <Text style={styles.bestPrice}>
                  Best Price: ₹{bestPrice} ({bestShop})
                </Text>
              ) : (
                <Text style={styles.noPrice}>Not available</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FAF3E0" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#5A3E36" },
  productCard: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#F4E1D2",
    borderRadius: 8,
    alignItems: "center",
  },
  productImage: { width: 100, height: 100, resizeMode: "contain" },
  productName: { fontSize: 18, fontWeight: "bold", marginTop: 5, color: "#4A2F27" },
  bestPrice: { fontSize: 16, color: "green", marginTop: 5 },
  noPrice: { fontSize: 14, color: "red", marginTop: 5 },
});

export default CategoryProductPage;
