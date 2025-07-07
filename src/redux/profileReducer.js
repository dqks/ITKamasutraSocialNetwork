const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const ADD_LIKE_BUTTON = "ADD-LIKE-BUTTON"

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
    newPostText: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            if (state.newPostText === "") {
                return state;
            }
            let newPost = {
                id: state.postData
                    [state.postData.length - 1].id + 1, message: state.newPostText, likeCount: 0
            };
            return {...state, newPostText: "", postData: [...state.postData, newPost]};
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.postText};
        }
        case ADD_LIKE_BUTTON: {
            return {
                ...state,
                postData: state.postData.map(el => {
                    if (el.id === action.idPost ) {
                        return {...el, likeCount: el.likeCount + 1};
                    }
                    return el;
                })
            };
        }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST,
})


export const addLikeButtonActionCreator = (id) => (
    {
        type: ADD_LIKE_BUTTON,
        idPost: id
    }
)

export const updateNewPostTextActionCreator = (text) => (
    {
        type: UPDATE_NEW_POST_TEXT,
        postText: text
    }
)

export default profileReducer;