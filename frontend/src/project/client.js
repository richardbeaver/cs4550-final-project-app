import axios from "axios";
const SPOTIFY_API = "https://api.spotify.com/v1";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      },
    }
  );
  return response.data.access_token;
};

const headers = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return undefined;
  }
  return {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
};

export const searchArtists = async (searchTerm) => {
  const response = await axios.get(
    `${SPOTIFY_API}/search?query=${searchTerm}&type=artist`,
    await headers()
  );
  return response.data.artists.items;
};

export const findArtistById = async (artistId) => {
  const response = await axios.get(
    `${SPOTIFY_API}/artists/${artistId}`,
    await headers()
  );
  return response;
};

export const findTracksForArtistId = async (artistId) => {
  const response = await axios.get(
    `${SPOTIFY_API}/artists/${artistId}/top-tracks?country=US`,
    await headers()
  );
  return response.data.tracks;
};
