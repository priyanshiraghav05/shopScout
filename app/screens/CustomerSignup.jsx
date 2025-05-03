// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const CustomerSignup = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = () => {
//     // You can implement authentication logic here (API call, validation, etc.)
//     console.log("Signup details:", { name, email, password });
//     alert("Signup Successful!"); // Replace with navigation to another screen
//     navigation.navigate("MainScreen"); // Redirect to Main Screen after signup
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Customer Signup</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />
      
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
      
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("CustomerLogin")}>
//         <Text style={styles.linkText}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     padding: 12,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   linkText: {
//     color: "#007bff",
//     marginTop: 15,
//   },
// });

// export default CustomerSignup;
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

const CustomerSignup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup details:", { name, email, password });
    alert("Signup Successful!");
    navigation.navigate("MainScreen");
  };

  return (
    <LinearGradient colors={["#f5e1da", "#e0c3a5", "#c8a27a"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.innerContainer}>
        <Text style={styles.heading}>Create an Account</Text>
        <Text style={styles.subHeading}>Sign up to get started</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#6b4f4f"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#6b4f4f"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6b4f4f"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <LinearGradient colors={["#9d6b53", "#6b4f4f"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CustomerLogin")}>
          <Text style={styles.signupText}>Already have an account? <Text style={styles.signupLink}>Login</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  innerContainer: { width: "85%", alignItems: "center" },
  heading: { fontSize: 28, fontWeight: "bold", color: "#6b4f4f", marginBottom: 5 },
  subHeading: { fontSize: 16, color: "#8b6a5c", marginBottom: 20 },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    color: "#6b4f4f",
    borderWidth: 1,
    borderColor: "#c8a27a",
    textAlign: "center",
  },
  button: { width: "60%", borderRadius: 30, overflow: "hidden", marginBottom: 20 },
  buttonGradient: { padding: 15, alignItems: "center", borderRadius: 30 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signupText: { color: "#8b6a5c", fontSize: 14 },
  signupLink: { color: "#6b4f4f", fontWeight: "bold" },
});

export default CustomerSignup;
