# AI Hotel Booking Dashboard

This project is a single-page dashboard created using React.js, with a focus on Typescript, to visualize and analyze hotel booking data. The dashboard provides insights into the number of visitors, their origins, and age groups based on the selected date range. The data is sourced from a CSV file and is displayed through interactive charts.

## Features

- **Date Selector**: Allows users to select a date range to filter the data for analysis.

- **Time Series Chart**: Displays the number of visitors per day, where the total number is calculated as the sum of adults, children, and babies. It also offers zoomable functionality for detailed analysis.

- **Column Chart**: Shows the number of visitors per country, allowing users to see the distribution of visitors from different parts of the world.

- **Sparkline Charts**: These compact charts provide insights into specific visitor demographics. There are two sparkline charts:
    - Sparkline 1: Displays the total number of adult visitors.
    - Sparkline 2: Displays the total number of children visitors.

## Data Description

The dataset used in this project contains 1,000 records of hotel bookings with the following columns:

- **arrival_date_year**: The year of arrival.
- **arrival_date_month**: The month of arrival.
- **arrival_date_day_of_month**: The day of arrival.
- **adults**: The number of adults for the booking.
- **children**: The number of children for the booking.
- **babies**: The number of babies for the booking.
- **country**: The country from which the travelers are from.

The data is sourced from the [hotel_bookings_1000.csv](https://github.com/subho004/House-Data-Analytics/blob/main/Json/hotel_bookings_1000.csv) file.

## ScreenShots

<img width="1680" alt="img1" src="https://github.com/subho004/House-Data-Analytics/assets/91646273/cda9c0ae-6350-4b3d-8805-0983ec6f15a7">
<img width="1680" alt="img2" src="https://github.com/subho004/House-Data-Analytics/assets/91646273/60fa3aef-fcf7-4a2c-8b80-251acf7d840e">


## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/subho004/House-Data-Analytics.git
````

2. Install project dependencies using npm or yarn:
````bash
cd Waterdip-AI-Hotel-Booking-Dashboard
npm install
# or
yarn install
````

3. Start the development server:

### API Server

a. Navigate to the `server` folder for the API:

```bash
cd server
````
b. Install the API dependencies:
````bash
npm install
````
c. Start the API server:
````bash
node index.js
````
The API server will be available at http://localhost:8000/ or as configured in index.js.

### User Dashboard

a. Navigate to the dashboard folder for the user view:
````bash
cd dashboard
````
b. Install the dashboard dependencies:
````bash
npm install
````
c. Start the development server for the dashboard:
````bash
npm start
````

The dashboard will be available at http://localhost:3000/ in your web browser.

Make sure you have both the API server and the dashboard running to utilize the full functionality of the Waterdip AI Hotel Booking Dashboard.

## Technologies Used
- React.js
- Typescript
- ApexCharts (for chart visualizations)

## Contributing
We welcome contributions to improve this project. Feel free to submit issues or pull requests if you have any suggestions or enhancements.
