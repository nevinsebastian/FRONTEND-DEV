"use client";

import React, { useState } from "react";

// Define the Message and Customer types
interface Message {
  sender: string;
  text: string;
}

interface Customer {
  id: number;
  name: string;
}

// Mock customer list and chat messages
const mockCustomers: Customer[] = [
  { id: 1, name: "Customer A" },
  { id: 2, name: "Customer B" },
  { id: 3, name: "Customer C" },
];

const ChatApp: React.FC = () => {
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { sender: "You", text: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Simulate a reply
      setTimeout(() => {
        const reply: Message = {
          sender: activeCustomer?.name || "System",
          text: "This is a mock reply.",
        };
        setMessages((prevMessages) => [...prevMessages, reply]);
      }, 1000);

      setMessage("");
    }
  };

  const openCustomerChat = (customer: Customer) => {
    setActiveCustomer(customer);
    setMessages([]); // Clear previous messages or load customer-specific messages here
  };

  const goBackToCustomerList = () => {
    setActiveCustomer(null);
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {!activeCustomer ? (
        // Customer List View
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Customers
          </h1>
          <ul className="space-y-2">
            {mockCustomers.map((customer) => (
              <li
                key={customer.id}
                className="p-4 bg-white dark:bg-neutral-800 rounded shadow cursor-pointer flex justify-between items-center"
                onClick={() => openCustomerChat(customer)}
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {customer.name}
                </span>
                <span className="text-blue-500 dark:text-blue-300">Chat</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Chat Screen
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 bg-blue-500 text-white flex items-center">
            <button
              onClick={goBackToCustomerList}
              className="mr-4 bg-white text-blue-500 rounded-full p-2"
            >
              ←
            </button>
            <h2 className="text-lg font-bold">{activeCustomer.name}</h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-200 dark:bg-neutral-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white dark:bg-neutral-700"
                }`}
              >
                <strong>{msg.sender}: </strong>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white dark:bg-neutral-800 flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-neutral-700"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
