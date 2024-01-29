import { User } from "~/server/models/user.model";

export default defineWrappedResponseHandler(async (event) => {
  const data = await readBody<{ email: string; password: string; username: string }>(event);

  const user = new User({ username: data.username, password: data.password, email: data.email });
  await user.save();

  user.password = undefined;

  return user;
});
