// ChatbotWidget.jsx
import { useEffect } from "react";

const ChatbotWidget = ({ visible }) => {
  useEffect(() => {
    if (!visible) return;

    const existing = document.querySelector("df-messenger");
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    const dfMessenger = document.createElement("df-messenger");
    dfMessenger.setAttribute("intent", "WELCOME");
    dfMessenger.setAttribute("chat-title", "SIE-BOT");
    dfMessenger.setAttribute("agent-id", "976d9cf0-2e02-4059-ae32-99f6f73a10a2"); 
    dfMessenger.setAttribute("language-code", "es");
    document.body.appendChild(dfMessenger);

    return () => {
      if (dfMessenger) document.body.removeChild(dfMessenger);
    };
  }, [visible]);

  return null;
};

export default ChatbotWidget;
