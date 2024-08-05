import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';


type KeyValue = [string, string | null];

const HistoricoPesquisas = () => {
  const [searchList, setSearchList] = useState<KeyValue[]>([]);

  const getAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      const mutableResult: KeyValue[] = result.map(item => [...item] as KeyValue);

      mutableResult.sort((a, b) => {
        const valueA = parseInt(a[1] || '0', 10);
        const valueB = parseInt(b[1] || '0', 10);
        return valueB - valueA;
      });

      setSearchList(mutableResult.slice(0,15));

    } catch (error) {
      console.error('Error fetching all data from AsyncStorage', error);
    }
  };

  const storeData = async (value: string) => {
      try {
        // Fetch all keys and values from AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
    
        // Check if the value already exists
        const isValueExist = result.some(([key, storedValue]) => storedValue === value);
    
        if (!isValueExist) {
          // Store the new value if it does not exist
          const timestampKey = Date.now().toString(); // Ensure unique key
          await AsyncStorage.setItem(timestampKey, value);
        }
      } catch (e) {
        console.error('Error storing data', e);
      }
    };

    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared.');
      } catch (e) {
        console.error('Error clearing AsyncStorage', e);
      }
    };

  useFocusEffect(
    React.useCallback(() => {
      getAllData();
      return () => {
      };
      }, [])
    );

  return (
    <ThemedView style={{ width: '100%', height: '100%', padding: 20, alignItems: 'center'}}>
        <ThemedText style={{fontSize: 20, fontWeight: 600, padding: 5, borderRadius: 10}}>Histórico de buscas</ThemedText>
        <View style={{width: '100%', height: 1, backgroundColor: 'gray', marginTop: 15, marginLeft: 15, marginRight: 15, opacity: 0.5}} />
      {searchList.map((item, index) => (
        <ThemedText key={index}>{item[1]}</ThemedText>
      ))}
    </ThemedView>
  );
};

export default HistoricoPesquisas;
