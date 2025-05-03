
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ShopkeeperSignup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup details:", { name, shopName, email, password });
    alert("Signup Successful!");
    navigation.navigate("MainScreen");
  };

  return (
    <LinearGradient colors={["#e7d2b9", "#b58e6d"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.innerContainer}>
        
        <Text style={styles.heading}>Shopkeeper Signup</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#5a4233"
          />

          <TextInput
            style={styles.input}
            placeholder="Shop Name"
            value={shopName}
            onChangeText={setShopName}
            placeholderTextColor="#5a4233"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#5a4233"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#5a4233"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <LinearGradient colors={["#8b5e3b", "#6b4226"]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ShopkeeperLogin")}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login here</Text></Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  innerContainer: { width: "85%", alignItems: "center" },
  heading: { fontSize: 28, fontWeight: "bold", color: "#5a4233", marginBottom: 15 },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#5a4233",
    borderWidth: 1,
    borderColor: "#c4a27a",
    textAlign: "center",
  },
  button: { width: "60%", borderRadius: 15, overflow: "hidden", marginTop: 10 },
  buttonGradient: { padding: 15, alignItems: "center", borderRadius: 15 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginText: { color: "#7a5645", fontSize: 14, marginTop: 15 },
  loginLink: { color: "#5a4233", fontWeight: "bold" },
});

export default ShopkeeperSignup;
