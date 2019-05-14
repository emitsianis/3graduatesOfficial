import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
import { clearErrors } from "../../actions/errorActions";

const AddEducation = ({ addEducation, clearErrors, history, errors }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false
  });

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const [toDataDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    addEducation(formData, history);
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display4 text-center text-light">Add Education</h1>
            <p className="lead text-center text-light">
              Add any school, bootcamp etc. that you have attended
            </p>
            <small className="d-block pb-3 text-light">
              * = required fields
            </small>
            <form onSubmit={e => onSubmit(e)}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree"
                name="degree"
                value={degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
              />
              <h6 className="text-light">From date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={onChange}
                error={errors.from}
              />
              <h6 className="text-light">To date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={onChange}
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
                  Current Education
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the program you attended"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation, clearErrors }
)(withRouter(AddEducation));
