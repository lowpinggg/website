import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_ROUTES = {
  success: '/registration/success',
  cancelled: '/registration/cancelled',
} as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    Object.values(PROTECTED_ROUTES).includes(
      pathname as (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES],
    ) &&
    !request.nextUrl.searchParams.get('session_id')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/api') || pathname.startsWith('/registration')) {
    return
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\.[^/]*$).*)',
    '/registration/success',
    '/registration/cancelled',
  ],
}
