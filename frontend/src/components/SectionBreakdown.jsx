function SectionBreakdown() {
  const sections = [
    {
      name: "Projects",
      score: 28,
      total: 30,
      width: "93%",
    },
    {
      name: "Technical Skills",
      score: 24,
      total: 25,
      width: "96%",
    },
    {
      name: "Experience",
      score: 18,
      total: 20,
      width: "90%",
    },
    {
      name: "Education",
      score: 16,
      total: 20,
      width: "80%",
    },
    {
      name: "Keywords Match",
      score: 12,
      total: 15,
      width: "80%",
    },
  ];

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
        ATS Score Breakdown
      </h2>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">
                {section.name}
              </span>

              <span className="text-cyan-400">
                {section.score}/{section.total}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full">
              <div
                className="
                  h-3
                  bg-cyan-400
                  rounded-full
                  shadow-[0_0_10px_rgba(0,245,212,0.5)]
                "
                style={{
                  width: section.width,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionBreakdown;

