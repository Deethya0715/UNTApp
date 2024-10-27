import React from 'react'; 
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign-Up" component={SignUp} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
          <Stack.Screen name="Grades" component={Grades} />
          <Stack.Screen name="Add Class" component={AddClass} />
          <Stack.Screen name="Existing Class" component={ExistingClass} />
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
          onPress={() => navigation.navigate('Login')}
          backgroundColor={colors.darkOrange}
        />
      </View>
    </SafeAreaView>
  );
}

function LoginScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            style={styles.backButtonImage} 
            source={require('./assets/backButton.jpeg')} 
          />
        </Pressable>
        <Text style={styles.text}>Hello React World!</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="i.e. LydiaDeetz33088@gmail.com"
          placeholderTextColor={colors.placeholderTextColor || '#888'}
        />
        <CustomButton
          title="Login"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
        />
        <CustomButton
          title="Sign-Up"
          onPress={() => navigation.navigate('Sign-Up')}
          backgroundColor={colors.darkOrange}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

function ForgotPassword({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButtonImage} 
          source={require('./assets/backButton.jpeg')} 
        />
      </Pressable>
      <Text style={styles.text}>Forgot Password!</Text>
    </SafeAreaView>
  );
}

function SignUp({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={styles.container}>
      <Text style={styles.text}>Hello React World!</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="i.e. LydiaDeetz33088@gmail.com"
        placeholderTextColor={colors.placeholderTextColor || '#888'}
      />
      <CustomButton
        title="Sign Up"
        onPress={() => navigation.navigate('Grades')}
        backgroundColor={colors.darkOrange}
      />
      <CustomButton
        title="Back"
        onPress={() => navigation.navigate('Login')}
        backgroundColor={colors.darkOrange}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}

function Grades({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButtonImage} 
          source={require('./assets/backButton.jpeg')} 
        />
      </Pressable>
      <Pressable style={styles.addButton} onPress={() => navigation.navigate('Add Class')}>
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButtonImage} 
          source={require('./assets/backButton.jpeg')} 
        />
      </Pressable>
      <Text style={styles.addClassText}>Add Class!</Text>
      <Text style={styles.label}>Class Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Class Name"
        placeholderTextColor={colors.placeholderTextColor || '#888'}
      />
      <Text style={styles.label}>Professor Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Professor Name"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Section:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        placeholder="Enter Section"
        placeholderTextColor="#888"
      />
      <SafeAreaView style={styles.footerContainerAddClass}>
        <CustomButton
          title="Save"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
        />
        <CustomButton
          title="Cancel"
          onPress={() => navigation.navigate('Grades')}
          backgroundColor={colors.darkOrange}
        />
      </SafeAreaView>
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
}

function ExistingClass({ navigation }) {
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
    fontFamily: 'Nosifer-Regular',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPeriwinkle || 'blue',
    textAlign: 'center',
    marginVertical: 10,
    top: -100,
    fontFamily: 'Nosifer-Regular',
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
    fontFamily: 'Nosifer-Regular',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nosifer-Regular',
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
    fontWeight: 'bold',
    color: 'white',
  },
});
