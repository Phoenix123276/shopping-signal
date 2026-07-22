"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import TodayContent from "@/components/TodayContent";
import HotKeywords from "@/components/HotKeywords";
import TrendRadar from "@/components/TrendRadar";
import SeasonRadar from "@/components/SeasonRadar";
import ProductRanking from "@/components/ProductRanking";
import NewsFeed, { Issue } from "@/components/NewsFeed";
import AiRecommendation from "@/components/AiRecommendation";


export default function Home() {


  const [input, setInput] = useState("");

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);


  const [issues, setIssues] = useState<Issue[]>([]);


  const [trendScore, setTrendScore] = useState(0);


  const [selectedCategory, setSelectedCategory] =
    useState("전체");


  const [message] = useState(
    "실시간 쇼핑 뉴스 기반 콘텐츠 추천"
  );




  const handleSearch = async (
    search = input.trim()
  ) => {


    if (!search) return;


    setLoading(true);



    try {


      const res = await fetch(
        `/api/news?query=${encodeURIComponent(search)}`
      );



      const data = await res.json();



      const news: Issue[] =
        (data.items ?? []).map(
          (item:any)=>({

            title:
              item.title?.replace(
                /<[^>]*>/g,
                ""
              ) ?? "",


            source:
              "NAVER",


            url:
              item.link ?? "#",


            publishedAt:
              item.pubDate ?? "",


            category:
              "뉴스",


            summary:
              item.description?.replace(
                /<[^>]*>/g,
                ""
              ) ?? "",

          })
        );



      setIssues(news);

      setKeyword(search);



    } catch(error) {


      console.error(
        "뉴스 검색 실패",
        error
      );


      setIssues([]);


    } finally {


      setLoading(false);


    }


  };





  useEffect(()=>{


    setInput("쇼핑");

    handleSearch("쇼핑");


  }, []);








  return (

    <div className="min-h-screen bg-slate-100">


      <Header />



      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">


        <Sidebar />



        <main className="flex-1 space-y-6">


          <Hero />




          <SearchBar

            input={input}

            setInput={setInput}

            onSearch={handleSearch}

          />






          {
            loading ? (


              <section className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">


                <div className="text-6xl animate-pulse">
                  🔍
                </div>


                <h2 className="mt-6 text-2xl font-bold">
                  AI가 검색 중입니다...
                </h2>


                <p className="mt-3 text-slate-500">
                  뉴스와 쇼핑 트렌드를 분석하는 중입니다.
                </p>


              </section>



            ) : (


              <>


                <TodayContent
                  keyword={keyword}
                />





                <HotKeywords

                  onKeywordClick={(value)=>{

                    setInput(value);

                    handleSearch(value);

                  }}

                />







                <TrendRadar

                  keyword={keyword}

                  onTrendUpdate={
                    setTrendScore
                  }

                />








                <SeasonRadar

                  onKeywordClick={(value)=>{

                    setInput(value);

                    handleSearch(value);

                  }}

                />








                <ProductRanking

                  keyword={keyword}

                />








                <NewsFeed

                  issues={issues}

                  selectedCategory={
                    selectedCategory
                  }

                  setSelectedCategory={
                    setSelectedCategory
                  }

                  message={message}

                />








                <AiRecommendation

                  keyword={keyword}

                  issues={issues}

                  trendScore={trendScore}

                />





              </>


            )

          }



        </main>



      </div>



    </div>

  );

}