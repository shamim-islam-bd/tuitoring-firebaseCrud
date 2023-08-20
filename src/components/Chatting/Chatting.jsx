import React, { useContext, useEffect, useRef, useState } from 'react';
import './chatting.scss';
import { auth, db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
  getDoc,
  doc,
} from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

export default function Chatting() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useContext(AuthContext);

  const { teacherId } = useParams();

const messagesRef = collection(db, "messages");

useEffect(() => {
    const unsuscribe = onSnapshot(messagesRef, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [currentUser.uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
    //   img: currentUser.photoURL,
      user: currentUser.uid,
      name: currentUser.email,
    });

    setNewMessage("");
  };
 

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to the Chat</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.user === currentUser.uid ? 'sent' : 'received'
            }`}
          >
            <div className="message-profile">
              {/* <img src={message?.photoURL} alt="" srcSet="" /> */}
              <span className="profile-name">{message.name}</span>
            </div>
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="message-time">
                {new Date(message.createdAt?.toDate()).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <textarea
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}
