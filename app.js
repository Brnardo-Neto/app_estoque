import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InventoryList from './InventoryList';
import EditItem from './EditItem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InventoryList">
        <Stack.Screen 
          name="InventoryList" 
          component={InventoryList} 
          options={{ title: 'Estoque', headerStyle: { backgroundColor: '#000' }, headerTintColor: '#008000' }} 
        />
        <Stack.Screen 
          name="EditItem" 
          component={EditItem} 
          options={{ title: 'Editar Item', headerStyle: { backgroundColor: '#000' }, headerTintColor: '#008000' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}