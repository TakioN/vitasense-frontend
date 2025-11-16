function ScoreForIndex({ imageSrc, name, value }) {
  const barColor = () => {
    if (value >= 90) return "green";
    else if (value >= 80) return "yellow";
    else if (value >= 70) return "orange";
    else return "red";
  };

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center relative mb-5">
        <div className="rounded-full border aspect-square size-10 flex items-center justify-center mr-3 md:mr-10">
          <img src={imageSrc} className="" />
        </div>

        <span className="font-bold">{name}</span>
        <span className="font-bold text-3xl absolute right-0">{value}</span>
      </div>

      <div className="bg-gray-300 h-3 rounded-md w-full">
        <div
          className="h-full rounded-md"
          style={{ width: `${value}%`, backgroundColor: barColor() }}
        />
      </div>
    </div>
  );
}

export default ScoreForIndex;
