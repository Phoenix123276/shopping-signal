"use client";


type Props = {
  onKeywordClick: (keyword: string) => void;
};



const seasons = [

  {
    month: 7,

    title: "☀️ 여름 휴가 시즌",

    keywords: [
      "캐리어",
      "여행용품",
      "냉감이불",
      "선풍기",
    ],

    reason:
      "폭염과 휴가 시즌 영향으로 여름 상품 수요 증가",
  },


  {
    month: 8,

    title: "🎒 개학 준비 시즌",

    keywords: [
      "학생가방",
      "문구",
      "노트북",
      "학용품",
    ],

    reason:
      "신학기 준비 상품 검색 증가",
  },


  {
    month: 9,

    title: "🍂 가을 준비 시즌",

    keywords: [
      "가을패션",
      "자켓",
      "캠핑",
      "등산",
    ],

    reason:
      "계절 변화에 따른 관심 증가",
  },

];





export default function SeasonRadar({

  onKeywordClick,

}: Props) {



  const month =
    new Date().getMonth() + 1;



  const currentSeason =
    seasons.find(
      (item) =>
        item.month === month
    )
    ??
    seasons[0];





  return (

    <section className="mt-14">


      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


        <p className="text-sm font-bold tracking-widest text-violet-600">
          SEASON SIGNAL
        </p>



        <h2 className="mt-2 text-3xl font-bold">
          📅 시즌 쇼핑 캘린더
        </h2>



        <p className="mt-2 text-slate-500">
          시즌별 콘텐츠 제작 추천
        </p>





        <div className="mt-6 rounded-2xl bg-violet-50 p-5">


          <h3 className="text-2xl font-bold text-violet-700">
            {currentSeason.title}
          </h3>


          <p className="mt-3 text-slate-600">
            {currentSeason.reason}
          </p>


        </div>





        <div className="mt-6">


          <h4 className="font-bold">
            추천 키워드
          </h4>




          <div className="mt-3 flex flex-wrap gap-3">


            {
              currentSeason.keywords.map(
                (keyword) => (


                  <button

                    key={keyword}

                    onClick={() =>
                      onKeywordClick(keyword)
                    }


                    className="rounded-full bg-slate-100 px-4 py-2 font-semibold transition hover:bg-violet-100"

                  >

                    {keyword}

                  </button>


                )
              )
            }



          </div>


        </div>



      </div>


    </section>

  );

}