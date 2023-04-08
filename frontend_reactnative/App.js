import { StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Chat from './Screens/Chat';
import Login from './Screens/Login';
import {ORIGIN} from './config'

import { useEffect ,useState} from 'react';

const Stack = createNativeStackNavigator();
const loadFont = async()=>{
  await Font.loadAsync({
    'Poppins-regular':require('./assets/Poppins-Regular.ttf'),
    'Poppins-bold':require('./assets/Poppins-Bold.ttf'),
  })
}



export default function App() {
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null);
  useEffect(()=>{loadFont()},[]);


  return (
  <>{user?
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Home} initialParams={{user,token}} name='Home' options={{title:'Contacts'}}/>
          <Stack.Screen component={Chat} name='Chat'/>
        </Stack.Navigator>
      </NavigationContainer>
    :
      <Login setToken={setToken} setUser={setUser}/>
  }</>
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