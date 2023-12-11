import * as client from "./client.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      await client.signup({ email, username, password });

      const credentials = { username, password };
      const user = await client.signin(credentials);

      dispatch(setCurrentUser(user));
      navigate("/project/account");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {error && <div className="alert alert-danger">{error.message}</div>}

      <input
        type="text"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <button onClick={signUp} className="btn btn-primary">
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
