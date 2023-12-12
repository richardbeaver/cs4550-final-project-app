import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";

function Details() {
  const [currentUser, setCurrentUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const { artistId } = useParams();
  const [likes, setLikes] = useState([]);

  const fetchUser = async () => {
    try {
      const user = await userClient.account();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const fetchArtist = async () => {
    const artist = await client.findArtistById(artistId);
    setArtist(artist);
  };

  const fetchTracks = async () => {
    const tracks = await client.findTracksForArtistId(artistId);
    setTracks(tracks);
  };

  const fetchLikes = async () => {
    const likes = await likesClient.findUsersThatLikeAlbum(artistId);
    setLikes(likes);
  };

  const currenUserLikesAlbum = async () => {
    const _likes = await likesClient.createUserLikesAlbum(
      currentUser._id,
      artistId
    );
    setLikes([_likes, ...likes]);
  };

  useEffect(() => {
    fetchArtist();
    fetchTracks();
    fetchUser();
    fetchLikes();
  }, []);

  return (
    <div>
      {artist && (
        <div>
          {currentUser && (
            <button
              onClick={currenUserLikesAlbum}
              className="btn btn-warning float-end"
            >
              Like
            </button>
          )}
          <h1>{artist.data.name}</h1>
          {artist && artist.images && artist.images[0] && (
            <img
              src={artist.images[0].url}
              width="100"
              height="100"
              alt={artist.name}
            />
          )}
          {console.log(artist)}
          {artist && artist.images && artist.images[0] && (
            <img
              src={artist.images[0].url}
              width="100"
              height="100"
              alt={artist.name}
            />
          )}
          <h2>Likes</h2>
          <ul className="list-group">
            {likes.map((like, index) => (
              <li key={index} className="list-group-item">
                {like.user.firstName} {like.user.lastName}
                <Link to={`/project/users/${like.user._id}`}>
                  @{like.user.username}
                </Link>
              </li>
            ))}
          </ul>

          <h2>Tracks</h2>
          <ul className="list-group">
            {tracks.map((track, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex gap-3">
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      width="100"
                      height="100"
                      alt={artist.name}
                    />
                  )}
                  <div>
                    <h3>{track.name}</h3>
                    <h5>{track.album.name}</h5>
                    <Link to={track.external_urls.spotify} target="_blank">
                      Open in Spotify
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Details;
