import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/mainLayout/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore} from "redux";
import { Provider } from "react-redux";
import rootReduce from "./reduces/index.js";


const store = createStore(rootReduce);
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
serviceWorker.unregister();
