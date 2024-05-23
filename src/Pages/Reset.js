import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../config/firebase";
import Chat from "../assets/images/img1.jpg";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    // Uncomment and implement navigation logic if needed
    // if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="h-screen lg:overflow-hidden">
      <div className="flex lg:flex-row flex-col lg:gap-36 gap-10">
        <img src={Chat} width={800} alt="#" />
        <div className="flex flex-col items-center justify-center">
          <div className="mx-8 lg:mx-0 flex justify-center items-center h-screen">
            <div className="lg:-mt-52 -mt-[750px] lg:mx-0 w-80 h-auto lg:w-96 z-10 bg-accent-white pb-12">
              <h2 className="mb-6 text-[#b1648fff] text-lg font-bold mt-5">
                Reset Password
              </h2>
              <form className="relative" onSubmit={(e) => {}}>
                <div className="mx-10 flex flex-col gap-3 items-center mb-2 relative">
                  <label
                    htmlFor="email"
                    className="absolute top-0 left-2 -mt-2 px-3 text-xs text-gray-400 bg-white"
                  >
                    E-mail Address
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
                </div>
                <button
                  type="submit"
                  className="mx-10 w-60 lg:w-80 bg-[#b1648fff] text-white py-3 rounded hover:bg-[#6ab4c1ff] hover:text-white transition duration-300"
                  onClick={() => sendPasswordReset(email)}
                >
                  Send password reset email
                </button>
              </form>

              <div className="flex items-center mx-10 mt-8">
                <hr className="flex-grow border-t-2 border-[#b1648fff] mr-1" />
                <span className="text-gray-500">OR</span>
                <hr className="flex-grow border-t-2 border-[#b1648fff] ml-1" />
              </div>

              <div className="flex flex-col items-center gap-2 mt-10">
                <Link
                  to="/"
                  className="flex gap-4 w-40 py-2 px-4 border border-x-2 border-y-2 rounded-md font-semibold text-center text-base text-[#b1648fff] bg-transparent hover:bg-[#6ab4c1ff] hover:text-white"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mx-10 lg:-mt-32 -mt-[700px] mb-8">
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

export default Reset;
