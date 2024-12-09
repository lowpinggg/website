import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const tempRedirectPath = '/example-tournament/register'

export function middleware(request: NextRequest) {
  // Don't redirect API routes, _next routes, static files, or specific pages
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname === tempRedirectPath ||
    request.nextUrl.pathname.startsWith('/registration/success') ||
    request.nextUrl.pathname.startsWith('/registration/cancelled')
  ) {
    return
  }

  const url = request.nextUrl.clone()
  url.pathname = tempRedirectPath
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\.[^/]*$).*)'
  ]
}