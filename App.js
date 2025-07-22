import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

// Simple Auth Context
const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const login = (id, role = 'farmer') => setUser({ id: Number(id), role });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

// Colors
const Colors = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  secondary: '#81C784',
  background: '#F1F8E9',
  surface: '#FFFFFF',
  text: '#2E2E2E',
  textSecondary: '#757575',
  border: '#E0E0E0',
};

// Login Screen
function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [id, setId] = React.useState('');

  const handleLogin = () => {
    if (!id.trim()) {
      Alert.alert('Error', 'Please enter your User ID');
      return;
    }
    login(id, 'farmer');
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🌱 FeedEasy</Text>
        <Text style={styles.subtitle}>Connecting Farmers & Feed Sellers</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>User ID</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter your User ID"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
          placeholderTextColor={Colors.textSecondary}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue as farmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  const categories = [
    { id: 1, name: 'Poultry Feed', emoji: '🐔' },
    { id: 2, name: 'Pig Feed', emoji: '🐷' },
    { id: 3, name: 'Fish Feed', emoji: '🐟' },
    { id: 4, name: 'Cattle Feed', emoji: '🐄' },
    { id: 5, name: 'Medicine', emoji: '💊' },
    { id: 6, name: 'Supplements', emoji: '🌿' },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('Products', { category: item })}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.description}>Browse products</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 FeedEasy</Text>
        <Text style={styles.headerSubtitle}>Choose a Category</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={item => String(item.id)}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Products Screen
function ProductsScreen({ route, navigation }) {
  const { category } = route.params;
  
  const products = [
    { id: 1, name: 'Premium Feed', price: 45000, description: 'High quality feed' },
    { id: 2, name: 'Quality Supplement', price: 25000, description: 'Essential vitamins' },
    { id: 3, name: 'Health Medicine', price: 15000, description: 'Veterinary medicine' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>UGX {item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Product Detail Screen
function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{product.name}</Text>
        <Text style={styles.detailDescription}>{product.description}</Text>
        <Text style={styles.detailPrice}>UGX {product.price.toLocaleString()}</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main App
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Products" 
            component={ProductsScreen}
            options={({ route }) => ({ 
              title: route.params?.category?.name || 'Products' 
            })}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{ title: 'Product Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 80,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.surface,
    margin: 24,
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: Colors.surface,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.surface,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.secondary,
  },
  listContainer: {
    paddingVertical: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  arrow: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  detailContainer: {
    padding: 24,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  detailPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 32,
  },
});
