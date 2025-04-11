import {Link} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createLink, fetchOneLink} from "./LinksThunk.ts";
import {RootState} from "../../app/store.ts";

interface LinksState {
    links: Link[];
    link: Link | void;
    fetchOneLoading: boolean;
    createLinkLoading: boolean;
}

const initialState: LinksState = {
    links: [],
    link: undefined,
    fetchOneLoading: false,
    createLinkLoading: false,
};

export const LinksSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOneLink.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneLink.fulfilled, (state,) => {
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchOneLink.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createLink.pending, (state, ) => {
            state.createLinkLoading = true;
        });
        builder.addCase(createLink.fulfilled, (state, {payload: link}) => {
            state.createLinkLoading = false;
            state.link = link;
        });
        builder.addCase(createLink.rejected, (state) => {
            state.createLinkLoading = false;
        });
    }
});

export const linksReducer = LinksSlice.reducer;
export const selectLink = (state: RootState) => state.links.link;
export const selectCreateLoading = (state: RootState) => state.links.createLinkLoading;
export const selectFetchOneLoading = (state: RootState) => state.links.fetchOneLoading;