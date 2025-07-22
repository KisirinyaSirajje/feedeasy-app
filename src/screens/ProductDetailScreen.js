import React,{useEffect,useState} from 'react';
import {View,Text,Image,Button,TextInput,StyleSheet,ScrollView,Alert} from 'react-native';
import {fetchProduct} from '../services/product';
import {placeOrder} from '../services/order';
import {useAuth} from '../context/AuthContext';
import {API_BASE} from '../config/api';
export default function ProductDetailScreen({route,navigation}){
 const {productId}=route.params; const [product,setProduct]=useState(null); const [qty,setQty]=useState('1'); const [loading,setLoading]=useState(false); const {user}=useAuth();
 async function load(){ try{ const d=await fetchProduct(productId); const host=API_BASE.replace('/api',''); const image=(d.image&&!d.image.startsWith('http'))?`${host}${d.image}`:d.image; setProduct({...d,image}); }catch(e){console.error(e);} }
 useEffect(()=>{load();},[productId]);
 const handleOrder=async()=>{ if(!user){Alert.alert('Please login first');return;} const quantity=parseInt(qty,10)||1; setLoading(true); try{ await placeOrder({farmer:user.id,product:productId,quantity}); Alert.alert('Order placed!'); navigation.navigate('Orders'); }catch(e){console.error(e);Alert.alert('Error placing order');}finally{setLoading(false);} };
 if(!product){ return(<View style={s.center}><Text>Loading...</Text></View>); }
 return(<ScrollView contentContainerStyle={s.container}>
  {product.image?(<Image source={{uri:product.image}} style={s.image}/>):(<View style={[s.image,s.placeholder]}/>)}
  <Text style={s.name}>{product.name}</Text>
  <Text style={s.price}>UGX {product.price}</Text>
  <Text style={s.desc}>{product.description}</Text>
  <TextInput style={s.input} value={qty} onChangeText={setQty} keyboardType="numeric" placeholder="Quantity"/>
  <Button title={loading?'Placing...':'Place Order'} onPress={handleOrder} disabled={loading}/>
 </ScrollView>);
}
const s=StyleSheet.create({center:{flex:1,justifyContent:'center',alignItems:'center'},container:{padding:16,alignItems:'center'},image:{width:200,height:200,borderRadius:8,backgroundColor:'#ccc',marginBottom:16},placeholder:{justifyContent:'center',alignItems:'center'},name:{fontSize:24,fontWeight:'bold',marginBottom:8},price:{fontSize:20,marginBottom:8},desc:{fontSize:16,marginBottom:16,textAlign:'center'},input:{width:'100%',borderWidth:1,borderColor:'#ccc',borderRadius:8,padding:12,marginBottom:16}});
