import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const USERS_API = `${API_BASE}/users`;
const LIKES_API = `${API_BASE}/likes`;
const ARTISTS_API = `${API_BASE}/artists`;

export const createUserLikesArtist = async (userId, artistId) => {
  const response = await axios.post(`${USERS_API}/${userId}/likes/${artistId}`);
  return response.data;
};

export const deleteUserLikesArtist = async (userId, artistId) => {
  const response = await axios.delete(
    `${USERS_API}/${userId}/likes/${artistId}`
  );
  return response.data;
};

export const findUsersThatLikeArtist = async (artistId) => {
  const response = await axios.get(`${LIKES_API}/${artistId}/users`);
  return response.data;
};

export const findArtistsThatUserLikes = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};

export const checkForArtist = async (spotifyId) => {
  const response = await axios.get(`${ARTISTS_API}/${spotifyId}`);
  return response.data;
};

export const addNewArtist = async (artist) => {
  const response = await axios.post(`${ARTISTS_API}`, artist);
  return response.data;
};
