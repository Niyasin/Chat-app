import { Image, SafeAreaView } from "react-native";
import Icon from '@expo/vector-icons/MaterialIcons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


export default function Preview({navigation,route}){
    const {image} = route.params;
    const save = async()=>{
        const {status} = await MediaLibrary.requestPermissionsAsync();
        if(status=='granted'){
            let uriParts = image.split(';base64,');
            let fileType = uriParts[0].split(':')[1];
            let base64String = uriParts[1];
            let fileUri = FileSystem.documentDirectory +parseInt(Math.random()*1000)+'.' + fileType.split('/')[1];

            await FileSystem.writeAsStringAsync(fileUri,base64String,{
                encoding:FileSystem.EncodingType.Base64
            });

            let asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('chat',asset,false);
        }
    }
return(
    <SafeAreaView style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#000'}}>
        <Image source={{uri:image}} style={{flex:1,width:'95%'}} resizeMode="contain"/>
       <Icon style={{flex:0.1}} size={40} color={'#fff'} name='file-download' onPress={()=>{save()}}/>
    </SafeAreaView>
)
}