import Header from "../components/common/header";

function HistoryPage() {
  const renderHistory = () =>
    [1, 2, 3, 4].map(() => (
      <div
        className="border border-[#EB757B] rounded-3xl py-3"
        onClick={handleHistory}
      >
        2021.12.21
      </div>
    ));

  const handleHistory = () => {};
  return (
    <>
      <Header />

      <main className="px-3">
        <p className="text-start font-bold text-xl py-10">
          조회할 기록을 선택하세요
        </p>
        <div className="flex flex-col gap-4">{renderHistory()}</div>
      </main>
    </>
  );
}

export default HistoryPage;
