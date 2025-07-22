import axios from 'axios';
import { API_BASE } from '../config/api';
const api = axios.create({ baseURL: API_BASE });
export async function placeOrder({farmer,product,quantity}){
  const payload={farmer,product,quantity,status:'pending'};
  const r=await api.post('/orders/',payload); return r.data;
}
export async function fetchOrders(){ const r=await api.get('/orders/'); return r.data; }
