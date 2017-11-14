import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';

import '../LandingPage/LandingPage.css';

class LandingPage extends Component {
  state = {
    loading: false,
    slingId: ''
  }

  fetchSlingId = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`,{
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });
      const { slingId } = data;
      this.props.history.push({
        pathname: `/${slingId}`,
      });
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
    }
  }

  handleStartProgrammingClick = () => {
    this.setState({
      loading: true,
    }, this.fetchSlingId);
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <Button
          className="auth-btn-container"
          backgroundColor="red"
          color="white"
          loading={this.state.loading}
          text='Start Pair Programming!'
          onClick={this.handleStartProgrammingClick}
        />
      </div>
    )
  }
}

export default LandingPage;
