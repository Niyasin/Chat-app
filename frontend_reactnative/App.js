import { StyleSheet, Text, View} from 'react-native';
import {useFonts} from 'expo-font';

import Login from './Login'

const url='http://localhost:8080/'

export default function App() {
  const Cairo = useFonts({
    'Cairo':require('./assets/Cairo.ttf'),
  });
  return (
    <View style={styles.container}>
      <Login url={url}/>
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
