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
import { getUser } from './common/globals';

class Routes extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  checkAuth = async () => {
    const user = await getUser();
    console.log('user', user);
    if (!isEmpty(user)) {
      browserHistory.push('/welcome');
    }
    window.scrollTo(0, 0);
  };

  // eslint-disable-next-line class-methods-use-this
  requireAuth = async () => {
    const user = await getUser();
    if (isEmpty(user)) {
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
              <Route exact path="/principal-login" components={{ component: PrincipalLogin }} />
              <Route exact path="/trainee-login" components={{ component: TraineeLogin }} />
              <Route exact path="/verify-otp" components={{ component: Otp }} onEnter={this.checkAuth} />
              <Route exact path="/welcome" components={{ component: Welcome }} />
              <Route exact path="/trainer-login" components={{ component: TrainerLogin }} />
              <Route exact path="/dst-mc" components={{ component: DstMc }} onEnter={this.requireAuth} />
              <Route exact path="/create-dst-mc" components={{ component: CreateDstMc }} />
              <Route exact path="/trainer-options" components={{ component: TrainerOptions }} />
              <Route path="*" components={{ component: NotFound }} />
            </Route>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default Routes;
