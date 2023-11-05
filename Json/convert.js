const csvtojson = require("csvtojson");
const fs = require("fs");

// Define the CSV file path
const csvFilePath = "clean_data - hotel_bookings_1000.csv";

// Read the CSV file and convert it to JSON
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    // Save the JSON data to a file or use it as needed
    const jsonData = JSON.stringify(jsonArrayObj, null, 2);
    fs.writeFileSync("Data.ts", jsonData);
    console.log("Conversion complete.");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
