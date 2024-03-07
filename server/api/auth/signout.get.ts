export default defineEventHandler((event) => {
  setCookie(event, "token", "");

  return sendRedirect(event, "/");
});
