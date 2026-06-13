import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function SkillsIntelligence() {
  const { analysis } = useContext(AnalysisContext);

  if (!analysis) {
    return (
      <div className="text-white text-xl">
        Please analyze a resume first.
      </div>
    );
  }

  const currentSkills = analysis.currentSkills || [];
  const missingSkills = analysis.missingSkills || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Skills Intelligence
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered skill analysis based on your resume.
        </p>
      </div>

      {/* Readiness Card */}
      <div
        className="
          bg-[#071426]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-white text-xl font-bold mb-4">
          Job Readiness
        </h2>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-green-500/10
            text-green-400
            font-semibold
          "
        >
          {analysis.jobReadiness}
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Current Skills */}
        <div
          className="
            bg-[#071426]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
        >
          <h2 className="text-cyan-400 text-2xl font-bold mb-5">
            Current Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {currentSkills.map((skill, index) => (
              <span
                key={index}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-300
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div
          className="
            bg-[#071426]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
        >
          <h2 className="text-red-400 text-2xl font-bold mb-5">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-500/10
                    text-red-300
                  "
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-400">
                No major skill gaps identified.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Summary */}
      <div
        className="
          bg-[#071426]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-white text-xl font-bold mb-4">
          Skills Summary
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Current Skills
            </p>
            <p className="text-cyan-400 text-3xl font-bold">
              {currentSkills.length}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Missing Skills
            </p>
            <p className="text-red-400 text-3xl font-bold">
              {missingSkills.length}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SkillsIntelligence;
