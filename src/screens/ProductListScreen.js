import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,RefreshControl} from 'react-native';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from '../services/product';
import {API_BASE} from '../config/api';
export default function ProductListScreen({route,navigation}){
 const category=route.params?.category||null;
 const [products,setProducts]=useState([]); const [loading,setLoading]=useState(false);
 async function load(){ setLoading(true); try{ const d=await fetchProducts({category:category?.id}); const host=API_BASE.replace('/api',''); const mapped=d.map(p=>({...p,image:(p.image&&!p.image.startsWith('http'))?`${host}${p.image}`:p.image})); setProducts(mapped);}catch(e){console.error(e);}finally{setLoading(false);} }
 useEffect(()=>{load();},[]);
 return(<View style={{flex:1,paddingTop:40}}>
  <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center'}}>{category?category.name:'Products'}</Text>
  <FlatList data={products} keyExtractor={i=>String(i.id)}
    renderItem={({item})=>(<ProductCard item={item} onPress={()=>navigation.navigate('ProductDetail',{productId:item.id})}/>)}
    refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/>}
  />
 </View>);
}
