"use client";

export type Issue = {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  summary: string;
  impact?: string;
};


const categories = [
  "전체",
  "패션",
  "뷰티",
  "식품",
  "리빙",
  "디지털",
  "안전",
];


function badgeStyle(category: string) {
  if (category === "안전")
    return "bg-red-100 text-red-700";

  if (category === "패션")
    return "bg-violet-100 text-violet-700";

  if (category === "식품")
    return "bg-emerald-100 text-emerald-700";

  if (category === "디지털")
    return "bg-sky-100 text-sky-700";

  return "bg-amber-100 text-amber-700";
}


type Props = {
  issues: Issue[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  message: string;
};


export default function NewsFeed({
  issues,
  selectedCategory,
  setSelectedCategory,
  message,
}: Props) {


  const filtered =
    selectedCategory === "전체"
      ? issues
      : issues.filter(
          (item) =>
            item.category === selectedCategory
        );


  return (
    <section className="mt-14">


      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">


        <div>

          <p className="text-sm font-bold tracking-widest text-violet-600">
            SHOPPING NEWS
          </p>


          <h2 className="mt-2 text-3xl font-bold">
            📰 실시간 쇼핑 뉴스
          </h2>


          <p className="mt-2 text-slate-500">
            {message}
          </p>


        </div>



        <div className="flex flex-wrap gap-2">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-white ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>

          ))}

        </div>


      </div>



      <div className="mt-8 grid gap-5 lg:grid-cols-2">


        {filtered.map((issue) => (

          <article
            key={issue.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
          >


            <div className="flex items-center justify-between">


              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${badgeStyle(
                  issue.category
                )}`}
              >
                {issue.category}
              </span>


              <span className="text-sm text-slate-400">
                {issue.publishedAt}
              </span>


            </div>



            <h3 className="mt-5 text-xl font-bold leading-8">
              {issue.title}
            </h3>



            <p className="mt-3 text-slate-600 leading-7">
              {issue.summary}
            </p>



            {issue.impact && (

              <div className="mt-5 rounded-xl bg-violet-50 p-4">

                <p className="text-sm font-bold text-violet-700">
                  🔥 쇼핑 영향 분석
                </p>


                <p className="mt-2 text-sm text-slate-700">
                  {issue.impact}
                </p>


              </div>

            )}



            {issue.url !== "#" && (

              <a
                href={issue.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block font-bold text-violet-700"
              >
                기사 보기 →
              </a>

            )}


          </article>

        ))}


      </div>


    </section>
  );
}