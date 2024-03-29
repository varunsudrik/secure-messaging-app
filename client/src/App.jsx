import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import "./App.css";

export default function App() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSendMessage = () => {
    if (message) {
      sendMessage({ text: message, image: image });
      setMessage("");
      setImage(null);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Chat Room</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          className="message-input"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="image-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.text && <p className="text">{msg.text}</p>}
            {msg.image && (
              <img
                src={
                  msg.image
                    ? URL.createObjectURL(
                        new Blob([new Uint8Array(msg.image.data)], {
                          type: "image/jpeg",
                        })
                      )
                    : ""
                }
                alt="Received Image"
                className="image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
