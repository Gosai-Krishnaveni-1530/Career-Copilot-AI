function AnalysisCard({
  title,
  items
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold mb-3">
        {title}
      </h2>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;
