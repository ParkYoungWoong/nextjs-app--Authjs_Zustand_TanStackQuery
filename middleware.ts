import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
import { getSession } from '@/serverActions/auth'

const matchersForAuth = ['/myaccount/:path*']

export async function middleware(request: NextRequest) {
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))
  }
  return NextResponse.next()
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}
