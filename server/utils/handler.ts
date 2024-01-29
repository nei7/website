import type { EventHandler, EventHandlerRequest } from "h3";
import { MongooseError } from "mongoose";

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const header = getCookie(event, "token");
      if (header) {
        const data = verifyToken(header);
        event.context.userId = data.userId;
      }

      const response = await handler(event);
      return response;
    } catch (err) {
      if (err instanceof MongooseError) {
        return createError(err);
      }

      console.log(err);
      // Error handling
      return createError({ message: (err as any).message, status: 500 });
    }
  });
