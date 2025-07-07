let initialState = {
    friends: [
        {name: "Andrew", id: "1"},
        {name: "Sasha", id: "2"},
        {name: "Sveta", id: "3"},
        {name: "Maxim", id: "4"},
        {name: "Alexey", id: "5"},
        {name: "Anton", id: "6"},
    ]
}

const friendsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default friendsPageReducer;