import profileReducer, {addPost, deletePost, ProfileInitialStateType} from "./profileReducer";

let state : ProfileInitialStateType = {
    profileStatus: "",
    profile: null,
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
};

it("length of postData should be incremented", () => {
    //test data
    let action = addPost("Test post");
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postData.length).toBe(4);
    expect(newState.postData[3].message).toBe("Test post");
})

it("message of new post should be Test post", () => {
    //test data
    let action = addPost("Test post");
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postData[3].message).toBe("Test post");
})

it("length of postData should be decremented", () => {
    //test data
    let action = deletePost(1);
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postData.length).toBe(2);
})

it("length of postData shouldn't be decremented if id is incorrect", () => {
    let action = deletePost(4);
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(3);
})