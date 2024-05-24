# Firebase Chat Application

**Description:**

This project is a simple chat application that allows users to communicate with each other in real-time. Users can register, log in, and send messages to other users who are online. The backend is powered by Firebase, providing real-time database and authentication services.

## Features

**User Authentication:**
Users can register for an account and log in securely using Firebase Authentication.

**Real-Time Messaging:**
Messages are sent and received instantly using Firebase Realtime Database.

**User Presence:**
Users can see who is online and available for chatting.

**Simple Interface:**
Clean and intuitive user interface for easy navigation and usage.

### Technologies Used

**Frontend:**
HTML, CSS
JavaScript (React.js for the user interface)

**Backend:**
Firebase Authentication: For user authentication and authorization
Firebase Realtime Database: For storing and retrieving chat messages in real-time

### Installation

**Clone the repository**
 <https://github.com/esteriella/chat-app.git>

**Navigate to the project directory:**
cd chat-application

**Install dependencies:**
npm install

**Set up Firebase project:**
Go to the Firebase Console and create a new project.
Set up Firebase Authentication and Realtime Database for your project.
Obtain your Firebase configuration settings.

**Configure Firebase in your project:**
Create a Firebase configuration file (e.g., firebaseConfig.js) in the src directory.

**Paste your Firebase configuration settings into the file:**
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;

**Start the development server:**
npm start

Open your browser and navigate to <http://localhost:3000> to access the application.

### Usage

Register for an account or log in if you already have one.
Start chatting with other users who are online.
You can see the online status of other users and their messages in real-time.

#### Author

[Opeyemi Esther Agbaje](https://github.com/esteriella)
