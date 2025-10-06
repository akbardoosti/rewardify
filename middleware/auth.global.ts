import { decrypt } from '~/services/crypto';

// This middleware is now async to handle the async decrypt function.
export default defineNuxtRouteMiddleware(async (to) => {
  // Ensure this logic only runs on the client where localStorage is accessible.
  if (process.server) {
    return;
  }

  const token = localStorage.getItem('access_token');
  const isAuthenticated = token ? !!(await decrypt(token)) : false;

  const publicPages = ['/login', '/register', '/verify'];
  const isTargetingPublicPage = publicPages.includes(to.path);

  // 1. Handle redirection from the root path ('/')
  if (to.path === '/') {
    return navigateTo(isAuthenticated ? '/dashboard' : '/login');
  }

  // 2. If authenticated, prevent access to public pages (like login/register)
  if (isAuthenticated && isTargetingPublicPage) {
    return navigateTo('/dashboard');
  }

  // 3. If not authenticated, prevent access to protected pages
  if (!isAuthenticated && !isTargetingPublicPage) {
    return navigateTo('/login');
  }

  // 4. Otherwise, allow navigation
});