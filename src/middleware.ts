import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Don't redirect API routes, _next routes, static files, or specific pages
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname === '/example-tournament/register' ||
    request.nextUrl.pathname.startsWith('/registration/success') ||
    request.nextUrl.pathname.startsWith('/registration/cancelled')
  ) {
    return
  }

  const url = request.nextUrl.clone()
  url.pathname = '/example-tournament/register'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\.[^/]*$).*)'
  ]
}