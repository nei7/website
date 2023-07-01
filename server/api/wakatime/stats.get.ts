export default defineEventHandler(async (event) => {
  return getStats();
});

const getStats = async () => {
  return $fetch("https://wakatime.com/api/v1/users/current/stats", {
    headers: {
      Authorization: `Bearer ${process.env.WAKATIME_TOKEN}`,
    },
  });
};
