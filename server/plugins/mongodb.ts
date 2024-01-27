import mongoose from "mongoose";

export default defineNitroPlugin(async (_nitroApp) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
});
