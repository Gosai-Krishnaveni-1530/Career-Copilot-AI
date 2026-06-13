function StatsGrid() {
  const stats = [
    {
      value: "7/10",
      label: "Keywords",
      subLabel: "matched",
      color: "text-cyan-400",
    },
    {
      value: "5/5",
      label: "Sections",
      subLabel: "complete",
      color: "text-purple-400",
    },
    {
      value: "82nd",
      label: "Percentile",
      subLabel: "vs pool",
      color: "text-blue-400",
    },
    {
      value: "94%",
      label: "Pass",
      subLabel: "probability",
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            bg-[#071426]
            border
            border-cyan-900
            rounded-xl
            p-4
            shadow-[0_0_12px_rgba(0,245,212,0.05)]
          "
        >
          <h2 className={`text-3xl font-bold ${stat.color}`}>
            {stat.value}
          </h2>

          <p className="text-slate-300 text-sm mt-2">
            {stat.label}
          </p>

          <p className="text-slate-500 text-xs">
            {stat.subLabel}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;
