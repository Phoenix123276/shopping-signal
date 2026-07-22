"use client";

type SearchBarProps = {
  input: string;
  setInput: (value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  input,
  setInput,
  onSearch,
}: SearchBarProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold tracking-widest text-violet-600">
        SEARCH
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        🔍 상품 키워드 검색
      </h2>

      <p className="mt-2 text-slate-500">
        검색하면 뉴스, AI 추천, 시즌 키워드까지 연결됩니다.
      </p>

      <div className="mt-6 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="예) 선풍기, 제로음료, 아이폰..."
          className="flex-1 rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-violet-500"
        />

        <button
          onClick={onSearch}
          className="rounded-2xl bg-violet-600 px-6 font-bold text-white transition hover:bg-violet-700"
        >
          검색
        </button>
      </div>
    </section>
  );
}