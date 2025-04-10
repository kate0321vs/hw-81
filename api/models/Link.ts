import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortUrl: String,
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
