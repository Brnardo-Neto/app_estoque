import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InventoryList = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('items');
        if (savedItems !== null) {
          setItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadItems();
  }, []);

  const deleteItem = async (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditItem', { item })} />
            <Button title="Excluir" onPress={() => deleteItem(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#008000',
  },
  itemText: {
    color: '#FFF',
  },
});

export default InventoryList;