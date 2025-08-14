import {createSlice} from "@reduxjs/toolkit";

export type FriendType = {
    name: string,
    id: number,
}

type InitialStateType = {
    friends: Array<FriendType>
}

let initialState: InitialStateType = {
    friends: [
        {name: "Andrew", id: 2},
        {name: "Sasha", id: 3},
        {name: "Sveta", id: 4},
        {name: "Maxim", id: 5},
        {name: "Alexey", id: 6},
        {name: "Anton", id: 7},
    ]
}

const friendsPageReducer = createSlice({
    name: "friendsPageReducer",
    initialState,
    reducers: {}
})

export const {} = friendsPageReducer.actions;
export default friendsPageReducer.reducer;