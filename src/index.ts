import { AppDataSource } from "./data-source";
import { Spotify } from "./service/Spotify";
import { Track } from "./entity/Track";
import { Artist } from "./entity/Artist";
AppDataSource.initialize()
  .then(async () => {
    /*  console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)
*/
    const spotify = new Spotify();
    const data = await spotify.getTrackByIsrc("USVT10300001");
    const { isrc, spotifyImageUri, title, artist } = data;
    console.log(artist);

    const newArtist = new Artist();
    const newTrack = new Track();

    newArtist.name = artist;

    newTrack.isrc = isrc;
    newTrack.spotifyImageUri = spotifyImageUri;
    newTrack.title = title;
    newTrack.artist = newArtist;

    await AppDataSource.manager.save(newArtist);
    await AppDataSource.manager.save(newTrack);
    console.log(
      "Here you can setup and run express / fastify / any other framework." +
        `\n token \n ${data} `
    );
  })
  .catch((error) => console.log(error));
