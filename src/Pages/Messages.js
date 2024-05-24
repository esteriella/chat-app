// import React, { useEffect, useState } from "react";
// import { db, auth } from "../config/firebase";
// import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Layout/Navbar";

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/"); // Redirect to login if not authenticated
//     }
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     if (user) {
//       const q = query(collection(db, "users"));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const usersData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(usersData);
//       });

//       // Update user's online status to true when they log in
//       const userRef = doc(db, "users", user.uid);
//       updateDoc(userRef, { online: true });

//       // Clean up function to handle component unmount
//       return () => {
//         updateDoc(userRef, { online: false });
//         unsubscribe();
//       };
//     }
//   }, [user]);

//   const generateChatId = (uid1, uid2) => {
//     return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
//   };

//   const handleSignOut = async () => {
//     try {
//       // Update user's online status to false when they sign out
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, { online: false });
//       await auth.signOut();
//       navigate('/');  // Redirect to home or login page after sign out
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state if authentication is in progress
//   }

//   if (!user) {
//     return null; // Prevent rendering if user is not authenticated
//   }

//   const currentUser = users.find(userItem => userItem.id === user.uid);
//   const otherUsers = users.filter(userItem => userItem.id !== user.uid);

//   return (
//     <div className="h-screen">
//       <Navbar />
//       <ul>
//         {currentUser && (
//           <li key={currentUser.id} className="mb-4">
//             <div className="p-4 bg-white shadow rounded flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {currentUser.firstname} {currentUser.lastname}
//                 </h2>
//                 <p className={currentUser.online ? "text-green-500" : "text-red-500"}>
//                   Status: {currentUser.online ? "Online" : "Offline"}
//                 </p>
//               </div>
//             </div>
//           </li>
//         )}
//         {otherUsers.map((userItem) => (
//           <li key={userItem.id} className="mb-4">
//             <div className="p-4 bg-white shadow rounded flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {userItem.firstname} {userItem.lastname}
//                 </h2>
//                 <p className={userItem.online ? "text-green-500" : "text-red-500"}>
//                   Status: {userItem.online ? "Online" : "Offline"}
//                 </p>
//               </div>
//               {userItem.id !== user.uid && (
//                 <Link
//                   to={`/chat/${generateChatId(user.uid, userItem.id)}`}
//                   className="bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
//                 >
//                   Start Chat
//                 </Link>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button
//         className="mt-20 mb-5 mx-4 bg-[#b1648fff] text-white py-2 px-4 rounded hover:bg-[#6ab4c1ff] transition duration-300"
//         onClick={handleSignOut}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";

function Messages() {
  const [users, setUsers] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      });

      // Update user's online status to true when they log in
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, { online: true });

      // Clean up function to handle component unmount
      return () => {
        updateDoc(userRef, { online: false });
        unsubscribe();
      };
    }
  }, [user]);

  const generateChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const handleSignOut = async () => {
    try {
      // Update user's online status to false when they sign out
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { online: false });
      await auth.signOut();
      navigate('/');  // Redirect to home or login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state if authentication is in progress
  }

  if (!user) {
    return null; // Prevent rendering if user is not authenticated
  }

  const currentUser = users.find(userItem => userItem.id === user.uid);
  const otherUsers = users.filter(userItem => userItem.id !== user.uid);

  return (
    <div className="h-screen">
      <Navbar />
      <ul>
        {currentUser && (
          <li key={currentUser.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {currentUser.displayName}
                </h2>
                <p className={currentUser.online ? "text-green-500" : "text-red-500"}>
                  Status: {currentUser.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </li>
        )}
        {otherUsers.map((userItem) => (
          <li key={userItem.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {userItem.displayName}
                </h2>
                <p className={userItem.online ? "text-green-500" : "text-red-500"}>
                  Status: {userItem.online ? "Online" : "Offline"}
                </p>
              </div>
              {userItem.id !== user.uid && (
                <Link
                  to={`/chat/${generateChatId(user.uid, userItem.id)}`}
                  className="bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
                >
                  Chat
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mt-20 mb-5 mx-4 bg-[#b1648fff] text-white py-2 px-4 rounded hover:bg-[#6ab4c1ff] transition duration-300"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Messages;

