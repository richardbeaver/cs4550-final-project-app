import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as likesClient from "./likes/client";
import { useSelector } from "react-redux";

const RECOMMENDED_LENGTH = 5;
const GENERIC_LIST_NAME = "Global Top 50";
const GENERIC_LIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

function Home() {
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [genericTracks, setGenericTracks] = useState([]);

  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchLikes = async () => {
    if (!currentUser) {
      return [];
    }
    try {
      const likes = await likesClient.findArtistsThatUserLikes(currentUser._id);
      return likes;
    } catch (e) {
      console.log(e.message);
    }
  };

  const setArtistRecommendations = async () => {
    const likes = await fetchLikes();
    if (likes.length === 0) {
      return;
    }
    const idx = Math.floor(Math.random() * likes.length);
    const artistId = likes[idx].albumId;
    try {
      const recommendations = await client.getRelatedArtists(artistId);
      setRelatedArtists(recommendations.slice(0, RECOMMENDED_LENGTH));
    } catch (e) {
      console.log(e.message);
    }
  };

  const getGenericTracks = async () => {
    const results = await client.getTracksForPlaylist(GENERIC_LIST_ID);
    // Each metadata object has a `track` field with the actual song data
    setGenericTracks(results.map((track) => track.track));
  };

  useEffect(() => {
    setArtistRecommendations();
    getGenericTracks();
  }, []);

  return (
    <div>
      {currentUser && (
        <>
          <h2>Some artists you might like:</h2>
          {relatedArtists && relatedArtists.length === 0 && (
            <h4>
              No recommendations right now. Like some more artists to find more
              related artists.
            </h4>
          )}
          <ul className="list-group">
            {relatedArtists.map((artist, index) => (
              <li key={index} className="list-group-item">
                <Link
                  to={`/project/details/${artist.id}`}
                  className="d-flex gap-2"
                >
                  {artist.images[0] && (
                    <img
                      src={artist.images[0].url}
                      width="100"
                      height="100"
                      alt={artist.name}
                    />
                  )}
                  <h3>{artist.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {genericTracks.length > 0 && (
        <h1 className="mt-3">{GENERIC_LIST_NAME}:</h1>
      )}

      <div className="list-group">
        {genericTracks.map((track, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex gap-3">
              {track.album && track.album.images[0] && (
                <>
                  <Link to={`/project/details/${track.artists[0].id}`}>
                    <img
                      src={track.album.images[0].url}
                      width="100"
                      height="100"
                    />
                  </Link>
                </>
              )}
              <div>
                <h3>{track.name}</h3>
                <Link to={`/project/details/${track.artists[0].id}`}>
                  <h5>{track.artists[0].name}</h5>
                </Link>
                <Link to={track.external_urls.spotify} target="_blank">
                  Open song in Spotify
                </Link>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Home;
