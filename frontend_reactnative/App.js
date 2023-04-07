import { StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Chat from './Screens/Chat';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();
const loadFont =async()=>{
  await Font.loadAsync('Poppins-reqular',require('./assets/Poppins-Regular.ttf'));
  await Font.loadAsync('Poppins-bold',require('./assets/Poppins-Bold.ttf'));
}



export default function App() {
  useEffect(()=>{loadFont()},[]);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Home} name='Home'/>
          <Stack.Screen component={Chat} name='Chat'/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
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