import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:4000");

function App() {
  

  return <h1>Messenger</h1>
}

export default App;
