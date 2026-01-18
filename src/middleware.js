import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Get the auth cookie
  const token = request.cookies.get('mock_token');

  // 2. Define which path is being accessed
  const path = request.nextUrl.pathname;

  // 3. CHECK: Is the user on a protected path?
  // You can add more paths here like: path.startsWith('/dashboard')
  const isProtectedPath = path.startsWith('/add-item');

  // 4. LOGIC: If path is protected AND no token exists -> Redirect
  if (isProtectedPath && !token) {
    // Redirect to login with an error message
    return NextResponse.redirect(new URL('/login?error=required', request.url));
  }

  // 5. If they have the token (or path isn't protected), let them pass
  return NextResponse.next();
}

// Optimization: Only run this check on specific paths to save performance
export const config = {
  matcher: [
    '/add-item',
    // '/dashboard', // You can add more routes here later
    // '/profile/:path*'
  ],
};