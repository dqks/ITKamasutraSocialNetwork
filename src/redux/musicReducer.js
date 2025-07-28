// const SAVE_MUSIC_TIMECODE = "music/SAVE-MUSIC-TIMECODE"

const initialState = {
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

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default musicReducer;