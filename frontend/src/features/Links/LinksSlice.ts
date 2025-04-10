import {Link, LinkWithoutId} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createLink, fetchLinks, fetchOneLink} from "./LinksThunk.ts";
import {RootState} from "../../app/store.ts";

interface LinksState {
    links: Link[];
    link: LinkWithoutId | null;
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    createLinkLoading: boolean;
}

const initialState: LinksState = {
    links: [],
    link: null,
    fetchLoading: false,
    fetchOneLoading: false,
    createLinkLoading: false,
};

export const LinksSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLinks.pending, (state) => {
         state.fetchLoading = true;
         });
        builder.addCase(fetchLinks.fulfilled, (state, {payload: links}) => {
            state.fetchLoading = false;
            state.links = links;
        });
        builder.addCase(fetchLinks.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchOneLink.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneLink.fulfilled, (state, {payload: link}) => {
            state.fetchOneLoading = false;
            state.link = link;
        });
        builder.addCase(fetchOneLink.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createLink.pending, (state) => {
            state.createLinkLoading = true;
        });
        builder.addCase(createLink.fulfilled, (state) => {
            state.createLinkLoading = false;
        });
        builder.addCase(createLink.rejected, (state) => {
            state.createLinkLoading = false;
        });
    }
});

export const linksReducer = LinksSlice.reducer;
export const selectLinks = (state: RootState) => state.links.links;
export const selectLink = (state: RootState) => state.links.link;
export const selectCreateLoading = (state: RootState) => state.links.createLinkLoading;