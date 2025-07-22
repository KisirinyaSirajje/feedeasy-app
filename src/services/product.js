import axios from 'axios';
import { API_BASE } from '../config/api';

const api = axios.create({ baseURL: API_BASE });

const fallbackProducts = [
  { id: 1, name: 'Premium Chicken Feed', price: 45000, description: 'High quality feed for broiler chickens', category: 1 },
  { id: 2, name: 'Layer Mash', price: 42000, description: 'Nutritious feed for laying hens', category: 1 },
  { id: 3, name: 'Pig Starter Feed', price: 48000, description: 'Complete feed for young pigs', category: 2 },
  { id: 4, name: 'Fish Pellets', price: 38000, description: 'Floating pellets for fish farming', category: 3 },
  { id: 5, name: 'Cattle Concentrate', price: 52000, description: 'Protein-rich feed for dairy cattle', category: 4 },
  { id: 6, name: 'Antibiotics', price: 15000, description: 'Veterinary antibiotics for livestock', category: 5 },
  { id: 7, name: 'Vitamin Supplements', price: 22000, description: 'Essential vitamins for animal health', category: 6 }
];

export async function fetchProducts(params = {}) {
  try {
    const response = await api.get('/products/');
    let data = response.data;
    if (params.category) {
      data = data.filter(p => p.category === params.category.id);
    }
    return data;
  } catch (error) {
    console.log('API Error, using fallback data:', error.message);
    let data = fallbackProducts;
    if (params.category) {
      data = data.filter(p => p.category === params.category.id);
    }
    return data;
  }
}

export async function fetchProduct(id) {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.log('API Error, using fallback data:', error.message);
    return fallbackProducts.find(p => p.id === parseInt(id)) || fallbackProducts[0];
  }
}
