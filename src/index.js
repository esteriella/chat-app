import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route
// } from "react-router-dom";

// import Register from "./components/Auth/Register";
// import Login from "./components/Auth/Login";
// import Protected from "./components/Protected/Protected";
// import ChatRoom from "./components/Chat/ChatRoom";
// import Dashboard from "./components/Layout/Dashboard";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="register" element={<Register />} />
//       <Route path="login" element={<Login />} />
//       <Route path="/" element={<Protected />}>
//         <Route path="/" index element={<Dashboard />} />
//       </Route>
//     </Route>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // <RouterProvider router={router} />
);
