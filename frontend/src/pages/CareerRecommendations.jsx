import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function CareerRecommendations() {
  const { analysis } = useContext(AnalysisContext);

  if (!analysis) {
    return (
      <div className="text-white text-xl">
        Please analyze a resume first.
      </div>
    );
  }

  const roles = analysis.recommendedRoles || [];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Career Recommendations
        </h1>

        <p className="text-slate-400 mt-2">
          AI-generated roles based on your skills and experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {roles.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#071426]
              border
              border-cyan-900
              rounded-2xl
              p-6
              hover:border-cyan-500
              transition-all
              duration-300
            "
          >
            <div className="flex justify-between items-center">

              <h2 className="text-xl font-bold text-cyan-400">
                {item.role}
              </h2>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-300
                  text-sm
                "
              >
                {item.match}%
              </span>

            </div>

            <div className="mt-5">

              <div className="w-full h-3 bg-slate-800 rounded-full">
                <div
                  className="
                    h-3
                    bg-cyan-400
                    rounded-full
                  "
                  style={{
                    width: `${item.match}%`,
                  }}
                />
              </div>

            </div>

            <p className="text-slate-400 mt-4">
              Recommended based on your resume,
              technical skills, projects, and
              ATS analysis.
            </p>

          </div>
        ))}

      </div>

      <div
        className="
          bg-[#071426]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-white text-2xl font-bold mb-4">
          Job Readiness
        </h2>

        <div
          className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-green-500/10
            text-green-400
            font-semibold
          "
        >
          {analysis.jobReadiness}
        </div>

      </div>

    </div>
  );
}

export default CareerRecommendations;
