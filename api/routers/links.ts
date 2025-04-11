import express from 'express';
import Link from "../models/Link";
import {ILink} from "../types";
import cryptoRandomString from "crypto-random-string";

const linksRouter = express.Router();

linksRouter.get('/:shortLink', async (req, res) => {
    try {
        const shortUrl = req.params.shortLink;
        const link: ILink | null = await Link.findOne({shortLink: shortUrl});
        if (link) {
            const originalUrl = link.originalLink;
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

        const link = await Link.findOne({originalLink: req.body.originalLink});

        if (!link) {
            const createNewObject = async () => {
                const shortUrl = cryptoRandomString({
                    length: 7,
                    characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                });

                const existingUrl = await Link.findOne({shortLink: shortUrl});

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
        }  else {
            res.send(link)
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

export default linksRouter;
