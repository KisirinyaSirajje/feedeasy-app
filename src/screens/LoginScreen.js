import React,{useState} from 'react';
import {View,Text,TextInput,Button,StyleSheet} from 'react-native';
import {useAuth} from '../context/AuthContext';
export default function LoginScreen({navigation}){
 const {login}=useAuth(); const [id,setId]=useState(''); const [role,setRole]=useState('farmer');
 const go=()=>{ if(!id)return; login(id,role); navigation.replace('Home'); };
 return(<View style={s.c}>
  <Text style={s.t}>FeedEasy</Text>
  <TextInput style={s.i} placeholder="Enter your User ID" value={id} onChangeText={setId} keyboardType="numeric"/>
  <Button title="Continue" onPress={go}/>
 </View>);
}
const s=StyleSheet.create({c:{flex:1,justifyContent:'center',alignItems:'center',padding:24},t:{fontSize:32,fontWeight:'bold',marginBottom:24},i:{width:'100%',borderWidth:1,borderColor:'#ccc',borderRadius:8,padding:12,marginBottom:16}});
