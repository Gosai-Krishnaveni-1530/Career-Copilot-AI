function QuickInsights() {
  const insights = [
    {
      priority: "HIGH",
      text: "Add AWS or Azure cloud experience",
      points: "+6 pts",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    {
      priority: "HIGH",
      text: "Include CI/CD pipeline projects",
      points: "+5 pts",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    {
      priority: "MED",
      text: "Add quantified project metrics",
      points: "+4 pts",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    {
      priority: "LOW",
      text: "Include portfolio website link",
      points: "+2 pts",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
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
        Quick Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="
              flex
              justify-between
              items-center
              border-b
              border-slate-800
              pb-4
            "
          >
            <div className="flex items-center gap-3">
              <span
                className={`
                  px-2 py-1
                  text-xs
                  rounded-md
                  border
                  ${item.color}
                `}
              >
                {item.priority}
              </span>

              <p className="text-slate-300">
                {item.text}
              </p>
            </div>

            <span className="text-cyan-400 font-semibold">
              {item.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickInsights;
