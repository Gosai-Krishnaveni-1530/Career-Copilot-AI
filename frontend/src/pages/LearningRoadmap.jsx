import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function LearningRoadmap() {
  const { analysis } = useContext(AnalysisContext);

  if (!analysis) {
    return (
      <div className="text-white text-xl">
        Please analyze a resume first.
      </div>
    );
  }

  const roadmap = analysis.learningRoadmap || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Learning Roadmap
        </h1>

        <p className="text-slate-400 mt-2">
          AI-generated roadmap to improve your career readiness.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">

        {roadmap.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-6"
          >

            {/* Step Circle */}
            <div
              className="
                w-14
                h-14
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500
                flex
                items-center
                justify-center
                text-cyan-400
                font-bold
              "
            >
              {index + 1}
            </div>

            {/* Step Card */}
            <div
              className="
                flex-1
                bg-[#071426]
                border
                border-cyan-900
                rounded-2xl
                p-5
              "
            >
              <h3 className="text-white text-lg font-semibold">
                {step}
              </h3>
            </div>

          </div>
        ))}

      </div>

      {/* Goal Card */}
      <div
        className="
          bg-[#071426]
          border
          border-green-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-green-400 text-2xl font-bold">
          🎯 Goal
        </h2>

        <p className="text-slate-300 mt-3">
          Complete these roadmap steps to improve your ATS score,
          strengthen your profile, and unlock more career opportunities.
        </p>
      </div>

    </div>
  );
}

export default LearningRoadmap;
