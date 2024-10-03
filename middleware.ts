import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
// import { getSession } from '@/serverActions/auth'
import { authorizeUser } from '@/serverActions/user'

const matchersForAuth = ['/myaccount/:path', '/users/:path']
const matchersForSignIn = ['/signup/:path', '/signin/:path']

export async function middleware(request: NextRequest) {
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await authorizeUser()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))
  }
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await authorizeUser()) // 세션 정보 확인
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }
  return NextResponse.next()
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}
