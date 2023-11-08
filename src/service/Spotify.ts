import * as dotenv from "dotenv";
import axios from "axios";
import { URLSearchParams } from "url";

export class Spotify {
  private SpotifyClientId: string;
  private SpotifyClientSecret: string;
  constructor() {
    dotenv.config();
    this.SpotifyClientId = process.env.CLIENT_ID;
    this.SpotifyClientSecret = process.env.CLIENT_SECRET;
  }

  private async postHandler(url: string, params: URLSearchParams) {
    try {
      const response = await axios.post(url, params).then((data) => {
        return data;
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  private async getHandler(url: string, headers) {
    try {
      const response = await axios.get(url, { headers }).then((data) => {
        return data;
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  public async getToken() {
    const url = "https://accounts.spotify.com/api/token";
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.SpotifyClientId,
      client_secret: this.SpotifyClientSecret,
    });
    const response = await this.postHandler(url, params);
    const { access_token } = response.data;
    return access_token;
  }

  public async getTrackByIsrc(isrc: string) {
    const url = `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`;
    const token = await this.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await this.getHandler(url, headers);
    const {
      tracks: { items },
    } = response.data;

    const trackWithHighestPopularity =
      items.length > 1
        ? items.reduce((max, current) =>
            current.popularity > max.popularity ? current : max
          )
        : items[0];

    return {
      isrc: trackWithHighestPopularity.external_ids.isrc,
      spotifyImageUri: trackWithHighestPopularity.album.images[0]?.url,
      title: trackWithHighestPopularity.name,
      artist: trackWithHighestPopularity.artists.map((artist) => artist.name),
    };
  }
}
