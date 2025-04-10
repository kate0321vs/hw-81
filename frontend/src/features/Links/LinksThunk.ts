import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Link, LinkWithoutId} from "../../types";

export const fetchLinks = createAsyncThunk<Link[]>(
    'links/fetchAll',
    async () => {
        const response = await axiosApi.get<Link[]>('/links');
        return response.data;
    }
);

export const fetchOneLink = createAsyncThunk<LinkWithoutId, string>(
    'links/fetchOne',
    async (shortUrl) => {
        const response = await axiosApi.get(`/links/${shortUrl}`);
        return response.data;
    }
);

export const createLink = createAsyncThunk<void, LinkWithoutId>(
    'links/create',
    async (LinkWithoutId) => {
      await axiosApi.post(`/links/`, LinkWithoutId);
    }
)