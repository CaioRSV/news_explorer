import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

    <Tabs.Screen
        name="pesquisa"
        options={{
          title: 'Pesquisar',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={'magnifying-glass'} size={24} color={color}/>
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

    <Tabs.Screen
        name="historico_pesquisas"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="list" size={24} color={color} />
            ),
        }}
      />

    </Tabs>
  );
}
