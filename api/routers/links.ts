import express from 'express';
import Link from "../models/Link";
import {ILink} from "../types";
import cryptoRandomString from "crypto-random-string";

const linksRouter = express.Router();

linksRouter.get('/', async (req, res) => {
    try {
        const links = await Link.find({});
        res.send(links);
    } catch {
        res.sendStatus(500);
    }
});

linksRouter.post('/', async (req, res) => {
    try {

        if (!req.body.originalUrl) {
            res.status(400).send({'error': 'Field required'});
            return;
        }

        const linkData: ILink = {
            originalUrl: req.body.originalUrl,
            shortUrl: cryptoRandomString({length: 7, characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}),
        };

        const link = new Link(linkData);
        await link.save();
        res.send(link);
    } catch (e) {
        res.status(500).send(e);
    }
});

export default linksRouter;
