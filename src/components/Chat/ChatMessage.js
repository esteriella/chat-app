import React from 'react';

function ChatMessage({ message, currentUser }) {
  const isCurrentUser = message.uid === currentUser.uid;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <img
          src={message.photoURL || 'https://i.pravatar.cc/300'}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <div className={`flex flex-col space-y-1 text-sm max-w-xs mx-2 order-${isCurrentUser ? '1' : '2'}`}>
        <span className={`px-4 py-2 rounded-lg inline-block ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
          {message.text}
        </span>
        <span className="text-xs text-gray-500">{message.displayName}</span>
      </div>
      {isCurrentUser && (
        <img
          src={message.photoURL || 'https://i.pravatar.cc/300'}
          alt="User Avatar"
          className="w-10 h-10 rounded-full ml-2"
        />
      )}
    </div>
  );
}

export default ChatMessage;
