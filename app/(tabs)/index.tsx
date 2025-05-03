// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MainScreen from "../screens/MainScreen"; // Import the custom Home Screen
// import ExploreScreen from "./explore"; // Other tab screen
//import CustomerLogin from "../screens/CustomerLogin"; 

// const Tab = createBottomTabNavigator();

// export default function AppNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={MainScreen} /> 
//       <Tab.Screen name="Explore" component={ExploreScreen} />
//<Tab.Screen name="CustomerLogin" component={CustomerLogin} />
//     </Tab.Navigator>
//   );
// }



// import { registerRootComponent } from "expo";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import MainScreen from "../screens/MainScreen";
// import CustomerLogin from "../screens/CustomerLogin"; // Import CustomerLogin



// const Stack = createStackNavigator();

// const App = () => {
//   return (
//   <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="MainScreen" component={MainScreen} />
//         <Stack.Screen name="CustomerLogin" component={CustomerLogin} /> 
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// registerRootComponent(App); 
// export default App;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import CustomerLogin from '../screens/CustomerLogin';
import CustomerSignup from '../screens/CustomerSignup';
import ShopkeeperLogin from '../screens/ShopkeeperLogin';
import ShopkeeperSignup from '../screens/ShopkeeperSignup';
import ShopkeeperDashboard from '../screens/ShopkeeperDashboard';
import CustomerHome from '../screens/CustomerHome';
import CategoryScreen from '../screens/CategoryScreen';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
      <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
      <Stack.Screen name="ShopkeeperLogin" component={ShopkeeperLogin} />
      <Stack.Screen name="ShopkeeperSignup" component={ShopkeeperSignup} />
      <Stack.Screen name="ShopkeeperDashboard" component={ShopkeeperDashboard} />
      <Stack.Screen name="CustomerHome" component={CustomerHome} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
};

export default App;
