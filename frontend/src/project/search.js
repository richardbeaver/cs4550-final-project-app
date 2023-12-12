import React, { useState, useEffect } from "react";
import { API_KEY } from "./client";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";

function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "beatles");
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const fetchArtists = async (searchTerm) => {
    try {
      const results = await client.searchArtists(searchTerm);
      setResults(results);
      setSearchTerm(searchTerm);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    if (search) {
      fetchArtists(search);
    }
  }, [search]);

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <h1>Search</h1>
      <button
        onClick={() => navigate(`/project/search/${searchTerm}`)}
        className="btn btn-primary float-end"
      >
        Search
      </button>
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {results && <h2>Results</h2>}
      {results && results.length === 0 && <h4>No results found.</h4>}
      <ul className="list-group">
        {results &&
          results.map((artist, index) => (
            <li key={index} className="list-group-item">
              <Link to={`/project/details/${artist.id}`}>
                <h3>{artist.name}</h3>
                {artist.images[0] && (
                  <img
                    src={artist.images[0].url}
                    width="100"
                    height="100"
                    alt={artist.name}
                  />
                )}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
