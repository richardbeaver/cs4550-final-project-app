import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
  const { currentUser } = useSelector((state) => state.userReducer);
  return (
    <>
      <div className="list-group" style={{ width: "110px" }}>
        <Link to="/project/" className="list-group-item">
          Home
        </Link>
        {!currentUser && (
          <>
            <Link to="/project/signin" className="list-group-item">
              Signin
            </Link>
            <Link to="/project/signup" className="list-group-item">
              Signup
            </Link>
          </>
        )}
        {currentUser && (
          <Link to="/project/account" className="list-group-item">
            Account
          </Link>
        )}
        <Link to="/project/search" className="list-group-item">
          Search
        </Link>
        {currentUser && currentUser.role === "ADMIN" && (
          <Link to="/project/users" className="list-group-item">
            Users
          </Link>
        )}
      </div>
    </>
  );
}

export default Navigation;
