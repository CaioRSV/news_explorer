import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { View, Text, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useUserDataContext } from '@/contexts/userData';

export default function LoginComponent() {
  const colorScheme = useColorScheme();
  
  const { userData, setUserData } = useUserDataContext();

  return (
    <View style={{width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 40, 
    backgroundColor: '#F7F7F7'
    }}>
        <View style={{width: 200, maxHeight: 200, borderRadius: 100,
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            <Ionicons name="newspaper" size={120} style={{color: colorScheme ?? 'light'}}/>
        </View>
        
        <View style={{width: '100%', height: 200}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{padding: 5}}>
                    <TouchableOpacity onPress={()=>{setUserData('tempUser')}}
                        style={{padding: 15, backgroundColor: '#EBF0F0', borderRadius: 15}}
                    >
                        <Text style={{color: 'black', fontSize: 20}}>Entrar como visitante</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  );
}
