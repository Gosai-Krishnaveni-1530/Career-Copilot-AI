import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ScoreRing from "../components/ScoreRing";
import StatsGrid from "../components/StatsGrid";
import SectionBreakdown from "../components/SectionBreakdown";
import QuickInsights from "../components/QuickInsights";
import StrengthWeakness from "../components/StrengthWeakness";
import Suggestions from "../components/Suggestions";

import { AnalysisContext } from "../context/AnalysisContext";

function Dashboard() {
  const navigate = useNavigate();

  const { analysis } = useContext(
    AnalysisContext
  );

  console.log(
    "Dashboard Analysis:",
    analysis
  );

  const downloadReport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-report",
        analysis,
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "CareerCopilot_Report.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to download report"
      );
    }
  };

  if (!analysis) {
    return (
      <div className="space-y-6">
        <Header />

        <div
          className="
            bg-[#071426]
            border
            border-cyan-900
            rounded-2xl
            p-12
            text-center
          "
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            No Resume Analyzed Yet
          </h2>

          <p className="text-slate-400 mb-6">
            Go to Upload Resume and
            analyze a resume to see ATS
            insights.
          </p>

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              bg-cyan-500
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  return (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
      <Header />

      <div className="grid grid-cols-3 gap-6">
        <div>
          <ScoreRing
            score={analysis.atsScore}
          />

          <StatsGrid />
        </div>

        <div className="col-span-2 space-y-6">
          <SectionBreakdown />

          <QuickInsights />
        </div>
      </div>

      <StrengthWeakness />

      <Suggestions />

      <div className="flex justify-end gap-4">
        

        <button
  onClick={() => {
    console.log("Export Clicked");
    alert("Export Clicked");
    downloadReport();
  }}
  className="
    border
    border-cyan-500
    text-cyan-400
    hover:bg-cyan-500
    hover:text-black
    font-semibold
    px-6
    py-3
    rounded-xl
    transition
  "
>
  Export PDF
</button>
      </div>
    </motion.div>
  );
}

export default Dashboard;