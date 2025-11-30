import createApp from "./app";
import { connectDb, closeDb } from "./mongodb/mongoClient";
import { appConfig, validateConfig } from "./config/config";

const startServer = async () => {
  try {
    validateConfig();
    await connectDb();

    const app = createApp();

    const server = app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
      console.log(`Environment: ${appConfig.nodeEnv}`);
      console.log(
        `Documentations available at: http://localhost:${appConfig.port}/api-docs`,
      );
    });

    const shutdown = async () => {
      console.log("Shutting down...");
      await closeDb();
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
