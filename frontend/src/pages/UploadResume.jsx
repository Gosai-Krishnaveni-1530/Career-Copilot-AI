import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AnalysisContext, } from "../context/AnalysisContext";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setAnalysis, } =
    useContext(AnalysisContext);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response =
        await axios.post(
          "http://localhost:5000/upload",
          formData
        );

      setAnalysis(
        response.data.analysis
      );
      console.log(
  "Resume Saved To Context",
  response.data.analysis
);
      navigate("/");

    } catch (error) {
      console.error(error);

      alert("Analysis failed");
    }

    setLoading(false);
  };

  return (
    <motion.div
  initial={{
    opacity: 0,
    y: 50,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
      className="
        bg-[#071426]
        border
        border-cyan-900
        rounded-2xl
        p-10
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          text-white
          mb-4
        "
      >
        Upload Resume
      </h1>

      <p className="text-slate-400 mb-8">
        Upload a PDF resume to
        generate ATS analysis.
      </p>

      <div
        className="
          border-2
          border-dashed
          border-cyan-700
          rounded-2xl
          p-12
          text-center
        "
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="mb-6 text-slate-300"
        />

        {file && (
          <p className="text-cyan-400 mb-4">
            {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="
            bg-cyan-500
            text-black
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-cyan-400
            transition
          "
        >
          {loading
            ? "Analyzing Resume..."
            : "Analyze Resume"}
        </button>
      </div>
    </motion.div>
  );
}

export default UploadResume;
