import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'

var firebaseConfig = {
  apiKey: "AIzaSyBoGvmfSf0pXzGsLB_5v-DKn3PgfQNw1BQ",
  authDomain: "resume-builder-19639.firebaseapp.com",
  projectId: "resume-builder-19639",
  storageBucket: "resume-builder-19639.appspot.com",
  messagingSenderId: "925394018410",
  appId: "1:925394018410:web:3050063bd59db4027bea13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebase) // redux bindings for firestore,
    
  )
);

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);