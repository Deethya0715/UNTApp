import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth0 from 'react-native-auth0';
import colors from './Config/colors';

// Initialize Auth0
const auth0 = new Auth0({
  domain: 'dev-jrv5t0q40kpynlhj.us.auth0.com',
  clientId: 'sQoJmxGofAG44NSDwWQKnoIisQSKjpN3',
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Grades" component={GradesScreen} />
        <Stack.Screen name="AddClass" component={AddClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Auth0 Authentication (only for iOS)
const authenticateUser = async () => {
  if (Platform.OS === 'ios') {
    try {
      const credentials = await auth0.webAuth.authorize({ scope: 'openid profile email' });
      Alert.alert('Logged In', `Welcome ${credentials.idTokenPayload.name}`);
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  }
};

// Helper function to save data to Google Sheets
const saveToGoogleSheets = async (classData) => {
  const sheetID = '1-LIdtG1uXMeicCtcGEJNKTRGHvjxmoxJCWP5FeKidaE';
  const apiKey = 'AIzaSyD4GDVXpnJP2Wl15sIbb7To8q3gRm7wAQo';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1!A1:append?valueInputOption=RAW&key=${apiKey}`;

  const values = [
    [
      classData.className,
      classData.assignments.join(', '),
      classData.weights.join(', '),
      classData.categories.join(', '),
    ],
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });
    if (!response.ok) throw new Error('Failed to save to Google Sheets');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

// HomeScreen component
function HomeScreen({ navigation }) {
  const CustomButton = ({ title, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./assets/NewLogo.jpg')} style={styles.logo} />
      <Text style={styles.textHome}>Welcome to HexBook!</Text>
      <TouchableOpacity style={styles.authButton} onPress={authenticateUser}>
        <Text style={styles.buttonText}>Login with Auth0 (iOS Only)</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <CustomButton title="Go to Grades" onPress={() => navigation.navigate('Grades')} backgroundColor={colors.darkPeriwinkle} />
        <CustomButton title="Add Class" onPress={() => navigation.navigate('AddClass')} backgroundColor={colors.darkPeriwinkle} />
      </View>
    </SafeAreaView>
  );
}

// GradesScreen component
function GradesScreen({ route, navigation }) {
  const { classData } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.classText}>Grades Overview</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddClass')}>
        <Text style={styles.buttonText}>Add New Class</Text>
      </TouchableOpacity>

      {/* Show Class Data in Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{classData?.className}</Text>
          <FlatList
            data={classData?.assignments || []}
            renderItem={({ item }) => (
              <Text style={[styles.assignmentText, { color: getColorForGrade(item.grade) }]}>
                {item.name} - {item.grade}%
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// AddClassScreen component
function AddClassScreen({ navigation }) {
  const [className, setClassName] = useState('');
  const [assignments, setAssignments] = useState('');
  const [weights, setWeights] = useState('');
  const [categories, setCategories] = useState('');

  const handleSave = () => {
    const assignmentList = assignments.split(',').map(a => a.trim());
    const weightList = weights.split(',').map(w => w.trim());
    const categoryList = categories.split(',').map(c => c.trim());

    const classData = { className, assignments: assignmentList, weights: weightList, categories: categoryList };

    saveToGoogleSheets(classData); // Save to Google Sheets
    navigation.navigate('Grades', { classData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Add New Class</Text>
      <TextInput
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Assignments (comma-separated)"
        value={assignments}
        onChangeText={setAssignments}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Weights (comma-separated)"
        value={weights}
        onChangeText={setWeights}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Categories (comma-separated)"
        value={categories}
        onChangeText={setCategories}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Function to get color based on grade
const getColorForGrade = (grade) => {
  if (grade >= 90) return 'green';
  if (grade >= 75) return 'blue';
  if (grade >= 50) return 'orange';
  return 'red';
};

// Styles
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
    marginBottom: 20,
  },
  authButton: {
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.darkPeriwinkle,
  },
  textInput: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Nosifer-Regular',
  },
  textHome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Nosifer-Regular',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Nosifer-Regular',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 5,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nosifer-Regular',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 24
  },
});