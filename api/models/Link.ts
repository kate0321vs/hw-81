import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: String,
});

const Link = mongoose.model("Product", linkSchema);
export default Link;
