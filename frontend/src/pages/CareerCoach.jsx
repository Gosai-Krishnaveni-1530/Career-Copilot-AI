import { useState, useContext } from "react";
import axios from "axios";
import { AnalysisContext } from "../context/AnalysisContext";

function CareerCoach() {
  const { analysis } = useContext(AnalysisContext);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "How can I become an AI Engineer?",
    "What skills should I learn next?",
    "Which certifications should I pursue?",
    "What projects should I build?",
    "How can I improve my ATS score?",
  ];

  const askCoach = async () => {
    if (!analysis) {
      alert("Please analyze a resume first.");
      return;
    }

    if (!question.trim()) {
      alert("Enter a question.");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        "http://localhost:5000/career-coach",
        {
          question,
          analysis,
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
          text: result.data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Career Coach
        </h1>

        <p className="text-slate-400 mt-2">
          Ask personalized career questions based on your resume analysis.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => setQuestion(q)}
            className="
              bg-slate-800
              hover:bg-slate-700
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            {q}
          </button>
        ))}
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about your career..."
        className="
          w-full
          h-40
          bg-[#071426]
          border
          border-cyan-900
          rounded-xl
          p-4
          text-white
          outline-none
        "
      />

      <button
        onClick={askCoach}
        disabled={loading}
        className="
          bg-cyan-500
          hover:bg-cyan-400
          disabled:opacity-50
          text-black
          font-semibold
          px-6
          py-3
          rounded-xl
          transition
        "
      >
        {loading ? "Thinking..." : "Ask AI Coach"}
      </button>

      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "bg-cyan-500 text-black p-4 rounded-xl ml-auto max-w-[80%]"
                  : "bg-[#071426] border border-cyan-900 text-white p-4 rounded-xl max-w-[80%]"
              }
            >
              <div className="whitespace-pre-wrap">
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareerCoach;
