import { StyleSheet,SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import Home from './Screens/Home';
import Chat from './Screens/Chat';
import Login from './Screens/Login';
import {ORIGIN} from './config'

import { useCallback, useEffect ,useState} from 'react';
import Preview from './Screens/Preview';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();




export default function App() {
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null);
  const [ready,setReady]=useState(false);

  
  useEffect(()=>{
    async function loadFont (){
      try{
        await Font.loadAsync({
          'Poppins-regular':require('./assets/Poppins-Regular.ttf'),
          'Poppins-bold':require('./assets/Poppins-Bold.ttf'),
        })
      }catch(e){
        console.log(e);
      }finally{
        setReady(true)
      }
    }
    loadFont();
  },[]);
  
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{flex:1}}>
      {user?
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Home} initialParams={{user,token}} name='Home' options={{title:'Contacts'}}/>
          <Stack.Screen component={Chat} name='Chat'/>
          <Stack.Screen component={Preview} name='Preview' options={{header:()=>{}}}/>
        </Stack.Navigator>
      </NavigationContainer>
    :
    <Login setToken={setToken} setUser={setUser}/>
  }</SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});