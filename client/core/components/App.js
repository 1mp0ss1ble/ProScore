import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Notifs } from 'redux-notifications';
import NavigationBar from './NavigationBar';
import Modal from './Modal';
import api, { loadBranch } from '../../api';
import setAuthorizationToken from '../auth/setAuthorizationToken';
import { actions } from '../../user';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBranch('home'));
  }

  logout() {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(null);
    this.props.dispatch(actions.setCurrentUser({}));
  }

  render() {
    return (
      <div className="content">
        <NavigationBar user={this.props.user} logout={this.logout} />
        <div className="container">
          { this.props.children }
        </div>
        <Modal />
        <Notifs />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
};

App.defaultProps = {
  user: {},
};


export default connect(state => ({
  loaders: state.loaders,
  user: state.auth,
}))(App);
