"use client";

const menus = [
  { icon: "🏠", title: "대시보드" },
  { icon: "🤖", title: "AI 추천" },
  { icon: "🔥", title: "트렌드" },
  { icon: "📰", title: "뉴스" },
  { icon: "📅", title: "시즌" },
  { icon: "⚠️", title: "리콜" },
  { icon: "⚙️", title: "설정" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-6 h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold tracking-[0.3em] text-violet-600">
        SHOPPING
      </p>

      <h2 className="mt-1 text-xl font-bold">
        Signal
      </h2>

      <nav className="mt-8 space-y-2">
        {menus.map((menu) => (
          <button
            key={menu.title}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-violet-50 hover:text-violet-700"
          >
            <span>{menu.icon}</span>
            <span className="font-semibold">
              {menu.title}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}