# Overview of the Weather App project
The Weather App begins with a login page where users enter their username and click a submit button. Upon successful login, users are directed to the weather page, featuring two dropdown menus. The first dropdown allows users to search for and select a country, which then populates the second dropdown with cities from that country. Users can select one or multiple cities, and each selected city appears below with a checkbox. The checkbox can be toggled to show or hide the weather information for that city. When more than three cities are selected, the weather information is displayed in a carousel format, allowing horizontal scrolling. If three or fewer cities are selected, the carousel is hidden, and the weather information is shown in a standard view. Upon logging off, all results are cleared, and a fresh page is presented for each new login, initiating the selection process anew.

## Sofware requirement
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

    Open your web browser and navigate to http://localhost:3000 to see if the app is running correctly.

## Explanation of design choices and architecture

In designing the Weather App, modular and scalable architecture was prioritized to ensure an optimal user experience and maintainability. 
- ReactJS was chosen for its component-based structure, which facilitates reusable and isolated components, essential for managing the dynamic nature of the app's UI elements such as dropdown menus, city checkboxes, and weather information displays.
- TypeScript enhances this setup with strong typing, improving code reliability and easing debugging.
- Node.js serves as the backend environment, providing a robust platform for handling asynchronous operations and API requests efficiently.
- Redux is employed for state management to centralize and streamline state transitions, crucial for synchronizing user interactions with weather data updates.
- MaterialUI was selected to deliver a modern and responsive design while ensuring consistency across the application.
- Jest is utilized for testing to ensure the robustness of our components and logic, enabling us to catch issues early in the development cycle. 

This combination of technologies and practices ensures a responsive, maintainable, and user-friendly Weather App that adapts to varying user interactions and data loads effectively.

## Instructions on how to run tests
`npm test`


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
