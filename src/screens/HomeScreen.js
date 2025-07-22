import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,RefreshControl} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import {fetchCategories} from '../services/category';
export default function HomeScreen({navigation}){
 const [cats,setCats]=useState([]); const [loading,setLoading]=useState(false);
 async function load(){ setLoading(true); try{ const d=await fetchCategories(); setCats(d);}catch(e){console.error(e);}finally{setLoading(false);} }
 useEffect(()=>{load();},[]);
 return(<View style={{flex:1,paddingTop:40}}>
  <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center'}}>Categories</Text>
  <FlatList data={cats} keyExtractor={i=>String(i.id)}
   renderItem={({item})=>(<CategoryCard item={item} onPress={()=>navigation.navigate('Products',{category:item})}/> )}
   refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/>}
  />
 </View>);
}
