import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:4000");

function App() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat([...chat, data]);
    });

    socket.on("new_user", (data) => {
      setFriends(JSON.parse(data));
    });
  }, [chat]);

  function sendMessage(e) {
    e.preventDefault();
    const messageToSend = { message, friend: selectedFriend };
    socket.emit("send_message", messageToSend);
    setMessage("");
    setChat([...chat, { ...messageToSend, isMyMessage: true }]);
  }

  function signIn(e) {
    e.preventDefault();
    socket.emit("sign_in", user);
    setIsLoggedIn(true);
  }

  return (
    <div>
      <h1>Messenger</h1>
      <ul>
        {chat.map((message, index) => {
          return (
            <li
              key={index}
              style={{ color: message.isMyMessage ? "blue" : "green" }}
            >
              {message.isMyMessage ? "me" : message.sender}: {message.message}
            </li>
          );
        })}
      </ul>

      {!isLoggedIn && (
        <form onSubmit={signIn}>
          <input value={user} onChange={(e) => setUser(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      )}

      {isLoggedIn && (
        <>
          <ul>
            {friends.map((friend, index) => {
              return (
                <li
                  style={{
                    fontWeight: friend === selectedFriend ? "bold" : "normal",
                  }}
                  onClick={() => {
                    setSelectedFriend(friend);
                  }}
                  key={index}
                >
                  {friend}
                </li>
              );
            })}
          </ul>

          <form onSubmit={sendMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
