import { Avatar,Text } from "@react-native-material/core";
import { useEffect,useState } from "react";
import { SafeAreaView ,StyleSheet,ScrollView,View,TouchableHighlight} from "react-native";
import { ORIGIN } from "../config";
import socket from "../socket";

export default function Home({navigation,route}){
  const {user,token} = route.params;
  const [contacts,setContacts]=useState([]);
  // const [socket,setSocket]=useState(null);

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=>{
        if(user.profilePic=='./images/unknown.jpg'){
          return(<Avatar size={40} image={require('../assets/unknown.jpg')}/>)
        }else{
          return(<Avatar size={40} image={{uri:user.profilePic}}/>)
        }
    }
    });
    getContacts();
    socket.emit('setOnline');
  },[]);

  const getContacts = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open('POST',`${ORIGIN}/getContacts`);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.onload=()=>{
      if(xhr.responseText){
        let res =JSON.parse(xhr.responseText);
        setContacts(res);
      }
    }
  }
  
    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {contacts.map((e,i)=>{
              return(
                <ListItem e={e} key={i} action={()=>{
                  navigation.navigate('Chat',{user,contact:e})
                }}/>
              )
            })}
          </ScrollView>
        </SafeAreaView>
    )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });

  const ListItem = ({e,action})=>{
    return(
      <TouchableHighlight underlayColor="#eee" onPress={action}>
        <View style={{display:'flex',flexDirection:'row',marginHorizontal:20,paddingVertical:10,borderBottomWidth:1,borderColor:'#ddd'}}>
          {e.profilePic=="./images/unknown"?<Avatar size={50} image={require('../assets/unknown.jpg')}/>:<Avatar size={50} image={{uri:e.profilePic}}/>}
          <View style={{display:'flex',flexDirection:'column',marginLeft:20}}>
            <Text style={{fontFamily:'Poppins-bold',fontSize:20}}>{e.displayname}</Text>
            <Text style={{fontFamily:'Poppins-regular',fontSize:15,color:'#999'}}>@{e.username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }