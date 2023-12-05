/*  
   Filename: ComplexCode.js
   Description: Complex code demonstrating advanced JavaScript concepts and techniques.
*/

// Importing libraries
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

// Global variables
let data = [];

// Function to fetch data from a REST API
async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    data = response.data;
    processAndSaveData();
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
}

// Function to process and save data
function processAndSaveData() {
  const processedData = processData(data);
  const fileContent = JSON.stringify(processedData, null, 2);

  fs.writeFile('processed_data.json', fileContent, (err) => {
    if (err) {
      console.error('Unable to save processed data:', err);
    } else {
      console.log('Processed data saved successfully.');
    }
  });
}

// Function to process the fetched data
function processData(data) {
  const processedData = [];

  // Loop through data and manipulate
  data.forEach((item) => {
    const processedItem = {};

    processedItem.id = item.id;
    processedItem.name = item.name.toUpperCase();
    processedItem.timestamp = moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a');

    processedData.push(processedItem);
  });

  return processedData;
}

// Function to display the processed data
function displayProcessedData() {
  fs.readFile('processed_data.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error('An error occurred while reading processed data:', err);
    } else {
      const processedData = JSON.parse(fileData);

      console.log('Processed Data:');
      processedData.forEach((item) => {
        console.log(`ID: ${item.id}`);
        console.log(`Name: ${item.name}`);
        console.log(`Timestamp: ${item.timestamp}`);
        console.log('---');
      });
    }
  });
}

// Main function to execute the code
async function main() {
  // Fetch data and process
  await fetchData();

  // Display processed data
  displayProcessedData();
}

// Calling the main function
main().catch((error) => console.error('An unhandled error occurred:', error));