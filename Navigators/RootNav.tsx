import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../components/ui/HomeScreen';
import WelcomeScreen from '../components/ui/WelcomeScreen';
import MenuDetail from '../components/ui/MenuDetail';
import PaymentScreen from '../components/ui/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000000ff',
        headerStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu Details" component={MenuDetail} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
