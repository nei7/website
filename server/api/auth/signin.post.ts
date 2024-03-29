import { verify } from "argon2";
import { MongooseError } from "mongoose";
import { User } from "~/server/models/user.model";
import { signToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<{ email: string; password: string }>(event);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return createError({ status: 404, message: "User not found" });
    }

    if (user.password && (await verify(user.password, data.password))) {
      const token = signToken(user.id);

      user.password = undefined;

      setCookie(event, "token", token, { secure: true });

      return {
        user,
        token
      };
    }

    return createError({
      status: 401,
      message: "Invalid password"
    });
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
