import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from "@react-navigation/drawer";

import HomeScreen from './ImageGallery/HomeScreen';
import PhotoDetail from './ImageGallery/PhotoDetail';

const StackNav =()=> {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
      <Stack.Screen name="Homex" component={HomeScreen} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetail} />
      
    </Stack.Navigator>
  );
}


const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
     <Drawer.Navigator>
        <Drawer.Screen name="Home" component={StackNav} />
     </Drawer.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
