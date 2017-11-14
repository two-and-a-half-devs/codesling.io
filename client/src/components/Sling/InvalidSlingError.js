import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';

import '../LandingPage/LandingPage.scss';


class InvalidSlingError extends Component {
  state = { }
  //
  // either have this function in redux
  // or pass this function around through the props so we don't have to write this again

  fetchSlingId = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });
      const { slingId } = data;
      this.props.history.push(`/${slingId}`);
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
      this.props.history.push('/auth/login');
    }
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        Invalid Sling! Create One Here
        <br />
        <br />
        <br />
        <Button
          className="pair-programming-btn-container"
          backgroundColor="red"
          color="white"
          loading={this.state.loading}
          text='Create a Sling!'
          onClick={this.fetchSlingId}
        />
      </div>
    );
  }
}

export default InvalidSlingError;
