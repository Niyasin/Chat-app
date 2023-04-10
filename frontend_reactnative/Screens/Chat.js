import { Avatar,IconButton,TextInput} from "@react-native-material/core";
import { useEffect,useRef,useState} from "react";
import { SafeAreaView ,ScrollView,StyleSheet,View,Text, TouchableHighlight, Image} from "react-native";
import { ORIGIN } from "../config";
import Icon from '@expo/vector-icons/MaterialIcons';
import socket from "../socket";
import Animated,{withTiming,useAnimatedStyle,Easing,useSharedValue} from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker';


export default function Chat({navigation,route}){
  const [messages,setMessages]=useState([]); 
  const [image,setImage]=useState(null);

  const {user,contact} = route.params;
  const scrollRef=useRef(null);
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:contact.displayname,
      headerLeft:()=><></>,
      headerRight:()=><Avatar size={40} style={{marginRight:10}} image={contact.profilePic=='./images/unknown.jpg'?require('../assets/unknown.jpg'):{uri:contact.profilePic}}/>
    });
    getMessages();
    socket.on('incomingMessage',(data)=>{
      setMessages(messages=>[...messages,data]);
    })

  },[]);
  useEffect(()=>{
    scrollRef.current.scrollToEnd({animated:true});
  },[messages]);

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
          {image?<View style={styles.imagePreview}>
            <Image style={{width:'80%',height:'50%',resizeMode:'contain'}} source={{uri:image}}/>
            <IconButton  icon={props=><Icon size={30} name="close"/>} onPress={()=>{setImage(null)}}/>
          </View>
            :<></>}
          <ScrollView style={{display:'flex',flexDirection:'column',width:'90%',marginVertical:20,flex:1}} showsVerticalScrollIndicator={false} ref={scrollRef}>
            {messages.map((e,i)=>{
              
              return(
                <View style={e.from==user.username?styles.send:styles.recieved} key={i}>
                  {e.type=='text'?
                  <Text style={{
                    color:e.from==user.username?'#fff':'#000',
                    fontFamily:'Poppins-regular'
                  }}>{e.data}</Text>
                  :<>
                  <Image 
                    source={{uri:e.data}}
                    style={{width:200,height:250,resizeMode:'cover'}} 
                    />
                  <Text style={{
                    color:e.from==user.username?'#fff':'#000',
                    fontFamily:'Poppins-regular'
                  }}>{e.text}</Text>
                  </>}
                </View>
              )
            })}
          </ScrollView>
          <Inputs user={user} contact={contact} setMessages={setMessages} image={image} setImage={setImage}/>
        </SafeAreaView>
    )
}
const Inputs = ({user,contact,setMessages,image,setImage})=>{
  const [popup,setPopup]=useState(false);
  const [text,setText]=useState(null);
  var animvalue=useSharedValue(0);
  const anim = useAnimatedStyle(()=>{
    return({
      height:withTiming(animvalue.value,{
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      })
    })
  })



  const send = (text,image)=>{
    if(text && !image){
      let data={
        from:user.username,
        to:contact.username,
        type:'text',
        data:text,
      }
      socket.emit('privateMessage',data);
      setMessages(messages=>[...messages,data]);
    }else if(image){
      console.log('sfds');
      let data={
        from:user.username,
        to:contact.username,
        type:'image',
        data:image,
        text:text,
      }
      socket.emit('privateMessage',data);
      setMessages(messages=>[...messages,data]);
    }
    setText(null);
    setImage(null);
  }

  
  const pickImage = async()=>{
    let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowEditing:true,
      quality:0.9,
      allowsMultipleSelection:false,
      base64:true,
    })
    if(result){
      let res=result.assets[0].base64
      setImage('data:image/'+result.assets[0].uri.split('.').pop()+';base64,'+res);
      animvalue.value=popup?0:150;
      setPopup(false);
    }
  }


  return(
    <View style={styles.inputContainer}>
    <View style={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TextInput value={text} variant="outlined" style={{height:40,flexGrow:1}} multiline  color="#ccc" trailing={
        <IconButton color="#fe3a70" icon={props => <Icon name="send" {...props} 
        onPress={()=>{send(text,image)}}
        />} />}
        onChangeText={setText}
        />
      <TouchableHighlight onPress={()=>{
        animvalue.value=popup?0:150;
        setPopup(p=>p?false:true);
        }} underlayColor={'#ddd'} style={{marginLeft:10}}>
        <View style={{borderWidth:1,borderColor:'#999',padding:10,borderRadius:5,backgroundColor:'#fff'}}>
          <Icon name={popup?"keyboard-arrow-down":"attachment"} color={'#fe3a70'} size={32}  />
        </View>
      </TouchableHighlight>
      </View>

    <Animated.View style={[anim,{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly',height:150,alignItems:'center',overflow:'hidden'}]}>
      <TouchableHighlight onPress={()=>{pickImage()}} underlayColor={'#ddd'} style={{marginLeft:10,padding:20,borderRadius:10,paddingHorizontal:30}}><>
          <Icon name="collections" color={'#555'} size={40}  />
          <Text style={{marginTop:10}}>Gallery</Text>
      </></TouchableHighlight>
      <TouchableHighlight onPress={()=>{}} underlayColor={'#ddd'} style={{marginLeft:10,padding:20,borderRadius:10,paddingHorizontal:30}}><>
          <Icon name="camera-alt" color={'#555'} size={40}  />
          <Text style={{marginTop:10}}>Camera</Text>
      </></TouchableHighlight>
    </Animated.View>
  </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'flex-end',
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
        marginVertical:3,
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
        marginVertical:3,
        display:'flex',
        flexDirection:'column',
        
  },
  inputContainer:{
    width:'95%',
    marginBottom:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#fff',
    zIndex:3,
  },
  imagePreview:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
    backgroundColor:'#ffffffbb',
    position:'absolute',
    zIndex:2,
  }
  });