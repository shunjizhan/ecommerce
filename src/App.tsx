import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './components/Routes';
import store, { history } from './store';
import './style.css';
import AnotherStore from './anotherStore';

function App() {
  return (
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <AnotherStore>
          <Routes />
        </AnotherStore>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
