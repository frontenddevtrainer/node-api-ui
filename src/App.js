import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:4000");

function App() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat([...chat, data]);
    });
  }, [chat]);

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("send_message", message);
    setMessage("");
    setChat([...chat, message]);
  }

  return (
    <div>
      <h1>Messenger</h1>

      <ul>
        {chat.map((message, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>

      <form onSubmit={sendMessage}>
        <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
