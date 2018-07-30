import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { users } = this.props;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} users={users} />
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">List of Alania</h1>
              <p className="lead text-center">
                Browse and connect with dudes/girls
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  users: state.auth.users
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
