import 'babel-core/polyfill';
import React from 'react';
import Rx from 'rx-dom';
import { onPlanetUpdate } from './actions/planetIndicator';
import { loadSithLord } from './actions/sithLords';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from './store/configureStore';

const actions = {
  onPlanetUpdate,
  loadSithLord,
};

import App from './containers/App';

const store = configureStore({});
const Actions = bindActionCreators(actions, store.dispatch);

// create a web socket subject
// const socket = Rx.DOM.fromWebSocket('ws://localhost:4000');

// socket.subscribe(
//   function onEvent(e) {
//     Actions.onPlanetUpdate(JSON.parse(e.data));
//   },
//   function onError(e) {
//     console.error('error: ', e);
//   },
//   function onClosed() {
//     console.info('socket closed');
//   }
// );

function observableFromStore(reduxStore) {
  return Rx.Observable.create((observer) => {
    return reduxStore.subscribe(() => {
      return observer.onNext(reduxStore.getState().sithLords);
    });
  });
}

const state$ = observableFromStore(store);

state$
  .distinct()
  .debounce(300)
  .subscribe(state => {
    const rdyForRequest = state
      .toList()
      .filter(i => {
        return i.get('id') !== null &&
               i.get('name') === null &&
               i.get('isLoading') === false;
      })
      .toJS();

    rdyForRequest.forEach(i => {
      Actions.loadSithLord(i.id, i.idx);
    });

    console.info('Requesting the following Sith Lords :: ', rdyForRequest);
  });

React.render(
  <div>
    <Provider store={ store }>
      {() =>
        <App />
      }
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={ store }
                monitor={ LogMonitor }
                visibleOnLoad />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);
