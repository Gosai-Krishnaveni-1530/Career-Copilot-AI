import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function StrengthWeakness() {
  const { analysis } = useContext(AnalysisContext);

  const strengths =
    analysis?.strengths || [];

  const weaknesses =
    analysis?.weaknesses || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Strengths */}
      <div
        className="
          bg-[#071426]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-white text-xl font-bold mb-6">
          💪 Strengths
        </h2>

        <div className="space-y-4">

          {strengths.length > 0 ? (
            strengths.map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    rounded-xl
                    p-3
                    text-cyan-300
                  "
                >
                  ✓ {item}
                </div>
              )
            )
          ) : (
            <p className="text-slate-400">
              No strengths found
            </p>
          )}

        </div>
      </div>

      {/* Weaknesses */}
      <div
        className="
          bg-[#071426]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-white text-xl font-bold mb-6">
          ⚠ Weaknesses
        </h2>

        <div className="space-y-4">

          {weaknesses.length > 0 ? (
            weaknesses.map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    bg-red-500/10
                    border
                    border-red-500/20
                    rounded-xl
                    p-3
                    text-red-300
                  "
                >
                  ⚠ {item}
                </div>
              )
            )
          ) : (
            <p className="text-slate-400">
              No weaknesses found
            </p>
          )}

        </div>
      </div>

    </div>
  );
}

export default StrengthWeakness;
