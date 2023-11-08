import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Artist } from "./Artist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  isrc: string;

  @Column()
  title: string;

  @Column()
  spotifyImageUri: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artist: Artist;
}
