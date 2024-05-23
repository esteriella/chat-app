// // import React, { useEffect, useState } from "react";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { useNavigate } from "react-router-dom";
// // import { auth, db } from "../../config/firebase";
// // import { collection, query, where, getDocs } from "firebase/firestore";
// // import Navbar from '../Layout/Navbar';
// // import Footer from '../Layout/Footer';

// // function Notifications() {
// //   const [user, loading] = useAuthState(auth);
// //   const [notifications, setNotifications] = useState([]);
// //   const navigate = useNavigate();

// //   const fetchNotifications = async () => {
// //     if (!user) return;

// //     try {
// //       const q = query(collection(db, "messages"), where("receiverId", "==", user.uid));
// //       const querySnapshot = await getDocs(q);

// //       const messages = querySnapshot.docs.map(doc => doc.data());
// //       setNotifications(messages);
// //     } catch (err) {
// //       console.error(err);
// //       alert("An error occurred while fetching notifications");
// //     }
// //   };

// //   useEffect(() => {
// //     if (loading) return;
// //     if (!user) {
// //       navigate("/");
// //     } else {
// //       fetchNotifications();
// //     }
// //   }, [user, loading, navigate]);

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100">
// //       <Navbar />
// //       <div className="flex-grow container mx-auto p-6">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h1>
// //         {notifications.length === 0 ? (
// //           <div className="text-gray-600">No notifications</div>
// //         ) : (
// //           <ul className="space-y-4">
// //             {notifications.map((notification, index) => (
// //               <li key={index} className="bg-white shadow-md rounded-lg p-4">
// //                 <p className="text-gray-800">{notification.message}</p>
// //                 <p className="text-gray-600 text-sm">{new Date(notification.timestamp).toLocaleString()}</p>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default Notifications;



// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../../config/firebase';
// import { collection, query, where, onSnapshot, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Layout/Navbar';

// function Notifications() {
//   const [user] = useAuthState(auth);
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, 'notifications'),
//       where('receiverId', '==', user.uid),
//       where('read', '==', false)
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const notificationsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setNotifications(notificationsData);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const handleViewChat = async (chatId) => {
//     // Mark notifications as read
//     const q = query(
//       collection(db, 'notifications'),
//       where('receiverId', '==', user.uid),
//       where('chatId', '==', chatId),
//       where('read', '==', false)
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(async (notificationDoc) => {
//       await updateDoc(doc(db, 'notifications', notificationDoc.id), {
//         read: true
//       });
//     });

//     // Navigate to chatroom
//     navigate(`/chatroom/${chatId}`);
//   };

//   return (
//     <div className="h-screen">
//       <Navbar />
//       <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Notifications</h2>
//         <ul>
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <li key={notification.id} className="mb-4">
//                 <div className="p-4 bg-gray-100 shadow rounded flex justify-between items-center">
//                   <div>
//                     <p>{notification.message}</p>
//                     <p className="text-sm text-gray-600">
//                       From: {notification.displayName}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleViewChat(notification.chatId)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                   >
//                     View
//                   </button>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <p>No new notifications</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Notifications;

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'notifications', user.uid, 'userNotifications'), where('read', '==', false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notifications);
    });

    return () => unsubscribe();
  }, [user]);

  const handleViewChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className="p-4 mb-2 bg-gray-200 rounded-lg">
          <p>{notification.displayName} sent you a message: {notification.message}</p>
          <button
            onClick={() => handleViewChat(notification.chatId)}
            className="mt-2 bg-[#b1648fff] text-white py-1 px-4 rounded"
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;

