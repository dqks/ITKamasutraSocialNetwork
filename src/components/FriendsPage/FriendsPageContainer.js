import FriendsPage from "./FriendsPage";

const FriendsPageContainer = (props) => {

    let state = props.store.getState();

    return (<FriendsPage friends={state.friendsPage.friends} />)
}

export default FriendsPageContainer;