"use client";


type Props = {

  keyword: string;

  issues: {

    title: string;

    summary: string;

  }[];

  trendScore?: number;

};





export default function AiRecommendation({

  keyword,

  issues,

  trendScore = 0,

}: Props) {



  const product =
    keyword.trim() || "쇼핑 트렌드";



  const newsCount =
    issues.length;



  const score =
    Number(trendScore) || 0;





  let signal =
    "📉 아직 초기 관심 단계";



  let reasons:string[] = [];





  if(score >= 70) {


    signal =
      "🔥 지금 콘텐츠 제작 추천";



    reasons = [

      `📈 현재 쇼핑 관심도 ${score.toFixed(0)}점`,

      `📰 관련 뉴스 ${newsCount}개 확인`,

      "🚀 검색 관심이 높은 상태",

    ];



  } else if(score >= 40) {



    signal =
      "👀 관심 증가 관찰 단계";



    reasons = [

      `📊 현재 관심도 ${score.toFixed(0)}점`,

      `📰 관련 뉴스 ${newsCount}개 확인`,

      "📌 추가 상승 여부 확인 필요",

    ];



  } else {



    signal =
      "📉 아직 초기 관심 단계";



    reasons = [

      `📊 현재 관심도 ${score.toFixed(0)}점`,

      `📰 뉴스 ${newsCount}개 확인`,

      "🔍 지속적인 데이터 확인 필요",

    ];


  }






  const titles = [

    `${product} 인기 상승 이유 분석`,

    `${product} 지금 구매해야 하는 이유`,

    `${product} 추천 상품 TOP5 정리`,

    `${product} 비교 리뷰 콘텐츠 만들기`,

  ];







  return (

    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">



      <div className="flex items-center gap-2">


        <span className="text-2xl">
          🤖
        </span>


        <div>

          <h2 className="text-xl font-bold">
            AI 추천
          </h2>


          <p className="text-sm text-slate-500">
            뉴스 + 트렌드 기반 콘텐츠 분석
          </p>


        </div>


      </div>







      <div className="mt-6 rounded-2xl bg-violet-50 p-5">



        <p className="text-sm text-slate-500">
          현재 분석 키워드
        </p>




        <h3 className="mt-1 text-3xl font-bold text-violet-700">
          {product}
        </h3>




        <p className="mt-3 text-lg font-bold">
          {signal}
        </p>






        <div className="mt-5 space-y-2 text-sm">


          {
            reasons.map(
              (reason)=>(
                <div key={reason}>
                  {reason}
                </div>
              )
            )
          }


        </div>



      </div>








      <div className="mt-6">


        <h4 className="font-bold">
          추천 콘텐츠 제목
        </h4>



        <div className="mt-3 space-y-2">


          {
            titles.map(
              (title)=>(
                
                <div

                  key={title}

                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"

                >

                  {title}

                </div>

              )
            )
          }


        </div>



      </div>








      <div className="mt-6 flex gap-3">


        <button

          onClick={() =>
            alert(
              `${product} 제목 생성 예정`
            )
          }

          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"

        >

          ✨ 제목 생성

        </button>





        <button

          onClick={() =>
            alert(
              `${product} 본문 생성 예정`
            )
          }

          className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"

        >

          📝 본문 생성

        </button>



      </div>




    </section>

  );

}