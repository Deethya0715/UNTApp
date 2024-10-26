import React from "react";
import { StyleSheet, SafeAreaView, Text, Image, ImageBackground } from 'react-native';

export default function App() {
  return (
    <ImageBackground 
      source={require('./assets/background.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image 
          source={require("./assets/logo.png")} 
          style={styles.logo} 
        />
        <Text style={styles.text}>
          Sell What You Don't Need
        </Text>
      </SafeAreaView>

      <SafeAreaView style={styles.footerPurple} />
      <SafeAreaView style={styles.footerGreen} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire background
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 200,
    top: -200,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Ensure the text is visible on the background
    top: -195
  },
  footerPurple: {
    backgroundColor: 'purple',
    width: "100%",
    height: 75,
  },
  footerGreen: {
    backgroundColor: 'green',
    width: "100%",
    height: 75,
  },
});
