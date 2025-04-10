import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    originalLink: {
        type: String,
        required: true,
        unique: true,
    },
    shortLink: String,
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
