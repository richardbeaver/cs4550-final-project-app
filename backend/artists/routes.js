import * as dao from "./dao.js";

function ArtistRoutes(app) {
  const findArtistBySpotifyId = async (req, res) => {
    const spotifyId = req.params.spotifyId;
    const artist = await dao.findArtistBySpotifyId(spotifyId);
    res.json(artist);
  };

  const addNewArtist = async (req, res) => {
    const { spotifyId, artistName } = req.body;
    try {
      const artist = await dao.addNewArtist({ spotifyId, artistName });
      res.json(artist);
    } catch (error) {
      console.log(error.message);
      // res.sendStatus(500);
    }
  };

  app.get("/api/artists/:spotifyId", findArtistBySpotifyId);
  app.post("/api/artists", addNewArtist);
}

export default ArtistRoutes;
