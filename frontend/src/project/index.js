import Home from "./home";
import Signup from "./users/signup";
import Search from "./search";
import Details from "./details";
import { Routes, Route } from "react-router-dom";
import UserList from "./users/list";
import UserDetails from "./users/details";
import SignIn from "./users/signin";
import Account from "./users/account";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./nav";
import CurrentUser from "./users/currentUser";

function Project() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <div className="container-fluid">
          <h1>Artist Track</h1>
          <p>Keep track of your friends and your favorite artists.</p>

          <div className="d-flex gap-3">
            <div className="">
              <Navigation />
            </div>

            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:search" element={<Search />} />
                <Route path="/details/:artistId" element={<Details />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Project;
