// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rFAsEN5svK_uuDrWJJ3LDlpDyu5TNlg",
  authDomain: "chat-app-bf69e.firebaseapp.com",
  projectId: "chat-app-bf69e",
  storageBucket: "chat-app-bf69e.appspot.com",
  messagingSenderId: "58542027197",
  appId: "1:58542027197:web:dbec03fb4626bd30eda2d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance using Firestore Lite
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities() {
  try {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  } catch (error) {
    console.error("Error getting cities:", error);
    return []; // Return empty array or handle error as needed
  }
}

// Usage example: call getCities() function
getCities()
  .then(cityList => {
    console.log("List of cities:", cityList);
    // Use cityList as needed in your application
  })
  .catch(error => {
    console.error("Error fetching cities:", error);
  });
