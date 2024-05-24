// import Chat from "../assets/images/img1.jpg";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../config/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { FaGoogle } from "react-icons/fa";
// import { GoogleAuthProvider, getRedirectResult, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [user, loading, error] = useAuthState(auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) {
//       return;
//     }
//     if (user) {
//       navigate("/messages");
//     }
//     if (error) {
//       console.error("Error with authentication state: ", error);
//       alert("Error: " + error.message);
//     }
//   }, [user, loading, error, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         authProvider: "local",
//         email
//       }, { merge: true });
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       navigate("/messages");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       const googleProvider = new GoogleAuthProvider();
//       await signInWithRedirect(auth, googleProvider);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const checkRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result) {
//           const user = result.user;
//           const userDocRef = doc(db, "users", user.uid);
//           await setDoc(userDocRef, {
//             uid: user.uid,
//             displayName: user.displayName,
//             email: user.email,
//             photoURL: user.photoURL,
//             phoneNumber: user.phoneNumber
//           }, { merge: true });
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//           navigate("/messages");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     checkRedirectResult();
//   }, [auth, db, navigate]);

//   return (
//     <div className="h-screen lg:overflow-hidden">
//       <div className="flex lg:flex-row flex-col lg:gap-36 gap-10">
//         <img src={Chat} width={800} alt="#" />
//         <div className="flex flex-col items-center justify-center">
//           <div className="mx-8 lg:mx-0 flex justify-center items-center h-screen">
//             <div className="lg:-mt-52 -mt-[350px] lg:mx-0 w-80 h-auto lg:w-96 z-10 bg-accent-white pb-12">
//               <h2 className="mb-6 text-[#b1648fff] text-lg font-bold mt-5">
//                 Create Your Account
//               </h2>
//               <form className="relative" onSubmit={handleSubmit}>
//                 <div className="mx-10 flex flex-col gap-3 items-center mb-2 relative">
//                   <label
//                     htmlFor="email"
//                     className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="example@gmail.com"
//                     className="border border-gray-400 text-xs px-3 py-3 rounded lg:w-80 w-60"
//                   />
//                   <div className="mx-10 relative">
//                     <label
//                       htmlFor="password"
//                       className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
//                     >
//                       Password
//                     </label>
//                     <div className="">
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         placeholder="********"
//                         className="border border-gray-400 text-xs px-3 py-3 rounded pr-10 lg:w-80 w-60"
//                       />
//                     </div>
//                   </div>
//                   <div className="mx-10 relative">
//                     <label
//                       htmlFor="confirmPassword"
//                       className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
//                     >
//                       Confirm Password
//                     </label>
//                     <div className="">
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                         placeholder="********"
//                         className="border border-gray-400 text-xs px-3 py-3 rounded pr-10 lg:w-80 w-60"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="mx-8 w-60 lg:w-80 bg-[#b1648fff] text-white py-3 rounded hover:bg-[#6ab4c1ff] hover:text-white transition duration-300"
//                 >
//                   Register
//                 </button>
//               </form>

//               <div className="flex items-center mx-10 mt-8">
//                 <hr className="flex-grow border-t-2 border-[#b1648fff] mr-1" />
//                 <span className="text-gray-500">OR</span>
//                 <hr className="flex-grow border-t-2 border-[#b1648fff] ml-1" />
//               </div>

//               <div className="flex flex-col items-center gap-2 mt-10">
//                 <Link
//                   to="#"
//                   className="flex items-center gap-4 w-60 py-2 px-4 border border-x-2 border-y-2 rounded-md font-semibold text-center text-base text-[#b1648fff] bg-transparent hover:bg-[#6ab4c1ff] hover:text-white"
//                   onClick={signInWithGoogle}
//                 >
//                   <FaGoogle />
//                   Register with Google
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center mx-10 lg:-mt-32 -mt-[380px] mb-8">
//             <h2 className="mb-4 text-[#b1648fff] text-lg font-semibold ">
//               Already have an account?
//             </h2>
//             <Link
//               to="/"
//               className="py-2 px-4 rounded-md text-base text-white bg-[#6ab4c1ff] hover:bg-[#b1648fff] hover:text-[#ffffff] transition duration-300"
//             >
//               Log In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import Chat from "../assets/images/img1.jpg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../config/firebase"; // Ensure storage is imported correctly
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithRedirect
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(
    () => {
      // if (loading) {
      //   return;
      // }
      if (user) {
        navigate("/messages");
      }
      if (error) {
        console.error("Error with authentication state: ", error);
        alert("Error: " + error.message);
      }
    },
    [user, loading, error, navigate]
  );

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let photoURL = "";
      if (image) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            snapshot => {
              // Progress function (optional)
            },
            error => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              photoURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          authProvider: "local",
          email,
          displayName,
          photoURL
        },
        { merge: true }
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
      navigate("/messages");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(
    () => {
      const checkRedirectResult = async () => {
        try {
          const result = await getRedirectResult(auth);
          if (result) {
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(
              userDocRef,
              {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber
              },
              { merge: true }
            );
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/messages");
          }
        } catch (err) {
          console.error(err);
        }
      };
      checkRedirectResult();
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="font-bold text-xl text-[#6ab4c1ff] text-center">
        Loading...
      </div>
    ); // Show loading state if authentication is in progress
  }

  return (
    <div className="h-screen overflow-x-hidden">
      <div className="flex lg:flex-row flex-col lg:gap-20 sm:gap-10 h-screen">
        <img src={Chat} className="hidden md:block" alt="#" />
        <div className="flex flex-col items-center justify-center sm:mx-auto lg:mx-0">
          <div className="mx-8 lg:mx-0 flex justify-center items-center h-screen">
            <div className="lg:-mt-20 sm:-mt-[200px] lg:mx-0 w-80 h-auto lg:w-96 z-10 bg-accent-white pb-12">
              <h2 className="mb-6 text-[#b1648fff] text-lg font-bold mt-20">
                Create Your Account
              </h2>
              <form className="relative" onSubmit={handleSubmit}>
                <div className="mx-10 flex flex-col gap-3 items-center mb-2 relative">
                  <label
                    htmlFor="displayName"
                    className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="border border-gray-400 text-xs px-3 py-3 rounded lg:w-80 w-60"
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="example@gmail.com"
                    className="border border-gray-400 text-xs px-3 py-3 rounded lg:w-80 w-60"
                  />
                  <div className="mx-10 relative">
                    <label
                      htmlFor="password"
                      className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                    >
                      Password
                    </label>
                    <div className="">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="********"
                        className="border border-gray-400 text-xs px-3 py-3 rounded pr-10 lg:w-80 w-60"
                      />
                    </div>
                  </div>
                  <div className="mx-10 relative">
                    <label
                      htmlFor="confirmPassword"
                      className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                    >
                      Confirm Password
                    </label>
                    <div className="">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        placeholder="********"
                        className="border border-gray-400 text-xs px-3 py-3 rounded pr-10 lg:w-80 w-60"
                      />
                    </div>
                  </div>
                  <div className="mx-10 relative">
                    <label
                      htmlFor="image"
                      className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="border border-gray-400 text-xs px-3 py-3 rounded lg:w-80 w-60"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mx-10 md:mx-8 w-60 lg:w-80 bg-[#b1648fff] text-white py-3 rounded hover:bg-[#6ab4c1ff] hover:text-white transition duration-300"
                >
                  Register
                </button>
              </form>

              <div className="flex items-center lg:mx-8 mx-10 mt-8">
                <hr className="flex-grow border-t-2 border-[#b1648fff] mr-1" />
                <span className="text-gray-500">OR</span>
                <hr className="flex-grow border-t-2 border-[#b1648fff] ml-1" />
              </div>

              <div className="flex flex-col items-center gap-2 mt-10">
                <Link
                  to="#"
                  className="flex items-center gap-4 w-60 py-2 px-4 border border-x-2 border-y-2 rounded-md font-semibold text-center text-base text-[#b1648fff] bg-transparent hover:bg-[#6ab4c1ff] hover:text-white"
                  onClick={signInWithGoogle}
                >
                  <FaGoogle />
                  Register with Google
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mx-10 lg:-mt-5 mb-8">
            <h2 className="mb-4 text-[#b1648fff] text-lg font-semibold">
              Already have an account?
            </h2>
            <Link
              to="/"
              className="py-2 px-4 rounded-md text-base text-white bg-[#6ab4c1ff] hover:bg-[#b1648fff] hover:text-[#ffffff] transition duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
