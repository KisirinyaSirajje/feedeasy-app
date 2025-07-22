import axios from 'axios';
import { API_BASE } from '../config/api';
const api = axios.create({ baseURL: API_BASE });
export async function fetchProducts(params={}){
  const r = await api.get('/products/'); let d=r.data;
  if(params.category){ d=d.filter(p=>p.category===params.category); }
  return d;
}
export async function fetchProduct(id){ const r=await api.get(`/products/${id}/`); return r.data; }
