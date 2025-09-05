import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://stocksapi-qp3k.onrender.com", { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data);
}

