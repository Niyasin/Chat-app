import { useState } from "react";
import { View,StyleSheet,Text,TextInput, TouchableHighlight} from "react-native";

const Login=(props)=>{
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [error,setError]=useState(null);
    return(
        <View style={styles.login}>
            <Text style={styles.h1}>Login</Text>
            <TextInput 
                placeholder='Username'
                style={styles.input}
                onChangeText={(text)=>{setUsername(text)}}
            />
            <TextInput
                textContentType='password' 
                secureTextEntry={true} 
                placeholder='Password' 
                style={styles.input}
                onChangeText={(text)=>{setPassword(text)}}
            />
            <TouchableHighlight style={styles.button} underlayColor='#999999' onPress={()=>{}}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            {error?<Text style={styles.linkText}>{error}</Text>:<></>}
            <Text style={styles.linkText}>Dont have an account ?</Text>
        </View>
    );
}

export default Login;
const styles = StyleSheet.create({
    login:{
      width:'80%',
      height:'50%',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      borderColor:'#444',
      borderWidth:0.5,
      padding:20,
      borderRadius:15,
    },
    h1:{
      fontSize:50,
      fontFamily:'Cairo'
    },
    input:{
      fontSize:20,
      width:'90%',
      borderColor:'#999',
      borderBottomWidth:1,
      fontFamily:'Cairo',
    },
    linkText:{
      fontFamily:'Cairo',
      color:'#308cab',
      fontSize:20,
    },
    error:{
      fontFamily:'Cairo',
      color:'red',
      fontSize:20,
    },
    button:{
        backgroundColor:'#333333',
        paddingHorizontal:20,
        paddingVertical:2,
        borderRadius:10,
    },
    buttonText:{
        fontSize:25,
        color:'#fff',
        fontFamily:'Cairo',
    },
  });