import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

function Suggestions() {
  const { analysis } =
    useContext(AnalysisContext);

  const suggestions =
    analysis?.suggestions || [];

  return (
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
        🚀 Suggestions
      </h2>

      <div className="space-y-3">

        {suggestions.length > 0 ? (
          suggestions.map(
            (item, index) => (
              <div
                key={index}
                className="
                  bg-slate-800
                  rounded-xl
                  p-4
                  text-slate-300
                "
              >
                {item}
              </div>
            )
          )
        ) : (
          <p className="text-slate-400">
            No suggestions available
          </p>
        )}

      </div>
    </div>
  );
}

export default Suggestions;
