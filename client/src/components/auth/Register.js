import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = ({
  registerUser,
  clearErrors,
  errors,
  auth: { isAuthenticated },
  history
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    clearErrors();
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [clearErrors, isAuthenticated, history]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    registerUser(formData, history);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center text-light">Sign Up</h1>
            <p className="lead text-center text-light">
              Create your 3gO account
            </p>
            <form onSubmit={e => onSubmit(e)}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                type="text"
                value={name}
                onChange={e => onChange(e)}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={e => onChange(e)}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={e => onChange(e)}
                error={errors.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register));
