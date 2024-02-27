import { MongooseError } from "mongoose";
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<{ email: string; password: string; username: string }>(event);

    const user = new User({ username: data.username, password: data.password, email: data.email });
    await user.save();

    user.password = undefined;

    return user;
  } catch (err) {
    console.log(err);

    if (err instanceof MongooseError) {
      return createError({ message: err.message });
    }

    return createError({
      message: "Internal server error",
      status: 500
    });
  }
});
