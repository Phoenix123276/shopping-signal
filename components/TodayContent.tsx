"use client";


type Props = {
  keyword: string;
};



export default function TodayContent({

  keyword,

}: Props) {


  const product =
    keyword || "오늘 인기 상품";



  const contents = [

    {
      title: `${product} 특가 모음`,
      desc:
        "최근 검색량 증가로 관심이 높아지고 있습니다.",
      score:
        "★★★★★",
    },


    {
      title: `${product} 인기순위 분석`,
      desc:
        "SNS와 뉴스 언급량이 증가하고 있습니다.",
      score:
        "★★★★☆",
    },


    {
      title: `${product} 추천 가이드`,
      desc:
        "현재 시즌 수요가 증가하는 상품입니다.",
      score:
        "★★★★☆",
    },

  ];





  return (

    <section className="mt-8">


      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


        <p className="text-sm font-bold tracking-widest text-violet-600">
          TODAY CONTENT
        </p>



        <h2 className="mt-2 text-3xl font-bold">
          🔥 오늘 추천 콘텐츠
        </h2>



        <p className="mt-2 text-slate-500">
          오늘 올리면 반응이 좋을 가능성이 높은 콘텐츠입니다.
        </p>




        <div className="mt-6 space-y-4">


          {contents.map((item)=>(


            <div

              key={item.title}

              className="rounded-2xl border border-slate-200 p-5"

            >


              <h3 className="text-xl font-bold">
                {item.title}
              </h3>



              <p className="mt-2 text-slate-500">
                {item.desc}
              </p>



              <p className="mt-3 font-bold text-violet-600">
                추천 {item.score}
              </p>


            </div>


          ))}



        </div>



      </div>


    </section>

  );

}