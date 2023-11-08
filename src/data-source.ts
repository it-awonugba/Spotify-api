import "reflect-metadata";
import { DataSource } from "typeorm";
import { Track } from "./entity/Track";
import { Artist } from "./entity/Artist";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "music_metadata",
  synchronize: true,
  logging: false,
  entities: [Track, Artist],
  migrations: [],
  subscribers: [],
});
