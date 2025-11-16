import { useEffect, useState } from "react";
import Header from "../components/common/Header";

function Tracker() {
  const [complete, setComplete] = useState(0);
  const [isTaken, setIstaken] = useState(true);

  useEffect(() => {
    setComplete(2);
  }, []);

  return (
    <>
      <Header />
      <main className="bg-[var(--default-bg)] px-3 py-10">
        <div className="flex flex-col gap-4 mb-10">
          <p className="font-bold text-xl md:text-3xl">영양제 복용 알리미</p>
          <p className="text-gray-500 text-xs md:text-lg">
            {new Date().toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg py-5 px-3 border border-blue-200">
          <div className="flex justify-between items-end">
            <span className="font-bold">오늘의 복용 현황</span>
            <div className="flex items-center gap-2">
              <span className="text-[50px] font-bold">
                {Math.round((complete * 100) / 7)}%
              </span>
              <span>완료</span>
            </div>
          </div>

          <div className="bg-blue-200 w-full h-3 rounded-2xl mt-3">
            <div
              className="transition-all duration-500 ease-in-out h-full bg-blue-500 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: `${(complete * 100) / 7}%` }}
            />
          </div>
        </div>

        <div className="border px-3 py-4 rounded-lg mt-5 bg-white">
          <div className="flex flex-col gap-1 text-start">
            <span className="font-bold text-2xl">오메가-3</span>
            <span>1일 1회</span>
          </div>

          <div className="p-2 border rounded-lg mt-4 flex items-center gap-5 relative ">
            {isTaken ? (
              <div
                className="text-[green] font-bold rounded-full border-3 border-[green] flex items-center justify-center size-8 text-lg"
                onClick={() => setIstaken(false)}
              >
                V
              </div>
            ) : (
              <div
                className="rounded-full border-3 border-gray-700 size-8"
                onClick={() => setIstaken(true)}
              />
            )}
            <div>09:00</div>
            {isTaken && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-3xl absolute right-2">
                완료
              </span>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Tracker;
