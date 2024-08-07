import { StyleSheet, ScrollView, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';


import { Linking } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import * as Clipboard from 'expo-clipboard';

import { useState, useEffect } from 'react';


import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';


function formatISODate(isoDate:string) {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} (${hours}h${minutes}m)`;
}

const copyToClipboard = async (value:string) => {
  await Clipboard.setStringAsync(value);
};

interface Article {
  author: string
  content?: string
  description?: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
  title: string
  url: string
  urlToImage?: string
}


export default function HomeScreen() {
  const { colors } = useTheme();
  
  const [articleList, setArticleList] = useState<Article[]>();
  
  useEffect(() => {
    fetchTopInfo();
  })

  const fetchTopInfo = async () => {
    await fetch(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${process.env.EXPO_PUBLIC_NEWS_KEY}`)
      .then(res => {
        if(!res.ok){
          return false;
        }
        return res.json();
      })
      .then(data => {
        setArticleList(data.articles.slice(0,10));
      })
  }

  return (
      <ThemedView style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', paddingTop: 50, paddingLeft: 15, paddingRight: 15}} >
        <ThemedText style={{fontSize: 20, fontWeight: 600, padding: 5, borderRadius: 10}}>Manchetes relevantes no Brasil</ThemedText>
        <View style={{width: '100%', height: 1, backgroundColor: 'gray', marginTop: 15, marginLeft: 15, marginRight: 15, opacity: 0.5}} />
        <ScrollView style={{flex: 1, width: '100%', marginTop: 15}}>
          {
            !articleList
              ?
              <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={40}></ActivityIndicator>
              </View>
              :
              articleList.map(item => (
                <ThemedView key={item.publishedAt+item.author} style={{
                  marginBottom: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: 'gray',
                  padding: 15,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5, 
                  backgroundColor: colors.text=="rgb(1,1,1)"?'rgba(243, 255, 254,1)':'rgba(243, 255, 254,0.1)'
                  }}>
                  <TouchableOpacity style={{
                    height: '100%',
                    borderColor: 'gray', borderRadius: 5, borderWidth: 1,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,162,232,0.1)'
                  }}
                  onPress={()=>{copyToClipboard(item.url)}}
                  >
                    {/* <Text style={{fontSize: 30, overflow: 'visible', color: '#00A2E8'}}>{item.source.name[0]}</Text> */}
                    <Ionicons name="copy-outline" size={24} color="#00A2E8"/>

                  </TouchableOpacity>

                  <View style={{height: 300, width: '85%'}}>

                    <ThemedView
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        overflow: 'hidden',
                        padding: 5,
                        backgroundColor: colors.text=="rgb(1,1,1)"?'rgba(243, 255, 254,1)':'rgba(243, 255, 254,0)'
                      }}
                    >
                      <Text adjustsFontSizeToFit style={{textAlign: 'center', marginBottom: 15, fontWeight: '600', marginTop: 5, color: colors.text}}>{item.title}</Text>
                      <Text adjustsFontSizeToFit style={{textAlign: 'center', flex: (!item.source.name && !item.author && !item.publishedAt) ? 1 : 0,marginBottom: 15, color: colors.text}}>
                        {`${item.source.name}`}
                        {`${item.source.name && item.author ? " | " : ""}`}
                        {`${item.author}`}
                        {`${item.author && item.publishedAt ? " | " : "" }`}
                        {`${formatISODate(item.publishedAt)}`}
                        {`${!item.source.name && !item.author && !item.publishedAt ? "Nenhuma descrição informada" : ""}`}
                        
                        </Text>
                      <Text adjustsFontSizeToFit style={{textAlign: 'center',marginBottom: item.description?15:0, overflow: 'scroll', color: colors.text}}>{item.description?.slice(0,200)}</Text>

                      <TouchableOpacity onPress={()=>{Linking.openURL(item.url)}}>
                        <Text adjustsFontSizeToFit style={{textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end', color: '#00A2E8'}}>{item.url.length>50? item.url.slice(0,60)+'...' : item.url}</Text>
                      </TouchableOpacity>
                      
                    </ThemedView>

                  </View>
                </ThemedView>
              ))
          }
        </ScrollView>
      </ThemedView>
  );
}