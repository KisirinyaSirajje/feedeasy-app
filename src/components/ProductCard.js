import React from 'react';
import {TouchableOpacity,Text,View,StyleSheet,Image} from 'react-native';
export default function ProductCard({item,onPress}){
 return(
  <TouchableOpacity style={s.card} onPress={onPress}>
    {item.image?(<Image source={{uri:item.image}} style={s.image}/>):(<View style={[s.image,s.placeholder]}/>)}
    <View style={s.info}>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.price}>UGX {item.price}</Text>
    </View>
  </TouchableOpacity>
 );
}
const s=StyleSheet.create({card:{flexDirection:'row',alignItems:'center',padding:12,marginHorizontal:16,marginVertical:8,borderWidth:1,borderColor:'#ddd',borderRadius:8,backgroundColor:'#fff'},image:{width:64,height:64,borderRadius:8,backgroundColor:'#ccc'},placeholder:{justifyContent:'center',alignItems:'center'},info:{marginLeft:16,flex:1},name:{fontSize:16,fontWeight:'bold',marginBottom:4},price:{fontSize:14,color:'#333'}});
