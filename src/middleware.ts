import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Don't redirect if we're already on the target path
  if (request.nextUrl.pathname === '/example-tournament/register') {
    return
  }

  const url = request.nextUrl.clone()
  url.pathname = '/example-tournament/register'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|.*\\.[^/]*$).*)']
}