
import { getApiBaseUrl } from "@/shared/utils/resolverUrl"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  const baseUrl = await getApiBaseUrl()
  return NextResponse.json({ url: baseUrl })
}