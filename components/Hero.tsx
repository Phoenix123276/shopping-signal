export default function Hero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-700 to-slate-900 p-10 text-white shadow-xl">

      <div className="max-w-3xl">

        <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
          🚀 AI Shopping Signal
        </div>

        <h2 className="mt-6 text-5xl font-extrabold leading-tight">
          오늘 어떤 콘텐츠를
          <br />
          올려야 할지
          <br />
          10초 안에 확인하세요.
        </h2>

        <p className="mt-6 text-lg leading-8 text-violet-100">
          뉴스, SNS, 시즌, 인기 상품, 리콜 정보를
          한 곳에서 분석하여
          오늘 가장 효과적인 콘텐츠를 추천합니다.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
            <div className="text-3xl font-bold">1,245</div>
            <div className="text-sm text-violet-100">
              수집된 쇼핑 키워드
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
            <div className="text-3xl font-bold">48</div>
            <div className="text-sm text-violet-100">
              오늘 급상승 상품
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-violet-100">
              콘텐츠 추천
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}