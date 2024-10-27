import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import colors from './Config/colors'; // Import color config
import { getSheetData, appendSheetData } from './services/api'; // Import API helpers

const GradesScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the sheet when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await getSheetData('Sheet1'); // Adjust sheet name if needed
        setData(sheetData);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data from Google Sheets');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding new grade data
  const handleAddGrade = async () => {
    try {
      const newEntry = ['Math', 'Assignment 2', '89']; // Example data
      await appendSheetData('Sheet1', newEntry);
      Alert.alert('Success', 'Grade added successfully!');
      setData((prevData) => [...prevData, newEntry]);
    } catch (error) {
      Alert.alert('Error', 'Failed to append data to Google Sheets');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.darkPeriwinkle} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Grades</Text>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.text}>{row.join(' - ')}</Text>
        </View>
      ))}
      <Button title="Add Grade" onPress={handleAddGrade} color={colors.lightOrange} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.prettyGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlack,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkPeriwinkle,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    backgroundColor: colors.darkOrange,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default GradesScreen;
