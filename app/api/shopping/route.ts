import { NextResponse } from "next/server";


function getCategory(keyword: string) {

  const word = keyword.toLowerCase();


  if (
    word.includes("선풍기") ||
    word.includes("에어컨") ||
    word.includes("냉장고") ||
    word.includes("노트북") ||
    word.includes("아이폰") ||
    word.includes("컴퓨터")
  ) {
    return {
      name: "디지털",
      param: ["50000003"],
    };
  }


  if (
    word.includes("화장품") ||
    word.includes("선크림") ||
    word.includes("샴푸") ||
    word.includes("뷰티")
  ) {
    return {
      name: "화장품/미용",
      param: ["50000002"],
    };
  }


  if (
    word.includes("옷") ||
    word.includes("반팔") ||
    word.includes("신발") ||
    word.includes("샌들")
  ) {
    return {
      name: "패션의류",
      param: ["50000000"],
    };
  }


  if (
    word.includes("음식") ||
    word.includes("커피") ||
    word.includes("음료") ||
    word.includes("간식")
  ) {
    return {
      name: "식품",
      param: ["50000006"],
    };
  }


  // 기본값
  return {
    name: "디지털",
    param: ["50000003"],
  };
}



export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  const keyword =
    searchParams.get("keyword") || "쇼핑";


  const category = getCategory(keyword);



  const response = await fetch(
    "https://naverapihub.apigw.ntruss.com/shopping/v1/categories",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "X-NCP-APIGW-API-KEY-ID":
          process.env.NAVER_CLIENT_ID ?? "",

        "X-NCP-APIGW-API-KEY":
          process.env.NAVER_CLIENT_SECRET ?? "",
      },


      body: JSON.stringify({

        startDate: "2026-07-01",

        endDate: "2026-07-23",

        timeUnit: "date",


        category: [
          category
        ],


        device: "",

        gender: "",

        ages: [],

      }),
    }
  );


  const data = await response.json();


  return NextResponse.json(data, {
    status: response.status,
  });

}