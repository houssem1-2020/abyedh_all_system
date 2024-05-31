import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const speak = (textRec) => {
    const thingToSay = 'bonjour khelifi houssem';
    Speech.speak(textRec,{
        language: 'en-US', // Specify the language code
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={() => speak('hello every body , i am houssem')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
