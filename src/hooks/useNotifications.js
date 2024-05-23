// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { useEffect } from "react";
// import { auth, firebaseApp } from "../config/firebase";

// function useNotification() {
//   useEffect(() => {
//     const messaging = getMessaging(firebaseApp);

//     getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log("FCM Token:", currentToken);
//         } else {
//           console.log("No registration token available. Request permission to generate one.");
//         }
//       })
//       .catch((err) => {
//         console.error("An error occurred while retrieving token. ", err);
//       });

//     onMessage(messaging, (payload) => {
//       console.log("Message received. ", payload);
//       // Customize your notification handling logic here
//     });
//   }, []);
// }

// export default useNotification;
