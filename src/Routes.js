import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { isEmpty } from 'lodash';
import { persistor, store } from './redux/store';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import TraineeLogin from './pages/TraineeLogin';
import PrincipalLogin from './components/Principle/PrincipalLogin';
import Otp from './components/Otp';
import Welcome from './components/Welcome';
import TrainerLogin from './components/Trainer/TrainerLogin';
import DstMc from './components/DstMc/DstMc';
import CreateDstMc from './components/DstMc/CreateDstMc';
import TrainerOptions from './components/Trainer/TrainerOptions';
import Global from './components/Global';
import { getUser, ROLE } from './common/globals';
import TraineeDetail from './pages/TraineeDetail';
import TrainerDetail from './components/Trainer/TrainerDetail';

class Routes extends PureComponent {
  checkAuth = async () => {
    const user = await getUser();
    if (!isEmpty(user) && user !== null) {
      if (user.user.registrations[0].roles[0] === ROLE.PRINCIPAL
        || user.user.registrations[0].roles[0] === ROLE.TRAINER) {
        browserHistory.push('/welcome');
      } else {
        browserHistory.push('/trainee');
      }
    }
    window.scrollTo(0, 0);
  };

  requireAuth = async () => {
    const user = await getUser();
    if (isEmpty(user) && user === null) {
      browserHistory.push('/');
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Global />
          <Router history={browserHistory}>
            <Route component={App}>
              <Route exact path="/" components={{ component: Home }} onEnter={this.checkAuth} />
              <Route exact path="/principal-login" components={{ component: PrincipalLogin }} onEnter={this.checkAuth} />
              <Route exact path="/trainee-login" components={{ component: TraineeLogin }} onEnter={this.checkAuth} />
              <Route exact path="/trainee" components={{ component: TraineeDetail }} onEnter={this.requireAuth} />
              <Route exact path="/verify-otp" components={{ component: Otp }} onEnter={this.checkAuth} />
              <Route exact path="/welcome" components={{ component: Welcome }} onEnter={this.requireAuth} />
              <Route exact path="/trainer-login" components={{ component: TrainerLogin }} onEnter={this.checkAuth} />
              <Route exact path="/dst-mc" components={{ component: DstMc }} onEnter={this.requireAuth} />
              <Route exact path="/create-dst-mc" components={{ component: CreateDstMc }} onEnter={this.requireAuth} />
              <Route exact path="/trainer-options" components={{ component: TrainerOptions }} onEnter={this.requireAuth} />
              <Route exact path="/trainer-detail" components={{ component: TrainerDetail }} />
              <Route path="*" components={{ component: NotFound }} />
            </Route>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default Routes;
