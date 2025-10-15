import AppLoading from 'expo-app-loading';
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';

interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subname}>Mavinmuffin Cafe</Text>
      <Text style={styles.subtitle}>Discover the best coffee Shop in town</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c2b08',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  subname: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: '#B7957f',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#F5DEB3',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  button: {
    backgroundColor: '#D2691E',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
