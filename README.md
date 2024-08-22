# Weather App project
## Overview
The Weather App begins with a login page where users enter their username and click a submit button. Upon successful login, users are directed to the weather page, featuring two dropdown menus. The first dropdown allows users to search for and select a country, which then populates the second dropdown with cities from that country. Users can select one or multiple cities, and each selected city appears below with a checkbox. The checkbox can be toggled to show or hide the weather information for that city. When more than three cities are selected, the weather information is displayed in a carousel format, allowing horizontal scrolling. If three or fewer cities are selected, the carousel is hidden, and the weather information is shown in a standard view. Upon logging off, all results are cleared, and a fresh page is presented for each new login, initiating the selection process anew.

## Sofware requirements
Any Integrated Development Environments (IDEs) preferably Visual Studio Code.

## Steps to set up and run the project locally
1. Clone the Repository

    First, clone the repository from GitHub to local machine.

    `git clone https://github.com/Devika2019/Weather-app.git`

2. Navigate to the Project Directory

    Change to the project directory:

    `cd Weather-app`

3. Configure Environment Variables

    This project has environment variables in .env file. It contains the API key for fetching the data. Please ensure that this is in place.

4. Check the tsconfig.json

    Ensure that the TypeScript configuration file (tsconfig.json) is present.

5. Install Dependencies

    Ensure Node.js is installed. Run below command to check installion:

    `node -v`

      and

    `npm -v`

    If Node.js is installed, you can proceed to install the project's dependencies:
   
    `npm install`

6. Run the Development Server

    Start the development server to run the React app. This project include a script for this in the package.json file.

    `npm start`

7. Verify the Project

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser to see if the app is running correctly.

## Design choice and architecture

In designing the Weather App, modular and scalable architecture was prioritized to ensure an optimal user experience and maintainability. 
- ReactJS was chosen for its component-based structure, which facilitates reusable and isolated components, essential for managing the dynamic nature of the app's UI elements such as dropdown menus, city checkboxes, and weather information displays.
- TypeScript enhances this setup with strong typing, improving code reliability and easing debugging.
- Node.js serves as the backend environment, providing a robust platform for handling asynchronous operations and API requests efficiently.
- Redux is employed for state management to centralize and streamline state transitions, crucial for synchronizing user interactions with weather data updates.
- MaterialUI was selected to deliver a modern and responsive design while ensuring consistency across the application.
- Jest is utilized for testing to ensure the robustness of our components and logic, enabling us to catch issues early in the development cycle. 

This combination of technologies and practices ensures a responsive, maintainable, and user-friendly Weather App that adapts to varying user interactions and data loads effectively.

## Instructions on how to run tests
Run the below command to execute all test cases. It launches the test runner in the interactive watch mode.

 `npm run test`


