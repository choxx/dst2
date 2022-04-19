import React, {PureComponent} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends PureComponent {
  render() {
    const {component} = this.props;

    return (
      <div>
        <Header/>
        {component}
        <Footer/>
      </div>
    );
  }
}

export default App;

