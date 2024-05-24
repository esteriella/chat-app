import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Reset from "./Pages/Reset";
import ChatRoom from "./components/Chat/ChatRoom";
import Notifications from "./components/Notification/Notifications";
import Profile from "./components/Auth/Profile";
import Messages from "./Pages/Messages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
