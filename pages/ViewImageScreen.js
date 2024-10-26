import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function ViewImageScreen() {
  return (
    <View style={styles.container}>
        <Text style={style.text}>Hello World!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
}); 