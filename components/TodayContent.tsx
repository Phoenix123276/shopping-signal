const contents = [
  {
    title: "냉감이불 특가 모음",
    reason: "폭염으로 검색량이 크게 증가했습니다.",
    level: "★★★★★",
    color: "bg-red-500",
  },
  {
    title: "제로음료 인기순위",
    reason: "SNS 언급량이 증가하고 있습니다.",
    level: "★★★★☆",
    color: "bg-orange-500",
  },
  {
    title: "여행용 캐리어 추천",
    reason: "여름 휴가 시즌 수요 증가",
    level: "★★★★☆",
    color: "bg-sky-500",
  },
  {
    title: "개학 준비 필수템",
    reason: "8월 시즌 키워드",
    level: "★★★☆☆",
    color: "bg-emerald-500",
  },
];

export default function TodayContent() {
  return (
    <section className="mt-10">

      <div className="mb-6">
        <p className="text-sm font-bold tracking-widest text-violet-600">
          TODAY CONTENT
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          🔥 오늘 추천 콘텐츠
        </h2>

        <p className="mt-2 text-slate-500">
          오늘 올리면 반응이 좋을 가능성이 높은 콘텐츠입니다.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {contents.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >

            <div className={`h-2 rounded-full ${item.color}`} />

            <h3 className="mt-5 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.reason}
            </p>

            <div className="mt-6 flex items-center justify-between">

              <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
                추천
              </span>

              <span className="font-bold text-amber-500">
                {item.level}
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}