// import React, { useEffect, useState } from "react";
// import { db, auth } from "../config/firebase";
// import { collection, query, onSnapshot, updateDoc, doc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Layout/Navbar";
// import { signOut } from "firebase/auth";

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

//       // Clean up function to handle component unmount
//       return () => unsubscribe();
//     }
//   }, [user]);

//   const generateChatId = (uid1, uid2) => {
//     return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
//   };

//   const handleSignOut = async () => {
//     if (user) {
//       try {
//         await updateDoc(doc(db, "users", user.uid), { online: false });
//         await signOut(auth);
//         navigate("/"); // Redirect to login after signing out
//       } catch (error) {
//         console.error("Error logging out: ", error);
//         alert(error.message);
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state if authentication is in progress
//   }

//   if (!user) {
//     return null; // Prevent rendering if user is not authenticated
//   }

//   return (
//     <div className="h-screen">
//       <Navbar />
//       <ul>
//         {users.map((userItem) => (
//           <li key={userItem.id} className="mb-4">
//             <div className="p-4 bg-white shadow rounded flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {userItem.firstname} {userItem.lastname}
//                 </h2>
//                 <p>Status: {userItem.online ? "Online" : "Offline"}</p>
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
//         className="fixed bottom-4 right-4 bg-[#b1648fff] text-white py-2 px-4 rounded hover:bg-[#6ab4c1ff] transition duration-300"
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
import { collection, query, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";

function Dashboard() {
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

      // Clean up function to handle component unmount
      return () => unsubscribe();
    }
  }, [user]);

  const generateChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const handleSignOut = async () => {
    try {
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

  return (
    <div className="h-screen">
      <Navbar />
      <ul>
        {users.map((userItem) => (
          <li key={userItem.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {userItem.firstname} {userItem.lastname}
                </h2>
                <p>Status: {userItem.online ? "Online" : "Offline"}</p>
              </div>
              {userItem.id !== user.uid && (
                <Link
                  to={`/chat/${generateChatId(user.uid, userItem.id)}`}
                  className="bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
                >
                  Start Chat
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        className="fixed bottom-4 right-4 bg-[#b1648fff] text-white py-2 px-4 rounded hover:bg-[#6ab4c1ff] transition duration-300"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

