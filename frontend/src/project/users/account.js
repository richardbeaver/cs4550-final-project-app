import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import Interactions from "./interactions";

function Account() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
      navigate("/project/signin");
    }
  };

  const updateUser = async () => {
    const status = await client.updateUser(user._id, user);
  };

  const signout = async () => {
    const status = await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/project/signin");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Account</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>

          {/* Email */}
          <div className="form-group row">
            <label htmlFor="input-email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="input-email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          {/* First name */}
          <div className="form-group row">
            <label
              htmlFor="input-first-name"
              className="col-sm-2 col-form-label"
            >
              First name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="input-first-name"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Last name */}
          <div className="form-group row">
            <label
              htmlFor="input-last-name"
              className="col-sm-2 col-form-label"
            >
              Last name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="input-last-name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="py-2">
            <button onClick={updateUser} className="btn btn-primary">
              Update
            </button>
            <button onClick={signout} className="btn btn-danger">
              Sign Out
            </button>
            {user.role === "ADMIN" && (
              <Link to="/project/users" className="btn btn-warning">
                Users
              </Link>
            )}
          </div>

          <Interactions id={user._id} />
        </div>
      )}
    </div>
  );
}

export default Account;
