import { decrypt } from '~/services/crypto';

export default defineNuxtRouteMiddleware((to) => {
  // Ensure this logic only runs on the client where localStorage is accessible.
  if (process.server) {
    return;
  }

  const token = localStorage.getItem('access_token');
  const isAuthenticated = token ? !!decrypt(token) : false;

  const publicPages = ['/login', '/register', '/verify', '/forgot-password', '/reset-password'];
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
