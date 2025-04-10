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

linksRouter.get('/:shortLink', async (req, res) => {
    try {
        const shortUrl = req.params.shortLink;
        const links = await Link.find({});
        const objectWithShortUrl = links.find(link => link.shortLink === shortUrl);
        if (objectWithShortUrl) {
            const originalUrl = objectWithShortUrl.originalLink;
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

        if (!req.body.originalLink) {
            res.status(400).send({'error': 'Field required'});
            return;
        }

        const links = await Link.find({});

        const existingOriginalLink = links.some(link => link.originalLink === req.body.originalLink);

        if (!existingOriginalLink) {
            const createNewObject = async () => {
                const shortUrl = cryptoRandomString({
                    length: 7,
                    characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                });

                const existingUrl = links.some(link => link.shortLink === shortUrl)

                if (existingUrl) {
                    await createNewObject();
                } else {
                    const linkData: ILink = {
                        originalLink: req.body.originalLink,
                        shortLink: shortUrl,
                    };
                    const link = new Link(linkData);
                    await link.save();
                    res.send(link);
                }
            };
            await createNewObject();
        } else {
            res.status(200).send({ error: 'Link already exists' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

export default linksRouter;
