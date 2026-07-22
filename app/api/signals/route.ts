import { NextResponse } from "next/server";

type Issue = {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  summary: string;
};

export const dynamic = "force-dynamic";

const fallbackIssues: Issue[] = [
  {
    title: "외부 뉴스 피드를 일시적으로 불러오지 못했습니다",
    source: "Shopping Signal",
    url: "#",
    publishedAt: "방금",
    category: "전체",
    summary: "네트워크 연결을 확인한 뒤 ‘새 이슈 탐색’을 다시 눌러 주세요. 이 기능은 무료 공개 뉴스 RSS를 사용합니다.",
  },
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function tag(item: string, name: string) {
  const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`));
  return match ? decodeHtml(match[1]) : "";
}

function categoryFor(title: string) {
  const text = title.toLowerCase();
  if (/리콜|회수|유해|안전|판매.?중지/.test(text)) return "안전";
  if (/패션|의류|옷|신발|가방|뷰티|화장품/.test(text)) return "패션";
  if (/식품|음료|간식|식당|먹거리/.test(text)) return "식품";
  if (/가전|디지털|스마트폰|전자|it/.test(text)) return "디지털";
  return "리빙";
}

function relativeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "최근";
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes || 1}분 전`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
  return `${Math.floor(minutes / 1440)}일 전`;
}

export async function GET() {
  const query = "쇼핑 트렌드 OR 패션 유행 OR 상품 리콜 OR 신상품";
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;

  try {
    const response = await fetch(rssUrl, {
      headers: { "User-Agent": "ShoppingSignal/0.1" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("RSS request failed");
    const xml = await response.text();
    const issues = xml.match(/<item>[\s\S]*?<\/item>/g)?.slice(0, 8).map((item) => {
      const title = tag(item, "title").replace(/\s+-\s+[^-]+$/, "");
      const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/);
      const source = sourceMatch ? decodeHtml(sourceMatch[1]) : "뉴스";
      const publishedAt = tag(item, "pubDate");

      return {
        title,
        source,
        url: tag(item, "link"),
        publishedAt: relativeTime(publishedAt),
        category: categoryFor(title),
        summary: "외부 뉴스에서 발견된 쇼핑 관련 이슈입니다. 원문을 열어 맥락과 실제 상품 연관성을 확인해 주세요.",
      };
    });

    if (!issues?.length) throw new Error("No RSS items");

    return NextResponse.json({
      issues,
      fetchedAt: new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date()),
      note: "무료 공개 뉴스 RSS에서 최신 이슈를 수집했습니다. 원문을 열어 사실관계를 확인하세요.",
    });
  } catch {
    return NextResponse.json({
      issues: fallbackIssues,
      fetchedAt: new Intl.DateTimeFormat("ko-KR", { timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date()),
      note: "외부 RSS를 불러오지 못해 안내 메시지를 표시합니다.",
    });
  }
}
