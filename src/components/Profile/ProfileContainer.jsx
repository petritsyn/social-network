import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getProfile(userId);
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        profile: state.profilePage.profile
    })
};

let withRedirectComponent = withAuthRedirect(ProfileContainer);
let WithRouterDataProfileContainer = withRouter(withRedirectComponent);
export default connect(mapStateToProps, {getProfile})(WithRouterDataProfileContainer);