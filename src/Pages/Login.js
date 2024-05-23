import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import Chat from "../assets/images/img1.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
    if (error) {
      console.error("Error with authentication state: ", error);
      alert("Error: " + error.message);
    }
  }, [user, loading, error, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        authProvider: "local",
        email
      }, { merge: true });
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
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

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber
          }, { merge: true });
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkRedirectResult();
  }, [navigate]);

  return (
    <div className="h-screen lg:overflow-hidden">
      <div className="flex lg:flex-row flex-col lg:gap-36 gap-10">
        <img src={Chat} width={800} alt="#" />
        <div className="flex flex-col items-center justify-center">
          <div className="mx-8 lg:mx-0 flex justify-center items-center h-screen">
            <div className="lg:-mt-52 md:-mt-[650px] -mt-[350px] lg:mx-0 w-80 h-auto lg:w-96 z-10 bg-accent-white pb-12">
              <h2 className="mb-6 text-[#b1648fff] text-lg font-bold mt-5">
                Log Into Your Account
              </h2>
              <form className="relative" onSubmit={handleSubmit}>
                <div className="mx-10 flex flex-col gap-3 items-center mb-2 relative">
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
                    onChange={(e) => setEmail(e.target.value)}
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="********"
                        className="border border-gray-400 text-xs px-3 py-3 rounded pr-10 lg:w-80 w-60"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-2 py-2 text-gray-400"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <label className="flex lg:flex-row flex-col text-start lg:gap-0 gap-2 lg:items-center mx-10 mb-8">
                  <div>
                    <input
                      type="checkbox"
                      className="form-checkbox bg-transparent text-gray-900 mr-2"
                      name="agree"
                    />
                    <span className="-mt-1 text-sm text-gray-900 font-extralight">
                      Remind me
                    </span>
                  </div>
                  <Link to="/reset" className="-mt-1 mx-1 underline">
                    <span className="lg:-mt-2 lg:ml-24 text-sm text-gray-900 font-extralight">
                      Forgot Password
                    </span>
                  </Link>
                </label>
                <button
                  type="submit"
                  className="mx-8 w-60 lg:w-80 bg-[#b1648fff] text-white py-3 rounded hover:bg-[#6ab4c1ff] hover:text-white transition duration-300"
                >
                  Log In
                </button>
              </form>

              <div className="flex items-center mx-10 mt-8">
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
                  Login with Google
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mx-10 lg:-mt-32 md:-mt-[650px] -mt-[380px] mb-8">
            <h2 className="mb-4 text-[#b1648fff] text-lg font-semibold ">
              Don't have an account?
            </h2>
            <Link
              to="/register"
              className="py-2 px-4 rounded-md text-base text-white bg-[#6ab4c1ff] hover:bg-[#b1648fff] hover:text-[#ffffff] transition duration-300"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
