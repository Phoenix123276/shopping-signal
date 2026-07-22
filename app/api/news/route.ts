import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "검색어가 없습니다." },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://naverapihub.apigw.ntruss.com/search/v1/news?query=${encodeURIComponent(
      query
    )}&display=10&sort=sim`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID ?? "",
        "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET ?? "",
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}