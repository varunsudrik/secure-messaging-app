import { useState } from "react";
import { SocketProvider, useSocket } from "../context/SocketProvider";

function Chat() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Chat Room</h1>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          className="border border-gray-300 px-4 py-2 mr-2 rounded-lg w-full"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg ml-2"
        >
          Send
        </button>
      </div>
      <div className="mt-8">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            {msg.text && (
              <p className="bg-gray-200 p-4 rounded-lg mb-2">{msg.text}</p>
            )}
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
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
