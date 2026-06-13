import { useState } from "react";
import axios from "axios";

function UploadForm({ setAnalysis }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("resume", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setAnalysis(response.data.analysis);
    const existingHistory =
      JSON.parse(
        localStorage.getItem("analysisHistory")
      ) || [];

    const newEntry = {
      fileName: file.name,
      atsScore: response.data.analysis.atsScore,
      jobReadiness:
        response.data.analysis.jobReadiness,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "analysisHistory",
      JSON.stringify([
        newEntry,
        ...existingHistory,
      ])
    );

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Upload Resume"}
      </button>
    </div>
  );
}

export default UploadForm;
