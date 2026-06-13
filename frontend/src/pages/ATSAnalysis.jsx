import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";
import { motion } from "framer-motion";
function ATSAnalysis() {
  const { analysis } = useContext(AnalysisContext);

  if (!analysis) {
    return (
      <div className="text-white text-2xl">
        No Resume Analysis Available
      </div>
    );
  }

  return (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
      <h1 className="text-4xl font-bold text-white">
        ATS Analysis
      </h1>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-2xl font-bold">
          ATS Score
        </h2>

        <p className="text-cyan-400 text-5xl font-bold mt-3">
          {analysis.atsScore}%
        </p>
      </div>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Job Readiness
        </h2>

        <p className="text-green-400 text-lg">
          {analysis.jobReadiness}
        </p>
      </div>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Strengths
        </h2>

        {analysis.strengths?.map((item, index) => (
          <p
            key={index}
            className="text-green-300"
          >
            • {item}
          </p>
        ))}
      </div>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Weaknesses
        </h2>

        {analysis.weaknesses?.map((item, index) => (
          <p
            key={index}
            className="text-red-300"
          >
            • {item}
          </p>
        ))}
      </div>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Current Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {analysis.currentSkills?.map(
            (skill, index) => (
              <span
                key={index}
                className="
                  bg-cyan-500
                  text-black
                  px-3
                  py-1
                  rounded-full
                  font-medium
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Missing Skills
        </h2>

        {analysis.missingSkills?.map(
          (item, index) => (
            <p
              key={index}
              className="text-yellow-300"
            >
              • {item}
            </p>
          )
        )}
      </div>

    </motion.div>
  );
}

export default ATSAnalysis;