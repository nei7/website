export default cachedEventHandler(() => {
  return getStats();
});

const getStats = () => {
  return $fetch("https://wakatime.com/api/v1/users/current/stats", {
    headers: {
      Authorization: `Basic ${process.env.WAKATIME_TOKEN}`
    }
  });
};
