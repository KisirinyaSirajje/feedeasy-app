import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
const Stack=createNativeStackNavigator();
export default function RootNavigator(){
 return(<Stack.Navigator initialRouteName="Login">
  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
  <Stack.Screen name="Home" component={HomeScreen}/>
  <Stack.Screen name="Products" component={ProductListScreen}/>
  <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{title:'Product'}}/>
  <Stack.Screen name="Orders" component={OrdersScreen}/>
 </Stack.Navigator>);
}
