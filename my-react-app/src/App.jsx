/** @format */

import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Signup from './components/signup';
import Signin from './components/signin';
import Logout from './components/logout';
import BizSignup from './components/bizSignup';
import CreateCard from './components/createCard';
import MyCards from './components/myCards';

import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from './services/userService';
import ProtectedRoute from './components/common/protectedRoute';
import EditCard from './components/editCard';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 600 }}>
          <Switch>
            <ProtectedRoute path="/myCards/edit/:id" component={EditCard} />
            <ProtectedRoute path="/myCards" component={MyCards} biz={true} />
            <ProtectedRoute
              path="/createCard"
              component={CreateCard}
              biz={true}
            />
            <Route path="/bizSignup" component={BizSignup} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
