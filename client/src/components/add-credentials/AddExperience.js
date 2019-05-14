import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

const AddExperience = ({ addExperience, history, errors }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false
  });

  const [toDataDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    addExperience(formData, history);
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display4 text-center text-light">Add Experience</h1>
            <p className="lead text-center text-light">
              Add any job or possition you have had in the past or current
            </p>
            <small className="d-block pb-3 text-light">
              * = required fields
            </small>
            <form onSubmit={e => onSubmit(e)}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={e => onChange(e)}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => onChange(e)}
                error={errors.location}
              />
              <h6 className="text-light">From date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={e => onChange(e)}
                error={errors.from}
              />
              <h6 className="text-light">To date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={e => onChange(e)}
                error={errors.to}
                disabled={toDataDisabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDataDisabled);
                  }}
                  id="current"
                />
                <label
                  htmlFor="current"
                  className="form-check-label text-light"
                >
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={description}
                onChange={e => onChange(e)}
                error={errors.description}
                info="Tell us about your job"
              />
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
