export default function FilteredShopsPage ({ route, navigation }) {
    const { category } = route.params;
  
    // Filter shops that have at least one product in the selected category
    const filteredShops = shops.filter((shop) =>
      shop.products.some((product) => categories.find((c) => c.name === category && c.id === category.id))
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.sectionHeader}>Shops Selling {category}</Text>
        {filteredShops.length > 0 ? (
          <FlatList
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
          />
        ) : (
          <Text style={styles.noResultsText}>No shops found for this category.</Text>
        )}
      </View>
    );
  };
  