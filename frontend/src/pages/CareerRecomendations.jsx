import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function CareerRecommendations() {
  const { analysis } = useContext(AnalysisContext);

  if (!analysis) {
    return (
      <div className="text-white text-xl">
        Analyze a document first.
      </div>
    );
  }

  const roles = analysis.recommendedRoles || [];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Career Recommendations
      </h1>

      <p className="text-slate-400">
        AI-generated roles based on your skills and experience.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {roles.map((role, index) => (
          <div
            key={index}
            className="
              bg-[#071426]
              border
              border-cyan-900
              rounded-2xl
              p-6
              hover:border-cyan-500
              transition
            "
          >
            <h2 className="text-xl font-bold text-cyan-400">
              {role}
            </h2>

            <p className="text-slate-400 mt-3">
              Recommended based on your current
              technical profile and project experience.
            </p>

            <div
              className="
                mt-5
                inline-block
                px-4
                py-2
                rounded-full
                bg-cyan-500/10
                text-cyan-300
              "
            >
              Strong Match
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CareerRecommendations;
