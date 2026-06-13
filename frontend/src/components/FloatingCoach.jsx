import {
  useState,
  useContext,
  useEffect,
} from "react";

import axios from "axios";

import {
  MessageCircle,
  X,
  Send,
} from "lucide-react";

import { AnalysisContext } from "../context/AnalysisContext";

function FloatingCoach() {
  const {
  analysis,
  jdAnalysis,
} = useContext(
  AnalysisContext
);

  const [open, setOpen] =
    useState(false);

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
  useState(() => {
    const saved =
      localStorage.getItem(
        "coachMessages"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [loading, setLoading] =
    useState(false);

  const [position, setPosition] =
    useState({
      x: window.innerWidth - 90,
      y: window.innerHeight - 90,
    });

  const [dragging, setDragging] =
    useState(false);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - 30,
      y: e.clientY - 30,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

 useEffect(() => {
  window.addEventListener(
    "mousemove",
    handleMouseMove
  );

  window.addEventListener(
    "mouseup",
    handleMouseUp
  );

  return () => {
    window.removeEventListener(
      "mousemove",
      handleMouseMove
    );

    window.removeEventListener(
      "mouseup",
      handleMouseUp
    );
  };
}, [dragging]);

useEffect(() => {
  localStorage.setItem(
    "coachMessages",
    JSON.stringify(messages)
  );
}, [messages]);

 const askCoach = async () => {
  if (!question.trim()) return;

  try {
    setLoading(true);

    const settings =
      JSON.parse(
        localStorage.getItem(
          "careercopilot_settings"
        )
      ) || {};

    const selectedModel =
      settings.model ||
      "llama3.2";

    const coachLength =
      settings.coachLength ||
      "Detailed";

    const coachStyle =
      settings.coachStyle ||
      "Professional";

    const response =
      await axios.post(
        "http://localhost:5000/career-coach",
        {
          question,
          analysis,
          jdAnalysis,
          model:
            selectedModel,
          coachLength,
          coachStyle,
        }
      );

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
      {
        sender: "ai",
        text:
          response.data.answer,
      },
    ]);

    setQuestion("");
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* Floating Button */}

     <button
  onMouseDown={handleMouseDown}
  onClick={() => setOpen(!open)}
  style={{
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 9999,
  }}
  className="
    w-16
    h-16
    rounded-full
    bg-cyan-500
    text-black
    flex
    items-center
    justify-center
    shadow-lg
    cursor-move
    select-none
  "
>
  {open ? (
    <X size={26} />
  ) : (
    <MessageCircle size={26} />
  )}
</button>
      {/* Chat Window */}

      {open && (
  <div
    style={{
      position: "fixed",
      right: "20px",
      bottom: "90px",
      zIndex: 9998,
    }}
    className="
      w-[380px]
      h-[550px]
      bg-[#071426]
      border
      border-cyan-900
      rounded-2xl
      flex
      flex-col
      overflow-hidden
      shadow-2xl
    "
  >
          {/* Header */}

          <div
  className="
    p-4
    border-b
    border-cyan-900
    flex
    justify-between
    items-center
  "
>
  <span className="text-white font-bold">
    CareerCopilot AI
  </span>

  <button
    onClick={() => {
      setMessages([]);

      localStorage.removeItem(
        "coachMessages"
      );
    }}
    className="
      text-red-400
      text-sm
    "
  >
    Clear
  </button>
</div>

          {/* Messages */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-4
            "
          >
            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender ===
                    "user"
                      ? "bg-cyan-500 text-black p-3 rounded-xl ml-auto max-w-[80%]"
                      : "bg-slate-800 text-white p-3 rounded-xl max-w-[80%]"
                  }
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="text-slate-400">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}

          <div
            className="
              p-4
              border-t
              border-cyan-900
              flex
              gap-2
            "
          >
            <input
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askCoach();
                }
              }}
              placeholder="Ask anything..."
              className="
                flex-1
                bg-slate-800
                text-white
                rounded-lg
                px-3
                py-2
                outline-none
              "
            />

            <button
              onClick={askCoach}
              className="
                bg-cyan-500
                text-black
                px-4
                rounded-lg
              "
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingCoach;