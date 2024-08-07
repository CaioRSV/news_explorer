import React, {useState, useEffect} from 'react';

import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useFonts } from 'expo-font';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useUserDataContext } from '@/contexts/userData';

import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function LoginComponent() {
  const { colors } = useTheme();

  const colorScheme = useColorScheme();

  const animatedValue = useSharedValue(0);
  const animatedFadeIn = useSharedValue(0);


  const { userData, setUserData } = useUserDataContext();

  useEffect(()=>{
    animatedValue.value = withRepeat(
        withTiming(1, {
          duration: 8000,
          easing: Easing.linear,
        }),
        -1,
        true
      );

    animatedFadeIn.value = withTiming(1, {
        duration: 4500,
        easing: Easing.linear
    })
  },[])

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 1-animatedValue.value*0.1
    return {
      transform: [{ scale }],
    };
  });

  const fadeInStyle = useAnimatedStyle(() => {
    const opacity = 1+animatedFadeIn.value*0.1
    return {
        opacity: opacity
    };
  });

  return (
    <Animated.View
        style={[{position: 'absolute', width: '100%', height: '100%'},fadeInStyle]}
    >
        <LinearGradient 
        colors = {
          colors.text == 'rgb(28, 28, 30)'
            ?
            ['white', 'rgb(222, 235, 234)']
            :
            ['rgb(42, 46, 46)', 'rgb(32, 36, 36)']
          
          }
        style={{width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 40, 
        backgroundColor: '#F7F7F7'
        }}>

            <Text style={{fontSize: 25, color: colors.text, fontFamily: 'SpaceMono'}}>News Explorer</Text>


            <View style={{width: 200, maxHeight: 200, borderRadius: 100,
                flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
                {/* <Ionicons name="newspaper" size={120} style={{color: colorScheme ?? 'light'}}/> */}
                <AnimatedImage
                    source={{ uri: `${colors.text=='rgb(28, 28, 30)'?'https://i.imgur.com/2Mr2MWP.png':'https://i.imgur.com/7GhN7NH.png'}`}}
                    style={[{width: 145, height: 145, opacity: colors.text=='rgb(28, 28,30)'?1:0.9}, animatedStyle]}
                />
            </View>
            
            <View style={{width: '100%', height: 200}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{padding: 5}}>
                        <TouchableOpacity onPress={()=>{setUserData('tempUser')}}
                            style={{padding: 15, backgroundColor: 'rgba(0, 162, 232, 0.1)', borderRadius: 15}}
                        >
                            <Text style={{fontSize: 20, color: colors.text}}>Entrar como visitante</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    </Animated.View>
  );
}
