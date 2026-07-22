import { NextResponse } from "next/server";


export async function GET() {

  try {

    const response = await fetch(
      "https://naverapihub.apigw.ntruss.com/search-trend/v1/search",
      {
        method: "POST",

        headers: {

          "X-NCP-APIGW-API-KEY-ID":
            process.env.NAVER_CLIENT_ID ?? "",

          "X-NCP-APIGW-API-KEY":
            process.env.NAVER_CLIENT_SECRET ?? "",

          "Content-Type":
            "application/json",

        },


        body: JSON.stringify({

          startDate:
            "2026-07-01",

          endDate:
            "2026-07-23",

          timeUnit:
            "date",


          keywordGroups: [

            {
              groupName:
                "선풍기",

              keywords:[
                "선풍기"
              ],
            },


            {
              groupName:
                "냉감이불",

              keywords:[
                "냉감이불"
              ],
            },


            {
              groupName:
                "제로음료",

              keywords:[
                "제로음료"
              ],
            },


            {
              groupName:
                "캐리어",

              keywords:[
                "캐리어"
              ],
            },


            {
              groupName:
                "제습기",

              keywords:[
                "제습기"
              ],
            },

          ],


        }),

      }
    );



    const data =
      await response.json();



    console.log(
      "SEARCH TREND RESULT",
      data
    );



    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );


  } catch(error) {


    console.error(
      "검색어 트렌드 실패",
      error
    );


    return NextResponse.json(
      {
        error:
          "검색어 트렌드 실패"
      },
      {
        status:500,
      }
    );


  }

}