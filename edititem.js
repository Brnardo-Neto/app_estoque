import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditItem = ({ route, navigation }) => {
  const { item } = route.params;
  const [name, setName] = useState(item.name);

  const saveItem = async () => {
    try {
      const items = JSON.parse(await AsyncStorage.getItem('items')) || [];
      const updatedItems = items.map(i => (i.id === item.id ? { ...i, name } : i));
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Button title="Salvar" onPress={saveItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    marginBottom: 20,
    color: '#FFF',
    paddingLeft: 10,
  },
});

export default EditItem;
