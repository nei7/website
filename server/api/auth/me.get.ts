export default defineEventHandler((event) => {
  const token = getCookie(event, "token");
  if (!token) return createError({ status: 403 });

  return verifyToken(token);
});
