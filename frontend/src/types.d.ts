export interface Link {
    id: string;
    originalUrl: string;
    shortUrl: string;
}

export interface LinkWithoutId {
    originalUrl: string;
    shortUrl: string;
}

export interface LinkWithoutShortLink {
    originalLink: string;
}