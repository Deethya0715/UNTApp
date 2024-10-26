import React, { useEffect } from 'react'; 
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font'; // Ensure expo-font is installed
import colors from './Config/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nosifer-Regular': require('./assets/fonts/NosiferRegular.ttf'), // Load the custom font
  });

  if (!fontsLoaded) {
    return null; // Optionally return a loading component or null until the fonts are loaded
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'My App' }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }} 
          />
          <Stack.Screen 
            name="Grades" 
            component={Grades} 
            options={{ title: 'Grades' }} 
          />
          <Stack.Screen 
            name="Add Class" 
            component={AddClass} 
            options={{ title: 'Add Class' }} 
          />
          <Stack.Screen 
            name="Existing Class" 
            component={ExistingClass} 
            options={{ title: 'Existing Class' }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/NewLogo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.textHome}>Welcome to HexBook!</Text>
      <View style={styles.footerContainer}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
        />
      </View>
    </SafeAreaView>
  );
}
function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React World!</Text>
    </View>
  );
}
function Grades({ navigation }) {
  return (
    <SafeAreaView style={[styles.container]}>
      <Pressable 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backButtonImage} 
          source={require('./assets/backButton.jpeg')} 
        />
      </Pressable>
      <Pressable 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Add Class')}
      >
        <Image
          style={styles.addButtonImage} 
          source={require('./assets/addButton.jpeg')} 
        />
      </Pressable>
    </SafeAreaView>
  );
}
function AddClass({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.addClassText}>Add Class!</Text>

      {/* Class Name Input */}
      <Text style={styles.label}>Class Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Class Name"
        placeholderTextColor="#888"
      />

      {/* Professor Name Input */}
      <Text style={styles.label}>Professor Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Professor Name"
        placeholderTextColor="#888"
      />

      {/* Section Input */}
      <Text style={styles.label}>Section:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Section"
        placeholderTextColor="#888"
      />

      {/* Footer Buttons */}
      <View style={styles.footerContainerAddClass}>
        <CustomButton
          title="Cancel"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
          style={[styles.button, styles.cancelButton]}
        />
        <CustomButton
          title="Save"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
          style={[styles.button, styles.saveButton]}
        />
      </View>
    </View>
  );
}



function ExistingClass() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React World!</Text>
    </View>
  );
}

function CustomButton({ title, onPress, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlack,
  },
  logo: {
    width: 200,
    height: 200,
    top: -100,
  },
  addButtonImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 815,
    right: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 90,
    height: 50,
  },
  backButtonImage: {
    width: '100%',
    height: '100%',
  },
  textHome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.darkPeriwinkle || 'blue',
    textAlign: 'center',
    marginVertical: 10,
    top: -100,
    fontFamily: 'Nosifer-Regular', // Set the font family here
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPeriwinkle || 'blue',
    textAlign: 'center',
    marginVertical: 10,
    top: -100,
    fontFamily: 'Nosifer-Regular', // Set the font family here
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    marginVertical: 5,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addClassText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPeriwinkle || 'blue',
    textAlign: 'center',
    marginVertical: 10,
    top: -350,
    fontFamily: 'Nosifer-Regular', // Set the font family here
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nosifer-Regular', // Set the font family here
  },
  label: {
      alignSelf: 'flex-start',
      fontSize: 18,
      color: colors.darkPeriwinkle || 'blue',
      fontFamily: 'Nosifer-Regular',
      marginTop: 10,
    },
    textInput: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
      fontFamily: 'Nosifer-Regular',
      color: 'white',
    },
});
