import FriendsList from "./FriendsList";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        friends: state.friendsPage.friends
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

let FriendsListContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsList)

export default FriendsListContainer;