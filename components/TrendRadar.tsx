"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type TrendItem = {
  period: string;
  ratio: number;
};


type Trend = {
  title: string;
  data: TrendItem[];
};


type Props = {
  keyword?: string;
  onTrendUpdate?: (score: number) => void;
};



export default function TrendRadar({
  keyword = "",
  onTrendUpdate,
}: Props) {


  const [trends, setTrends] =
    useState<Trend[]>([]);


  const [loading, setLoading] =
    useState(false);



  useEffect(() => {


    const fetchTrend = async () => {


      setLoading(true);


      try {


        const res =
          await fetch(
            `/api/trending`
          );


        const data =
          await res.json();



        const results =
          data.results ?? [];



        setTrends(results);



        const latest =
          results?.[0]
            ?.data
            ?.slice(-1)?.[0]
            ?.ratio ?? 0;



        onTrendUpdate?.(
          Number(latest)
        );



      } catch(error) {


        console.error(
          "트렌드 불러오기 실패",
          error
        );


        setTrends([]);



      } finally {


        setLoading(false);


      }


    };



    fetchTrend();


  }, [keyword]);





  function getSignal(data: TrendItem[]) {


    const values =
      data.map(
        item => item.ratio
      );


    const current =
      values[values.length - 1] ?? 0;


    const average =
      values.reduce(
        (a,b)=>a+b,
        0
      )
      /
      values.length;



    if(
      current >= average * 1.1
    ) {

      return {
        text:
          "🔥 상승 관심 신호",
        color:
          "text-red-500",
      };

    }



    if(
      current >= average
    ) {

      return {
        text:
          "👀 관심 유지 중",
        color:
          "text-violet-600",
      };

    }



    return {

      text:
        "📉 관심 감소",

      color:
        "text-blue-500",

    };


  }







  return (

    <section className="mt-14">


      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


        <p className="text-sm font-bold tracking-widest text-violet-600">
          SHOPPING TREND
        </p>



        <h2 className="mt-2 text-3xl font-bold">
          📈 쇼핑 트렌드 레이더
        </h2>



        <p className="mt-2 text-slate-500">
          네이버 검색어 트렌드 기반 관심도 변화
        </p>





        {
          loading ? (


            <div className="mt-8 text-slate-500">
              트렌드 분석 중...
            </div>


          ) : (


            <div className="mt-8 space-y-6">


              {
                trends.map((trend)=>(


                  <div
                    key={trend.title}
                    className="rounded-2xl border border-slate-200 p-6"
                  >


                    {

                      (() => {


                        const values =
                          trend.data.map(
                            item =>
                              item.ratio
                          );


                        const current =
                          values[
                            values.length - 1
                          ] ?? 0;


                        const average =
                          values.reduce(
                            (a,b)=>a+b,
                            0
                          )
                          /
                          values.length;



                        const max =
                          Math.max(
                            ...values
                          );


                        const signal =
                          getSignal(
                            trend.data
                          );



                        return (

                          <>


                            <div className="flex items-center justify-between">


                              <h3 className="text-xl font-bold">
                                {trend.title}
                              </h3>


                              <span className="font-bold text-violet-600">
                                현재 {current.toFixed(0)}
                              </span>


                            </div>





                            <p className={`mt-2 font-bold ${signal.color}`}>
                              {signal.text}
                            </p>





                            <div className="mt-5 grid grid-cols-3 gap-3 text-center">


                              <div className="rounded-xl bg-slate-50 p-3">

                                <p className="text-xs text-slate-400">
                                  현재
                                </p>

                                <p className="font-bold">
                                  {current.toFixed(0)}
                                </p>

                              </div>




                              <div className="rounded-xl bg-slate-50 p-3">

                                <p className="text-xs text-slate-400">
                                  평균
                                </p>

                                <p className="font-bold">
                                  {average.toFixed(0)}
                                </p>

                              </div>





                              <div className="rounded-xl bg-slate-50 p-3">

                                <p className="text-xs text-slate-400">
                                  최고점
                                </p>

                                <p className="font-bold">
                                  {max.toFixed(0)}
                                </p>

                              </div>


                            </div>






                            <div className="mt-8 h-64">


                              <ResponsiveContainer
                                width="100%"
                                height="100%"
                              >


                                <LineChart
                                  data={trend.data}
                                >


                                  <CartesianGrid
                                    strokeDasharray="3 3"
                                  />


                                  <XAxis
                                    dataKey="period"
                                    hide
                                  />


                                  <YAxis
                                    domain={[0,100]}
                                  />


                                  <Tooltip />


                                  <Line
                                    type="monotone"
                                    dataKey="ratio"
                                    strokeWidth={3}
                                  />


                                </LineChart>


                              </ResponsiveContainer>


                            </div>



                          </>

                        );


                      })()

                    }



                  </div>


                ))
              }


            </div>


          )

        }



      </div>


    </section>

  );

}