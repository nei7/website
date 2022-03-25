import { useRouter } from "vue-router";

const getDataRoutes = () => {
  const router = useRouter();
  const routes = router.getRoutes();
  return routes;
};

export const getPosts = (limit?: number) => {
  const isPosts = getDataRoutes();
  console.log(isPosts);
  return isPosts;
};
