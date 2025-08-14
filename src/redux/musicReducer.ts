import {createSlice} from "@reduxjs/toolkit";

export type Track = {
    id: string
    logo: string
    name: string
    singer: string
    src: string
}

type InitialStateType = {
    tracks: Array<Track>,
}

const initialState: InitialStateType = {
    tracks: [
        {
            id: "1",
            logo: "https://sun9-23.userapi.com/impg/1AGE4rOWG8QTjyObNtNuZrLXN7Ygj11Ntsgdrg/zFgVozi1NHk.jpg?size=604x604&quality=95&sign=4e65f5c7e3bb0495328ffd9e0ea88e10&type=album",
            name: "New era",
            singer: "zxcursed",
            src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
        },
        {
            id: "2",
            logo: "https://sun9-23.userapi.com/impg/1AGE4rOWG8QTjyObNtNuZrLXN7Ygj11Ntsgdrg/zFgVozi1NHk.jpg?size=604x604&quality=95&sign=4e65f5c7e3bb0495328ffd9e0ea88e10&type=album",
            name: "New era",
            singer: "zxcursed",
            src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
        }
    ],
};

const musicReducer = createSlice({
    name: "musicReducer",
    initialState,
    reducers: {}
})

export const {} = musicReducer.actions;
export default musicReducer.reducer;