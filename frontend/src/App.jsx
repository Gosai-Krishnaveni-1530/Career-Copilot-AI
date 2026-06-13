import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import FloatingCoach from "./components/FloatingCoach";

import Dashboard from "./pages/Dashboard";
import ATSAnalysis from "./pages/ATSAnalysis";
import SkillsIntelligence from "./pages/SkillsIntelligence";
import CareerRecommendations from "./pages/CareerRecommendations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import UploadResume from "./pages/UploadResume";
import LearningRoadmap from "./pages/LearningRoadmap";
import JDMatch from "./pages/JDMatch";
import History from "./pages/History";
import CareerCoach from "./pages/CareerCoach";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020617] flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/analysis"
              element={<ATSAnalysis />}
            />

            <Route
              path="/skills"
              element={<SkillsIntelligence />}
            />

            <Route
              path="/roles"
              element={<CareerRecommendations />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/coach"
              element={<CareerCoach />}
            />

            <Route
              path="/jd-match"
              element={<JDMatch />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/roadmap"
              element={<LearningRoadmap />}
            />

            <Route
              path="/upload"
              element={<UploadResume />}
            />

            <Route
              path="/history"
              element={<History />}
            />
          </Routes>
        </div>

        <FloatingCoach />
      </div>
    </BrowserRouter>
  );
}

export default App;