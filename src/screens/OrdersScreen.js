import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,RefreshControl} from 'react-native';
import {fetchOrders} from '../services/order';
import {useAuth} from '../context/AuthContext';
export default function OrdersScreen(){
 const {user}=useAuth(); const [orders,setOrders]=useState([]); const [loading,setLoading]=useState(false);
 async function load(){ setLoading(true); try{ const d=await fetchOrders(); const mine=user?d.filter(o=>o.farmer===user.id):[]; setOrders(mine);}catch(e){console.error(e);}finally{setLoading(false);} }
 useEffect(()=>{load();},[user?.id]);
 if(!user){return(<View style={{flex:1,justifyContent:'center',alignItems:'center',padding:24}}><Text>Please login to view your orders.</Text></View>);}
 return(<View style={{flex:1,paddingTop:40}}>
  <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center'}}>My Orders</Text>
  <FlatList data={orders} keyExtractor={i=>String(i.id)}
   renderItem={({item})=>(<View style={{marginHorizontal:16,marginVertical:8,padding:16,borderWidth:1,borderColor:'#ddd',borderRadius:8}}>
     <Text>Product ID: {item.product}</Text>
     <Text>Qty: {item.quantity}</Text>
     <Text>Status: {item.status}</Text>
     <Text>Date: {new Date(item.created_at).toLocaleString()}</Text>
   </View>)}
   refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/>}
  />
 </View>);
}
