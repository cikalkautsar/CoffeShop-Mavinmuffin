import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import RootNav from '../../Navigators/RootNav';

export default function App(): React.JSX.Element {
  return (
      <RootNav />
  );
}