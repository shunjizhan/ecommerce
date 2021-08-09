import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './components/Routes';
import store, { history } from './store';
import './style.css';

function App() {
  return (
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
