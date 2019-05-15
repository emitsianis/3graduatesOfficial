import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";
import { clearErrors } from "../../actions/errorActions";

const CreateProfile = ({ createProfile, clearErrors, errors, history }) => {
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onSubmit = e => {
    e.preventDefault();

    createProfile(formData, history);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Select options for status
  const options = [
    {
      label: "* Select Status",
      value: 0
    },
    {
      label: "Working",
      value: "Working"
    },
    {
      label: "Chilling",
      value: "Chilling"
    },
    {
      label: "Dancing",
      value: "Dancing"
    },
    {
      label: "Revolutionary",
      value: "Revolutionary"
    },
    {
      label: "Finding excuses to not get a job (only use this if you are Zeik)",
      value: "Finding excuses to not get a job"
    },
    {
      label: "Student or Learning",
      value: "Student or Learning"
    },
    {
      label: "Instructor or Teacher",
      value: "Instructor or Teacher"
    },
    {
      label: "In a relationship",
      value: "In a relationship"
    },
    {
      label: "Other",
      value: "Other"
    }
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center text-light">
              Create Your Profile
            </h1>
            <p className="lead text-center text-light">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={e => onSubmit(e)}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={e => onChange(e)}
                error={errors.handle}
                info="A unique handle for your profile URL. (../api/profile/*handle*)"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={e => onChange(e)}
                error={errors.status}
                options={options}
                info="Give us an idea about your status"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={e => onChange(e)}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={e => onChange(e)}
                error={errors.website}
                info="Your own or your company's website"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => onChange(e)}
                error={errors.location}
                info="City or City & State/Country suggested"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={e => onChange(e)}
                error={errors.skills}
                info="Use comma separated values (tipota, kantipota, kankantipota) etc."
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                error={errors.bio}
                info="Tell us a little about you"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  className="btn btn-light"
                >
                  Add social network links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {displaySocialInputs && (
                <Fragment>
                  <InputGroup
                    placeholder="Twitter page URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                    error={errors.twitter}
                  />
                  <InputGroup
                    placeholder="Facebook page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                    error={errors.facebook}
                  />
                  <InputGroup
                    placeholder="Linkedin page URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={linkedin}
                    onChange={e => onChange(e)}
                    error={errors.linkedin}
                  />
                  <InputGroup
                    placeholder="YouTube page URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={youtube}
                    onChange={e => onChange(e)}
                    error={errors.youtube}
                  />
                  <InputGroup
                    placeholder="Instagram page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={instagram}
                    onChange={e => onChange(e)}
                    error={errors.instagram}
                  />
                </Fragment>
              )}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, clearErrors }
)(withRouter(CreateProfile));
