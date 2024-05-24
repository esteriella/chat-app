import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import {
  collection,
  getCountFromServer,
  query,
  where
} from "firebase/firestore";

function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const getCurrentUserId = () => {
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.uid : null;
  };

  const fetchNotificationsCount = async () => {
    if (!auth.currentUser) return;

    try {
      const userId = getCurrentUserId();
      const notificationsRef = query(
        collection(db, "notifications"),
        where("receiverId", "==", userId)
      );
      const unread = query(notificationsRef, where("read", "==", false));
      const snapshot = await getCountFromServer(unread);
      const count = snapshot.data().count;
      setNotificationCount(count);
    } catch (error) {
      console.error("Error fetching notifications count:", error);
    }
  };

  useEffect(() => {
    fetchNotificationsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false); // Toggle the menu visibility
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <nav className="bg-[#b1648fff] p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          React<span className="text-[#6ab4c1ff]">ChatApp</span>
        </h1>
        <div className="space-x-4 lg:flex hidden">
          <Link to="/messages" className="text-white hover:text-[#6ab4c1ff]">
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
        {/* Hamburger Menu */}
        <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        {/* Responsive Menu Links */}
        {menuOpen &&
          <div className=" top-16 right-0 p-10 gap-4 bg-white text-start text-gray-800 absolute lg:hidden flex flex-col">
            <Link to="/messages" className=" hover:text-[#6ab4c1ff]">
              Dashboard
            </Link>
            <Link to="/profile" className=" hover:text-[#6ab4c1ff]">
              Profile
            </Link>
            <Link to="/notifications" className=" hover:text-[#6ab4c1ff]">
              Notifications {notificationCount > 0 && `(${notificationCount})`}
            </Link>
          </div>}
      </div>
    </nav>
  );
}
export default Navbar;
