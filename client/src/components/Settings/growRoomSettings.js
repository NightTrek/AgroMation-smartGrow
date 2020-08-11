import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

class ChillerSettings extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

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
    this.props.chillersettings(formProps, () => {
      this.props.history.push("/settings");
    });
  };

  render() {
    return <h5>Chiller settings here</h5>;
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, {  }),
  reduxForm({
    form: "chillersettings"
  })
)(ChillerSettings);
