import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import InputField from "../../containers/InputField";

class UserSettings extends Component {
  renderInput = ({ input }) => {
    return <input {...input} />;
  };

  onSubmit = formProps => {
    this.props.usersettings(formProps, () => {
      this.props.history.push("/settings");
    });
  };

  render() {
    return (
      <Fragment>
        {/* to display users current info */}
        <form className="form-horizontal settingsForm">
          <div className="form-group">
            <h6>Current Info</h6>
            <input
              type="email"
              name="user[email]"
              disabled
              id="profile_email"
              className="form-control disabled"
              value="email here"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="user[username]"
              disabled
              id="profile_username"
              className="form-control disabled"
              value="username here"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="profile_password"
              disabled
              id="profile_password"
              className="form-control disabled"
              value="password here"
            />
          </div>
        </form>

        {/* for user to edit their info */}
        <form
          className="form-horizontal"
          // need a patch method for user to edit their info
          // action="/users/@me/update?_method=PATCH"
          method="POST"
        >
          <div className="form-group">
            <h6>Edit your info below</h6>
            <fieldset>
              <Field
                type="email"
                name="user[email]"
                id="profile_email"
                className="form-control"
                component={InputField}
                value="email"
                placeholder="email here"
              />
            </fieldset>
          </div>
          <div className="form-group">
            <fieldset>
              <Field
                type="text"
                name="user[username]"
                id="profile_username"
                className="form-control"
                component={InputField}
                value="username"
                placeholder="username here"
              />
            </fieldset>
          </div>
          <div className="form-group">
            <fieldset>
              <Field
                type="password"
                name="profile_password"
                id="profile_password"
                className="form-control"
                component={InputField}
                value="password"
                placeholder="password here"
              />
            </fieldset>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-radius">
              Save Changes
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}
export default compose(connect(mapStateToProps, {  }), reduxForm({ form: "usersettings" }))(UserSettings);
