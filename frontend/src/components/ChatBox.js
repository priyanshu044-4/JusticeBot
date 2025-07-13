import React from 'react';

function ChatBox({ messages }) {
  return (
    <div className="border p-4 h-80 overflow-y-scroll bg-white">
      {messages.map((msg, idx) => (
        <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
          <span className={`${msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"} p-2 rounded inline-block`}>
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;