export default defineEventHandler((event) => {
  try {
    const token = getCookie(event, "token");
    if (!token) return createError({ status: 403, message: "Unauthorized" });

    return verifyToken(token);
  } catch (err) {
    deleteCookie(event, "token");
    console.log(err);

    return createError({
      status: 401
    });
  }
});
