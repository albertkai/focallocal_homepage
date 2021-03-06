import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { AppRouter } from './routes';
import { store } from '../../api/redux/store';

// Import methods for optimistic UI here

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('app'),
  );
});
