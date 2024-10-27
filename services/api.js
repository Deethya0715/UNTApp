import axios from 'axios';

const SPREADSHEET_ID = '1-LIdtG1uXMeicCtcGEJNKTRGHvjxmoxJCWP5FeKidaE';
const API_KEY = 'AIzaSyD4GDVXpnJP2Wl15sIbb7To8q3gRm7wAQo';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

// Fetch data from a Google Sheets tab
export const getSheetData = async (sheetName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/values/${sheetName}?key=${API_KEY}`
    );
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Append data to the sheet
export const appendSheetData = async (sheetName, values) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/values/${sheetName}:append?valueInputOption=RAW&key=${API_KEY}`,
      { values: [values] }
    );
    return response.data;
  } catch (error) {
    console.error('Error appending data:', error);
    throw error;
  }
};
