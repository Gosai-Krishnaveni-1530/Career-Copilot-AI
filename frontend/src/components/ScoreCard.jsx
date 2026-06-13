function ScoreCard({ score }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold">
        ATS Score
      </h2>

      <p className="text-5xl mt-4">
        {score}
      </p>
    </div>
  );
}

export default ScoreCard;
