export interface Link {
    id: string;
    originalLink: string;
    shortLink: string;
}

export interface LinkWithoutId {
    originalLink: string;
    shortLink: string;
}

export interface LinkWithoutShortLink {
    originalLink: string;
}