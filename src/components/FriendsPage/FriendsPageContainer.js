import FriendsPage from "./FriendsPage";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        friends:state.friendsPage.friends,
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

let FriendsPageContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsPage);

export default FriendsPageContainer;