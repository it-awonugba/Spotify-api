import { AppDataSource } from "../data-source";
import { Spotify } from "../service/Spotify";
import { Artist } from "../entity/Artist";
import { Track } from "../entity/Track";

interface apiData {
  isrc: string;
  title: string;
  spotifyImageUri: string;
  artist: string;
}

export class TrackController {
  private trackRepository = AppDataSource.getRepository(Track);
  private artistRepository = AppDataSource.getRepository(Artist);

  async saveTrack(isrc: string) {
    try {
      const spotify = new Spotify();
      const data: apiData = await spotify.getTrackByIsrc(isrc);

      const newArtist = new Artist();
      const newTrack = new Track();

      newArtist.name = data.artist;

      newTrack.isrc = data.isrc;
      newTrack.spotifyImageUri = data.spotifyImageUri;
      newTrack.title = data.title;
      newTrack.artist = newArtist;

      await AppDataSource.manager.save(newArtist);
      return await AppDataSource.manager.save(newTrack);
    } catch (error) {
      return { Message: `Error creating this track: ${isrc} : ${error}` };
    }
  }
}
