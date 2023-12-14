import model from "./model.js";

export const findArtistBySpotifyId = async (spotifyId) =>
  model.findOne({ spotifyId });

export const addNewArtist = async (artist) => model.create(artist);
