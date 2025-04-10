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

linksRouter.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const links = await Link.find({});
        const objectWithShortUrl = links.find(link => link.shortUrl === shortUrl);
        if (objectWithShortUrl) {
            const originalUrl = objectWithShortUrl.originalUrl;
            res.status(301).redirect(originalUrl);
        } else {
            res.sendStatus(404);
        }
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

        const links = await Link.find({})

        const createNewObject = async () => {
            const shortUrl = cryptoRandomString({
                length: 7,
                characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            });

            const existingUrl = links.some(link => link.shortUrl === shortUrl)

            if (existingUrl) {
                await createNewObject();
            } else {
                const linkData: ILink = {
                    originalUrl: req.body.originalUrl,
                    shortUrl: shortUrl,
                };
                const link = new Link(linkData);
                await link.save();
                res.send(link);
            }
        };
        await createNewObject();

    } catch (e) {
        res.status(500).send(e);
    }
});

export default linksRouter;
