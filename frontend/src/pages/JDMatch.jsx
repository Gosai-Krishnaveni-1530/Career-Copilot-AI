import { useState, useContext } from "react";
import axios from "axios";
import { AnalysisContext } from "../context/AnalysisContext";
import { motion } from "framer-motion";
function JDMatch() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const {
    jdAnalysis,
    setJdAnalysis,
  } = useContext(AnalysisContext);
  const handleAnalyze = async () => {
    if (!resumeFile || !jdFile) {
      alert("Please upload both Resume and Job Description");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resumeFile);
      formData.append("jobDescription", jdFile);

      const response = await axios.post(
        "http://localhost:5000/jd-match",
        formData
      );

      setResult(response.data.analysis);
      setJdAnalysis(
        response.data.analysis
      );
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
      <h1 className="text-4xl font-bold text-white">
        Resume vs Job Description
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Resume
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResumeFile(e.target.files[0])
            }
            className="text-slate-300"
          />
        </div>

        <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Job Description
          </h2>

          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) =>
              setJdFile(e.target.files[0])
            }
            className="text-slate-300"
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {result && (
        <div className="space-y-6">
          <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
            <h2 className="text-white text-2xl font-bold">
              Match Score
            </h2>

            <p className="text-cyan-400 text-5xl font-bold mt-3">
              {result.matchScore}%
            </p>
          </div>

          <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">
              Missing Keywords
            </h2>

            {result.missingKeywords?.map(
              (item, index) => (
                <p
                  key={index}
                  className="text-red-300"
                >
                  • {item}
                </p>
              )
            )}
          </div>

          <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">
              Strengths
            </h2>

            {result.strengths?.map(
              (item, index) => (
                <p
                  key={index}
                  className="text-green-300"
                >
                  • {item}
                </p>
              )
            )}
          </div>

          <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">
              Recommendations
            </h2>

            {result.recommendations?.map(
              (item, index) => (
                <p
                  key={index}
                  className="text-cyan-300"
                >
                  • {item}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default JDMatch;
