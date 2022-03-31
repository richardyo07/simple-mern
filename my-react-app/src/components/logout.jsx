/** @format */

import { Component } from 'react';
import userService from '../services/userService';

class Logout extends Component {
  componentDidMount() {
    userService.LogOut();
    window.location = '/';
  }

  render = () => null;
}
export default Logout;
