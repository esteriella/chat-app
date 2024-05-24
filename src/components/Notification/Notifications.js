import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const [noNotificationsMessage, setNoNotificationsMessage] = useState("");
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!user) return;

      // Creating a query to fetch notifications where 'receiverId' matches 'user.uid'
      // and the notification 'read' status is false
      const q = query(
        collection(db, "notifications"),
        where("receiverId", "==", user.uid),
        where("read", "==", false)
      );

      const notifMessages = onSnapshot(q, querySnapshot => {
        const notifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setNotifications(notifications);

        // Updating the message based on whether there are notifications
        setNoNotificationsMessage(
          notifications.length === 0 ? "No new notifications" : ""
        );
      });

      // Cleanup function to notifMessages from the listener when the component unmounts
      return () => notifMessages();
    },
    [user]
  );

  const handleViewChat = async (notificationId, chatId) => {
    // Reference the notification document directly in the 'notifications' collection
    const notificationRef = doc(db, "notifications", notificationId);

    try {
      const docSnap = await getDoc(notificationRef);

      if (docSnap.exists()) {
        // Update the 'read' status of the notification
        await updateDoc(notificationRef, { read: true });

        // Remove the notification from the local state
        setNotifications(prevNotifications =>
          prevNotifications.filter(
            notification => notification.id !== notificationId
          )
        );

        // Navigate to the chat page
        navigate(`/chat/${chatId}`);
      } else {
        alert("Message not available");
        console.error(
          `Document not found with notificationId: ${notificationId}`
        );
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0
        ? notifications.map(notification =>
            <div
              key={notification.id}
              className="p-4 mb-2 bg-gray-200 rounded-lg"
            >
              <p>
                {notification.displayName} sent you a message:{" "}
                {notification.message}
              </p>
              <button
                onClick={() =>
                  handleViewChat(notification.id, notification.chatId)} // Pass both notification.id and chatId to handleViewChat
                className="mt-2 bg-[#b1648fff] text-white py-1 px-4 rounded"
              >
                View
              </button>
            </div>
          )
        : <p>
            {noNotificationsMessage}
          </p>}
    </div>
  );
}

export default Notifications;
