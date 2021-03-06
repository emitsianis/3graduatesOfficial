import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let dashboardContent;

  if (profile === null || loading === true) {
    dashboardContent = <Spinner />;
  } else {
    //Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <p className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              <ProfileActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div style={{ marginBottom: "60px" }} />
              <button onClick={e => deleteAccount()} className="btn btn-danger">
                Delete my Acount
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      //User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p className="text-light">
            You have not set up a profile yet, please add some info
          </p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="diplay-4 text-light">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
