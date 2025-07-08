import Musics from "./Musics";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        tracks: state.musicPage.tracks
    }
}


const mapDispatchToProps = dispatch => {
    return {}
}


const MusicsContainer = connect(mapStateToProps, mapDispatchToProps)(Musics);

export default MusicsContainer;