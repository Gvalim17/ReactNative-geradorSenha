import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Insert } from './bancoPass/Insert';
import { Remove } from './bancoPass/Remove';
import { AllPasswords } from './bancoPass/AllPasswords';
import { Update } from './bancoPass/Update';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/cadeado.webp')}
      style={styles.background}
      >
      <View style={styles.container}>
        <Insert />
        <Update />
        <Remove />
        <AllPasswords />
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
