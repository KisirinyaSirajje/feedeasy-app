import axios from 'axios';
import { API_BASE } from '../config/api';
const api = axios.create({ baseURL: API_BASE });
export async function fetchCategories(){ const r = await api.get('/categories/'); return r.data; }
