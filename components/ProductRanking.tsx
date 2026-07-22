"use client";

type Props = {
  keyword: string;
};


const productData: Record<
  string,
  {
    name: string;
    price: string;
    reason: string;
  }[]
> = {

  선풍기: [

    {
      name: "BLDC 무소음 선풍기",
      price: "59,000원",
      reason: "🔥 여름 시즌 인기 상승",
    },

    {
      name: "휴대용 미니 선풍기",
      price: "19,900원",
      reason: "📈 검색량 증가",
    },

    {
      name: "무선 선풍기",
      price: "39,900원",
      reason: "☀️ 캠핑·여행 수요 증가",
    },

  ],


  냉감이불: [

    {
      name: "쿨링 냉감이불",
      price: "49,900원",
      reason: "🔥 폭염 시즌 인기",
    },

    {
      name: "아이스 냉감패드",
      price: "29,900원",
      reason: "📈 여름 검색 증가",
    },

  ],


};



export default function ProductRanking({
  keyword,
}: Props) {


  const products =
    productData[keyword] ??
    [

      {
        name: `${keyword} 인기 상품`,
        price: "가격 정보 준비중",
        reason: "📊 쇼핑 트렌드 기반 추천",
      },

      {
        name: `${keyword} 추천 제품`,
        price: "가격 정보 준비중",
        reason: "🔥 콘텐츠 제작 후보",
      },

      {
        name: `${keyword} 베스트 상품`,
        price: "가격 정보 준비중",
        reason: "📈 관심 증가 상품",
      },

    ];





  return (

    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">


      <div>

        <p className="text-sm font-bold tracking-widest text-violet-600">
          PRODUCT SIGNAL
        </p>


        <h2 className="mt-2 text-2xl font-bold">
          🛒 인기 상품 분석
        </h2>


        <p className="mt-2 text-slate-500">
          {keyword} 관련 콘텐츠 제작 추천 상품
        </p>


      </div>





      <div className="mt-6 space-y-4">


        {products.map(
          (product, index) => (


            <div

              key={product.name}

              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"

            >


              <div className="flex items-center justify-between">


                <h3 className="font-bold">

                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}

                  {product.name}

                </h3>



                <span className="font-bold text-violet-700">

                  {product.price}

                </span>



              </div>



              <p className="mt-2 text-sm text-slate-500">

                {product.reason}

              </p>



            </div>


          )

        )}



      </div>



    </section>

  );

}