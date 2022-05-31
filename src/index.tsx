import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import { store } from './state';
import { App } from './components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
