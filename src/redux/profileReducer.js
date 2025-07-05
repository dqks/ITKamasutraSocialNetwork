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
                    [state.postData.length - 1].id + 1, message: state.newPostText, likeCount: "0"
            };
            return {...state, newPostText: "", postData: [...state.postData, newPost]};
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state}
            stateCopy.newPostText = action.postText;
            return stateCopy;
        }
        case ADD_LIKE_BUTTON: {
            let stateCopy = {...state}
            stateCopy.postData = [...state.postData]
            for (let i = 0; i < stateCopy.postData.length; i++ ) {
                stateCopy.postData[i] = {...state.postData[i]}
            }
            let post = stateCopy.postData.find(x => x.id === action.idPost)
            post.likeCount++;
            return stateCopy;
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