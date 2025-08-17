export const setFriendValue = (isFriend : boolean | null) => {
    let friendFilter : string = ""

    if (isFriend === null ) {
        friendFilter = "allUsers"
    } else if (isFriend) {
        friendFilter = "friendsOnly"
    } else if (!isFriend) {
        friendFilter = "notFriends"
    }

    return friendFilter;
}