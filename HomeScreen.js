import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import colors from './Config/colors'; // Ensure this path is correct

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Grades" onPress={() => navigation.navigate('Grades')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightOrange, // Use color from your colors.js
  },
  text: {
    fontSize: 20,
    color: colors.darkBlack, // Use color from your colors.js
  },
});

export default HomeScreen;
