import {RootState} from "./reduxStore";

export const getFriends = (state : RootState) => state.friendsPage.friends;