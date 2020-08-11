import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavLinks extends Component {
  renderLinks(){
    if(this.props.auth) {
      return(
        <div>
          <Link to='/fmap'></Link>
          <Link to='/feature'></Link>
          <Link to='/todo'></Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to='/signup'></Link>
          <Link to='/signin'></Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Link to='/'></Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth: auth.authenticated };
}

export default connect(mapStateToProps, null)(NavLinks);
