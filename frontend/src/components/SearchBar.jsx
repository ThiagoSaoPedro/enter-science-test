import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useArtist } from "../context/ArtistContext";
import { useNavigate } from "react-router-dom";

// Define environment variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState("");
  const { setArtist } = useArtist();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        //Requests the spotfy API to generate the token
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        //error handling
        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const handleSearch = async (e) => {
    //searches for artists on Spotify every time the user types something in. If the search bar is empty, the list of artists is also empty.
    const value = e.target.value;
    setQuery(value);
    //If a name is typed in, the code asks Spotify for the corresponding artists and saves the result in setArtists().
    if (!value.trim()) {
      setArtists([]);
      return;
    }

    //error handling
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(value)}&type=artist&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch artists");
      }

      const data = await response.json();
      setArtists(data.artists?.items || []);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  //When the user clicks on the name of an artist, it is saved in the artist variable and the page is redirected
  const handleClick = (name) => {
    setArtist(name);
    navigate("/Form");
  };

  return (
    <div className="w-50 max-w-md mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar artistas..."
        className="form-control mb-3"
      />
      {artists.length > 0 && (
        <ul className="list-group">
          {artists.map((artist) => (
            <li key={artist.id} className="list-group-item d-flex align-items-center">
              {artist.images.length > 0 ? (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
              ) : (
                <div className="rounded-circle bg-secondary me-2" style={{ width: 40, height: 40 }}></div>
              )}
              <button onClick={() => handleClick(artist.name)} className="btn bg-transparent text-dark">
                {artist.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
