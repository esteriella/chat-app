import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const [noNotificationsMessage, setNoNotificationsMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications", user.uid, "userNotifications"),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notifications);

      if (notifications.length === 0) {
        setNoNotificationsMessage("No new notifications");
      } else {
        setNoNotificationsMessage("");
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleViewChat = async (notificationId, chatId) => {
    navigate(`/chat/${chatId}`);

    // Attempt to find the notification document by its ID
    const notificationRef = doc(db, "notifications", user.uid, "userNotifications", notificationId);
    const docSnap = await getDoc(notificationRef);

    if (docSnap.exists()) {
      await updateDoc(notificationRef, { read: true });
      // Remove the notification from the local state
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
    } else {
      console.error(`Document not found with notificationId: ${notificationId}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? notifications.map(notification => (
        <div key={notification.id} className="p-4 mb-2 bg-gray-200 rounded-lg">
          <p>{notification.displayName} sent you a message: {notification.message}</p>
          <button
            onClick={() => handleViewChat(notification.id, notification.chatId)} // Pass both notification.id and chatId to handleViewChat
            className="mt-2 bg-[#b1648fff] text-white py-1 px-4 rounded"
          >
            View
          </button>
        </div>
      )) : <p>{noNotificationsMessage}</p>}
    </div>
  );
}

export default Notifications;




