import {RootState} from "./reduxStore";

export const getTracks = (state : RootState) => state.musicPage.tracks;