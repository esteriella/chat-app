import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Layout/Navbar";
// import Footer from "./components/Layout/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import UserProfile from "./components/Auth/UserProfile";
// import ChatRoomList from "./components/Chat/ChatRoomList";
import Dashboard from "./Pages/Dashboard";
// import { auth } from "./config/firebase"; // Assuming this is your Firebase auth module
import Reset from "./Pages/Reset";
import ChatRoom from "./components/Chat/ChatRoom";
import Notifications from "./components/Notification/Notifications";
import Profile from "./components/Auth/Profile";

const App = () => {

    // useNotification();
  // const [user, setUser] = useState(null);
  // // const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authUser => {
  //     setUser(authUser);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    // <div>
    //   <Login />
    //   <Register />
    //   {/* <Dashboard /> */}
      
    // </div>
    
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/chat/:uid" element={<ChatRoom />} /> */}
      <Route path="/reset" element={<Reset />} />
      <Route path="/chat/:chatId" element={<ChatRoom />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>

    //     <div className="bg-gray-100 min-h-screen">
    //       <Routes>
    //         {user ? (
    //           <>
    //             <Route path="/profile" element={<UserProfile user={user} />} />
    //             <Route path="/chatroomlist" element={<ChatRoomList user={user} />} />
    //             <Route path="/dashboard" element={<Dashboard user={user} />} />
    //           </>
    //         ) : (
    //           <>
    //             <Route path="/" element={<Login />} />
    //             <Route path="/register" element={<Register />} />
    //           </>
    //         )}
    //       </Routes>
    //     </div>
    //     <Footer /> {/* Footer outside of Routes */}
    //   </div>
    // </Router>
  );
};

export default App;
