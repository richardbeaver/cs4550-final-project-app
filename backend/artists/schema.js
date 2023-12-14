import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    spotifyId: { type: String, unique: true, required: true },
    artistName: String,
  },
  { collection: "artists" }
);

export default schema;
