import mongoose from "mongoose";

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig() as any;
  console.log(config);
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
});
