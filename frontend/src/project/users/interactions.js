import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as likesClient from "../likes/client";
import { useEffect, useState } from "react";
import * as followsClient from "../follows/client";

function Interactions({ id }) {
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchLikes = async () => {
    const likes = await likesClient.findArtistsThatUserLikes(id);
    setLikes(likes);
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
        {likes.map((like, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/project/details/${like.albumId}`}>{like.albumId}</Link>
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
            {follows.follower._id}
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
            {follows.followed._id}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Interactions;
