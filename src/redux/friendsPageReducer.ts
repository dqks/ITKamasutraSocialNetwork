type Friend = {
    name: string,
    id: number,
}

type InitialStateType = {
    friends: Array<Friend>
}

let initialState : InitialStateType = {
    friends: [
        {name: "Andrew", id: 2},
        {name: "Sasha", id: 3},
        {name: "Sveta", id: 4},
        {name: "Maxim", id: 5},
        {name: "Alexey", id: 6},
        {name: "Anton", id: 7},
    ]
}

const friendsPageReducer = (state = initialState, action : any) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default friendsPageReducer;