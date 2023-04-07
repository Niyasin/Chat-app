import { SafeAreaView ,StyleSheet,View,Image} from "react-native";
import {TextInput,Button,Text,ActivityIndicator} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from "react";
const ORIGIN ='https://suggerdeploy.onrender.com';



export default function Login(){
  const [login,setLogin]=useState(true);
  const [loading,setLoading]=useState(false);
  const [username,setUsername]=useState(null);
  const [password,setPassword]=useState(null);
  const [error,setError]=useState(null);


  const send = ()=>{
    setError(null);
    setLoading(true);
    let xhr = new XMLHttpRequest();
    xhr.open('POST',`${ORIGIN}/${login?'login':'signup'}`);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({
      username,password
    }));
    xhr.onload= async()=>{
      if(xhr.responseText){
        setLoading(false);
        let res = JSON.parse(xhr.responseText);
        if(res.token){
          await AsyncStorage.setItem('@token',res.token);
        }else{
          setError(res.error);
        }
      }else{
        setError("Something went wrong !");
      }
    }
  }
  
  
  return(
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {loading?
              <ActivityIndicator size="large" color="#fe3a70"/>
            :<>
              <Image source={require('../assets/login.jpg')} style={{width:'100%',resizeMode:'contain'}}/>
              <Text variant="h3" style={{fontFamily:'Poppins-bold'}}>{login?"Login":"Signup"}</Text>
              <TextInput label="Username" variant="outlined" color="#000" style={{marginVertical:10}} onChangeText={(e)=>{setUsername(e)}}/>
              <TextInput label="Password" variant="outlined" color="#000" style={{marginVertical:10}} onChangeText={(e)=>{setPassword(e)}} secureTextEntry={true}/>
              <Button title={login?"Login":"Signup"} variant="outlined" color="#f00" style={{marginVertical:10}} onPress={send}/>
              <Text style={{fontFamily:'Poppins-regular',color:"#0088dd",alignSelf:'center',marginTop:20}} onPress={()=>{setLogin(login?false:true)}}>{error}</Text>
              <Text style={{fontFamily:'Poppins-regular',color:"#0088dd",alignSelf:'center',marginTop:20}} onPress={()=>{setLogin(login?false:true)}}>{login?"Dont have an account ?":"Already have an account !"}</Text>
            </>
          }
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent: 'center',
    },
    content:{
      width:'80%',
      display:'flex',
      flexDirection:'column',
    }
  });