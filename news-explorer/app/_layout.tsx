import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { UserDataContextProvider } from '@/contexts/userData';

import App from './app';

export default function RootLayout() {
  return (
    <UserDataContextProvider>
      <App/>
    </UserDataContextProvider>
  );
}
