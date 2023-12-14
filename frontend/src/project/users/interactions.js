import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as likesClient from "../likes/client";
import { useEffect, useState } from "react";
import * as followsClient from "../follows/client";
import * as spotifyClient from "../client";

function Interactions({ id }) {
  const [likedArtists, setlikedArtists] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchLikes = async () => {
    const likes = await likesClient.findArtistsThatUserLikes(id);

    const artists = await Promise.all(
      likes.map(async (like) => {
        const spotifyId = like.albumId;
        // Check own database for artist with name
        let artist = await likesClient.checkForArtist(spotifyId);

        if (!artist) {
          // Get name from spotify
          const response = await spotifyClient.findArtistById(spotifyId);
          let name = response.data.name;
          // Add to own database
          artist = await likesClient.addNewArtist({
            spotifyId,
            artistName: name,
          });
        }

        return artist;
      })
    );

    setlikedArtists(artists);
  };

  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };

  const fetchFollowing = async () => {
    const following = await followsClient.findFollowedUsersByUser(id);
    setFollowing(following);
  };

  useEffect(() => {
    fetchLikes();
    fetchFollowers();
    fetchFollowing();
  }, [id]);

  return (
    <>
      <h3>Likes</h3>
      <ul className="list-group">
        {likedArtists.map((artist, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/project/details/${artist.spotifyId}`}>
              {artist.artistName}
            </Link>
          </li>
        ))}
      </ul>
      <h3>Followers</h3>
      <div className="list-group">
        {followers.map((follows, index) => (
          <Link
            key={index}
            className="list-group-item"
            to={`/project/users/${follows.follower._id}`}
          >
            {follows.follower.username}
          </Link>
        ))}
      </div>
      <h3>Following</h3>
      <div className="list-group">
        {following.map((follows, index) => (
          <Link
            key={index}
            className="list-group-item"
            to={`/project/users/${follows.followed._id}`}
          >
            {follows.followed.username}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Interactions;
