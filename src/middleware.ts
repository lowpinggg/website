import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ENABLE_TEMP_REDIRECT = false
const TEMP_REDIRECT_PATH = '/example-tournament/register'

// Protected routes that require session_id
const PROTECTED_ROUTES = {
  success: '/registration/success',
  cancelled: '/registration/cancelled'
} as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check protected routes for session_id
  if (
    Object.values(PROTECTED_ROUTES).includes(
      pathname as (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES]
    ) &&
    !request.nextUrl.searchParams.get('session_id')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Skip middleware for these paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/registration') ||
    pathname === TEMP_REDIRECT_PATH
  ) {
    return
  }

  // Temporary redirect
  if (ENABLE_TEMP_REDIRECT) {
    const url = request.nextUrl.clone()
    url.pathname = TEMP_REDIRECT_PATH
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\.[^/]*$).*)',
    '/registration/success',
    '/registration/cancelled'
  ]
}
