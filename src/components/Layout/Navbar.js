import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";

function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  const fetchNotificationsCount = async () => {
    if (!auth.currentUser) return;

    try {
      const userId = getCurrentUserId(); // Fetch the current user ID
      const notificationsRef = db
       .collection("notifications")
       .where("userId", "==", userId); // Use the fetched user ID
      const snapshot = await notificationsRef.get();
      const count = snapshot.size; // This gives the count of documents in the collection
      setNotificationCount(count); // Update the state with the new count
    } catch (error) {
      console.error("Error fetching notifications count:", error);
    }
  };

  const getCurrentUserId = () => {
    const currentUser = auth.currentUser;
    return currentUser? currentUser.uid : null;
  };

  return (
    <nav className="bg-[#b1648fff] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          React<span className="text-[#6ab4c1ff]">ChatApp</span>
        </h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-white hover:text-[#6ab4c1ff]">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white hover:text-[#6ab4c1ff]">
            Profile
          </Link>
          <Link
            to="/notifications"
            className="text-white hover:text-[#6ab4c1ff]"
          >
            Notifications {notificationCount > 0 && `(${notificationCount})`}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
