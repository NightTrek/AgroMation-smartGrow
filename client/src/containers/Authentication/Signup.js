import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../../actions";
import validator from "validator";

import InputField from "../InputField";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  renderErrors = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    console.log(meta);
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderErrors(meta)}
      </div>
    );
  };

  onSubmit = formProps => {
    console.log(formProps);
    this.props.signup(formProps, () => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    // console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <fieldset>
            <label for="email" id="labelColor">
              Email
            </label>
            <Field
              name="email"
              type="text"
              id="email"
              className="email form-control"
              component={InputField}
              autoComplete="none"
            />
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset>
            <label for="username" id="labelColor">
              Full Name
            </label>
            <Field
              name="fullName"
              type="text"
              id="username"
              className="inputBox form-control"
              component={InputField}
              autoComplete="none"
            />
          </fieldset>
        </div>
        <div className="form-group">
          <fieldset>
            <label for="password" id="labelColor">
              Password
            </label>
            <Field
              name="password"
              type="password"
              id="password"
              className="form-control"
              component={InputField}
              autoComplete="none"
            />
          </fieldset>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block btn-radius btn-primary submit"
          >
            SIGN UP
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const validate = formValues => {
  const errors = {};
  console.log("validator", formValues);

  if (!formValues.email) {
    errors.email = "You must enter an email";
  }

  if (formValues.email) {
    if (!validator.isEmail(formValues.email)) {
      errors.email = "You must enter a valid email address";
    }
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

export default compose(
  connect(mapStateToProps, { signup }),
  reduxForm({
    form: "signup",
    validate
  })
)(Signup);
