import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ScoreRing({ score }) {
  return (
    <div
      className="
        bg-[#071426]
        border
        border-cyan-900
        rounded-2xl
        p-8
        w-80
        shadow-[0_0_25px_rgba(0,245,212,0.12)]
      "
    >
      <div className="w-60 h-60 mx-auto">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: "#00F5D4",
            textColor: "#00F5D4",
            trailColor: "#10223A",
            strokeLinecap: "round",
            textSize: "16px",
          })}
        />
      </div>

      <p className="text-center text-slate-400 text-sm -mt-16">
        /100
      </p>

      <h2
        className="
          text-center
          text-cyan-400
          text-sm
          tracking-[0.3em]
          mt-8
        "
      >
        ATS SCORE
      </h2>

      <div className="flex justify-center mt-5">
        <div
          className="
            px-5
            py-2
            rounded-full
            border
            border-cyan-500
            text-cyan-400
            text-xs
            font-semibold
            tracking-wider
          "
        >
          ✓ STRONG MATCH
        </div>
      </div>
    </div>
  );
}

export default ScoreRing;
