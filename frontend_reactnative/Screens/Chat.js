import { Avatar,IconButton,TextInput} from "@react-native-material/core";
import { useEffect,useState} from "react";
import { SafeAreaView ,ScrollView,StyleSheet,View,Text, TouchableHighlight} from "react-native";
import { ORIGIN } from "../config";
import Icon from '@expo/vector-icons/MaterialIcons'
import Animated,{withTiming,useAnimatedStyle,Easing,useSharedValue} from 'react-native-reanimated'



export default function Chat({navigation,route}){
  const [messages,setMessages]=useState([]);
  const {user,contact} = route.params;
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:contact.displayname,
      headerLeft:()=><></>,
      headerRight:()=><Avatar size={40} style={{marginRight:10}} image={contact.profilePic=='./images/unknown.jpg'?require('../assets/unknown.jpg'):{uri:contact.profilePic}}/>
    });
    getMessages();
  },[]);
  const getMessages = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open('POST',`${ORIGIN}/getMessages`);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({contact:contact.username}));
    xhr.onload=()=>{
      if(xhr.responseText){
        let res = JSON.parse(xhr.responseText);
        setMessages(res);
      }
    }

  }
    return(
        <SafeAreaView style={styles.container}>
          <ScrollView style={{display:'flex',flexDirection:'column',width:'90%',marginVertical:20}}>
            {messages.map((e,i)=>{
              return(
                <View style={e.from==user.username?styles.send:styles.recieved} key={i}>
                  <Text style={{
                    color:e.from==user.username?'#fff':'#000',
                    fontFamily:'Poppins-regular'
                    }}>{e.data}</Text>
                </View>
              )
            })}
          </ScrollView>
          <Inputs/>
        </SafeAreaView>
    )
}
const Inputs = ({setText,setImage,send})=>{
  const [popup,setPopup]=useState(false);
  var animvalue=useSharedValue(0);
  const anim = useAnimatedStyle(()=>{
    return({
      height:withTiming(animvalue.value,{
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      })
    })
  })

  return(
    <View style={styles.inputContainer}>
    <View style={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TextInput variant="outlined" style={{height:40,flexGrow:1}} multiline  color="#ccc" trailing={
        <IconButton color="#fe3a70" icon={props => <Icon name="send" {...props}  />} />}/>
      <TouchableHighlight onPress={()=>{
        animvalue.value=popup?0:150;
        setPopup(p=>p?false:true);
        }} underlayColor={'#ddd'} style={{marginLeft:10}}>
        <View style={{borderWidth:1,borderColor:'#999',padding:10,borderRadius:5}}>
          <Icon name={popup?"keyboard-arrow-down":"attachment"} color={'#fe3a70'} size={32}  />
        </View>
      </TouchableHighlight>
      </View>

    <Animated.View style={[anim,{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly',height:150,alignItems:'center',overflow:'hidden'}]}>
    {/* <View style={}> */}
      <TouchableHighlight onPress={()=>{}} underlayColor={'#ddd'} style={{marginLeft:10,padding:20,borderRadius:10,paddingHorizontal:30}}><>
          <Icon name="collections" color={'#555'} size={40}  />
          <Text style={{marginTop:10}}>Gallery</Text>
      </></TouchableHighlight>
      <TouchableHighlight onPress={()=>{}} underlayColor={'#ddd'} style={{marginLeft:10,padding:20,borderRadius:10,paddingHorizontal:30}}><>
          <Icon name="camera-alt" color={'#555'} size={40}  />
          <Text style={{marginTop:10}}>Camera</Text>
      </></TouchableHighlight>
    {/* </View> */}
    </Animated.View>
  </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    send:{
        backgroundColor:'#fe3a70',
        paddingVertical:5,
        paddingHorizontal:10,
        alignSelf:'flex-end',
        borderBottomRightRadius:0,
        borderBottomLeftRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },
    recieved:{
      backgroundColor:'#ccc',
      paddingVertical:5,
      paddingHorizontal:10,
      alignSelf:'flex-start',
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
      borderTopRightRadius:10,
      borderTopLeftRadius:0,
  },
  inputContainer:{
    width:'95%',
    position:'absolute',
    bottom:0,
    padding:10,
    marginBottom:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  },
  });