import axios from 'axios';
import { API_BASE } from '../config/api';

const api = axios.create({ baseURL: API_BASE });

export async function fetchCategories() {
  try {
    const response = await api.get('/categories/');
    return response.data;
  } catch (error) {
    console.log('API Error, using fallback data:', error.message);
    // Fallback data if API fails
    return [
      { id: 1, name: 'Poultry Feed' },
      { id: 2, name: 'Pig Feed' },
      { id: 3, name: 'Fish Feed' },
      { id: 4, name: 'Cattle Feed' },
      { id: 5, name: 'Medicine' },
      { id: 6, name: 'Supplements' }
    ];
  }
}
