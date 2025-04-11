import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {LinkWithoutId, LinkWithoutShortLink} from "../../types";


export const fetchOneLink = createAsyncThunk<LinkWithoutId, string>(
    'links/fetchOne',
    async (shortUrl) => {
        const response = await axiosApi.get(`/links/${shortUrl}`);
        return response.data;
    }
);

export const createLink = createAsyncThunk<void, LinkWithoutShortLink>(
    'links/create',
    async (LinkWithoutShortLink) => {
      const response = await axiosApi.post(`/links/`, LinkWithoutShortLink);
      return response.data;
    }
)