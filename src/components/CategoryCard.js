import React from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
export default function CategoryCard({item,onPress}){
 return(<TouchableOpacity style={s.card} onPress={onPress}><Text style={s.text}>{item.name}</Text></TouchableOpacity>);
}
const s=StyleSheet.create({card:{padding:16,marginVertical:8,marginHorizontal:16,borderWidth:1,borderRadius:8,backgroundColor:'#f0f0f0',borderColor:'#ddd'},text:{fontSize:18,fontWeight:'bold'}});
