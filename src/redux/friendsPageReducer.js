let initialState = {
    friends: [
        {name: "Andrew", id: "2"},
        {name: "Sasha", id: "3"},
        {name: "Sveta", id: "4"},
        {name: "Maxim", id: "5"},
        {name: "Alexey", id: "6"},
        {name: "Anton", id: "7"},
    ]
}

const friendsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default friendsPageReducer;