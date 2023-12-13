import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import * as likesClient from "../likes/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as followsClient from "../follows/client";
import Interactions from "./interactions";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);

  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
  };
  const updateUser = async () => {
    const status = await client.updateUser(id, user);
  };
  const deleteUser = async (id) => {
    const status = await client.deleteUser(id);
    navigate("/project/users");
  };
  const followUser = async () => {
    const status = await followsClient.userFollowsUser(id);
    window.location.reload(false);
  };
  const unfollowUser = async () => {
    const status = await followsClient.userUnfollowsUser(id);
    window.location.reload(false);
  };

  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };

  const alreadyFollowing = () => {
    return followers.some((follows) => {
      return follows.follower._id === currentUser._id;
    });
  };

  useEffect(() => {
    fetchUser();
    fetchFollowers();
  }, [id]);

  return (
    <div>
      {currentUser && currentUser._id !== id && (
        <>
          {alreadyFollowing() ? (
            <button onClick={unfollowUser} className="btn btn-danger float-end">
              Unfollow
            </button>
          ) : (
            <button onClick={followUser} className="btn btn-warning float-end">
              Follow
            </button>
          )}
        </>
      )}
      <h2>User Details</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          {currentUser && currentUser.role === "ADMIN" && (
            <p>Email: {user.email}</p>
          )}

          {currentUser && currentUser.role === "ADMIN" ? (
            <>
              <p>First Name:</p>
              <input
                type="text"
                className="form-control mb-3"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
              <p>Last Name:</p>
              <input
                type="text"
                className="form-control mb-3"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </>
          ) : (
            <p>First Name: {user.firstName}</p>
          )}

          {currentUser && currentUser.role === "ADMIN" && (
            <>
              <button onClick={updateUser} className="btn btn-primary">
                Update
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </>
          )}

          <Interactions id={user._id} />
        </div>
      )}
    </div>
  );
}

export default UserDetails;
