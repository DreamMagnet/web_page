export const environment = {
  production: false,
  // Auth microservice (register / login / logout)
  authApiBase: 'http://localhost:8001/api',
  // Profile + landing microservice (users/me, landing, ...)
  apiBase: 'http://localhost:8002/api',
  sessionCookieName: 'session_id',
};
