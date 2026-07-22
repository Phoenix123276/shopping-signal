"use client";

import { useEffect, useState } from "react";


type Props = {
  onKeywordClick: (keyword: string) => void;
};


type Keyword = {
  rank: number;
  keyword: string;
  change: string;
};



export default function HotKeywords({
  onKeywordClick,
}: Props) {


  const [keywords, setKeywords] =
    useState<Keyword[]>([]);


  const [loading, setLoading] =
    useState(true);




  useEffect(() => {


    const fetchKeywords = async () => {


      try {


        const res =
          await fetch(
            "/api/trending"
          );


        const data =
          await res.json();



        const results =
          data.results ?? [];





        const converted =
          results.map(
            (
              item:any,
              index:number
            ) => {



              const list =
                item.data ??
                item.데이터 ??
                [];



              const values =
                list.map(
                  (v:any)=>
                    v.ratio ??
                    v.비율 ??
                    0
                );



              const latest =
                values[
                  values.length - 1
                ] ?? 0;



              const previous =
                values[
                  values.length - 2
                ] ?? latest;




              const change =
                previous === 0
                  ? 0
                  :
                    ((latest - previous)
                    /
                    previous)
                    * 100;




              return {

                rank:
                  index + 1,


                keyword:
                  item.title,


                change:

                  change >= 0

                  ? `▲${change.toFixed(1)}%`

                  : `▼${Math.abs(change).toFixed(1)}%`

              };


            }
          );



        setKeywords(
          converted
        );



      } catch(error) {


        console.error(
          "키워드 조회 실패",
          error
        );


        setKeywords([]);


      } finally {


        setLoading(false);


      }


    };



    fetchKeywords();


  }, []);






  return (

    <section className="mt-14">


      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


        <p className="text-sm font-bold tracking-widest text-violet-600">
          HOT KEYWORDS
        </p>



        <h2 className="mt-2 text-3xl font-bold">
          🔥 급상승 쇼핑 키워드
        </h2>



        <p className="mt-2 text-slate-500">
          네이버 검색어 트렌드 기반
        </p>





        {
          loading ? (


            <div className="mt-8 text-slate-500">
              키워드 분석 중...
            </div>



          ) : (


            <div className="mt-8 grid gap-3 md:grid-cols-2">


              {keywords.map((item)=>(


                <button

                  key={item.keyword}

                  onClick={() =>
                    onKeywordClick(
                      item.keyword
                    )
                  }


                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-violet-50"

                >


                  <div className="flex items-center gap-4">


                    <span className="font-bold text-violet-600">
                      {item.rank}
                    </span>


                    <span className="font-semibold">
                      {item.keyword}
                    </span>


                  </div>




                  <span
                    className={
                      item.change.startsWith("▲")
                      ? "font-bold text-red-500"
                      : "font-bold text-blue-500"
                    }
                  >
                    {item.change}
                  </span>



                </button>


              ))}



            </div>


          )

        }



      </div>


    </section>

  );

}