import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/project/account");
    } catch (error) {
      setErrorMessage(
        "Could not sign in. Check that your username/password are correct or try again later."
      );
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn} className="btn btn-primary">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
