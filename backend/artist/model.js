import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("artists", schema);
export default model;
