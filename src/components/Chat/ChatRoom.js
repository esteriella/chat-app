// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useAuthState } from 'react-firebase-hooks/auth';
// // // // import { auth, db } from '../../config/firebase';
// // // // import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import ChatMessage from './ChatMessage';

// // // // function ChatRoom() {
// // // //   const { chatId } = useParams();
// // // //   const [user] = useAuthState(auth);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [newMessage, setNewMessage] = useState('');
// // // //   const messagesEndRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     if (!chatId) {
// // // //       console.error("chatId is undefined");
// // // //       return;
// // // //     }

// // // //     const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt'));
// // // //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
// // // //       const messages = querySnapshot.docs.map(doc => ({
// // // //         id: doc.id,
// // // //         ...doc.data()
// // // //       }));
// // // //       setMessages(messages);
// // // //     });

// // // //     return () => unsubscribe();
// // // //   }, [chatId]);

// // // //   useEffect(() => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   }, [messages]);

// // // //   const sendMessage = async (e) => {
// // // //     e.preventDefault();
// // // //     if (newMessage.trim() === '') return;

// // // //     await addDoc(collection(db, 'chats', chatId, 'messages'), {
// // // //       text: newMessage,
// // // //       uid: user.uid,
// // // //       displayName: user.displayName,
// // // //       photoURL: user.photoURL,
// // // //       createdAt: new Date()
// // // //     });

// // // //     setNewMessage('');
// // // //   };

// // // //   const handleSignOut = async () => {
// // // //     try {
// // // //       await auth.signOut();
// // // //       navigate('/');  // Redirect to home or login page after sign out
// // // //     } catch (error) {
// // // //       console.error("Error signing out: ", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col h-screen bg-gray-100">
// // // //       <header className="flex items-center justify-between p-4 bg-[#b1648fff] text-white">
// // // //         <h1 className="text-lg font-bold">Chat Room</h1>
// // // //         <button
// // // //           className="bg-[#6ab4c1ff] hover:bg-[#b1648fff] text-white font-bold py-2 px-4 rounded"
// // // //           onClick={handleSignOut}
// // // //         >
// // // //           Sign Out
// // // //         </button>
// // // //       </header>

// // // //       <main className="flex-1 overflow-y-auto p-4">
// // // //         {messages.map(msg => (
// // // //           <ChatMessage key={msg.id} message={msg} currentUser={user} />
// // // //         ))}
// // // //         <div ref={messagesEndRef} />
// // // //       </main>

// // // //       <form onSubmit={sendMessage} className="flex p-4 bg-gray-200">
// // // //         <input
// // // //           type="text"
// // // //           className="flex-1 p-2 border border-gray-300 rounded"
// // // //           value={newMessage}
// // // //           onChange={(e) => setNewMessage(e.target.value)}
// // // //           placeholder="Type your message..."
// // // //         />
// // // //         <button
// // // //           type="submit"
// // // //           className="ml-2 bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
// // // //         >
// // // //           Send
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ChatRoom;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { useAuthState } from 'react-firebase-hooks/auth';
// // import { auth, db } from '../../config/firebase';
// // import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, arrayUnion, doc } from 'firebase/firestore';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import ChatMessage from './ChatMessage';

// // function ChatRoom() {
// //   const { chatId } = useParams();
// //   const [user] = useAuthState(auth);
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const messagesEndRef = useRef(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!chatId) {
// //       console.error("chatId is undefined");
// //       return;
// //     }

// //     const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
// //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
// //       const messages = querySnapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setMessages(messages);
// //     });

// //     return () => unsubscribe();
// //   }, [chatId]);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// // //   const sendMessage = async (e) => {
// // //     e.preventDefault();
// // //     if (newMessage.trim() === '') return;

// // //     await addDoc(collection(db, 'chats', chatId, 'messages'), {
// // //       text: newMessage,
// // //       uid: user.uid,
// // //       displayName: user.displayName,
// // //       photoURL: user.photoURL,
// // //       createdAt: serverTimestamp()
// // //     });

// // //     setNewMessage('');
// // //   };

// // // Function to send a message
// // const sendMessage = async (chatId, message, senderId, receiverId) => {
// //     try {
// //       const messageDocRef = doc(db, "chats", chatId);
  
// //       await updateDoc(messageDocRef, {
// //         messages: arrayUnion({
// //           text: message,
// //           senderId,
// //           timestamp: new Date(),
// //         }),
// //       });
  
// //       // Create a notification for the receiver
// //       const notificationDocRef = doc(db, "notifications", receiverId);
  
// //       await updateDoc(notificationDocRef, {
// //         notifications: arrayUnion({
// //           chatId,
// //           message,
// //           senderId,
// //           timestamp: new Date(),
// //         }),
// //       });
// //     } catch (error) {
// //       console.error("Error sending message or creating notification: ", error);
// //     }
// //   };

// //   const handleSignOut = async () => {
// //     try {
// //       await auth.signOut();
// //       navigate('/');  // Redirect to home or login page after sign out
// //     } catch (error) {
// //       console.error("Error signing out: ", error);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-100">
// //       <header className="flex items-center justify-between p-4 bg-[#b1648fff] text-white">
// //         <h1 className="text-lg font-bold">Chat Room</h1>
// //         <button
// //           className="bg-[#6ab4c1ff] hover:bg-[#b1648fff] text-white font-bold py-2 px-4 rounded"
// //           onClick={handleSignOut}
// //         >
// //           Sign Out
// //         </button>
// //       </header>

// //       <main className="flex-1 overflow-y-auto p-4">
// //         {messages.map(msg => (
// //           <ChatMessage key={msg.id} message={msg} currentUser={user} />
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </main>

// //       <form onSubmit={sendMessage} className="flex p-4 bg-gray-200">
// //         <input
// //           type="text"
// //           className="flex-1 p-2 border border-gray-300 rounded"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <button
// //           type="submit"
// //           className="ml-2 bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
// //         >
// //           Send
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default ChatRoom;


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useAuthState } from 'react-firebase-hooks/auth';
// // // import { auth, db } from '../../config/firebase';
// // // import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import ChatMessage from './ChatMessage';

// // // function ChatRoom() {
// // //   const { chatId } = useParams();
// // //   const [user] = useAuthState(auth);
// // //   const [messages, setMessages] = useState([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const messagesEndRef = useRef(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!chatId) {
// // //       console.error("chatId is undefined");
// // //       return;
// // //     }

// // //     const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
// // //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
// // //       const messages = querySnapshot.docs.map(doc => ({
// // //         id: doc.id,
// // //         ...doc.data()
// // //       }));
// // //       setMessages(messages);
// // //     });

// // //     return () => unsubscribe();
// // //   }, [chatId]);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages]);

// // //   const sendMessage = async (e) => {
// // //     e.preventDefault();
// // //     if (newMessage.trim() === '') return;

// // //     const messageData = {
// // //       text: newMessage,
// // //       uid: user.uid,
// // //       displayName: user.displayName,
// // //       photoURL: user.photoURL,
// // //       createdAt: serverTimestamp()
// // //     };

// // //     // Add message to the chat collection
// // //     await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

// // //     // Create a notification for the receiver
// // //     const chatParticipants = chatId.split('_'); // Assuming chatId is in the format "userId1_userId2"
// // //     const receiverId = chatParticipants.find(id => id !== user.uid);
    
// // //     if (receiverId) {
// // //       const notificationData = {
// // //         chatId,
// // //         message: newMessage,
// // //         senderId: user.uid,
// // //         displayName: user.displayName,
// // //         timestamp: serverTimestamp(),
// // //         read: false
// // //       };

// // //       await addDoc(collection(db, 'notifications'), notificationData);
// // //     }

// // //     setNewMessage('');
// // //   };

// // //   const handleSignOut = async () => {
// // //     try {
// // //       await auth.signOut();
// // //       navigate('/');  // Redirect to home or login page after sign out
// // //     } catch (error) {
// // //       console.error("Error signing out: ", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-screen bg-gray-100">
// // //       <header className="flex items-center justify-between p-4 bg-[#b1648fff] text-white">
// // //         <h1 className="text-lg font-bold">Chat Room</h1>
// // //         <button
// // //           className="bg-[#6ab4c1ff] hover:bg-[#b1648fff] text-white font-bold py-2 px-4 rounded"
// // //           onClick={handleSignOut}
// // //         >
// // //           Sign Out
// // //         </button>
// // //       </header>

// // //       <main className="flex-1 overflow-y-auto p-4">
// // //         {messages.map(msg => (
// // //           <ChatMessage key={msg.id} message={msg} currentUser={user} />
// // //         ))}
// // //         <div ref={messagesEndRef} />
// // //       </main>

// // //       <form onSubmit={sendMessage} className="flex p-4 bg-gray-200">
// // //         <input
// // //           type="text"
// // //           className="flex-1 p-2 border border-gray-300 rounded"
// // //           value={newMessage}
// // //           onChange={(e) => setNewMessage(e.target.value)}
// // //           placeholder="Type your message..."
// // //         />
// // //         <button
// // //           type="submit"
// // //           className="ml-2 bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
// // //         >
// // //           Send
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default ChatRoom;


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../../config/firebase';
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { useParams, useNavigate } from 'react-router-dom';
// import ChatMessage from './ChatMessage';

// function ChatRoom() {
//   const { chatId } = useParams();
//   const [user] = useAuthState(auth);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!chatId) {
//       console.error("chatId is undefined");
//       return;
//     }

//     const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messages = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setMessages(messages);
//     });

//     return () => unsubscribe();
//   }, [chatId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;

//     const messageData = {
//       text: newMessage,
//       uid: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL,  // Ensure photoURL is included
//       createdAt: serverTimestamp()
//     };

//     // Add message to the chat collection
//     await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

//     // Create a notification for the receiver
//     const chatParticipants = chatId.split('_'); // Assuming chatId is in the format "userId1_userId2"
//     const receiverId = chatParticipants.find(id => id !== user.uid);

//     if (receiverId) {
//       const notificationData = {
//         chatId,
//         message: newMessage,
//         senderId: user.uid,
//         displayName: user.displayName,
//         photoURL: user.photoURL,  // Ensure photoURL is included in the notification
//         timestamp: serverTimestamp(),
//         read: false
//       };

//       await addDoc(collection(db, 'notifications'), notificationData);
//     }

//     setNewMessage('');
//   };

//   const handleSignOut = async () => {
//     try {
//       await auth.signOut();
//       navigate('/');  // Redirect to home or login page after sign out
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="flex items-center justify-between p-4 bg-[#b1648fff] text-white">
//         <h1 className="text-lg font-bold">Chat Room</h1>
//         <button
//           className="bg-[#6ab4c1ff] hover:bg-[#b1648fff] text-white font-bold py-2 px-4 rounded"
//           onClick={handleSignOut}
//         >
//           Sign Out
//         </button>
//       </header>

//       <main className="flex-1 overflow-y-auto p-4">
//         {messages.map(msg => (
//           <ChatMessage key={msg.id} message={msg} currentUser={user} />
//         ))}
//         <div ref={messagesEndRef} />
//       </main>

//       <form onSubmit={sendMessage} className="flex p-4 bg-gray-200">
//         <input
//           type="text"
//           className="flex-1 p-2 border border-gray-300 rounded"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button
//           type="submit"
//           className="ml-2 bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ChatRoom;


import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';

function ChatRoom() {
  const { chatId } = useParams();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId) {
      console.error("chatId is undefined");
      return;
    }

    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      text: newMessage,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    };

    // Add message to the chat collection
    await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

    // Create a notification for the receiver
    const chatParticipants = chatId.split('_'); // Assuming chatId is in the format "userId1_userId2"
    const receiverId = chatParticipants.find(id => id !== user.uid);
    
    if (receiverId) {
      const notificationData = {
        chatId,
        message: newMessage,
        senderId: user.uid,
        displayName: user.displayName,
        timestamp: serverTimestamp(),
        read: false
      };

      await addDoc(collection(db, 'notifications', receiverId, 'userNotifications'), notificationData);
    }

    setNewMessage('');
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');  // Redirect to home or login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-[#b1648fff] text-white">
        <h1 className="text-lg font-bold">Chat Room</h1>
        <div>
        <button
          className="bg-[#6ab4c1ff] hover:bg-[#b1648fff] text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        {/* Back Button */}
        <button
          className="bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleBackToDashboard}
        >
          Back
        </button>
        </div>
        
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} currentUser={user} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <form onSubmit={sendMessage} className="flex p-4 bg-gray-200">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="ml-2 bg-[#b1648fff] hover:bg-[#6ab4c1ff] text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
