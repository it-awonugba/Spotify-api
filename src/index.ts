import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    dotenv.config();
    app.use(express.json());
    app.use(routes);

    const PORT: number = parseInt(process.env.PORT) || 4000;

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
