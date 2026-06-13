import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("analysisHistory")
      ) || [];

    setHistory(saved);
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Analysis History
        </h1>

        <p className="text-slate-400 mt-2">
          Previously analyzed resumes.
        </p>
      </div>

      {history.length === 0 ? (
        <div
          className="
            bg-[#071426]
            border
            border-cyan-900
            rounded-2xl
            p-8
            text-slate-400
          "
        >
          No analysis history found.
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((item, index) => (
            <div
              key={index}
              className="
                bg-[#071426]
                border
                border-cyan-900
                rounded-2xl
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h3 className="text-white font-semibold">
                  {item.fileName}
                </h3>

                <p className="text-slate-400 text-sm">
                  {item.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-cyan-400 text-2xl font-bold">
                  {item.atsScore}
                </p>

                <p className="text-green-400">
                  {item.jobReadiness}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default History;
