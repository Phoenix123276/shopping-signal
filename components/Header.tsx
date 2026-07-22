"use client";

type HeaderProps = {
  onRefresh?: () => void;
  isLoading?: boolean;
};

export default function Header({
  onRefresh,
  isLoading = false,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-violet-600">
            SHOPPING SIGNAL
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            쇼핑 콘텐츠 대시보드
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            오늘 어떤 콘텐츠를 올릴지 한눈에 확인하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-100 transition"
          >
            대시보드
          </button>

          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-100 transition"
          >
            트렌드
          </button>

          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-100 transition"
          >
            뉴스
          </button>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700 transition disabled:bg-slate-400"
          >
            {isLoading ? "불러오는 중..." : "새 이슈 탐색"}
          </button>

        </div>

      </div>
    </header>
  );
}